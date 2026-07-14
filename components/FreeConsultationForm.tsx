"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomIcon from "@/components/CustomIcon";

const services = [
  "Omni-platform AI customer support",
  "AI chatbot for my website",
  "Lead capture automation",
  "Workflow automation",
  "Data analysis and dashboards",
  "Web scraping or data cleaning",
  "Not sure yet",
];

function normalizeWebsite(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export default function FreeConsultationForm() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      website: normalizeWebsite((form.elements.namedItem("website") as HTMLInputElement).value),
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      time: (form.elements.namedItem("time") as HTMLInputElement).value.trim(),
      source: "free-consultation outreach page",
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Booking failed");
      const json = await res.json() as { meetLink?: string | null };
      setMeetLink(json.meetLink ?? "");
      setSubmittedEmail(data.email);
    } catch {
      setError("Something went wrong. Please try again or email syberspace247@gmail.com.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-2xl p-6 sm:p-8 theme-card">
      <AnimatePresence mode="wait">
        {submittedEmail ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="py-8 text-center"
          >
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "var(--accent-cyan)", color: "#0a0f1e" }}
            >
              <CustomIcon name="check" className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Consultation booked
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              A calendar invite has been sent to {submittedEmail}. We will review the details before the call.
            </p>
            {meetLink && (
              <a
                href={meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                style={{ background: "var(--accent-cyan)", color: "#0a0f1e" }}
              >
                Join video call
                <CustomIcon name="external" className="h-4 w-4" />
              </a>
            )}
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  Full name
                </label>
                <input name="name" required placeholder="Jane Doe" className="w-full rounded-xl px-4 py-3 text-sm theme-input" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  Email address
                </label>
                <input name="email" type="email" required placeholder="you@company.com" className="w-full rounded-xl px-4 py-3 text-sm theme-input" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                Website link, if any
              </label>
              <input name="website" type="text" placeholder="yourcompany.com" className="w-full rounded-xl px-4 py-3 text-sm theme-input" />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                What do you want to improve?
              </label>
              <select name="service" required className="w-full rounded-xl px-4 py-3 text-sm theme-input">
                <option value="">Select one...</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                Preferred day/time
              </label>
              <input name="time" required placeholder="Tuesday 10am, this week, or flexible" className="w-full rounded-xl px-4 py-3 text-sm theme-input" />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-60"
              style={{ background: "var(--accent-cyan)", color: "#0a0f1e" }}
            >
              {sending ? "Booking..." : "Book my free consultation"}
              <CustomIcon name="arrow-right" className="h-4 w-4" />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
