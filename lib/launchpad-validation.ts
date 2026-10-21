export const LAUNCHPAD_CATEGORIES = [
  "Retail & E-commerce",
  "Food & Restaurant",
  "Health & Beauty",
  "Education & Training",
  "Professional Services",
  "Technology & Software",
  "Agriculture",
  "Fashion & Apparel",
  "Real Estate",
  "Logistics & Transport",
  "Entertainment & Media",
  "Other",
] as const;

export const LAUNCHPAD_REFERRAL_SOURCES = [
  "Facebook",
  "Instagram",
  "WhatsApp",
  "Friend or colleague",
  "Google search",
  "Other",
] as const;

export type LaunchpadData = {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  category: string;
  location: string;
  description: string;
  website: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  otherSocial: string;
  challenge: string;
  outcome: string;
  referral: string;
  additional: string;
  acceptTerms: string;
  consent: string;
  companyWebsite: string;
};

export type LaunchpadField = keyof LaunchpadData;
export type LaunchpadFieldErrors = Partial<Record<LaunchpadField, string>>;

const limits: Record<LaunchpadField, number> = {
  name: 100,
  businessName: 140,
  phone: 40,
  email: 160,
  category: 100,
  location: 160,
  description: 1500,
  website: 250,
  instagram: 250,
  facebook: 250,
  tiktok: 250,
  otherSocial: 250,
  challenge: 2000,
  outcome: 2000,
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
  if (value.startsWith("@")) return /^@[a-zA-Z0-9._-]{2,60}$/.test(value);
  try {
    const candidate = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return (candidate.protocol === "http:" || candidate.protocol === "https:") && candidate.hostname.includes(".");
  } catch {
    return false;
  }
}

export function safeHttpUrl(value: string) {
  if (!value || value.startsWith("@")) return "";
  try {
    const candidate = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return candidate.protocol === "http:" || candidate.protocol === "https:" ? candidate.toString() : "";
  } catch {
    return "";
  }
}

export function validateLaunchpadSubmission(input: Record<string, unknown>): {
  data: LaunchpadData;
  fieldErrors: LaunchpadFieldErrors;
} {
  const data = Object.fromEntries(
    (Object.keys(limits) as LaunchpadField[]).map((field) => [field, text(input[field])]),
  ) as LaunchpadData;
  data.email = data.email.toLowerCase();

  const fieldErrors: LaunchpadFieldErrors = {};
  for (const field of Object.keys(limits) as LaunchpadField[]) {
    if (data[field].length > limits[field]) fieldErrors[field] = `Use ${limits[field]} characters or fewer.`;
  }

  const required: Array<[LaunchpadField, string]> = [
    ["name", "Enter your full name."],
    ["businessName", "Enter your business name."],
    ["phone", "Enter a phone or WhatsApp number."],
    ["email", "Enter your email address."],
    ["category", "Select a business category."],
    ["location", "Enter your business location."],
    ["description", "Describe your business."],
    ["challenge", "Describe your main business challenge."],
    ["outcome", "Describe the outcome you want."],
  ];
  for (const [field, message] of required) {
    if (!data[field]) fieldErrors[field] = message;
  }

  if (data.name && data.name.length < 2) fieldErrors.name = "Enter at least 2 characters.";
  if (data.businessName && data.businessName.length < 2) fieldErrors.businessName = "Enter at least 2 characters.";
  if (data.location && data.location.length < 2) fieldErrors.location = "Enter a valid business location.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) fieldErrors.email = "Enter a valid email address.";
  if (data.phone && (!/^[+\d][\d\s().-]+$/.test(data.phone) || data.phone.replace(/\D/g, "").length < 7)) {
    fieldErrors.phone = "Enter a valid phone number with at least 7 digits.";
  }
  if (data.category && !LAUNCHPAD_CATEGORIES.includes(data.category as (typeof LAUNCHPAD_CATEGORIES)[number])) {
    fieldErrors.category = "Select a valid business category.";
  }
  if (data.description && data.description.length < 20) fieldErrors.description = "Use at least 20 characters so we understand your business.";
  if (data.challenge && data.challenge.length < 20) fieldErrors.challenge = "Use at least 20 characters so we understand the challenge.";
  if (data.outcome && data.outcome.length < 20) fieldErrors.outcome = "Use at least 20 characters so we understand your goal.";

  for (const field of ["website", "instagram", "facebook", "tiktok", "otherSocial"] as const) {
    if (data[field] && !looksLikeHttpUrl(data[field])) fieldErrors[field] = "Enter a valid web address or @handle.";
  }
  if (data.referral && !LAUNCHPAD_REFERRAL_SOURCES.includes(data.referral as (typeof LAUNCHPAD_REFERRAL_SOURCES)[number])) {
    fieldErrors.referral = "Select a valid option.";
  }
  if (data.acceptTerms !== "yes") fieldErrors.acceptTerms = "Accept the campaign terms to continue.";
  if (data.consent !== "yes") fieldErrors.consent = "Consent is required to process your application.";

  return { data, fieldErrors };
}
