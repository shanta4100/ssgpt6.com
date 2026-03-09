export const metadata = {
  title: "SSGPT6",
  description: "Simple AI for Real Life"
}
<nav style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
  <a href="/" style={{ marginRight: "1rem" }}>Home</a>
  <a href="/about" style={{ marginRight: "1rem" }}>About</a>
  <a href="/services" style={{ marginRight: "1rem" }}>Services</a>
  <a href="/projects" style={{ marginRight: "1rem" }}>Projects</a>
  <a href="/contact">Contact</a>
</nav>
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        {children}
      </body>
    </html>
  )
}