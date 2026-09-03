export async function GET() {
  return Response.json({
    device: "BlackBox-001",
    status: "SAFE",
    quality: 92,
    signal: "ONLINE",
    timestamp: new Date().toISOString(),
  });
}