export const WEBSITE_SPRINT_CATEGORIES = [
  "Tailoring & Custom Fashion",
  "Ready-to-wear Fashion Brand",
  "Hair or Wig Vendor",
  "Makeup Artist",
  "Skincare Brand",
  "Lash Studio",
  "Nail Studio",
  "Beauty Salon or Spa",
  "Jewellery or Accessories Brand",
  "Other Fashion or Beauty Brand",
] as const;

export const WEBSITE_SPRINT_PROJECT_TYPES = [
  "Product and price catalogue website",
  "Service and booking enquiry website",
  "Portfolio or lookbook website",
  "Brand website with WhatsApp ordering",
  "Website redesign",
  "Simple web application idea",
  "Not sure yet",
] as const;

export const WEBSITE_SPRINT_TIMELINES = [
  "As soon as possible",
  "Within 2 weeks",
  "Within 1 month",
  "Within 2–3 months",
  "Still planning",
] as const;

export const WEBSITE_SPRINT_REFERRAL_SOURCES = [
  "Facebook",
  "Instagram",
  "WhatsApp",
  "Friend or colleague",
  "Google search",
  "Other",
] as const;

export type WebsiteSprintData = {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  category: string;
  location: string;
  projectType: string;
  businessDescription: string;
  projectGoal: string;
  requiredFeatures: string;
  timeline: string;
  currentWebsite: string;
  contentReady: string;
  decisionMaker: string;
  budgetCommitment: string;
  referral: string;
  additional: string;
  acceptTerms: string;
  consent: string;
  companyWebsite: string;
};

export type WebsiteSprintField = keyof WebsiteSprintData;
export type WebsiteSprintFieldErrors = Partial<Record<WebsiteSprintField, string>>;

const limits: Record<WebsiteSprintField, number> = {
  name: 100,
  businessName: 140,
  phone: 40,
  email: 160,
  category: 100,
  location: 160,
  projectType: 100,
  businessDescription: 1500,
  projectGoal: 2000,
  requiredFeatures: 1500,
  timeline: 100,
  currentWebsite: 250,
  contentReady: 30,
  decisionMaker: 30,
  budgetCommitment: 30,
  referral: 100,
  additional: 1500,
  acceptTerms: 10,
  consent: 10,
  companyWebsite: 200,
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function looksLikeHttpUrl(value: string) {
  if (!value) return true;
  try {
    const candidate = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return (candidate.protocol === "http:" || candidate.protocol === "https:") && candidate.hostname.includes(".");
  } catch {
    return false;
  }
}

export function safeWebsiteSprintUrl(value: string) {
  if (!value) return "";
  try {
    const candidate = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return candidate.protocol === "http:" || candidate.protocol === "https:" ? candidate.toString() : "";
  } catch {
    return "";
  }
}

export function validateWebsiteSprintSubmission(input: Record<string, unknown>): {
  data: WebsiteSprintData;
  fieldErrors: WebsiteSprintFieldErrors;
} {
  const data = Object.fromEntries(
    (Object.keys(limits) as WebsiteSprintField[]).map((field) => [field, text(input[field])]),
  ) as WebsiteSprintData;
  data.email = data.email.toLowerCase();

  const fieldErrors: WebsiteSprintFieldErrors = {};
  for (const field of Object.keys(limits) as WebsiteSprintField[]) {
    if (data[field].length > limits[field]) fieldErrors[field] = `Use ${limits[field]} characters or fewer.`;
  }

  const required: Array<[WebsiteSprintField, string]> = [
    ["name", "Enter your full name."],
    ["businessName", "Enter your business or project name."],
    ["phone", "Enter a phone or WhatsApp number."],
    ["email", "Enter your email address."],
    ["category", "Select a business category."],
    ["location", "Enter your location."],
    ["projectType", "Select the type of project you need."],
    ["businessDescription", "Describe your business or idea."],
    ["projectGoal", "Tell us what the website should help you achieve."],
    ["timeline", "Select your preferred timeline."],
    ["contentReady", "Tell us whether your content is ready."],
    ["decisionMaker", "Confirm whether you can approve the project."],
    ["budgetCommitment", "Confirm whether you are ready for the ₦50,000 investment."],
  ];
  for (const [field, message] of required) {
    if (!data[field]) fieldErrors[field] = message;
  }

  if (data.name && data.name.length < 2) fieldErrors.name = "Enter at least 2 characters.";
  if (data.businessName && data.businessName.length < 2) fieldErrors.businessName = "Enter at least 2 characters.";
  if (data.location && data.location.length < 2) fieldErrors.location = "Enter a valid location.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) fieldErrors.email = "Enter a valid email address.";
  if (data.phone && (!/^[+\d][\d\s().-]+$/.test(data.phone) || data.phone.replace(/\D/g, "").length < 7)) {
    fieldErrors.phone = "Enter a valid phone number with at least 7 digits.";
  }
  if (data.category && !WEBSITE_SPRINT_CATEGORIES.includes(data.category as (typeof WEBSITE_SPRINT_CATEGORIES)[number])) {
    fieldErrors.category = "Select a valid business category.";
  }
  if (data.projectType && !WEBSITE_SPRINT_PROJECT_TYPES.includes(data.projectType as (typeof WEBSITE_SPRINT_PROJECT_TYPES)[number])) {
    fieldErrors.projectType = "Select a valid project type.";
  }
  if (data.timeline && !WEBSITE_SPRINT_TIMELINES.includes(data.timeline as (typeof WEBSITE_SPRINT_TIMELINES)[number])) {
    fieldErrors.timeline = "Select a valid timeline.";
  }
  if (data.referral && !WEBSITE_SPRINT_REFERRAL_SOURCES.includes(data.referral as (typeof WEBSITE_SPRINT_REFERRAL_SOURCES)[number])) {
    fieldErrors.referral = "Select a valid option.";
  }
  if (data.businessDescription && data.businessDescription.length < 20) fieldErrors.businessDescription = "Use at least 20 characters so we understand your business.";
  if (data.projectGoal && data.projectGoal.length < 20) fieldErrors.projectGoal = "Use at least 20 characters so we understand your goal.";
  if (data.currentWebsite && !looksLikeHttpUrl(data.currentWebsite)) fieldErrors.currentWebsite = "Enter a valid website address.";
  if (data.contentReady && !["yes", "partly", "no"].includes(data.contentReady)) fieldErrors.contentReady = "Select a valid option.";
  if (data.decisionMaker !== "yes") fieldErrors.decisionMaker = "This campaign is for people who can approve the project.";
  if (data.budgetCommitment !== "yes") fieldErrors.budgetCommitment = "Confirm that you can invest ₦50,000 if the proposed direction is right for you.";
  if (data.acceptTerms !== "yes") fieldErrors.acceptTerms = "Accept the campaign terms to continue.";
  if (data.consent !== "yes") fieldErrors.consent = "Consent is required to process your enquiry.";

  return { data, fieldErrors };
}
