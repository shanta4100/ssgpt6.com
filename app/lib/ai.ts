export async function callAI(prompt: string) {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });

  const text = await res.text()

  let json: any = null

  try {
    json = text ? JSON.parse(text) : null
  } catch {}

  if (!res.ok) {
    const errObj = json?.error ?? {
      http_status: res.status,
      message: text || 'Request failed'
    }

    console.error("AI ERROR:", errObj)

    throw new Error(errObj.message)
  }

  return json
}