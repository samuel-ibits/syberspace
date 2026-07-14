import type { Metadata } from "next";
import Link from "next/link";
import CustomIcon, { type CustomIconName } from "@/components/CustomIcon";
import { SITE_URL } from "@/lib/service-pages";

const url = `${SITE_URL}/trust`;

export const metadata: Metadata = {
  title: "Trust, Security, and AI Governance",
  description:
    "How Syberspace protects business data while implementing AI customer support, omni-platform automation, lead capture, and workflow automation for African businesses.",
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: "Trust, Security, and AI Governance | Syberspace",
    description:
      "Syberspace trust principles for AI implementation, data handling, human oversight, encoded session storage, and client ownership.",
    url,
    type: "website",
  },
};

const principles = [
  {
    title: "Client data ownership",
    text: "Your business data remains yours. Syberspace uses client data only for the agreed setup, automation, support, and improvement scope.",
    icon: "security" as CustomIconName,
  },
  {
    title: "Human oversight",
    text: "AI support flows can hand over to a human agent through the chat monitor, messaging channels, email, SMS, CRM, or phone when a customer needs direct attention.",
    icon: "handshake" as CustomIconName,
  },
  {
    title: "Encoded local sessions",
    text: "Chat sessions can be saved in encoded local storage so customer history survives reloads while reducing plain-text exposure in the browser.",
    icon: "data" as CustomIconName,
  },
  {
    title: "Practical access control",
    text: "The chat monitor is protected by authentication and is blocked from indexing so private customer sessions are not exposed to search engines.",
    icon: "tools" as CustomIconName,
  },
  {
    title: "Focused data collection",
    text: "Lead capture flows ask for the details needed to serve the customer: name, contact, service interest, intent, and message context.",
    icon: "target" as CustomIconName,
  },
  {
    title: "Clear escalation paths",
    text: "Important handoffs can trigger email notifications, messaging follow-up, CRM updates, or agent replies inside the monitor.",
    icon: "message" as CustomIconName,
  },
];

const checklist = [
  "HTTPS-first deployment",
  "Authenticated chat monitor",
  "Robots blocked for private monitor pages",
  "Encoded local chat/session storage",
  "Client data ownership",
  "Human handoff for sensitive issues",
  "Business-specific AI training scope",
  "Ongoing review and improvement",
];

export default function TrustPage() {
  const trustSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: "Syberspace Trust, Security, and AI Governance",
    url,
    description: metadata.description,
    inLanguage: "en-NG",
    provider: { "@id": `${SITE_URL}/#organization` },
    about: ["AI governance", "data security", "customer support automation", "chat monitor security"],
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(trustSchema) }} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: "var(--accent-cyan)" }}>
          <CustomIcon name="arrow-right" className="h-4 w-4 rotate-180" />
          Back to home
        </Link>

        <div className="mt-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>
            Trust and AI governance
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Practical AI security for African businesses
          </h1>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Syberspace helps businesses adopt AI without losing control of customer data, support conversations, or operational workflows. Our approach is simple: collect only what is useful, protect access, keep humans in the loop, and make ownership clear.
          </p>
        </div>
      </section>

      <section className="border-y py-16" style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {principles.map(item => (
            <article key={item.title} className="rounded-2xl p-6" style={{ background: "var(--bg-base)", border: "1px solid var(--border)" }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "var(--badge-bg)", border: "1px solid var(--badge-border)", color: "var(--accent-cyan)" }}>
                <CustomIcon name={item.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl font-bold">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
        <div>
          <h2 className="text-3xl font-bold">What this means in practice</h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Syberspace is not presenting itself as a global compliance platform. The trust promise is more practical: implement AI carefully, preserve customer context, prevent private monitor pages from being indexed, and keep the business in control of customer handoffs.
          </p>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            For regulated or enterprise projects, we define the data scope, access needs, retention expectations, and escalation rules before deployment.
          </p>
        </div>
        <aside className="rounded-2xl p-6" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
          <h2 className="text-xl font-bold">Trust checklist</h2>
          <ul className="mt-5 space-y-3">
            {checklist.map(item => (
              <li key={item} className="flex gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                <CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--accent-cyan)" }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}
