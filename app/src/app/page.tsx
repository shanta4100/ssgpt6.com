import Header from "./header";
import Footer from "./footer";

export default function Home() {
  return (
    <>
      <Header />

      <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <h1>SSGPT6 Global Platform</h1>
        <p>
          Welcome to the SSGPT6 ecosystem for global wellbeing, research,
          innovation, and responsible AI systems.
        </p>

        <h2>Main Pages</h2>
        <ul>
          <li><a href="/global-ai-wellbeing">Global AI Wellbeing Leadership</a></li>
          <li><a href="/silent-delivery-core">Silent Delivery Core</a></li>
          <li><a href="/project-memory-vault">Project Memory Vault</a></li>
          <li><a href="/about">About SSGPT6</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/automation">AI Sleeping Agent Automation</a></li>
        </ul>

        <h2>Core Vision</h2>
        <p>
          Build human-centered technologies that improve health, education,
          communication, sustainability, and global opportunity.
        </p>
      </main>

      <Footer />
    </>
  );
}