export const runtime = 'edge';

import { NextResponse } from "next/server";

const quotes = [
  "Stay hungry, stay foolish.",
  "Simplicity is the ultimate sophistication.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "First, solve the problem. Then, write the code."
];

export async function GET() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return NextResponse.json({
    quote: randomQuote
  });
}