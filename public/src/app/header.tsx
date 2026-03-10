export default function Header() {
  return (
    <header style={{
      background:"#0b1220",
      padding:"20px",
      borderBottom:"1px solid #222"
    }}>
      <h2 style={{color:"#f5c542"}}>SSGPT6</h2>

      <nav style={{marginTop:"10px"}}>
        <a href="/" style={{marginRight:"15px",color:"#ffffff"}}>Home</a>
        <a href="https://tradehub.ssgpt6.com" style={{marginRight:"15px",color:"#ffffff"}}>TradeHub</a>
        <a href="https://earnai.vercel.app" style={{marginRight:"15px",color:"#ffffff"}}>EarnAI</a>
        <a href="mailto:ssgpt6@aol.com" style={{color:"#ffffff"}}>Contact</a>
      </nav>
    </header>
  );
}