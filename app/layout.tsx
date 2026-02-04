export const metadata = {
  title: "SSGPT6",
  description: "A simple, stable system for AI tools, media, and governance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        <header style={{ padding: 12, borderBottom: "1px solid #ccc" }}>
          <h2>SSGPT6</h2>
        </header>

        {children}

        <footer style={{ padding: 12, borderTop: "1px solid #ccc" }}>
          <p>© {new Date().getFullYear()} SSGPT6</p>
        </footer>
      </body>
    </html>
  );
}
