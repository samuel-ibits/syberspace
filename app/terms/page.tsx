import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Logo from "@/components/Logo";
import CustomIcon from "@/components/CustomIcon";

export const metadata: Metadata = {
  title: "Terms of Service | Syberspace",
  description: "Terms and conditions governing the use of Syberspace AI services.",
};

const EFFECTIVE = "11 June 2025";
const COMPANY   = "Syberspace";
const EMAIL     = "syberspace247@gmail.com";
const PHONE     = "+234 815 151 9625";

export default function TermsOfService() {
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
          <div className="mb-12">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 theme-badge-cyan">Legal</div>
            <h1 className="text-4xl font-extrabold mb-3" style={{ color: "var(--text-primary)" }}>Terms of Service</h1>
            <p className="text-sm" style={{ color: "var(--text-faint)" }}>Effective date: {EFFECTIVE}</p>
          </div>

          <div className="space-y-10 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>

            <Section title="1. Acceptance of Terms">
              <p>By accessing our website, using our services, or entering into a service agreement with {COMPANY}, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use our services.</p>
              <p className="mt-3">These Terms apply to all visitors, clients, and users of {COMPANY}'s website and AI services.</p>
            </Section>

            <Section title="2. Description of Services">
              <p>{COMPANY} provides AI-as-a-Service solutions including:</p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside">
                <li>Process Automation — automating business workflows and repetitive tasks</li>
                <li>Web Scraping — extracting structured data from websites at scale</li>
                <li>Data Cleaning — deduplication, standardisation, and enrichment of datasets</li>
                <li>AI Bots — custom chatbots and virtual assistants for business use</li>
                <li>Data Analysis — dashboards, forecasting, and business intelligence</li>
                <li>AI Consultation — audits, roadmaps, and strategic advisory</li>
              </ul>
              <p className="mt-3">Specific deliverables, timelines, and pricing for each engagement are defined in a separate Service Agreement or Statement of Work ("SOW").</p>
            </Section>

            <Section title="3. Eligibility">
              <p>You must be at least 18 years old and have the legal authority to enter into a binding agreement on behalf of yourself or your organisation to use our services. By using our services, you represent and warrant that you meet these requirements.</p>
            </Section>

            <Section title="4. Client Responsibilities">
              <p>As a client, you agree to:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>Provide accurate and complete information necessary for us to deliver services.</li>
                <li>Ensure you have the legal right to share any data, credentials, or system access provided to us.</li>
                <li>Obtain all necessary consents before sharing third-party personal data with us.</li>
                <li>Use deliverables only for lawful purposes and in compliance with applicable laws.</li>
                <li>Not use our services to develop competing products or services.</li>
                <li>Pay invoices within the agreed payment terms.</li>
              </ul>
            </Section>

            <Section title="5. Payments & Pricing">
              <ul className="space-y-2 list-disc list-inside">
                <li>Subscription plans are billed monthly or annually as selected at signup.</li>
                <li>All prices are in Nigerian Naira (₦) unless otherwise stated.</li>
                <li>Invoices are due within 7 days of issue unless agreed otherwise in the SOW.</li>
                <li>Late payments may attract a 2% monthly surcharge.</li>
                <li>We reserve the right to suspend services for accounts with outstanding invoices exceeding 14 days.</li>
                <li>All payments are non-refundable unless stated otherwise in the SOW or required by law.</li>
                <li>Pricing may be updated with 30 days' written notice to active clients.</li>
              </ul>
            </Section>

            <Section title="6. Free Trial">
              <p>Where a free trial is offered, it applies to the first 30 days of a new subscription. Only one free trial is permitted per business entity. We reserve the right to end or modify free trial terms at any time.</p>
            </Section>

            <Section title="7. Intellectual Property">
              <p><strong style={{ color: "var(--text-primary)" }}>Client data:</strong> You retain full ownership of all data, systems, and materials you provide to us. We do not claim any ownership over your data.</p>
              <p className="mt-3"><strong style={{ color: "var(--text-primary)" }}>Deliverables:</strong> Upon full payment, intellectual property rights in custom deliverables developed specifically for you transfer to you, as set out in the SOW.</p>
              <p className="mt-3"><strong style={{ color: "var(--text-primary)" }}>Our IP:</strong> Our proprietary tools, frameworks, methodologies, and platform remain the intellectual property of {COMPANY}. Nothing in these Terms grants you a licence to our underlying technology beyond what is necessary to use the delivered services.</p>
            </Section>

            <Section title="8. Confidentiality">
              <p>Both parties agree to keep confidential all non-public information received from the other party in connection with the services. This obligation survives termination of the agreement for a period of 3 years.</p>
              <p className="mt-3">We will sign a Non-Disclosure Agreement (NDA) upon request before any project begins.</p>
            </Section>

            <Section title="9. Data Processing">
              <p>Where we process personal data on your behalf as part of delivering services, we act as a data processor and you as the data controller. Our processing activities are governed by our Privacy Policy and any applicable Data Processing Agreement.</p>
              <p className="mt-3">You are responsible for ensuring your use of our services complies with the Nigeria Data Protection Act (NDPA) 2023 and any other applicable data protection laws.</p>
            </Section>

            <Section title="10. Warranties & Representations">
              <p>{COMPANY} warrants that:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>Services will be performed with reasonable skill and care.</li>
                <li>We will promptly notify you of any material issues affecting delivery.</li>
              </ul>
              <p className="mt-3">We do not warrant that our services will be uninterrupted, error-free, or that specific business outcomes (e.g. revenue growth, cost savings) will be achieved. ROI projections provided are estimates based on reasonable assumptions and are not guarantees.</p>
            </Section>

            <Section title="11. Limitation of Liability">
              <p>To the maximum extent permitted by law:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>{COMPANY}'s total liability for any claim arising from our services shall not exceed the total fees paid by you in the 3 months preceding the claim.</li>
                <li>We shall not be liable for indirect, consequential, special, or incidental damages, including loss of profits, loss of data, or business interruption.</li>
                <li>We are not liable for failures caused by factors outside our reasonable control (force majeure), including third-party API outages, internet disruptions, or changes in platform terms (e.g. changes to websites we scrape).</li>
              </ul>
            </Section>

            <Section title="12. Indemnification">
              <p>You agree to indemnify and hold harmless {COMPANY}, its team, and affiliates from any claims, losses, or damages arising from: (a) your breach of these Terms; (b) your unlawful use of our services; or (c) your violation of any third-party rights.</p>
            </Section>

            <Section title="13. Termination">
              <p><strong style={{ color: "var(--text-primary)" }}>By you:</strong> You may cancel a subscription at any time. Cancellation takes effect at the end of the current billing period. No pro-rata refunds are issued for unused time.</p>
              <p className="mt-3"><strong style={{ color: "var(--text-primary)" }}>By us:</strong> We may suspend or terminate your access if you breach these Terms, fail to pay, or misuse our services. We will provide reasonable notice where possible.</p>
              <p className="mt-3">Upon termination, your data will be returned or deleted within 30 days per our Privacy Policy.</p>
            </Section>

            <Section title="14. Acceptable Use">
              <p>You must not use our services to:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>Scrape or process data in violation of applicable laws or a website's terms of service.</li>
                <li>Build or deploy bots for spam, harassment, or deception.</li>
                <li>Process data to which you do not have lawful access or consent.</li>
                <li>Circumvent security measures or access systems without authorisation.</li>
                <li>Engage in any illegal, fraudulent, or harmful activity.</li>
              </ul>
              <p className="mt-3">Violation of this section may result in immediate termination without refund.</p>
            </Section>

            <Section title="15. Governing Law & Disputes">
              <p>These Terms are governed by the laws of the Federal Republic of Nigeria. Any dispute arising from or related to these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be referred to arbitration under the Arbitration and Conciliation Act (Nigeria).</p>
            </Section>

            <Section title="16. Changes to These Terms">
              <p>We may update these Terms from time to time. Material changes will be communicated by email or via a notice on our website at least 14 days before the changes take effect. Continued use of our services after the effective date constitutes acceptance of the updated Terms.</p>
            </Section>

            <Section title="17. Contact Us">
              <div className="mt-3 p-4 rounded-xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                <p><strong style={{ color: "var(--text-primary)" }}>{COMPANY}</strong></p>
                <p className="mt-2 flex items-center gap-2"><CustomIcon name="mail" className="h-4 w-4" /> <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "var(--accent-cyan)" }}>{EMAIL}</a></p>
                <p className="mt-2 flex items-center gap-2"><CustomIcon name="phone" className="h-4 w-4" /> {PHONE}</p>
                <p className="mt-2 flex items-center gap-2"><CustomIcon name="facebook" className="h-4 w-4" /> <a href="https://web.facebook.com/syberspacenetwork" className="underline" style={{ color: "var(--accent-cyan)" }}>facebook.com/syberspacenetwork</a></p>
              </div>
            </Section>

          </div>
        </main>

        <LegalFooter />
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

function LegalFooter() {
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
