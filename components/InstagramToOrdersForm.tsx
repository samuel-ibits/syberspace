"use client";

import { useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import CustomIcon from "@/components/CustomIcon";
import { trackMetaLead } from "@/lib/meta-pixel";
import {
  INSTAGRAM_TO_ORDERS_CATEGORIES,
  INVESTMENT_READINESS_OPTIONS,
  type InstagramToOrdersField,
  type InstagramToOrdersFieldErrors,
  validateInstagramToOrdersSubmission,
} from "@/lib/instagram-to-orders-validation";

const WHATSAPP_NUMBER = "2348086269431";
const inputClass = "mt-2 w-full rounded-xl border bg-white px-4 py-3.5 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-4";

function fieldClass(hasError: boolean) {
  return `${inputClass} ${hasError ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-cyan-600 focus:ring-cyan-100"}`;
}

function FieldError({ name, errors }: { name: InstagramToOrdersField; errors: InstagramToOrdersFieldErrors }) {
  return errors[name] ? <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-red-700">{errors[name]}</p> : null;
}

function TextInput({ label, name, errors, ...props }: { label: string; name: InstagramToOrdersField; errors: InstagramToOrdersFieldErrors } & Omit<InputHTMLAttributes<HTMLInputElement>, "name">) {
  const hasError = Boolean(errors[name]);
  return <label className="block"><span className="text-sm font-semibold text-slate-800">{label}</span><input {...props} name={name} className={fieldClass(hasError)} aria-invalid={hasError} aria-describedby={hasError ? `${name}-error` : undefined} /><FieldError name={name} errors={errors} /></label>;
}

function SelectField({ label, name, errors, children, ...props }: { label: string; name: InstagramToOrdersField; errors: InstagramToOrdersFieldErrors; children: ReactNode } & Omit<SelectHTMLAttributes<HTMLSelectElement>, "name">) {
  const hasError = Boolean(errors[name]);
  return <label className="block"><span className="text-sm font-semibold text-slate-800">{label}</span><select {...props} name={name} className={`${fieldClass(hasError)} appearance-none`} aria-invalid={hasError} aria-describedby={hasError ? `${name}-error` : undefined}>{children}</select><FieldError name={name} errors={errors} /></label>;
}

type ApiResult = { error?: string; fieldErrors?: InstagramToOrdersFieldErrors; requestId?: string };

export default function InstagramToOrdersForm() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<InstagramToOrdersFieldErrors>({});

  function focusFirstError(form: HTMLFormElement, errors: InstagramToOrdersFieldErrors) {
    const firstField = Object.keys(errors)[0];
    if (firstField) requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus());
  }

  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    const field = (event.target as HTMLInputElement | HTMLSelectElement).name as InstagramToOrdersField;
    if (field && fieldErrors[field]) setFieldErrors((current) => ({ ...current, [field]: undefined }));
    if (error) setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const validation = validateInstagramToOrdersSubmission(Object.fromEntries(new FormData(form).entries()));
    if (Object.keys(validation.fieldErrors).length) {
      setFieldErrors(validation.fieldErrors);
      setError("Please correct the highlighted fields.");
      focusFirstError(form, validation.fieldErrors);
      return;
    }

    setSending(true);
    setError("");
    setFieldErrors({});
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch("/api/instagram-to-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(validation.data),
        signal: controller.signal,
      });
      let result: ApiResult = {};
      try { result = (await response.json()) as ApiResult; } catch { /* handled below */ }
      if (!response.ok) {
        if (result.fieldErrors && Object.keys(result.fieldErrors).length) {
          setFieldErrors(result.fieldErrors);
          focusFirstError(form, result.fieldErrors);
        }
        const reference = result.requestId ? ` Reference: ${result.requestId}.` : "";
        throw new Error(`${result.error || "We could not submit your request."}${reference}`);
      }

      trackMetaLead("instagram_to_orders_sales_plan", {
        content_name: "Instagram-to-Orders Website Sales Plan",
        content_category: "fashion_beauty_website_lead",
        value: 50000,
        currency: "NGN",
      });

      const message = `Hi Syberspace, I just requested my free Website Sales Plan. My name is ${validation.data.name}, my Instagram is @${validation.data.instagramHandle}, and I run a ${validation.data.category}.`;
      form.reset();
      window.setTimeout(() => {
        window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      }, 500);
    } catch (submitError) {
      if (submitError instanceof DOMException && submitError.name === "AbortError") {
        setError("The request took too long. Check your connection and try again—your details are still here.");
      } else if (submitError instanceof TypeError) {
        setError("We could not reach the server. Check your internet connection and try again.");
      } else {
        setError(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
      }
      setSending(false);
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} onChange={handleChange} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">Free personalised plan</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">See how your Instagram can become an order-ready website.</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">Complete this 60-second form. We will email the request to our team, then open a private WhatsApp conversation so you can receive your recommendation.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Your name *" name="name" errors={fieldErrors} autoComplete="name" maxLength={100} placeholder="Ada Okafor" />
        <TextInput label="WhatsApp number *" name="phone" errors={fieldErrors} type="tel" inputMode="tel" autoComplete="tel" maxLength={40} placeholder="+234…" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Instagram handle *" name="instagramHandle" errors={fieldErrors} maxLength={100} placeholder="@yourbrand" />
        <TextInput label="Email (optional)" name="email" errors={fieldErrors} type="email" inputMode="email" autoComplete="email" maxLength={160} placeholder="you@example.com" />
      </div>
      <SelectField label="What kind of brand do you run? *" name="category" errors={fieldErrors} defaultValue="">
        <option value="">Select your category</option>
        {INSTAGRAM_TO_ORDERS_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
      </SelectField>
      <SelectField label="If the plan fits, are you ready to invest in the ₦50,000 package? *" name="investmentReadiness" errors={fieldErrors} defaultValue="">
        <option value="">Select the honest answer</option>
        {INVESTMENT_READINESS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </SelectField>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
        <input name="consent" value="yes" type="checkbox" className="mt-1 h-4 w-4 flex-none accent-cyan-600" aria-invalid={Boolean(fieldErrors.consent)} aria-describedby={fieldErrors.consent ? "consent-error" : undefined} />
        <span>I consent to Syberspace processing this information under its <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-700 underline">privacy policy</a> and contacting me about my website plan. *</span>
      </label>
      <FieldError name="consent" errors={fieldErrors} />
      <label className="hidden" aria-hidden="true">Leave this empty<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>

      {error && <div role="alert" aria-live="polite" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"><p className="font-semibold">Request not submitted</p><p className="mt-1">{error}</p></div>}
      <button type="submit" disabled={sending} aria-busy={sending} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-4 text-base font-bold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60">
        {sending ? "Sending your request…" : "Get My Free Website Sales Plan"}{!sending && <CustomIcon name="arrow-right" className="h-5 w-5" />}
      </button>
      <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-500"><CustomIcon name="security" className="h-4 w-4" /> Private conversation. No WhatsApp group. No obligation to buy.</p>
    </form>
  );
}
