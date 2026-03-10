import Header from "./header";
import Footer from "./footer";
import SpecialAnnouncementSystem from "./components/SpecialAnnouncementSystem";

export default function Home() {
  return (
    <>
      <Header />

      <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <SpecialAnnouncementSystem />

        <h1>SSGPT6 Platform</h1>

        <p>Welcome to the SSGPT6 ecosystem.</p>

        <h2>Projects</h2>
        <ul>
          <li>
            <a href="https://tradehub.ssgpt6.com">TradeHub</a>
          </li>
          <li>
            <a href="https://earnai.vercel.app">EarnAI</a>
          </li>
        </ul>

        <h2>Media</h2>
        <ul>
          <li>Video</li>
          <li>Podcast</li>
          <li>Webinar</li>
        </ul>

        <h2>Contact</h2>
        <p>Email: ssgpt6@aol.com</p>
      </main>

      <Footer />
    </>
  );
}