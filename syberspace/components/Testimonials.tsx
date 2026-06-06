"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  { name: "Adaeze Okonkwo", role: "CEO, Mbuild Firm", avatar: "AO", text: "Syberspace automated our entire client onboarding process. What took our team 3 days now takes 2 hours. The ROI was visible in the first month.", stars: 5 },
  { name: "Emeka Nwosu", role: "Head of Operations, TradePilot", avatar: "EN", text: "The data scraping and cleaning service transformed how we track competitor pricing. We now update our price list automatically every morning.", stars: 5 },
  { name: "Fatima Aliyu", role: "Founder, HealthTrack NG", avatar: "FA", text: "Their AI bot handles 80% of our customer enquiries. Our support team now focuses on complex issues only. Game changer.", stars: 5 },
  { name: "Jide Owolabi", role: "CTO, LogiFlow", avatar: "JO", text: "The AI consultation was eye-opening. They identified 4 automation opportunities we hadn't even considered. Now all 4 are live.", stars: 5 },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
          Client Stories
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Trusted by <span className="gradient-text">Real Businesses</span>
        </h2>
      </motion.div>

      {/* Parallax rows */}
      <div className="space-y-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div style={{ x: x1 }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.slice(0, 2).map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i * 0.1} />
          ))}
        </motion.div>
        <motion.div style={{ x: x2 }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.slice(2).map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i * 0.1 + 0.2} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ t, delay }: { t: typeof testimonials[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(0,212,255,0.1)" }}
      className="p-6 rounded-2xl bg-[#0d1526] border border-white/5 transition-all duration-300"
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.stars }).map((_, i) => (
          <motion.svg
            key={i}
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.07, type: "spring", stiffness: 260 }}
            className="w-4 h-4 text-yellow-400"
            fill="currentColor" viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </motion.svg>
        ))}
      </div>
      <p className="text-slate-300 leading-relaxed mb-6 italic">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
        >
          {t.avatar}
        </motion.div>
        <div>
          <div className="text-white font-semibold text-sm">{t.name}</div>
          <div className="text-slate-400 text-xs">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
}
