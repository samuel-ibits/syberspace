import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CustomIcon from "@/components/CustomIcon";
import { SERVICE_PAGES, SITE_URL } from "@/lib/service-pages";
import { getSeoPage, SEO_LANDING_PAGES } from "@/lib/seo-pages";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return SEO_LANDING_PAGES.map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) return { title: "Page Not Found" };

  const url = `${SITE_URL}/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: url,
    },
    keywords: [
      page.primaryKeyword,
      "AI customer support Africa",
      "omni-platform automation Africa",
      "omnichannel AI support Africa",
      "lead capture automation",
      "workflow automation Africa",
      "Syberspace",
    ],
    openGraph: {
      title: `${page.metaTitle} | Syberspace`,
      description: page.metaDescription,
      url,
      type: "website",
      siteName: "Syberspace",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | Syberspace`,
      description: page.metaDescription,
    },
  };
}

export default async function SeoLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) notFound();

  const url = `${SITE_URL}/${page.slug}`;
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: page.metaTitle,
    url,
    description: page.metaDescription,
    inLanguage: "en-NG",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    provider: { "@id": `${SITE_URL}/#organization` },
    about: page.primaryKeyword,
    audience: {
      "@type": "Audience",
      audienceType: page.audience,
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: page.eyebrow, item: url },
    ],
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      {[webpageSchema, faqSchema, breadcrumbSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: "var(--accent-cyan)" }}>
          <CustomIcon name="arrow-right" className="h-4 w-4 rotate-180" />
          Back to home
        </Link>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>
              {page.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {page.intro}
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
                href="/compare/syberspace-vs-zendesk"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold"
                style={{ border: "1px solid var(--border-strong)", color: "var(--text-primary)" }}
              >
                Compare with Zendesk
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl p-6" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <h2 className="text-lg font-bold">Best for</h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {page.audience}
            </p>
            <div className="mt-6 space-y-3">
              {page.outcomes.slice(0, 4).map(outcome => (
                <div key={outcome} className="flex gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                  <CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--accent-cyan)" }} />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y py-16" style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {page.outcomes.map(outcome => (
              <article key={outcome} className="rounded-2xl p-5" style={{ background: "var(--bg-base)", border: "1px solid var(--border)" }}>
                <CustomIcon name="check" className="h-5 w-5" style={{ color: "var(--accent-cyan)" }} />
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {outcome}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {page.sections.map(section => (
            <article key={section.heading} className="rounded-2xl p-6" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
              <h2 className="text-2xl font-bold">{section.heading}</h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {section.body}
              </p>
              <ul className="mt-5 space-y-3">
                {section.bullets.map(bullet => (
                  <li key={bullet} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full" style={{ background: "var(--accent-cyan)" }} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Questions</h2>
        <div className="mt-6 space-y-4">
          {page.faqs.map(faq => (
            <details key={faq.question} className="rounded-2xl p-5" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
              <summary className="cursor-pointer font-semibold">{faq.question}</summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-8" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
          <h2 className="text-2xl font-bold">Related Syberspace services</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {SERVICE_PAGES.slice(0, 3).map(service => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-xl p-4"
                style={{ background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              >
                <span className="text-sm font-semibold">{service.name}</span>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {service.metaDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
