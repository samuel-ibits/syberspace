"use client";
import { motion } from "framer-motion";
import CustomIcon, { type CustomIconName } from "@/components/CustomIcon";

const posts = [
  {
    tag: "AI Strategy",
    title: "5 Ways Nigerian SMEs Are Using AI to Cut Costs in 2025",
    excerpt: "From automated customer service to intelligent inventory management, here's how small and medium businesses across Nigeria are leveraging AI to do more with less.",
    readTime: "5 min read",
    date: "Jun 2025",
    icon: "bot" as CustomIconName,
    color: "#06b6d4",
  },
  {
    tag: "Automation",
    title: "Why WhatsApp Automation Is the Highest-ROI Investment for Nigerian Businesses",
    excerpt: "With over 90 million WhatsApp users in Nigeria, automating your business messaging isn't optional — it's a competitive necessity. Here's how to do it right.",
    readTime: "4 min read",
    date: "May 2025",
    icon: "message" as CustomIconName,
    color: "#7c3aed",
  },
  {
    tag: "Data & Analytics",
    title: "How to Turn Your Business Data Into Decisions (Without Hiring a Data Scientist)",
    excerpt: "Most businesses are sitting on a goldmine of untapped data. This guide shows you how AI-powered analytics can surface insights you're currently missing entirely.",
    readTime: "6 min read",
    date: "May 2025",
    icon: "chart" as CustomIconName,
    color: "#06b6d4",
  },
  {
    tag: "Web & AI",
    title: "The Difference Between a Website and an AI-Powered Digital Experience",
    excerpt: "A static website tells people what you do. An AI-powered platform qualifies leads, books appointments, and answers questions — all while you sleep.",
    readTime: "4 min read",
    date: "Apr 2025",
    icon: "web" as CustomIconName,
    color: "#7c3aed",
  },
];

export default function Blog() {
  return (
    <section id="insights" className="py-24 relative overflow-hidden" style={{ background: "var(--bg-base)" }}>
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--glow-cyan)", opacity: 0.3 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.18)", color: "var(--accent-cyan)" }}>
            Insights
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            AI knowledge for <span className="gradient-text">Nigerian businesses</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg" style={{ color: "var(--text-muted)" }}>
            Practical guides, strategies, and industry insights — no fluff.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-2xl overflow-hidden theme-card flex flex-col cursor-pointer group"
            >
              {/* Icon banner */}
              <div className="h-28 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${post.color}18, ${post.color}08)`, borderBottom: "1px solid var(--border)" }}>
                <motion.span
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ color: post.color, background: `${post.color}14`, border: `1px solid ${post.color}24` }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                >
                  <CustomIcon name={post.icon} className="h-9 w-9" />
                </motion.span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${post.color}20, transparent 70%)` }} />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${post.color}15`, color: post.color }}>
                    {post.tag}
                  </span>
                </div>
                <h3 className="font-bold text-sm leading-snug mb-3 group-hover:text-cyan-400 transition-colors"
                  style={{ color: "var(--text-primary)" }}>
                  {post.title}
                </h3>
                <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "var(--text-muted)" }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-faint)" }}>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
