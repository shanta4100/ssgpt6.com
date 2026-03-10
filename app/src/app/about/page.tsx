import Header from "../header";
import Footer from "../footer";

export default function About() {
  return (
    <>
      <Header />

      <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <h1>About SSGPT6</h1>

        <p>
          SSGPT6 is an intelligent digital access platform developed by
          GNAIAAAC LLC. The platform focuses on AI tools, automation,
          digital infrastructure, and global collaboration.
        </p>

        <h2>Mission</h2>
        <p>
          Build practical AI tools, digital governance systems, and
          automation platforms that help people and organizations operate
          more efficiently.
        </p>

        <h2>Founder</h2>
        <p>
          Founder: Arifur Shanta
        </p>

        <h2>Projects</h2>
        <ul>
          <li>TradeHub</li>
          <li>EarnAI</li>
          <li>AI Academy</li>
          <li>GN-AI Network</li>
        </ul>
      </main>

      <Footer />
    </>
  );
}