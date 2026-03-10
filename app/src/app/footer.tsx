export default function Footer() {
  return (
    <footer
      style={{
        background: "#0b1220",
        padding: "20px",
        marginTop: "40px",
        borderTop: "1px solid #222",
        textAlign: "center"
      }}
    >
      <p style={{ color: "#f5c542" }}>SSGPT6 Network</p>

      <p style={{ color: "#ffffff", fontSize: "14px" }}>
        © 2026 GNAIAAAC LLC
      </p>

      <p style={{ marginTop: "10px" }}>
        <a href="https://ssgpt6.com" style={{ color: "#ffffff", marginRight: "10px" }}>
          Home
        </a>

        <a href="https://tradehub.ssgpt6.com" style={{ color: "#ffffff", marginRight: "10px" }}>
          TradeHub
        </a>

        <a href="https://earnai.vercel.app" style={{ color: "#ffffff", marginRight: "10px" }}>
          EarnAI
        </a>

        <a href="mailto:ssgpt6@aol.com" style={{ color: "#ffffff" }}>
          Contact
        </a>
      </p>
    </footer>
  );
}