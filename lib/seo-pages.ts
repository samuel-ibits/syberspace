export type SeoPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  primaryKeyword: string;
  audience: string;
  outcomes: string[];
  sections: Array<{
    heading: string;
    body: string;
    bullets: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const SEO_LANDING_PAGES: SeoPage[] = [
  {
    slug: "zendesk-alternative-nigeria",
    title: "Zendesk alternative for Nigerian businesses that need hands-on AI support",
    metaTitle: "Zendesk Alternative in Nigeria for AI Customer Support",
    metaDescription:
      "Syberspace is a Zendesk alternative for Nigerian and African businesses that need omni-platform automation, AI support, lead capture, and done-for-you workflow automation.",
    eyebrow: "Zendesk alternative in Nigeria",
    intro:
      "Zendesk is powerful enterprise software. Syberspace is different: we implement AI customer support, omni-platform automation, lead capture, and workflow automation around the tools your business already uses.",
    primaryKeyword: "Zendesk alternative Nigeria",
    audience:
      "Nigerian SMEs, African service businesses, ecommerce teams, schools, clinics, real estate firms, agencies, and website owners who want AI customer support without managing a complex helpdesk rollout.",
    outcomes: [
      "Launch AI customer support without hiring an internal implementation team.",
      "Connect website leads, messaging conversations, email alerts, SMS follow-up, forms, CRMs, and human-agent replies.",
      "Keep your current tools while Syberspace handles setup, training, and support.",
      "Get local context for Nigerian and African customer journeys.",
    ],
    sections: [
      {
        heading: "Why businesses choose Syberspace instead of a large helpdesk suite",
        body:
          "Many African businesses do not need a large support platform on day one. They need a practical system that answers customers, captures leads, escalates serious buyers, and saves chat history.",
        bullets: [
          "Done-for-you setup instead of self-serve configuration.",
          "Omni-platform support for markets where customers move between web chat, messaging apps, email, forms, and phone.",
          "Workflow automation beyond tickets, including reports, follow-ups, and lead routing.",
          "Human support from a local team that understands African business operations.",
        ],
      },
      {
        heading: "Where Zendesk is stronger",
        body:
          "Zendesk is better suited for large teams that need mature ticketing, global enterprise compliance, workforce management, and a broad marketplace.",
        bullets: [
          "Large contact centers with many agents and departments.",
          "Teams that already have internal admins for SaaS implementation.",
          "Organizations that need a global enterprise vendor ecosystem.",
        ],
      },
      {
        heading: "Where Syberspace can be the better fit",
        body:
          "Syberspace is built for teams that want AI customer support and workflow automation delivered as a business outcome, not another platform to configure.",
        bullets: [
          "Website owners who want more qualified leads.",
          "Teams that support customers across multiple digital channels.",
          "SMEs that need quick implementation and ongoing support.",
          "Businesses that want automation across support, sales, reporting, and operations.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Syberspace a full Zendesk replacement?",
        answer:
          "Syberspace is not trying to copy every Zendesk feature. It is a stronger fit when you need AI customer support, omni-platform automation, lead capture, and workflows implemented for your business.",
      },
      {
        question: "Can Syberspace work with Zendesk if we already use it?",
        answer:
          "Yes. Syberspace can build AI workflows around existing tools, including a helpdesk, website forms, messaging apps, email, SMS, Google Sheets, CRMs, and reporting systems.",
      },
    ],
  },
  {
    slug: "omni-platform-ai-chatbot-africa",
    title: "Omni-platform AI chatbot for Nigerian and African businesses",
    metaTitle: "Omni-Platform AI Chatbot for African Businesses",
    metaDescription:
      "Add an omni-platform AI chatbot that answers questions, captures leads, books appointments, and hands serious conversations to a human agent across web chat, messaging, email, and CRM channels.",
    eyebrow: "Omni-platform AI chatbot Africa",
    intro:
      "Syberspace builds omni-platform AI chatbots for businesses that receive customer questions, bookings, orders, and support requests across website chat, WhatsApp, Instagram DM, Facebook Messenger, email, SMS, and forms.",
    primaryKeyword: "omni-platform AI chatbot Africa",
    audience:
      "Clinics, ecommerce stores, schools, real estate firms, logistics teams, agencies, and local service businesses that support customers across multiple digital channels.",
    outcomes: [
      "Answer common customer questions instantly, 24/7.",
      "Capture name, phone number, email, request type, and buyer intent.",
      "Escalate serious conversations to a human agent.",
      "Send email notifications when a lead or support request needs attention.",
    ],
    sections: [
      {
        heading: "Built around how African customers actually move between channels",
        body:
          "Customers may start on a website, continue on a messaging app, reply by email, or request a callback. Syberspace designs the bot around that omni-platform behavior so support and sales feel natural.",
        bullets: [
          "FAQ responses trained on your business information.",
          "Lead qualification before a human joins.",
          "Booking, callback, and consultation request flows.",
          "Human handoff to the chat monitor or the best follow-up channel.",
        ],
      },
      {
        heading: "More than a basic autoresponder",
        body:
          "The chatbot can connect to website forms, saved sessions, email alerts, and internal workflows so every conversation becomes useful business data.",
        bullets: [
          "Saved chat history for follow-up.",
          "Session status for active, needs-agent, and closed conversations.",
          "Simple reporting on questions, leads, and handoffs.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can the bot hand over to a real person?",
        answer:
          "Yes. Syberspace can route human-agent requests to the authenticated chat monitor, email notifications, messaging channels, or your preferred CRM workflow.",
      },
      {
        question: "Can the chatbot be trained on my business?",
        answer:
          "Yes. It can be trained on your services, pricing, policies, FAQs, booking process, and preferred tone.",
      },
    ],
  },
  {
    slug: "ai-customer-support-automation-nigeria",
    title: "AI customer support automation for Nigerian businesses",
    metaTitle: "AI Customer Support Automation Nigeria",
    metaDescription:
      "Automate customer support with AI chatbots, human handoff, saved sessions, lead capture, email alerts, and workflow automation from Syberspace.",
    eyebrow: "AI customer support automation",
    intro:
      "Syberspace helps support teams reduce repetitive replies, respond faster, and keep customers moving from question to resolution.",
    primaryKeyword: "AI customer support automation Nigeria",
    audience:
      "Business owners, support teams, ecommerce stores, service companies, and website owners that want faster response times without adding more agents.",
    outcomes: [
      "Reduce repetitive customer questions.",
      "Route complex issues to a human agent.",
      "Keep chat history available after reloads.",
      "Measure common issues, lead intent, and response quality.",
    ],
    sections: [
      {
        heading: "Support that combines AI speed with human control",
        body:
          "The AI handles common questions while your team keeps control of sensitive or high-value conversations.",
        bullets: [
          "AI triage for customer questions.",
          "Human takeover through the chat monitor.",
          "Session history saved for context.",
          "Email notifications for urgent handoffs.",
        ],
      },
      {
        heading: "Designed for websites, messaging apps, email, and everyday business tools",
        body:
          "Syberspace connects customer support to the channels your business already uses instead of forcing a full software migration.",
        bullets: [
          "Website chatbot support.",
          "Messaging, email, SMS, and CRM escalation.",
          "Lead capture from support conversations.",
          "Workflow automation for next steps.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will AI replace my support team?",
        answer:
          "No. The goal is to reduce repetitive work so your team can focus on complex, sensitive, and high-value conversations.",
      },
      {
        question: "Can support history survive page reloads?",
        answer:
          "Yes. Syberspace can save session history locally and encode stored chat data so conversations do not wipe on reload.",
      },
    ],
  },
  {
    slug: "ai-chatbot-for-website-owners",
    title: "AI chatbot for website owners who want more qualified leads",
    metaTitle: "AI Chatbot for Website Owners",
    metaDescription:
      "Turn website visitors into qualified leads with an AI chatbot that answers questions, captures contact details, books calls, and escalates to the right follow-up channel.",
    eyebrow: "AI chatbot for website owners",
    intro:
      "Most websites only explain what a business does. Syberspace helps your website respond, qualify visitors, collect details, and move serious buyers to the next step.",
    primaryKeyword: "AI chatbot for website owners",
    audience:
      "Website owners, agencies, consultants, schools, clinics, ecommerce stores, real estate firms, and service businesses.",
    outcomes: [
      "Capture more leads from existing website traffic.",
      "Answer service, pricing, and booking questions instantly.",
      "Send qualified conversations to email, CRM, messaging channels, or the chat monitor.",
      "Improve conversion without rebuilding the website.",
    ],
    sections: [
      {
        heading: "Built to convert visitors, not just answer FAQs",
        body:
          "The chatbot is designed around buyer intent, lead qualification, and next-step routing.",
        bullets: [
          "Ask qualifying questions before a handoff.",
          "Collect name, email, phone, and service interest.",
          "Suggest booking, email, messaging, CRM, or human-agent follow-up based on intent.",
          "Track common questions for future page improvements.",
        ],
      },
      {
        heading: "No rebuild required",
        body:
          "Syberspace can add the AI chatbot and lead workflows to the website you already have.",
        bullets: [
          "Works with modern websites and custom builds.",
          "Can connect with forms, calendars, email, and spreadsheets.",
          "Includes setup, testing, and handover.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can this work on my existing website?",
        answer:
          "Yes. Syberspace focuses on adding AI to your existing site and workflows instead of forcing a rebuild.",
      },
      {
        question: "Can the bot book calls?",
        answer:
          "Yes. It can guide visitors to a booking link or collect details for your team to follow up.",
      },
    ],
  },
  {
    slug: "customer-support-automation-smes",
    title: "Customer support automation for SMEs in Africa",
    metaTitle: "Customer Support Automation for SMEs in Africa",
    metaDescription:
      "Automate customer support for SMEs with AI replies, omni-platform handoff, lead capture, saved chat sessions, and workflow automation.",
    eyebrow: "Customer support automation for SMEs",
    intro:
      "Syberspace helps small and medium businesses deliver faster support without building a large support department.",
    primaryKeyword: "customer support automation SMEs",
    audience:
      "Growing SMEs in Nigeria and Africa that need better response times, more organized follow-up, and practical automation.",
    outcomes: [
      "Respond faster to common customer questions.",
      "Reduce missed leads and forgotten follow-ups.",
      "Give support teams a shared place to monitor conversations.",
      "Automate simple workflows after a customer request.",
    ],
    sections: [
      {
        heading: "A practical support layer for growing teams",
        body:
          "Syberspace gives SMEs the core support automation they need before they are ready for a large enterprise support stack.",
        bullets: [
          "AI chatbot for first-line replies.",
          "Human monitor for active sessions.",
          "Email, messaging, SMS, and CRM escalation.",
          "Lead and support history saved for follow-up.",
        ],
      },
      {
        heading: "Built to grow with the business",
        body:
          "Start with support automation, then add reporting, data cleanup, CRM workflows, and operations automation as the business matures.",
        bullets: [
          "Starter workflows for immediate relief.",
          "Growth workflows for multi-channel operations.",
          "Enterprise workflows for custom integrations and SLA needs.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this only for large companies?",
        answer:
          "No. Syberspace is especially useful for SMEs that need support automation but do not have a large technical team.",
      },
      {
        question: "Can we start small?",
        answer:
          "Yes. You can begin with one chatbot or workflow, then expand as the value becomes clear.",
      },
    ],
  },
  {
    slug: "ai-chat-monitor-for-businesses",
    title: "AI chat monitor for live customer conversations",
    metaTitle: "AI Chat Monitor for Business Websites",
    metaDescription:
      "Use Syberspace AI chat monitor to view customer sessions, reply as a human agent, save chat history, and escalate important conversations.",
    eyebrow: "AI chat monitor",
    intro:
      "The Syberspace chat monitor gives businesses a practical way to supervise AI chatbot conversations and step in when a human response is needed.",
    primaryKeyword: "AI chat monitor for business",
    audience:
      "Website owners, support teams, sales teams, schools, clinics, agencies, and SMEs that want AI support with human oversight.",
    outcomes: [
      "View different user sessions from one monitor.",
      "Reply as a human agent when the bot requests handoff.",
      "Save encoded session history so chats do not disappear on reload.",
      "Receive email notifications for important customer actions.",
    ],
    sections: [
      {
        heading: "Human takeover without losing context",
        body:
          "When the AI detects that a user needs a person, your team can enter the conversation with the previous chat history visible.",
        bullets: [
          "Authenticated monitor access.",
          "Session list for multiple visitors.",
          "Needs-agent status for handoff conversations.",
          "Agent replies saved back into the customer session.",
        ],
      },
      {
        heading: "Built for practical business follow-up",
        body:
          "The monitor is designed for small teams that need a simple, local dashboard before adopting a full contact center suite.",
        bullets: [
          "Encoded local chat storage.",
          "Lead capture fields.",
          "Email, messaging, SMS, and CRM escalation options.",
          "Session history that survives reloads.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the chat monitor public?",
        answer:
          "No. The monitor has authentication and is intended for the business team, while customers continue chatting from the website bot.",
      },
      {
        question: "Can the monitor support different sessions?",
        answer:
          "Yes. It is designed so a business can see and reply to different customer sessions from one place.",
      },
    ],
  },
];

export function getSeoPage(slug: string) {
  return SEO_LANDING_PAGES.find(page => page.slug === slug);
}
