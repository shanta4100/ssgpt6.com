import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {

    const body = await req.json()
    const prompt = body.prompt

    const apiKey = process.env.GEMINI_API_KEY

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey || ""
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    )

    const text = await response.text()

    let data: any = null
    try {
      data = JSON.parse(text)
    } catch {}

    if (!response.ok) {
      return NextResponse.json(
        {
          error: {
            status: response.status,
            message: data?.error?.message || text
          }
        },
        { status: response.status }
      )
    }

    return NextResponse.json(data)

  } catch (error: any) {

    return NextResponse.json(
      {
        error: {
          status: 500,
          message: error?.message || "Internal server error"
        }
      },
      { status: 500 }
    )

  }
}