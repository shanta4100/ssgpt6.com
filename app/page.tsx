// app/page.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "#05070a",
      color: "#ffffff",
      fontFamily: "sans-serif",
      padding: "24px",
      alignItems: "center"
    }}>
      {/* Header Section - Prevents Overlap */}
      <header style={{ textAlign: "center", marginBottom: "40px", marginTop: "20px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0" }}>SSGPT6 Core</h1>
        <p style={{ color: "#8892b0", fontSize: "1.1rem" }}>Autonomous Digital Governance</p>
      </header>

      {/* Controlled Image Container */}
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "400px",
        aspectRatio: "16/9",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #1d283a",
        marginBottom: "40px"
      }}>
        {/* Replace with your actual asset path */}
        <div style={{ 
          width: "100%", 
          height: "100%", 
          background: "linear-gradient(45deg, #1e293b, #0f172a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <span style={{ color: "#38bdf8" }}>System Visual Active</span>
        </div>
      </div>

      {/* Navigation Grid - Mobile First */}
      <nav style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "16px",
        width: "100%",
        maxWidth: "400px"
      }}>
        <a href="/dashboard" style={navButtonStyle}>Access Dashboard</a>
        <a href="/tradehub" style={navButtonStyle}>TradeHub Hub</a>
        <a href="/settings" style={navButtonStyle}>System Settings</a>
      </nav>

      <footer style={{ marginTop: "auto", padding: "20px", opacity: 0.5, fontSize: "0.8rem" }}>
        GNAIAAAC LLC © 2026
      </footer>
    </main>
  );
}

const navButtonStyle = {
  padding: "16px",
  backgroundColor: "#111827",
  border: "1px solid #1f2937",
  borderRadius: "8px",
  color: "#f3f4f6",
  textDecoration: "none",
  textAlign: "center" as const,
  fontWeight: "500",
  transition: "background 0.2s"
};
