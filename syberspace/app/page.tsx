"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar          from "@/components/Navbar";
import Hero            from "@/components/Hero";
import Services        from "@/components/Services";
import HowItWorks      from "@/components/HowItWorks";
import Pricing         from "@/components/Pricing";
import About           from "@/components/About";
import Testimonials    from "@/components/Testimonials";
import Booking         from "@/components/Booking";
import Footer          from "@/components/Footer";
import AIChatWidget    from "@/components/AIChatWidget";
import CustomCursor    from "@/components/CustomCursor";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <About />
      <Booking onOpenChat={() => setChatOpen(true)} />
      <Footer />

      {/* Floating chat button */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => setChatOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white"
            style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)", boxShadow: "0 8px 32px rgba(0,212,255,0.3)" }}
            aria-label="Open AI chat"
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </motion.div>
            <motion.div className="absolute inset-0 rounded-full border-2 border-cyan-400"
              animate={{ scale: [1, 1.5, 1.8], opacity: [0.6, 0.3, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </motion.button>
        )}
      </AnimatePresence>

      <AIChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </main>
  );
}
