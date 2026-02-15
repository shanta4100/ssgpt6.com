export default function Dashboard() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "24px",
      fontFamily: "system-ui"
    }}>
      
      <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>
        SSGPT6 Founder Dashboard
      </h1>

      <p style={{ opacity: 0.7, marginBottom: "30px" }}>
        Core System Control Panel
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "16px"
      }}>
        
        <div style={cardStyle}>
          AI Control
        </div>

        <div style={cardStyle}>
          Trade Hub
        </div>

        <div style={cardStyle}>
          Media Center
        </div>

        <div style={cardStyle}>
          Governance
        </div>

      </div>

    </div>
  );
}

const cardStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center" as const,
  cursor: "pointer",
  transition: "0.2s",
};