export const INSTAGRAM_TO_ORDERS_CATEGORIES = [
  "Tailor or Custom Fashion Brand",
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

export const INVESTMENT_READINESS_OPTIONS = [
  { value: "ready", label: "Yes — I can invest ₦50,000 if the plan fits" },
  { value: "payment-plan", label: "I may need the ₦25,000 / ₦25,000 payment arrangement" },
  { value: "researching", label: "No — I am only researching for now" },
] as const;

export type InstagramToOrdersData = {
  name: string;
  phone: string;
  email: string;
  instagramHandle: string;
  category: string;
  investmentReadiness: string;
  consent: string;
  companyWebsite: string;
};

export type InstagramToOrdersField = keyof InstagramToOrdersData;
export type InstagramToOrdersFieldErrors = Partial<Record<InstagramToOrdersField, string>>;

const limits: Record<InstagramToOrdersField, number> = {
  name: 100,
  phone: 40,
  email: 160,
  instagramHandle: 100,
  category: 100,
  investmentReadiness: 30,
  consent: 10,
  companyWebsite: 200,
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateInstagramToOrdersSubmission(input: Record<string, unknown>): {
  data: InstagramToOrdersData;
  fieldErrors: InstagramToOrdersFieldErrors;
} {
  const data = Object.fromEntries(
    (Object.keys(limits) as InstagramToOrdersField[]).map((field) => [field, text(input[field])]),
  ) as InstagramToOrdersData;
  data.email = data.email.toLowerCase();
  data.instagramHandle = data.instagramHandle.replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/^@/, "").replace(/\/$/, "");

  const fieldErrors: InstagramToOrdersFieldErrors = {};
  for (const field of Object.keys(limits) as InstagramToOrdersField[]) {
    if (data[field].length > limits[field]) fieldErrors[field] = `Use ${limits[field]} characters or fewer.`;
  }

  if (!data.name) fieldErrors.name = "Enter your name.";
  else if (data.name.length < 2) fieldErrors.name = "Enter at least 2 characters.";

  if (!data.phone) fieldErrors.phone = "Enter your WhatsApp number.";
  else if (!/^[+\d][\d\s().-]+$/.test(data.phone) || data.phone.replace(/\D/g, "").length < 7) {
    fieldErrors.phone = "Enter a valid WhatsApp number with at least 7 digits.";
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) fieldErrors.email = "Enter a valid email address.";

  if (!data.instagramHandle) fieldErrors.instagramHandle = "Enter your Instagram handle.";
  else if (!/^[a-zA-Z0-9._]{1,30}$/.test(data.instagramHandle)) fieldErrors.instagramHandle = "Enter a valid Instagram handle without spaces.";

  if (!INSTAGRAM_TO_ORDERS_CATEGORIES.includes(data.category as (typeof INSTAGRAM_TO_ORDERS_CATEGORIES)[number])) {
    fieldErrors.category = "Select your business category.";
  }

  if (!INVESTMENT_READINESS_OPTIONS.some((option) => option.value === data.investmentReadiness)) {
    fieldErrors.investmentReadiness = "Select the option that best describes you.";
  }

  if (data.consent !== "yes") fieldErrors.consent = "Consent is required so we can contact you about your plan.";

  return { data, fieldErrors };
}
