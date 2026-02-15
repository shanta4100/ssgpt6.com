import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "SSGPT6",
  description: "Intelligent Digital Access Platform",
  manifest: "/manifest.webmanifest",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/tradehub-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/tradehub-icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <header className="topbar">
            <h1>SSGPT6</h1>
          </header>

          <main className="content">
            {children}
          </main>

          <nav className="navbar">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/tradehub">TradeHub</Link>
            <Link href="/settings">Settings</Link>
          </nav>
        </div>
      </body>
    </html>
  );
}