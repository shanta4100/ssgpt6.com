import os
from typing import Any, Dict, List

import pandas as pd
import yfinance as yf
import google.generativeai as genai


# =========================
# CONFIG
# =========================
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")
MODEL_NAME = "gemini-1.5-flash"


# =========================
# GEMINI SETUP
# =========================
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(MODEL_NAME)


# =========================
# HELPERS
# =========================
def safe_float(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except Exception:
        return default


def get_news_titles(news_items: List[Dict[str, Any]], limit: int = 3) -> List[str]:
    titles: List[str] = []
    for item in news_items[:limit]:
        title = item.get("title")
        if isinstance(title, str) and title.strip():
            titles.append(title.strip())
    return titles


def build_quant_metrics(hist: pd.DataFrame) -> Dict[str, Any]:
    if hist.empty or "Close" not in hist.columns:
        return {
            "current_price": None,
            "sma_20": None,
            "five_day_return_pct": None,
            "twenty_day_volatility_pct": None,
            "price_vs_sma": "Unknown",
            "risk_flag": "Data unavailable",
        }

    closes = hist["Close"].dropna()
    if closes.empty:
        return {
            "current_price": None,
            "sma_20": None,
            "five_day_return_pct": None,
            "twenty_day_volatility_pct": None,
            "price_vs_sma": "Unknown",
            "risk_flag": "Data unavailable",
        }

    current_price = safe_float(closes.iloc[-1], None)
    sma_20 = safe_float(closes.tail(20).mean(), None)

    if len(closes) >= 6:
        five_day_return_pct = ((closes.iloc[-1] / closes.iloc[-6]) - 1) * 100
    else:
        five_day_return_pct = None

    daily_returns = closes.pct_change().dropna()
    if len(daily_returns) >= 5:
        twenty_day_volatility_pct = daily_returns.tail(20).std() * 100
    else:
        twenty_day_volatility_pct = None

    if current_price is not None and sma_20 is not None:
        price_vs_sma = "Above SMA" if current_price > sma_20 else "Below SMA"
    else:
        price_vs_sma = "Unknown"

    risk_flag = "Normal"
    if twenty_day_volatility_pct is not None and twenty_day_volatility_pct > 3:
        risk_flag = "Elevated volatility"
    if five_day_return_pct is not None and five_day_return_pct < -7:
        risk_flag = "Recent downside pressure"

    return {
        "current_price": current_price,
        "sma_20": sma_20,
        "five_day_return_pct": five_day_return_pct,
        "twenty_day_volatility_pct": twenty_day_volatility_pct,
        "price_vs_sma": price_vs_sma,
        "risk_flag": risk_flag,
    }


def build_prompt(ticker_symbol: str, metrics: Dict[str, Any], news_titles: List[str]) -> str:
    news_context = "\n".join(f"- {title}" for title in news_titles) if news_titles else "- No recent headlines available"

    return f"""
You are an educational financial analysis assistant.

Your role is to provide a cautious, non-advisory stock evaluation.
You must NOT provide financial advice, legal advice, or direct trading recommendations.
Do NOT use Buy/Hold/Sell language.
Instead, use one of these labels:
- Stable
- Watch
- Elevated Risk

Ticker: {ticker_symbol}

Quantitative snapshot:
- Current Price: {metrics.get("current_price")}
- 20-Day SMA: {metrics.get("sma_20")}
- 5-Day Return %: {metrics.get("five_day_return_pct")}
- 20-Day Volatility %: {metrics.get("twenty_day_volatility_pct")}
- Trend vs SMA: {metrics.get("price_vs_sma")}
- Risk Flag: {metrics.get("risk_flag")}

Recent headlines:
{news_context}

Return your answer in this exact structure:

Confidence Score: <0 to 100>
Status: <Stable / Watch / Elevated Risk>
Summary: <1 sentence>
Risk Factors:
- <bullet 1>
- <bullet 2>
- <bullet 3>
Disclosure: This is educational analysis only and may be wrong.
"""


def evaluate_stock(ticker_symbol: str) -> str:
    try:
        stock = yf.Ticker(ticker_symbol)

        hist = stock.history(period="1mo", interval="1d")
        news_items = getattr(stock, "news", []) or []

        metrics = build_quant_metrics(hist)
        news_titles = get_news_titles(news_items, limit=3)

        prompt = build_prompt(ticker_symbol, metrics, news_titles)
        response = model.generate_content(prompt)

        if hasattr(response, "text") and response.text:
            return response.text.strip()

        return (
            "Confidence Score: N/A\n"
            "Status: Watch\n"
            "Summary: Response was empty.\n"
            "Risk Factors:\n"
            "- Model returned no text\n"
            "- Data quality may be limited\n"
            "- Manual review needed\n"
            "Disclosure: This is educational analysis only and may be wrong."
        )

    except Exception as exc:
        return (
            "Confidence Score: N/A\n"
            "Status: Elevated Risk\n"
            f"Summary: System error while evaluating {ticker_symbol}: {exc}\n"
            "Risk Factors:\n"
            "- Data fetch failure\n"
            "- Model or network issue\n"
            "- Output unavailable\n"
            "Disclosure: This is educational analysis only and may be wrong."
        )


if __name__ == "__main__":
    print(evaluate_stock("NVDA"))