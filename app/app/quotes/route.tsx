export const runtime = "edge";

const quotes = [
  "Stay hungry, stay foolish.",
  "Simplicity is the ultimate sophistication.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "First, solve the problem. Then, write the code."
];

export async function GET() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return new Response(JSON.stringify({ quote }), {
    headers: { "content-type": "application/json" }
  });
}