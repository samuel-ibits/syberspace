import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Privacy Policy | Syberspace",
  description: "How Syberspace collects, uses, and protects your personal data.",
};

const EFFECTIVE = "11 June 2025";
const COMPANY   = "Syberspace";
const EMAIL     = "support@syberspace.com.ng";
const PHONE     = "+234 815 151 9625";

export default function PrivacyPolicy() {
  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>

        {/* Nav */}
        <header className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border)", background: "color-mix(in srgb, var(--bg-base) 92%, transparent)", backdropFilter: "blur(20px)" }}>
          <a href="/"><Logo width={140} height={32} /></a>
          <a href="/" className="text-sm font-medium hover:underline" style={{ color: "var(--accent-cyan)" }}>← Back to home</a>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 theme-badge-cyan">Legal</div>
            <h1 className="text-4xl font-extrabold mb-3" style={{ color: "var(--text-primary)" }}>Privacy Policy</h1>
            <p className="text-sm" style={{ color: "var(--text-faint)" }}>Effective date: {EFFECTIVE}</p>
          </div>

          <div className="space-y-10 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>

            <Section title="1. Who We Are">
              <p>{COMPANY} ("we", "us", or "our") is an AI-as-a-Service company registered in Nigeria. We provide process automation, web scraping, data cleaning, AI bots, data analysis, and AI consultation services to businesses worldwide.</p>
              <p className="mt-3">For questions about this policy, contact us at <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "var(--accent-cyan)" }}>{EMAIL}</a> or <strong style={{ color: "var(--text-primary)" }}>{PHONE}</strong>.</p>
            </Section>

            <Section title="2. Data We Collect">
              <p>We collect only what is necessary to deliver our services:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li><strong style={{ color: "var(--text-primary)" }}>Contact information</strong> — name, email address, phone number provided via our website forms or chat widget.</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Business information</strong> — company name, industry, service interests, and details shared during consultations.</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Usage data</strong> — pages visited, time on site, browser type, and IP address (collected via analytics tools).</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Client project data</strong> — data you provide or we access as part of delivering contracted AI services (e.g. databases, spreadsheets, APIs).</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Communication records</strong> — emails, chat transcripts, and call notes from our interactions with you.</li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Data">
              <p>We use your data to:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>Respond to enquiries and schedule consultations.</li>
                <li>Deliver, maintain, and improve contracted AI services.</li>
                <li>Send service-related notifications (booking confirmations, project updates).</li>
                <li>Send occasional marketing communications — you may opt out at any time.</li>
                <li>Comply with applicable laws and regulations.</li>
                <li>Detect and prevent fraud, abuse, or unauthorised access.</li>
              </ul>
              <p className="mt-3">We do <strong style={{ color: "var(--text-primary)" }}>not</strong> sell, rent, or trade your personal data to third parties.</p>
            </Section>

            <Section title="4. Legal Basis for Processing">
              <p>We process your data under the Nigeria Data Protection Act (NDPA) 2023 and, where applicable, the EU GDPR, on the following legal bases:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li><strong style={{ color: "var(--text-primary)" }}>Contract</strong> — processing necessary to deliver services you have requested.</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Legitimate interests</strong> — improving our services, communicating with prospects.</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Consent</strong> — for marketing emails (you may withdraw consent at any time).</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Legal obligation</strong> — where required by law.</li>
              </ul>
            </Section>

            <Section title="5. Data Sharing">
              <p>We share your data only with:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li><strong style={{ color: "var(--text-primary)" }}>Service providers</strong> — cloud hosting (Vercel, AWS, GCP), email delivery (Gmail/SMTP), calendar services (Google Calendar), and AI model providers (OpenRouter) — solely to deliver our services.</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Legal authorities</strong> — when required by law, court order, or to protect our rights.</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Business transfers</strong> — in the event of a merger or acquisition, your data may transfer with the business (you will be notified).</li>
              </ul>
              <p className="mt-3">All third-party service providers are bound by data processing agreements and may not use your data for their own purposes.</p>
            </Section>

            <Section title="6. Data Security">
              <p>We take security seriously:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>All data is transmitted over encrypted HTTPS connections.</li>
                <li>Project data is stored with access controls limited to authorised personnel.</li>
                <li>We sign NDAs before engaging with client data.</li>
                <li>We perform regular security reviews of our systems.</li>
              </ul>
              <p className="mt-3">No method of transmission over the internet is 100% secure. If you believe your data has been compromised, contact us immediately at <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "var(--accent-cyan)" }}>{EMAIL}</a>.</p>
            </Section>

            <Section title="7. Data Retention">
              <p>We retain your data for as long as necessary to deliver our services and meet our legal obligations:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>Enquiry and contact form data — up to 2 years.</li>
                <li>Active client project data — for the duration of the project plus 12 months.</li>
                <li>Financial and billing records — 7 years (legal requirement).</li>
                <li>Marketing consent records — until consent is withdrawn.</li>
              </ul>
              <p className="mt-3">After the retention period, data is securely deleted or anonymised.</p>
            </Section>

            <Section title="8. Your Rights">
              <p>Depending on your location, you have the right to:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li><strong style={{ color: "var(--text-primary)" }}>Access</strong> — request a copy of the personal data we hold about you.</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Correction</strong> — request correction of inaccurate or incomplete data.</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Deletion</strong> — request deletion of your data ("right to be forgotten").</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Objection</strong> — object to processing based on legitimate interests.</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Portability</strong> — receive your data in a structured, machine-readable format.</li>
                <li><strong style={{ color: "var(--text-primary)" }}>Withdraw consent</strong> — for marketing, at any time.</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, email <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "var(--accent-cyan)" }}>{EMAIL}</a>. We will respond within 30 days.</p>
            </Section>

            <Section title="9. Cookies">
              <p>Our website uses minimal cookies for essential functionality (theme preferences, session state). We do not use third-party advertising cookies.</p>
              <p className="mt-3">You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>
            </Section>

            <Section title="10. Children's Privacy">
              <p>Our services are not directed at individuals under 18 years of age. We do not knowingly collect personal data from children. If you believe a child has provided us data, please contact us immediately.</p>
            </Section>

            <Section title="11. Changes to This Policy">
              <p>We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice on our website at least 14 days before taking effect. Continued use of our services after the effective date constitutes acceptance.</p>
            </Section>

            <Section title="12. Contact & Complaints">
              <p>For privacy concerns or to exercise your rights:</p>
              <div className="mt-3 p-4 rounded-xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                <p><strong style={{ color: "var(--text-primary)" }}>{COMPANY}</strong></p>
                <p>📧 <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "var(--accent-cyan)" }}>{EMAIL}</a></p>
                <p>📞 {PHONE}</p>
                <p>📱 <a href="https://web.facebook.com/syberspacenetwork" className="underline" style={{ color: "var(--accent-cyan)" }}>facebook.com/syberspacenetwork</a></p>
              </div>
              <p className="mt-3">If you are unsatisfied with our response, you have the right to lodge a complaint with the Nigeria Data Protection Commission (NDPC) or your local data protection authority.</p>
            </Section>

          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>{title}</h2>
      {children}
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-16 py-8 px-6 text-center text-xs" style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}>
      <p>© {new Date().getFullYear()} {COMPANY}. All rights reserved.</p>
      <div className="flex justify-center gap-6 mt-3">
        <a href="/privacy" className="hover:underline" style={{ color: "var(--accent-cyan)" }}>Privacy Policy</a>
        <a href="/terms" className="hover:underline" style={{ color: "var(--accent-cyan)" }}>Terms of Service</a>
        <a href="/" className="hover:underline" style={{ color: "var(--text-faint)" }}>Home</a>
      </div>
    </footer>
  );
}
