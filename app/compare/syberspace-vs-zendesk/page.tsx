import type { Metadata } from "next";
import Link from "next/link";
import CustomIcon from "@/components/CustomIcon";
import { SITE_URL } from "@/lib/service-pages";

const url = `${SITE_URL}/compare/syberspace-vs-zendesk`;

export const metadata: Metadata = {
  title: "Syberspace vs Zendesk for Nigerian Businesses",
  description:
    "Compare Syberspace and Zendesk for Nigerian and African businesses choosing AI customer support, omni-platform automation, lead capture, and workflow automation.",
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: "Syberspace vs Zendesk for Nigerian Businesses",
    description:
      "A practical comparison for businesses choosing between enterprise helpdesk software and done-for-you AI support automation.",
    url,
    type: "website",
  },
};

const rows = [
  {
    area: "Best fit",
    syberspace: "African SMEs and website owners that want AI customer support implemented for them.",
    zendesk: "Larger support teams that need a mature global helpdesk and contact-center suite.",
  },
  {
    area: "Setup model",
    syberspace: "Done-for-you implementation, training, monitoring, and ongoing support.",
    zendesk: "Self-serve or partner-led SaaS setup with more configuration responsibility.",
  },
  {
    area: "Omni-platform support",
    syberspace: "Built around web chat, messaging apps, email, SMS, forms, CRMs, local customer behavior, and fast human escalation.",
    zendesk: "Strong omnichannel tools, but often requires more setup and platform configuration.",
  },
  {
    area: "Lead capture",
    syberspace: "Website chatbot flows capture names, contact details, service interest, and buyer intent.",
    zendesk: "Strong support workflows, but sales-lead capture usually depends on configuration and integrations.",
  },
  {
    area: "Workflow automation",
    syberspace: "Automates support, follow-ups, reports, spreadsheets, alerts, and internal operations.",
    zendesk: "Deep customer-service automation inside a large support ecosystem.",
  },
  {
    area: "Local context",
    syberspace: "Nigerian and African market focus, local support, and practical setup for SMEs.",
    zendesk: "Global platform with broad enterprise adoption.",
  },
];

const chooseSyberspace = [
  "You want AI customer support and omni-platform automation set up for you.",
  "Your website needs to capture, qualify, and route more leads.",
  "Your team needs a simple human chat monitor before a large helpdesk.",
  "You want workflow automation across support, sales, reporting, and operations.",
  "You prefer a local implementation partner for African business realities.",
];

const chooseZendesk = [
  "You already have a large support team and internal platform admins.",
  "You need a mature global helpdesk with advanced enterprise governance.",
  "You want a large marketplace of third-party apps and certified partners.",
  "Your organization has complex contact-center, workforce, and QA needs.",
];

export default function SyberspaceVsZendeskPage() {
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: "Syberspace vs Zendesk for Nigerian Businesses",
    url,
    description: metadata.description,
    inLanguage: "en-NG",
    about: ["Syberspace", "Zendesk", "AI customer support", "omni-platform automation", "Helpdesk software"],
    provider: { "@id": `${SITE_URL}/#organization` },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Syberspace better than Zendesk?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Syberspace can be a better fit for African SMEs and website owners that want AI customer support, omni-platform automation, lead capture, and workflow automation implemented for them. Zendesk is stronger for large teams that need a mature enterprise helpdesk suite.",
        },
      },
      {
        "@type": "Question",
        name: "Can Syberspace work with Zendesk?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Syberspace can build AI workflows around an existing helpdesk, website, messaging apps, email, SMS, forms, spreadsheets, CRM, or reporting process.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      {[comparisonSchema, faqSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: "var(--accent-cyan)" }}>
          <CustomIcon name="arrow-right" className="h-4 w-4 rotate-180" />
          Back to home
        </Link>

        <div className="mt-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>
            Syberspace vs Zendesk
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Syberspace vs Zendesk for Nigerian and African businesses
          </h1>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Zendesk is a powerful global customer service platform. Syberspace is a better-positioned option for African businesses that want AI customer support, omni-platform automation, lead capture, and workflow automation implemented around existing tools.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#booking"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--accent-cyan)", color: "#0a0f1e" }}
            >
              Book a free AI audit
              <CustomIcon name="arrow-right" className="h-4 w-4" />
            </Link>
            <Link
              href="/zendesk-alternative-nigeria"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold"
              style={{ border: "1px solid var(--border-strong)", color: "var(--text-primary)" }}
            >
              View Zendesk alternative page
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y py-16" style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border)" }}>
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_1fr]" style={{ background: "var(--bg-base)" }}>
              <div className="p-4 text-sm font-bold" style={{ borderBottom: "1px solid var(--border)" }}>Area</div>
              <div className="p-4 text-sm font-bold" style={{ borderBottom: "1px solid var(--border)" }}>Syberspace</div>
              <div className="p-4 text-sm font-bold" style={{ borderBottom: "1px solid var(--border)" }}>Zendesk</div>
              {rows.map(row => (
                <div key={row.area} className="contents">
                  <div className="p-4 text-sm font-semibold" style={{ borderTop: "1px solid var(--border)", color: "var(--text-primary)" }}>{row.area}</div>
                  <div className="p-4 text-sm leading-relaxed" style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}>{row.syberspace}</div>
                  <div className="p-4 text-sm leading-relaxed" style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}>{row.zendesk}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <DecisionCard title="Choose Syberspace when..." items={chooseSyberspace} accent="var(--accent-cyan)" />
        <DecisionCard title="Choose Zendesk when..." items={chooseZendesk} accent="var(--accent-violet)" />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-8" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
          <h2 className="text-3xl font-bold">The strongest Syberspace position</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Syberspace should not compete by pretending to be another global helpdesk suite. The stronger position is to be the omni-platform AI support and automation partner for African businesses that want outcomes, not software complexity.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {["Omni-platform customer support", "Website lead capture", "Workflow automation for SMEs"].map(item => (
              <div key={item} className="rounded-xl p-4 text-sm font-semibold" style={{ background: "var(--bg-base)", border: "1px solid var(--border)" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function DecisionCard({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  return (
    <article className="rounded-2xl p-6" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul className="mt-6 space-y-4">
        {items.map(item => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: accent }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
