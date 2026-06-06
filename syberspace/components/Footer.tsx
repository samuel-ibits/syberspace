"use client";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const services = ["Process Automation", "Web Scraping", "Data Cleaning", "AI Bots", "Data Analysis", "AI Consultation"];
const company = [
  { label: "About Us", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="border-t border-white/5 bg-[#030912] relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <a href="#home" className="block mb-4">
              <Image src="/logo.svg" alt="Syberspace" width={160} height={36} />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              We plug cutting-edge AI into your existing business. No rebuilding required — just results.
            </p>
            <div className="flex gap-3">
              {[
                { icon: "in", label: "LinkedIn" },
                { icon: "𝕏", label: "Twitter" },
                { icon: "ig", label: "Instagram" },
              ].map((s) => (
                <motion.div
                  key={s.icon}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer text-xs font-bold"
                >
                  {s.icon}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <motion.a href="#services" whileHover={{ x: 4 }} className="text-slate-400 text-sm hover:text-white transition-colors block">
                    {s}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {company.map((l) => (
                <li key={l.label}>
                  <motion.a href={l.href} whileHover={{ x: 4 }} className="text-slate-400 text-sm hover:text-white transition-colors block">
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: "📧", label: "hello@syberspace.com.ng", href: "mailto:hello@syberspace.com.ng" },
                { icon: "📞", label: "+234 800 000 0000", href: "tel:+2348000000000" },
                { icon: "💬", label: "WhatsApp", href: "https://wa.me/2348000000000" },
              ].map((c) => (
                <li key={c.label}>
                  <motion.a href={c.href} whileHover={{ x: 4 }} className="flex items-center gap-2 text-slate-400 text-sm hover:text-white transition-colors">
                    <span className="text-base">{c.icon}</span> {c.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Syberspace. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Built in Nigeria 🇳🇬 · Serving businesses worldwide
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
