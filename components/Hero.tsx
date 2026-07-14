"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";
import CustomIcon from "@/components/CustomIcon";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });

function StatCounter({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCounter(value, 2000, active);
  return (
    <div className="text-center">
      <div className="text-2xl font-extrabold gradient-text">{count}{suffix}</div>
      <div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{label}</div>
    </div>
  );
}

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 30, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: delay + index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function MagneticButton({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={event => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({
          x: (event.clientX - rect.left - rect.width / 2) * 0.22,
          y: (event.clientY - rect.top - rect.height / 2) * 0.22,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileTap={{ scale: 0.97 }}
      className="px-8 py-4 rounded-full font-bold text-lg select-none"
      style={primary ? {
        background: "#06b6d4",
        color: "#0a0f1e",
        boxShadow: "0 6px 24px rgba(6,182,212,0.3)",
      } : {
        border: "1px solid var(--border-strong)",
        color: "var(--text-primary)",
        background: "var(--bg-surface)",
      }}
    >
      {children}
    </motion.a>
  );
}

const stats = [
  { value: 50, suffix: "+", label: "Businesses Served" },
  { value: 6, suffix: "", label: "AI Services" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export default function Hero() {
  const { ref: statsRef, inView: statsVisible } = useInView();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -120]);
  const y2 = useTransform(scrollY, [0, 600], [0, -60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
      style={{ background: "var(--bg-base)" }}
    >
      <HeroCanvas />

      <motion.div
        style={{ y: y1, background: "var(--glow-cyan)" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: y2, background: "var(--glow-violet)" }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
      />

      <motion.div style={{ opacity }} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6"
          style={{ color: "var(--text-primary)", perspective: 1000 }}
        >
          <div><WordReveal text="AI Customer Support," delay={0.3} /></div>
          <div className="gradient-text"><WordReveal text="Omni-Platform Automation, Lead Capture," delay={0.6} /></div>
          <div><WordReveal text="and Workflow Automation for African Businesses." delay={0.9} /></div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl mb-10 leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Syberspace helps African business owners and website owners add AI chatbots,
          website chat, social messaging, email, SMS, lead capture, workflow automation,
          and analytics to the tools they already use.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <MagneticButton href="#booking" primary>Book Free Consultation</MagneticButton>
          <MagneticButton href="#services">Explore Services</MagneticButton>
        </motion.div>

        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-10 max-w-lg mx-auto"
        >
          {stats.map(stat => <StatCounter key={stat.label} {...stat} active={statsVisible} />)}
          <div className="text-center">
            <div className="text-2xl font-extrabold gradient-text">24/7</div>
            <div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>AI Support</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ color: "var(--text-faint)" }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <CustomIcon name="chevron-down" className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
