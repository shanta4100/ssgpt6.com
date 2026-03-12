export const runtime = 'edge';

export async function GET() {
  const quotes = [
    "The future depends on what you do today.",
    "Success is not final; failure is not fatal.",
    "Small steps every day lead to big results.",
    "Your potential is endless."
  ];

  const random = quotes[Math.floor(Math.random() * quotes.length)];

  return Response.json({
    quote: random
  });
}