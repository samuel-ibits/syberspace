export const SITE_URL = "https://syberspace.com.ng";

export type ServicePage = {
  slug: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  primaryKeyword: string;
  audience: string;
  outcomes: string[];
  useCases: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "ai-automation-services",
    name: "AI Automation Services",
    shortName: "Process Automation",
    metaTitle: "AI Automation Services for Nigerian Businesses",
    metaDescription:
      "Automate repetitive business tasks, reports, approvals, customer follow-ups, and internal workflows with Syberspace AI automation services in Nigeria.",
    heroTitle: "AI automation services for business owners who want more output without more staff",
    heroDescription:
      "Syberspace builds practical AI automations that plug into your existing tools, websites, spreadsheets, CRMs, and operations so your team can save time and respond faster.",
    primaryKeyword: "AI automation services Nigeria",
    audience: "Business owners, operations managers, agencies, founders, and website owners in Nigeria and across Africa.",
    outcomes: [
      "Automate repetitive admin, reporting, and follow-up tasks.",
      "Connect your website, WhatsApp, email, CRM, Google Sheets, and payment tools.",
      "Reduce manual errors with monitored workflows and alerting.",
      "Launch useful automations in days or weeks, not months.",
    ],
    useCases: [
      "Lead capture from a website into a CRM or Google Sheet.",
      "Automatic WhatsApp or email follow-up after form submissions.",
      "Daily sales, inventory, finance, or operations reports.",
      "Approval workflows for internal teams.",
    ],
    faqs: [
      {
        question: "Do I need to replace my current software?",
        answer:
          "No. Syberspace focuses on integrating AI automation into your existing website, CRM, spreadsheets, messaging channels, and internal workflows.",
      },
      {
        question: "How quickly can an AI automation go live?",
        answer:
          "Simple automations can often go live within 5 to 10 business days after discovery. Larger workflows are delivered in clear phases.",
      },
    ],
  },
  {
    slug: "ai-chatbots-for-websites",
    name: "AI Chatbots for Websites",
    shortName: "AI Bots",
    metaTitle: "AI Chatbots for Business Websites in Nigeria",
    metaDescription:
      "Add an AI chatbot to your business website for customer support, lead qualification, bookings, WhatsApp handoff, and 24/7 sales assistance.",
    heroTitle: "AI chatbots for websites that turn visitors into qualified leads",
    heroDescription:
      "Give your website a 24/7 AI assistant that answers customer questions, captures leads, books consultations, and hands serious buyers to a human agent.",
    primaryKeyword: "AI chatbot for website Nigeria",
    audience: "Website owners, ecommerce stores, service businesses, agencies, schools, clinics, real estate firms, and SaaS founders.",
    outcomes: [
      "Answer common visitor questions instantly.",
      "Qualify website leads before they reach your team.",
      "Capture names, phone numbers, emails, and buyer intent.",
      "Escalate high-value conversations to WhatsApp or a live monitor.",
    ],
    useCases: [
      "Customer support chatbot for a company website.",
      "Sales assistant for pricing, services, and product questions.",
      "Booking assistant that collects consultation details.",
      "Website lead capture with WhatsApp human handoff.",
    ],
    faqs: [
      {
        question: "Can the chatbot learn my business information?",
        answer:
          "Yes. We train it on your services, pricing, FAQs, policies, and preferred handoff process so responses match your business.",
      },
      {
        question: "Can I talk to users when the AI hands off?",
        answer:
          "Yes. Syberspace can route human-agent requests to WhatsApp and to a local chat monitor for live session replies.",
      },
    ],
  },
  {
    slug: "web-scraping-services",
    name: "Web Scraping Services",
    shortName: "Web Scraping",
    metaTitle: "Web Scraping Services for Business Data in Nigeria",
    metaDescription:
      "Get clean competitor prices, market data, leads, directories, and website data with reliable web scraping services from Syberspace.",
    heroTitle: "Web scraping services that turn public websites into useful business data",
    heroDescription:
      "Syberspace extracts, cleans, and delivers structured web data for pricing intelligence, lead generation, research, directories, and market monitoring.",
    primaryKeyword: "web scraping services Nigeria",
    audience: "Business owners, website owners, agencies, ecommerce teams, analysts, and founders who need reliable public web data.",
    outcomes: [
      "Collect structured data from public websites on a schedule.",
      "Monitor competitor prices, listings, products, or directories.",
      "Deliver clean CSV, JSON, Google Sheets, or database outputs.",
      "Handle pagination, JavaScript-rendered pages, and changing layouts.",
    ],
    useCases: [
      "Competitor price monitoring for ecommerce businesses.",
      "Lead generation from directories and marketplaces.",
      "Market research datasets for business decisions.",
      "Real estate, job, event, or product listing trackers.",
    ],
    faqs: [
      {
        question: "What formats can you deliver scraped data in?",
        answer:
          "We can deliver scraped data as CSV, JSON, Google Sheets, Excel files, dashboards, or directly into your database or CRM.",
      },
      {
        question: "Can the scraping run automatically?",
        answer:
          "Yes. We can schedule scraping jobs hourly, daily, weekly, or at the cadence that makes sense for your business.",
      },
    ],
  },
  {
    slug: "data-cleaning-services",
    name: "Data Cleaning Services",
    shortName: "Data Cleaning",
    metaTitle: "Data Cleaning Services for Business Databases",
    metaDescription:
      "Clean messy spreadsheets, customer lists, CRM exports, product catalogs, and operational data with AI-powered data cleaning services.",
    heroTitle: "Data cleaning services for businesses that need reliable records",
    heroDescription:
      "Syberspace fixes duplicates, inconsistent formats, missing fields, invalid contacts, and messy spreadsheets so your business data is ready for reporting and automation.",
    primaryKeyword: "data cleaning services Nigeria",
    audience: "Business owners, website owners, analysts, sales teams, ecommerce teams, and operations teams with messy data.",
    outcomes: [
      "Remove duplicates and standardize records.",
      "Validate emails, phone numbers, product fields, and customer data.",
      "Prepare data for dashboards, CRM migration, automation, or AI tools.",
      "Improve decision-making with trustworthy datasets.",
    ],
    useCases: [
      "Customer list cleanup before a campaign.",
      "CRM cleanup and field standardization.",
      "Product catalog cleanup for ecommerce websites.",
      "Spreadsheet cleanup for reporting and analysis.",
    ],
    faqs: [
      {
        question: "Can you clean data from Excel or Google Sheets?",
        answer:
          "Yes. We work with Excel, CSV, Google Sheets, CRM exports, databases, and custom files.",
      },
      {
        question: "Will my business data remain private?",
        answer:
          "Yes. Client data stays private and is handled only for the agreed project scope.",
      },
    ],
  },
  {
    slug: "data-analysis-dashboards",
    name: "Data Analysis and Dashboards",
    shortName: "Data Analysis",
    metaTitle: "Data Analysis and Dashboard Services in Nigeria",
    metaDescription:
      "Turn business data into dashboards, reports, forecasts, and practical insights with Syberspace data analysis services.",
    heroTitle: "Data analysis services that show business owners what to do next",
    heroDescription:
      "Syberspace turns raw sales, marketing, operations, finance, and website data into dashboards and insights your team can act on.",
    primaryKeyword: "data analysis services Nigeria",
    audience: "Business owners, website owners, finance teams, marketing teams, operations leads, and founders.",
    outcomes: [
      "Build dashboards that track important business metrics.",
      "Find trends, anomalies, and growth opportunities.",
      "Create automated reports for leadership and teams.",
      "Connect data from websites, spreadsheets, sales channels, and CRMs.",
    ],
    useCases: [
      "Sales and revenue dashboards.",
      "Website and campaign performance reporting.",
      "Inventory, operations, or finance analytics.",
      "Forecasting and anomaly detection.",
    ],
    faqs: [
      {
        question: "Can you connect website analytics and business data?",
        answer:
          "Yes. We can combine website analytics, sales records, CRM data, spreadsheets, and operational data into one reporting flow.",
      },
      {
        question: "Do I need a data team?",
        answer:
          "No. Syberspace handles the setup, reporting logic, and dashboard delivery, then trains your team to use the outputs.",
      },
    ],
  },
  {
    slug: "ai-consulting-services",
    name: "AI Consulting Services",
    shortName: "AI Consultation",
    metaTitle: "AI Consulting Services for Nigerian Businesses",
    metaDescription:
      "Book an AI audit to find the best automation, chatbot, data, and website AI opportunities for your business.",
    heroTitle: "AI consulting services that show where automation will actually pay off",
    heroDescription:
      "Syberspace audits your workflows, website, customer journey, and data to build a practical AI roadmap with clear priorities and expected impact.",
    primaryKeyword: "AI consulting services Nigeria",
    audience: "Business owners, website owners, founders, executives, agencies, and teams exploring AI adoption.",
    outcomes: [
      "Identify high-ROI automation and AI opportunities.",
      "Prioritize chatbot, website, data, and workflow improvements.",
      "Estimate effort, timeline, and expected business impact.",
      "Leave with a clear implementation roadmap.",
    ],
    useCases: [
      "AI readiness audit for a growing business.",
      "Website conversion and chatbot opportunity review.",
      "Automation roadmap for internal operations.",
      "Data and reporting strategy for decision-making.",
    ],
    faqs: [
      {
        question: "What happens during the AI consultation?",
        answer:
          "We review your business goals, website, tools, customer journey, and repetitive workflows, then recommend the highest-impact AI opportunities.",
      },
      {
        question: "Is the consultation only for technical teams?",
        answer:
          "No. The consultation is designed for business owners and decision-makers. We explain the options in practical business language.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return SERVICE_PAGES.find(service => service.slug === slug);
}
