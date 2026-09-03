import pandas as pd
import yfinance as yf
import google.generativeai as genai

# =========================
# CONFIG
# =========================
GEMINI_API_KEY = "PASTE_YOUR_REAL_KEY_HERE"

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")


# =========================
# SAFE HELPERS
# =========================
def safe_news(stock):
    try:
        news = stock.news
        if not news:
            return ["No major news available"]
        return [n.get("title", "No title") for n in news[:3]]
    except:
        return ["News unavailable"]


def compute_metrics(hist):
    closes = hist["Close"].dropna()

    current_price = float(closes.iloc[-1])
    sma_20 = closes.tail(20).mean()

    returns = closes.pct_change().dropna()
    volatility = returns.std() * 100

    rsi = 50  # simple placeholder (safe mode)

    return current_price, sma_20, volatility, rsi


# =========================
# AI PROMPT (UPGRADED BLACK BOX)
# =========================
def build_prompt(ticker, price, sma, vol, rsi, news):

    news_text = "\n".join(news)

    return f"""
You are GN-AI Black Box Risk Engine.

STRICT RULES:
- DO NOT give financial advice
- DO NOT say Buy/Sell
- Only output: Stable / Watch / Elevated Risk

DATA:
Price: {price}
SMA20: {sma}
Volatility: {vol}
RSI: {rsi}

NEWS:
{news_text}

LOGIC RULES:
- If RSI > 70 → Elevated Risk
- If Volatility > 5 → Elevated Risk
- Negative news → reduce confidence

OUTPUT FORMAT:

Confidence Score: <0-100>
Status: <Stable / Watch / Elevated Risk>
Reason: <short explanation>
Risk Factors:
- ...
- ...
- ...
"""


# =========================
# MAIN FUNCTION
# =========================
def evaluate_stock(ticker):

    try:
        stock = yf.Ticker(ticker)
        hist = stock.history(period="1mo")

        if hist.empty:
            return "No market data available"

        price, sma, vol, rsi = compute_metrics(hist)
        news = safe_news(stock)

        prompt = build_prompt(ticker, price, sma, vol, rsi, news)

        response = model.generate_content(prompt)

        if hasattr(response, "text") and response.text:
            return response.text
        else:
            return "AI returned empty response"

    except Exception as e:
        return f"ERROR: {str(e)}"


# =========================
# RUN
# =========================
if __name__ == "__main__":
    print(evaluate_stock("NVDA"))