import Header from "../header";
import Footer from "../footer";

const sectionStyle: React.CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const cardGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
  marginTop: "24px",
};

const cardStyle: React.CSSProperties = {
  background: "#0f1c31",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "22px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
};

const tagStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: "999px",
  background: "rgba(212, 175, 55, 0.12)",
  color: "#d4af37",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.6px",
  textTransform: "uppercase",
  marginBottom: "12px",
};

const ctaStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: "12px",
  padding: "12px 16px",
  borderRadius: "10px",
  background: "#d4af37",
  color: "#08111e",
  textDecoration: "none",
  fontWeight: 700,
};

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main
        style={{
          background:
            "linear-gradient(180deg, #04111f 0%, #061425 45%, #081a30 100%)",
          color: "#f2f6fb",
          minHeight: "100vh",
        }}
      >
        <section
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background:
              "linear-gradient(90deg, rgba(0,217,255,0.08), rgba(255,46,142,0.05))",
          }}
        >
          <div style={{ ...sectionStyle, paddingTop: "56px", paddingBottom: "56px" }}>
            <p
              style={{
                color: "#d4af37",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: 700,
                marginBottom: "14px",
              }}
            >
              SSGPT6-CORE Services
            </p>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4.4rem)",
                lineHeight: 1.08,
                margin: "0 0 18px",
                fontWeight: 800,
              }}
            >
              Founder-controlled digital services for governance, media,
              automation, research, and future-ready systems.
            </h1>

            <p
              style={{
                maxWidth: "900px",
                color: "#9fd0ff",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                margin: 0,
              }}
            >
              This services page explains what SSGPT6-CORE offers, who it helps,
              and how the platform connects digital governance, AI media,
              publishing, research support, customer access, and human-centered
              innovation under one structured ecosystem.
            </p>
          </div>
        </section>

        <section style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={sectionStyle}>
            <h2 style={{ color: "#d4af37", fontSize: "2rem", marginBottom: "12px" }}>
              What this platform provides
            </h2>
            <p style={{ color: "#c9d7e6", maxWidth: "900px" }}>
              SSGPT6-CORE is a commercial and innovation platform. It is designed
              to support services, projects, customer pathways, media publishing,
              research organization, and automation-assisted workflows. The
              platform is not presented as magic or uncontrolled AI. It is a
              structured environment where technology supports people under
              founder oversight.
            </p>

            <div style={cardGridStyle}>
              <div style={cardStyle}>
                <div style={tagStyle}>Core Direction</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  Digital Governance
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Governance-focused service structures for platforms, projects,
                  public-facing systems, and future digital infrastructure.
                </p>
              </div>

              <div style={cardStyle}>
                <div style={tagStyle}>Commercial Platform</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  Customer Access
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Structured pathways for pricing, billing, memberships,
                  consultation requests, support, and service intake.
                </p>
              </div>

              <div style={cardStyle}>
                <div style={tagStyle}>Automation</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  AI-Assisted Workflow
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Automation-ready architecture for publishing, project
                  organization, service routing, and digital delivery support.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={sectionStyle}>
            <h2 style={{ color: "#d4af37", fontSize: "2rem", marginBottom: "12px" }}>
              Service categories
            </h2>
            <p style={{ color: "#c9d7e6", maxWidth: "920px" }}>
              These categories organize the commercial and public-facing services
              of the SSGPT6-CORE ecosystem.
            </p>

            <div style={cardGridStyle}>
              <div style={cardStyle}>
                <div style={tagStyle}>01</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  Digital Governance and Platform Services
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Service direction for digital governance models, platform
                  structure, workflow clarity, customer pathways, policy-aware
                  communication, and founder-led system design.
                </p>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>Governance page architecture</li>
                  <li>Platform structure guidance</li>
                  <li>Service logic and pathway design</li>
                  <li>Public trust and positioning language</li>
                </ul>
              </div>

              <div style={cardStyle}>
                <div style={tagStyle}>02</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  AI Media and Automated Production
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Media-oriented services for AI-assisted content systems,
                  publishing structures, production workflows, and communication
                  design.
                </p>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>Media workflow planning</li>
                  <li>Publishing system design</li>
                  <li>AI-supported production direction</li>
                  <li>Brand communication structure</li>
                </ul>
              </div>

              <div style={cardStyle}>
                <div style={tagStyle}>03</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  Video Production and Publishing
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Website-ready video publishing support, founder message video
                  layouts, release structures, and media network planning.
                </p>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>Video page structuring</li>
                  <li>Featured media presentation</li>
                  <li>Release and archive organization</li>
                  <li>Commercial publishing pathways</li>
                </ul>
              </div>

              <div style={cardStyle}>
                <div style={tagStyle}>04</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  Podcast and Audio Publishing
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Support for podcast layout, episode organization, voice-based
                  communication pages, and audio publishing workflows.
                </p>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>Podcast episode systems</li>
                  <li>Audio publishing structure</li>
                  <li>Voice content presentation</li>
                  <li>Show-note organization</li>
                </ul>
              </div>

              <div style={cardStyle}>
                <div style={tagStyle}>05</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  Blog and Newsletter Systems
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Content systems for blog publishing, newsletter workflows,
                  archive structures, release notes, and update distribution.
                </p>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>Blog category structure</li>
                  <li>Newsletter archive planning</li>
                  <li>Issue formatting</li>
                  <li>Content organization support</li>
                </ul>
              </div>

              <div style={cardStyle}>
                <div style={tagStyle}>06</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  Webinar and Public Communication Services
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Services for webinar pages, replay structure, topic-based
                  consultation pathways, and public communication systems.
                </p>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>Webinar landing sections</li>
                  <li>Replay library planning</li>
                  <li>Consultation request pathways</li>
                  <li>Public communication layout</li>
                </ul>
              </div>

              <div style={cardStyle}>
                <div style={tagStyle}>07</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  Research and Knowledge Services
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Organized support for research presentation, knowledge library
                  structure, project categorization, and long-term archive logic.
                </p>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>Research page organization</li>
                  <li>Knowledge system architecture</li>
                  <li>Project archive structure</li>
                  <li>Document and topic alignment</li>
                </ul>
              </div>

              <div style={cardStyle}>
                <div style={tagStyle}>08</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  Marketing and Advertising Services
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Structured services for brand positioning, marketing page
                  design, advertising system language, and audience-facing
                  clarity.
                </p>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>Marketing message clarity</li>
                  <li>Service explanation systems</li>
                  <li>Advertising presentation structure</li>
                  <li>Campaign landing direction</li>
                </ul>
              </div>

              <div style={cardStyle}>
                <div style={tagStyle}>09</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  Accessibility and Human Wellbeing Direction
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Human-centered service direction for accessible interfaces,
                  readable layouts, voice-ready support, and safer communication
                  pathways.
                </p>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>Senior-friendly layout direction</li>
                  <li>Readable navigation systems</li>
                  <li>Accessible page structure</li>
                  <li>Voice-ready communication guidance</li>
                </ul>
              </div>

              <div style={cardStyle}>
                <div style={tagStyle}>10</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  Climate, Energy, and Water Research Direction
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Service direction for zero-carbon systems, pure water research,
                  water sustainability framing, and global solution models.
                </p>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>Pure water project structure</li>
                  <li>Water sustainability language</li>
                  <li>Climate solution positioning</li>
                  <li>Research communication systems</li>
                </ul>
              </div>

              <div style={cardStyle}>
                <div style={tagStyle}>11</div>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>
                  Business Support and Payment Services
                </h3>
                <p style={{ color: "#c9d7e6" }}>
                  Support for pricing pages, billing pathways, checkout
                  direction, memberships, customer support, and trust-page
                  integration.
                </p>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>Pricing page structure</li>
                  <li>Checkout and billing logic</li>
                  <li>Membership flow support</li>
                  <li>Customer access pathways</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={sectionStyle}>
            <h2 style={{ color: "#d4af37", fontSize: "2rem", marginBottom: "12px" }}>
              How customers decide to buy
            </h2>
            <p style={{ color: "#c9d7e6", maxWidth: "900px", marginBottom: "26px" }}>
              Customers make decisions faster when the website explains the
              service calmly and clearly.
            </p>

            <div style={cardGridStyle}>
              <div style={cardStyle}>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>What it is</h3>
                <p style={{ color: "#c9d7e6" }}>
                  Each service should clearly explain what the platform does and
                  what category it belongs to.
                </p>
              </div>

              <div style={cardStyle}>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>Why it helps</h3>
                <p style={{ color: "#c9d7e6" }}>
                  Customers need to see the problem solved: governance,
                  publishing, support, research structure, automation, or
                  communication.
                </p>
              </div>

              <div style={cardStyle}>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>How they get it</h3>
                <p style={{ color: "#c9d7e6" }}>
                  The delivery path should be visible: portal, pricing, contact,
                  AI intake, webinar pathway, or structured support route.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={sectionStyle}>
            <h2 style={{ color: "#d4af37", fontSize: "2rem", marginBottom: "12px" }}>
              Safe service positioning
            </h2>
            <p style={{ color: "#c9d7e6", maxWidth: "920px" }}>
              This platform should present services honestly. It should not
              promise unavailable features or regulated capabilities that are not
              actually implemented.
            </p>

            <div style={cardGridStyle}>
              <div style={cardStyle}>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>Use this wording</h3>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>automation-assisted</li>
                  <li>voice-ready</li>
                  <li>future platform support</li>
                  <li>where supported</li>
                  <li>subject to provider availability</li>
                </ul>
              </div>

              <div style={cardStyle}>
                <h3 style={{ color: "#d4af37", marginTop: 0 }}>Avoid this wording</h3>
                <ul style={{ color: "#aebed1", paddingLeft: "18px" }}>
                  <li>guaranteed profit</li>
                  <li>guaranteed worldwide availability</li>
                  <li>live features not actually integrated</li>
                  <li>medical or legal claims without basis</li>
                  <li>full biometric or voice control unless built</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div style={sectionStyle}>
            <h2 style={{ color: "#d4af37", fontSize: "2rem", marginBottom: "12px" }}>
              Next action
            </h2>
            <p style={{ color: "#c9d7e6", maxWidth: "900px" }}>
              Customers should move from services into projects, pricing, or
              contact without confusion. This page should act as the clear middle
              layer between your homepage and your commercial pathways.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "20px" }}>
              <a href="/projects" style={ctaStyle}>View Projects</a>
              <a href="/pricing" style={ctaStyle}>View Pricing</a>
              <a href="/contact" style={ctaStyle}>Contact Us</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}