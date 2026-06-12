/* Injects JSON-LD structured data for SEO + AI search engines */
export default function StructuredData() {
  const SITE = "https://syberspace.com.ng";

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "Syberspace",
    alternateName: "Syberspace AI",
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/icon.svg`,
      width: 220,
      height: 48,
    },
    description:
      "Syberspace is a Nigerian AI-as-a-Service company that integrates cutting-edge artificial intelligence into existing business systems — delivering process automation, web scraping, data cleaning, AI bots, data analysis, and strategic AI consultation.",
    foundingDate: "2019",
    areaServed: ["Nigeria", "Africa", "Global"],
    email: "syberspace247@gmail.com",
    telephone: "+2348151519625",
    sameAs: [
      "https://web.facebook.com/syberspacenetwork",
      "https://www.instagram.com/syberspace_solutions",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+2348151519625",
      contactType: "customer service",
      email: "syberspace247@gmail.com",
      availableLanguage: "English",
      contactOption: "TollFree",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "Syberspace",
    description: "AI-as-a-Service for businesses in Nigeria and beyond.",
    publisher: { "@id": `${SITE}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/#business`,
    name: "Syberspace",
    url: SITE,
    telephone: "+2348151519625",
    email: "syberspace247@gmail.com",
    description:
      "AI automation, chatbot development, data analysis, and AI consultation services for businesses across Nigeria and Africa.",
    priceRange: "₦₦",
    currenciesAccepted: "NGN",
    openingHours: "Mo-Fr 09:00-18:00",
    areaServed: { "@type": "Country", name: "Nigeria" },
    sameAs: [
      "https://web.facebook.com/syberspacenetwork",
      "https://www.instagram.com/syberspace_solutions",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Process Automation",
            description:
              "Automate repetitive business workflows — data entry, approvals, reporting, notifications — using AI and RPA. Most pipelines go live in 5–10 business days.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Scraping",
            description:
              "Extract structured data from any website at scale. Price monitoring, lead generation, competitor intelligence — delivered clean and on schedule.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Data Cleaning",
            description:
              "Deduplicate, standardise, enrich, and validate your datasets using AI. Turn messy data into reliable, analysis-ready information.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Bots",
            description:
              "Custom AI chatbots and virtual assistants for customer support, sales, bookings, and internal workflows — available 24/7.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Data Analysis",
            description:
              "Business intelligence dashboards, forecasting models, and actionable insights from your data. Uncover what's driving growth and what's holding it back.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Consultation",
            description:
              "Free 30-minute AI strategy session. We audit your operations and deliver a clear roadmap of where AI can save time, cut costs, or unlock revenue.",
          },
        },
      ],
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I need to rebuild my existing systems to use Syberspace?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. That's our core promise. Syberspace integrates AI directly into your existing applications, databases, and workflows. We work with what you have — no rebuilding required.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to see results from AI automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most clients see measurable impact within the first 2 weeks of deployment. Full automation pipelines typically go live within 5–10 business days.",
        },
      },
      {
        "@type": "Question",
        name: "What industries does Syberspace serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Syberspace works across finance, retail, logistics, healthcare, real estate, and more. AI automation applies to any business with repetitive processes or data.",
        },
      },
      {
        "@type": "Question",
        name: "Is my business data secure with Syberspace?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Syberspace uses enterprise-grade encryption, signs NDAs before any project begins, and never shares client data. Your data stays yours — always.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get started with Syberspace AI services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Book a free 30-minute consultation via the AI chat on our website, Google Calendar, email at syberspace247@gmail.com, or call +234 815 151 9625. We'll map out the best AI services for your business within 24 hours.",
        },
      },
      {
        "@type": "Question",
        name: "What does Syberspace's AI consultation include?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The free consultation is a 30-minute session where we audit your current operations and deliver a clear AI roadmap — identifying where automation can save time, cut costs, or unlock new revenue streams.",
        },
      },
      {
        "@type": "Question",
        name: "How much do Syberspace AI services cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Syberspace offers three plans: Starter (₦150,000/month) for small businesses, Growth (₦350,000/month) for scaling companies, and Enterprise (custom pricing) for large organisations. All plans include a free 30-day trial.",
        },
      },
      {
        "@type": "Question",
        name: "Does Syberspace work with businesses outside Nigeria?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. While Syberspace is headquartered in Nigeria, we work with businesses across Africa and globally. Our AI services are delivered remotely.",
        },
      },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    ],
  };

  const schemas = [organization, website, localBusiness, faqPage, breadcrumb];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
