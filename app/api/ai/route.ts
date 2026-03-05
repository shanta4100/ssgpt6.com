import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const headerKey = req.headers.get('x-gemini-api-key')?.trim();
    const { prompt } = await req.json();

    const apiKey = headerKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: { code: 'MISSING_API_KEY', message: 'Missing Gemini API key.' } },
        { status: 400 }
      );
    }

    const upstream = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt ?? '' }] }],
        }),
      }
    );

    const rawText = await upstream.text(); // IMPORTANT: capture body even on errors
    let json: any = null;
    try { json = rawText ? JSON.parse(rawText) : null; } catch { /* keep rawText */ }

    if (!upstream.ok) {
      const upstreamErr = json?.error;
      return NextResponse.json(
        {
          error: {
            http_status: upstream.status,
            status: upstreamErr?.status ?? 'UPSTREAM_ERROR',
            code: upstreamErr?.code ?? upstream.status,
            message: upstreamErr?.message ?? rawText ?? 'Upstream request failed',
          },
        },
        { status: upstream.status }
      );
    }

    return NextResponse.json({ data: json ?? rawText });
  } catch (e: any) {
    // IMPORTANT: never return {}
    return NextResponse.json(
      {
        error: {
          http_status: 500,
          status: 'INTERNAL',
          code: 'INTERNAL_ERROR',
          message: e?.message ?? String(e),
        },
      },
      { status: 500 }
    );
  }
}