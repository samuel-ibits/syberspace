export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "421786862457093";

type MetaPixelParameters = Record<string, string | number | boolean>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaPixelEvent(
  eventName: string,
  parameters?: MetaPixelParameters,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  window.fbq("track", eventName, parameters);
}

export function trackMetaLead(
  formId: "business_launchpad" | "fashion_beauty_website_sprint" | "instagram_to_orders_sales_plan",
  parameters: MetaPixelParameters = {},
) {
  trackMetaPixelEvent("Lead", {
    form_id: formId,
    ...parameters,
  });
}
