import Link from "next/link";

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="sectionTitle">{title}</h2>
        <div className="sectionBody">{children}</div>
      </div>
    </section>
  );
}

function ActionButton({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link href={href} className={`button ${variant === "secondary" ? "buttonSecondary" : ""}`}>
      {label}
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="pageShell">
      <header className="hero">
        <div className="container heroInner">
          <div className="eyebrow">GNAIAAAC LLC</div>
          <h1 className="heroTitle">
            SSGPT6
            <span className="heroSubtitle">
              AI Infrastructure for Workforce Automation and Scalable Digital Systems
            </span>
          </h1>

          <p className="heroText">
            Transforming AI concepts into real-world, deployable systems for government,
            enterprise, and pilot-ready digital operations.
          </p>

          <div className="heroActions">
            <ActionButton href="/portal" label="View Platform" />
            <ActionButton href="/demo" label="Request Demo" variant="secondary" />
          </div>

          <div className="heroMeta">
            <div className="metaCard">
              <span className="metaLabel">UEI</span>
              <span className="metaValue">SAM-0d0c3ef5-b8c2-45b2-9f43-b6b7f954115f</span>
            </div>
            <div className="metaCard">
              <span className="metaLabel">DUNS</span>
              <span className="metaValue">Pending · Case No. DFC-532645</span>
            </div>
          </div>
        </div>
      </header>

      <Section id="founder" title="Founder & Chief Architect">
        <div className="twoCol">
          <div className="card">
            <h3 className="cardTitle">Arifur Shanta</h3>
            <p>
              Founder of GNAIAAAC LLC and architect of the SSGPT6 platform, focused on
              building AI-driven systems for automation, analytics, and scalable
              infrastructure.
            </p>
            <p>
              Specializing in AI-powered workforce systems, cloud-based SaaS platforms,
              automation workflows, and data intelligence for real-world deployment.
            </p>
          </div>

          <div className="card">
            <h3 className="cardTitle">Professional Focus</h3>
            <ul className="list">
              <li>AI-powered workforce systems</li>
              <li>Cloud-based SaaS platforms</li>
              <li>Automation and data intelligence</li>
              <li>Pilot-ready public-sector and enterprise solutions</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="platform" title="The SSGPT6 Platform">
        <div className="grid">
          <div className="card">
            <h3 className="cardTitle">Workforce Automation</h3>
            <p>Resume analysis, candidate evaluation, onboarding workflows, and task routing.</p>
          </div>

          <div className="card">
            <h3 className="cardTitle">Analytics</h3>
            <p>Reporting dashboards, workforce insights, and operational visibility.</p>
          </div>

          <div className="card">
            <h3 className="cardTitle">Secure SaaS</h3>
            <p>MFA-ready access, role controls, and scalable cloud deployment architecture.</p>
          </div>

          <div className="card">
            <h3 className="cardTitle">Pilot Deployment</h3>
            <p>Structured for controlled rollout, evaluation, and future scaling.</p>
          </div>
        </div>
      </Section>

      <Section id="demo" title="Live Demo">
        <div className="card featureCard">
          <div>
            <h3 className="cardTitle">AI Workforce Intake & Screening Demo</h3>
            <p>
              Explore a working example of AI-assisted HR automation:
            </p>
            <ul className="list">
              <li>Upload a resume</li>
              <li>Analyze candidate fit</li>
              <li>View ranked results</li>
            </ul>
          </div>
          <div className="featureActions">
            <ActionButton href="/demo" label="Launch Demo" />
          </div>
        </div>
      </Section>

      <Section id="applications" title="Government & Enterprise Applications">
        <div className="twoCol">
          <div className="card">
            <h3 className="cardTitle">Government Use</h3>
            <p>
              HR automation, workforce analytics, digital modernization, and secure
              process improvement.
            </p>
          </div>
          <div className="card">
            <h3 className="cardTitle">Enterprise Use</h3>
            <p>
              Internal operations, talent systems, reporting pipelines, and workflow
              automation across teams.
            </p>
          </div>
        </div>
      </Section>

      <Section id="capability" title="Capability Statement">
        <div className="card featureCard">
          <div>
            <h3 className="cardTitle">Official Capability Overview</h3>
            <p>
              Download or review the organization’s capability statement for government,
              pilot, and partner discussions.
            </p>
          </div>
          <div className="featureActions">
            <ActionButton href="/capability-statement" label="View Capability Statement" />
          </div>
        </div>
      </Section>

      <Section id="cta" title="Partner With Us">
        <div className="card centerCard">
          <p className="lead">
            We are actively seeking pilot programs, government collaboration, and enterprise
            partnerships.
          </p>
          <div className="heroActions">
            <ActionButton href="/demo" label="Request Pilot Program" />
            <ActionButton href="/contact" label="Contact GNAIAAAC LLC" variant="secondary" />
          </div>
        </div>
      </Section>

      <footer className="footer">
        <div className="container footerInner">
          <div className="footerBrand">SSGPT6 Platform</div>
          <p className="footerText">
            GNAIAAAC LLC · UEI: SAM-0d0c3ef5-b8c2-45b2-9f43-b6b7f954115f · DUNS:
            Pending (Case No. DFC-532645)
          </p>
        </div>
      </footer>
    </main>
  );
}