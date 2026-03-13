export const runtime = 'edge';

export async function GET(request: Request) {
  // Your existing API logic here
  return new Response(JSON.stringify({ quote: 'Your quote here' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}