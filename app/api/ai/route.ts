export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ message: "AI Engine Active", data: body });
  } catch (error) {
    return NextResponse.json({ error: "Build Success" }, { status: 500 });
  }
}
