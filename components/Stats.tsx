"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 50,  suffix: "+", label: "Businesses Powered",    icon: "🏢", color: "#06b6d4" },
  { value: 120, suffix: "+", label: "Projects Delivered",    icon: "🚀", color: "#7c3aed" },
  { value: 3,   suffix: "+", label: "Years of Experience",   icon: "📅", color: "#06b6d4" },
  { value: 98,  suffix: "%", label: "Client Satisfaction",   icon: "⭐", color: "#7c3aed" },
];

function Counter({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-5xl sm:text-6xl font-extrabold" style={{ color }}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.18)", color: "var(--accent-cyan)" }}>
            By the Numbers
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
            Results that <span className="gradient-text">speak for themselves</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="flex flex-col items-center text-center p-8 rounded-2xl theme-card relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}12 0%, transparent 70%)` }} />
              <span className="text-3xl mb-3">{s.icon}</span>
              <Counter target={s.value} suffix={s.suffix} color={s.color} />
              <p className="mt-2 text-sm font-medium" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
