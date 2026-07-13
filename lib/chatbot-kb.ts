/* ═══════════════════════════════════════════════════════
   SYBERSPACE — CHATBOT KNOWLEDGE BASE
   Syber is Syberspace's AI consultant chatbot.
   Contact: syberspace247@gmail.com | +234 808 626 9431 | WhatsApp handoff: +234 815 151 9625
   Facebook: https://web.facebook.com/syberspacenetwork
═══════════════════════════════════════════════════════ */

export type Intent =
  | "greeting"
  | "farewell"
  | "about"
  | "services_overview"
  | "service_automation"
  | "service_scraping"
  | "service_cleaning"
  | "service_bots"
  | "service_analysis"
  | "service_consultation"
  | "pricing"
  | "how_it_works"
  | "timeline"
  | "technologies"
  | "security"
  | "industries"
  | "support"
  | "contact"
  | "social"
  | "location"
  | "book_start"
  | "human_agent"
  | "thanks"
  | "unknown";

export type FlowStep =
  | "idle"
  | "book_name"
  | "book_email"
  | "book_service"
  | "book_time"
  | "book_confirm"
  | "human_name"
  | "human_contact"
  | "human_issue"
  | "human_confirm";

/* ── Intent detection ─────────────────────────────── */
export function detectIntent(input: string): Intent {
  const t = input.toLowerCase();

  // Greetings / farewells
  if (/^(hi|hey|hello|good\s*(morning|afternoon|evening)|howdy|sup|yo)\b/.test(t)) return "greeting";
  if (/\b(bye|goodbye|see\s*you|later|thanks.*bye|take\s*care)\b/.test(t)) return "farewell";
  if (/\bthank(s| you)\b/.test(t)) return "thanks";

  // Company
  if (/\b(who are you|what is syberspace|about (you|syberspace)|tell me about|your company|what do you do)\b/.test(t)) return "about";

  // Services
  if (/\b(automat|workflow|repetitive|manual\s*task|approval|trigger)\b/.test(t)) return "service_automation";
  if (/\b(scrap|crawl|extract\s*data|web\s*data|competitor\s*pric|lead\s*list|market\s*data)\b/.test(t)) return "service_scraping";
  if (/\b(clean|deduplic|dirty\s*data|messy\s*data|format|standardis|enrichment|data\s*quality)\b/.test(t)) return "service_cleaning";
  if (/\b(bot|chatbot|virtual\s*assist|ai\s*agent|customer\s*support\s*bot|whatsapp\s*bot)\b/.test(t)) return "service_bots";
  if (/\b(analys|dashboard|forecast|predict|insight|report|visuali|bi\b|business\s*intelligence)\b/.test(t)) return "service_analysis";
  if (/\b(consult|audit|roadmap|strategy|advic|where\s*do\s*i\s*start|not\s*sure|help\s*me\s*figure)\b/.test(t)) return "service_consultation";
  if (/\b(service|what\s*do\s*you\s*offer|capabilities|solutions|what\s*can\s*you\s*do)\b/.test(t)) return "services_overview";

  // Pricing
  if (/\b(pric|cost|how\s*much|fee|rate|plan|package|afford|budget|cheap|expensive)\b/.test(t)) return "pricing";

  // Process / timeline
  if (/\b(how\s*(does\s*it\s*work|do\s*you\s*work)|process|step|onboard|get\s*start)\b/.test(t)) return "how_it_works";
  if (/\b(how\s*long|timeline|delivery|when\s*will|turnaround|days|weeks)\b/.test(t)) return "timeline";

  // Tech / security
  if (/\b(tech(nolog|stack)|built\s*with|stack|language|framework|tool)\b/.test(t)) return "technologies";
  if (/\b(secur|safe|privacy|nda|data\s*protec|confidential|encrypt|gdpr)\b/.test(t)) return "security";

  // Industries
  if (/\b(industry|sector|finance|retail|health|logistic|ecommerce|real\s*estate|who\s*do\s*you\s*serve)\b/.test(t)) return "industries";

  // Contact / human
  if (/\b(email|call|phone|whatsapp|reach\s*you|contact\s*(you|us|team))\b/.test(t)) return "contact";
  if (/\b(facebook|social|follow)\b/.test(t)) return "social";
  if (/\b(location|office|address|where\s*are\s*you|nigeria|lagos|abuja)\b/.test(t)) return "location";

  // Actions
  if (/\b(book|schedule|appointment|calendly|meet|consultation|call\s*with\s*(you|team|someone))\b/.test(t)) return "book_start";
  if (/\b(human|real\s*person|agent|support|speak\s*(to|with)|talk\s*(to|with)|representative|rep\b|staff)\b/.test(t)) return "human_agent";

  return "unknown";
}

/* ── Knowledge base responses ─────────────────────── */
export const KB: Record<Intent, string | string[]> = {
  greeting: [
    "Hey there! 👋 I'm Syber, Syberspace's AI consultant. I'm here to help you explore how AI can transform your business. What's on your mind?",
    "Hello! Welcome to Syberspace. I'm Syber, your AI guide. Whether you're looking to automate processes, analyse data, or explore AI for your business — I've got you. Where shall we start?",
    "Hi! Great to have you here. I'm Syber — tell me about your business and I'll show you exactly how we can help.",
  ],

  farewell: "Thanks for chatting with us! If you ever want to explore what AI can do for your business, we're always here. Have a great day! 👋",

  thanks: "You're very welcome! Is there anything else I can help you with? 😊",

  about: `**Syberspace** is an AI-as-a-Service company on a mission to make enterprise-grade AI accessible to every business — without asking you to rebuild your existing systems.

We integrate AI directly into your current applications, workflows, and databases. Our clients span Lagos to the global market, across finance, retail, logistics, healthcare, and more.

**What makes us different:**
• No rebuilding required — we plug into what you have
• End-to-end delivery — strategy, build, and ongoing support
• Real ROI in weeks, not months
• Built by engineers who understand African business contexts

Want to know more about a specific service, or shall I show you our pricing?`,

  services_overview: `We offer **6 core AI services**, each designed to plug straight into your existing setup:

1. ⚙️ **Process Automation** — eliminate repetitive tasks & manual workflows
2. 🕷️ **Web Scraping** — extract competitor data, leads, or market intelligence at scale
3. 🧹 **Data Cleaning** — turn messy, inconsistent data into reliable assets
4. 🤖 **AI Bots** — 24/7 customer support, sales, and FAQ bots
5. 📊 **Data Analysis** — dashboards, forecasting & executive reports
6. 🧠 **AI Consultation** — audit, roadmap, and strategic advisory

Which one interests you most? Or would you like me to recommend the best fit for your business?`,

  service_automation: `**Process Automation** is one of our most impactful services.

We automate the repetitive, time-consuming tasks that drain your team — things like:
• Client onboarding & approvals
• Invoice generation and reconciliation
• Internal reporting (weekly, monthly, real-time)
• Data entry and form processing
• Email/notification triggers
• Multi-step workflow orchestration

**Real result:** One of our clients went from a 3-day onboarding process to 2 hours — and that now runs without human touch.

Clients typically save **100–300 hours per month** within the first 60 days.

Would you like to book a free automation audit for your business?`,

  service_scraping: `**Web Scraping** — we extract structured data from any website, at any scale.

Use cases we handle for clients:
• Competitor pricing — updated daily or hourly
• Lead lists and contact databases
• Real estate listings and market data
• Product catalogues and inventory monitoring
• News, sentiment, and trend tracking

We handle anti-bot measures, pagination, login walls, and JavaScript-rendered pages. Data is delivered in your preferred format (CSV, JSON, database, Google Sheets).

Scheduling? Daily, hourly, or real-time — your call.

Want to tell me what data you need and from where?`,

  service_cleaning: `**Data Cleaning** — we turn raw, messy data into reliable business assets.

Our AI-powered pipelines handle:
• Deduplication — remove thousands of duplicate records
• Standardisation — consistent formats for names, dates, phone numbers, addresses
• Enrichment — fill in missing fields from external sources
• Validation — flag and fix outliers, errors, and inconsistencies
• Quality scoring — measure and monitor your data health over time

**Real result:** A client's CRM data quality jumped from 61% to 97% in one run.

What type of data are you working with — customer records, transactions, product data?`,

  service_bots: `**AI Bots** — intelligent chatbots trained specifically on your business.

What we build and deploy:
• Customer support bots (handle FAQs, complaints, returns)
• Sales qualification bots (capture and score leads)
• WhatsApp & website chat bots
• Internal HR/IT helpdesk bots
• Appointment booking bots

Our bots handle **60–80% of all enquiries** without human intervention, and seamlessly hand off complex cases to your team.

**Channels we deploy on:** Website, WhatsApp, Instagram DM, Facebook Messenger, Telegram, Slack.

Want a bot like this for your business? I can walk you through the setup process.`,

  service_analysis: `**Data Analysis** — we turn your raw numbers into decisions.

What we deliver:
• Interactive dashboards (real-time or scheduled)
• Sales, revenue, and performance forecasting
• Anomaly detection (spot problems before they escalate)
• Customer behaviour analysis
• Executive-ready automated reports (daily, weekly, monthly)
• Cohort analysis and churn prediction

**Tech stack:** Power BI, Looker Studio, custom React dashboards, Python/Pandas pipelines.

We've helped companies go from "gut-feel decisions" to "data-driven strategy" in 6 weeks.

What data do you currently have that's sitting unused? I'd love to show you what's possible.`,

  service_consultation: `**AI Consultation** — the best starting point if you're not sure where AI fits.

Here's what you get:
• **Free AI Audit** — we review your current processes, tools, and data
• **Opportunity Map** — we identify your top 3–5 highest-ROI AI opportunities
• **90-day Roadmap** — a clear, prioritised implementation plan
• **ROI Estimates** — realistic projections based on your business size
• **Ongoing Advisory** — we stay with you as a strategic AI partner

This is ideal if you know AI can help your business but don't know where to start.

One of our clients discovered 4 automation opportunities they hadn't even considered — all 4 are now live and saving them 200+ hours a month.

**Shall I book you a free consultation?** It's 30 minutes and completely no-obligation.`,

  pricing: `Here's a summary of our pricing plans:

💡 **Starter — ₦150,000/month**
• 1 AI service of your choice
• Up to 10,000 automations/month
• Basic analytics dashboard
• Email support + monthly report
• *Best for: small businesses starting out*

🚀 **Growth — ₦400,000/month** *(Most Popular)*
• 3 AI services
• Unlimited automations
• Advanced analytics & forecasting
• Priority support (24hr response)
• Custom AI bot training + dedicated account manager
• *Best for: scaling businesses*

🏢 **Enterprise — Custom pricing**
• All 6 AI services
• Unlimited everything
• Custom integrations & SLA guarantees
• White-label options
• 24/7 dedicated support + AI roadmap advisory
• *Best for: large organisations*

✅ All plans include a **30-day free trial** — no credit card required.
✅ Annual billing saves you **20%**.

Would you like to know more about a specific plan, or shall I help you figure out which one is right for your business?`,

  how_it_works: `Our process is designed to be fast and low-friction. Here's how it works:

**Step 1 — Book a Consultation** *(Free, 30 min)*
We listen. You tell us about your business, your challenges, and your goals.

**Step 2 — AI Audit & Proposal** *(48 hours)*
We analyse your workflows, systems, and data. You receive a tailored integration plan with clear ROI estimates.

**Step 3 — Integration & Deployment** *(5–10 business days)*
Our team plugs AI into your existing stack. No rebuilding. You stay focused on running your business.

**Step 4 — Monitor & Scale**
We set up your dashboard, monitor performance, and optimise continuously. As your needs grow, we scale with you.

Most clients see measurable impact **within 2 weeks of deployment**.

Ready to start? I can book your free consultation right now.`,

  timeline: `Great question! Here's what to expect:

• **Free Consultation:** Same day or next business day
• **AI Audit & Proposal:** Within 48 hours of consultation
• **Deployment:** 5–10 business days (simple integrations can be as fast as 2–3 days)
• **First measurable results:** Typically within 2 weeks of going live

For enterprise-scale projects, timelines are agreed upfront in the proposal.

We're known for fast delivery — speed matters in business. Want to kick things off today?`,

  technologies: `We work across a wide range of technologies and integrate with whatever stack you already use:

**Automation:** Zapier, Make (Integromat), custom Python/Node.js pipelines, REST APIs
**AI / ML:** OpenAI GPT-4, Claude (Anthropic), custom fine-tuned models, LangChain
**Data:** PostgreSQL, MySQL, MongoDB, Google Sheets, Airtable, BigQuery
**Bots:** WhatsApp Business API, Twilio, custom web chat
**Analytics:** Power BI, Looker Studio, Tableau, custom React dashboards
**Scraping:** Playwright, Puppeteer, Scrapy, Apify
**Cloud:** AWS, Google Cloud, Vercel, Railway

If your stack isn't listed, we almost certainly support it. What tools are you currently using?`,

  security: `Your data security is our top priority. Here's how we protect you:

🔒 **NDAs signed** before any project begins
🔒 **End-to-end encryption** for all data in transit and at rest
🔒 **No data sharing** — your data is never sold or shared with third parties
🔒 **Access controls** — only authorised personnel touch your data
🔒 **Compliance-aware** — we work within NDPR (Nigeria Data Protection Regulation) and GDPR requirements where applicable
🔒 **Secure deletion** — data is purged at end of project unless you request retention

Have a specific compliance or security requirement? We can discuss it during your consultation.`,

  industries: `We serve businesses across a wide range of industries:

🏦 **Finance & Fintech** — fraud detection, reporting automation, data pipelines
🛒 **Retail & E-commerce** — pricing automation, inventory, customer bots
🚚 **Logistics & Supply Chain** — route optimisation, tracking, automated alerts
🏥 **Healthcare** — appointment bots, patient record cleaning, reporting
🏘️ **Real Estate** — lead scraping, listing aggregation, CRM automation
📱 **Startups & Tech** — custom AI features, data infrastructure, analytics
🎓 **Education** — student support bots, data analysis, admin automation

If your industry isn't listed, AI almost certainly applies to your business. The question is just where to start — which is exactly what our free consultation is for.`,

  support: `Our support channels:

📧 **Email:** syberspace247@gmail.com *(response within 24 hours)*
📞 **Phone:** +234 808 626 9431 *(Mon–Fri, 9am–6pm WAT)*
💬 **WhatsApp human-agent handoff:** +234 815 151 9625
💬 **Live chat:** You're already in it! I can escalate to a human agent.
📅 **Scheduled call:** Book via Calendly for a guaranteed time slot.

Would you like me to connect you with a human agent right now, or is there something else I can help with?`,

  contact: `You can reach Syberspace through:

📧 **Email:** syberspace247@gmail.com
📞 **Phone:** +234 808 626 9431
💬 **WhatsApp human-agent handoff:** +234 815 151 9625
📅 **Calendly:** Book a free 30-min consultation online
📱 **Facebook:** facebook.com/syberspacenetwork

Our team responds within **24 hours** on email and **same day** on WhatsApp.

Would you like me to help you book a consultation, or connect you directly to a team member?`,

  social: `You can find and follow Syberspace on:

📱 **Facebook:** [facebook.com/syberspacenetwork](https://web.facebook.com/syberspacenetwork)

We share case studies, AI tips, and business automation insights. Give us a follow to stay updated!

Is there anything else I can help you with?`,

  location: `Syberspace is a remote-first company serving businesses across Nigeria and globally.

Our team operates primarily in Nigeria 🇳🇬, and we work with clients in Lagos, Abuja, Port Harcourt, and across West Africa and beyond.

**Remote delivery** means we can integrate AI into your business regardless of where you're located. We do on-site visits for Enterprise clients where needed.

Questions about working with us remotely? I'm happy to explain the process.`,

  book_start: `I'd love to book a **free 30-minute AI consultation** for you! Let me take a few quick details. 📅

What's your **full name**?`,

  human_agent: `Of course — let me connect you with one of our human consultants. 🤝

They'll follow up with you directly. Can I get your **full name** first?`,

  unknown: [
    "That's a great question! I want to make sure I give you the right answer. Could you give me a bit more detail, or choose from one of the quick options below?",
    "I'm not quite sure I caught that — could you rephrase? Or feel free to ask about our services, pricing, booking, or anything else about Syberspace.",
    "Hmm, let me make sure I help you properly. Are you looking to learn about our services, pricing, booking a consultation, or something else entirely?",
  ],
};

/* ── Flow helpers ─────────────────────────────────── */
export const BOOKING_STEPS: Record<FlowStep, string> = {
  idle: "",
  book_name:    "What's your **full name**?",
  book_email:   "Thanks! What's the best **email address** to reach you?",
  book_service: "Which service are you most interested in?\n\n1. Process Automation\n2. Web Scraping\n3. Data Cleaning\n4. AI Bots\n5. Data Analysis\n6. AI Consultation\n7. Not sure yet\n\nJust type the number or name.",
  book_time:    "What **time/day** works best for you? (e.g. 'Tuesday afternoon', 'anytime this week', 'Monday 10am')\n\nOr reply **'flexible'** and we'll send you a Calendly link.",
  book_confirm: "",
  human_name:   "What's your **full name**?",
  human_contact:"What's the best **phone number or email** to reach you?",
  human_issue:  "Briefly, what do you need help with?",
  human_confirm:"",
};

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getKBResponse(intent: Intent): string {
  const resp = KB[intent];
  if (Array.isArray(resp)) return pickRandom(resp);
  return resp as string;
}
