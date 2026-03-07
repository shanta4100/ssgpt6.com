import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "40px", textAlign: "center" }}>
      <h1>SSGPT6 Core</h1>
      <p>Intelligent Digital Access Platform</p>

      <div style={{ marginTop: 30 }}>
        <Link href="/dashboard">
          <button style={{ marginRight: 10 }}>Dashboard</button>
        </Link>

        <Link href="/contact">
          <button>Contact</button>
        </Link>
      </div>
    </main>
  );
}