import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles, Wand2, Brain, Zap, Layers, Send } from "lucide-react";
import { NeuralBackground } from "@/components/NeuralBackground";
import { OrchestrationCanvas } from "@/components/agents/OrchestrationCanvas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Content Studio — Your Autonomous AI Content Team" },
      { name: "description", content: "Generate, optimize, preview, and publish viral content with collaborating AI agents." },
      { property: "og:title", content: "AI Content Studio" },
      { property: "og:description", content: "An autonomous AI creator operating system." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <NeuralBackground />

      {/* Top nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-glow via-primary to-accent" />
          <span className="font-semibold tracking-tight">AI Content Studio</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="#why" className="hover:text-foreground transition">Why creators</a>
          <a href="#preview" className="hover:text-foreground transition">Platform</a>
          <a href="#modes" className="hover:text-foreground transition">Modes</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition px-3 py-1.5">Sign in</Link>
          <Link to="/signup" className="glass glow-primary rounded-xl px-4 py-2 text-sm">Get access</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-6 md:px-12 pt-16 pb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow animate-pulse-glow" />
          Now in private alpha
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="mx-auto mt-6 max-w-4xl text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-gradient">
          Your Autonomous AI Content Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Generate, optimize, preview, and publish viral content with collaborating AI agents.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/onboarding">
            <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground glow-primary">
              Start creating <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </motion.button>
          </Link>
          <Link to="/app">
            <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="glass flex items-center gap-2 rounded-xl px-5 py-3 text-sm">
              <Compass className="h-4 w-4" /> Explore workspace
            </motion.button>
          </Link>
        </motion.div>

        {/* Hero orchestration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mt-16 max-w-5xl">
          <OrchestrationCanvas compact />
        </motion.div>
      </section>

      {/* How it works */}
      <Section id="how" eyebrow="How it works" title="A studio that thinks alongside you">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Brain, title: "Ask in plain words", desc: "Describe the moment — a video, a thread, a campaign. The studio understands intent." },
            { icon: Wand2, title: "Agents collaborate", desc: "Trend, Hook, Script, SEO, Thumbnail and Virality AI work in parallel, streaming live." },
            { icon: Send, title: "Ship anywhere", desc: "Pixel-true previews and one-tap publishing across six platforms." },
          ].map((f, i) => <FeatureCard key={i} {...f} delay={i * 0.08} />)}
        </div>
      </Section>

      {/* Why creators */}
      <Section id="why" eyebrow="Why creators love it" title="Built for the post-feed era">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Zap, title: "Made to ship", desc: "From spark to published in minutes, not days." },
            { icon: Sparkles, title: "Tuned to taste", desc: "Adapts to your vibe — Gen-Z, cinematic, luxury, minimal." },
            { icon: Layers, title: "Always learning", desc: "Every post sharpens the agents around your voice." },
          ].map((f, i) => <FeatureCard key={i} {...f} delay={i * 0.08} />)}
        </div>
      </Section>

      {/* Live preview */}
      <Section id="preview" eyebrow="Live platform preview" title="A glimpse inside the studio">
        <div className="glass-strong rounded-3xl p-3">
          <OrchestrationCanvas compact />
        </div>
      </Section>

      {/* Creator modes */}
      <Section id="modes" eyebrow="Creator modes" title="Pick a personality. The studio reshapes itself.">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {["Gen-Z", "Cinematic", "Luxury", "Minimal", "Storytelling", "Tech Creator"].map((m, i) => (
            <motion.div key={m} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }} whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 text-center cursor-pointer">
              <div className="mx-auto mb-3 h-10 w-10 rounded-xl"
                style={{ background: `linear-gradient(135deg, oklch(0.86 0.16 200), oklch(0.7 0.22 295))`, opacity: 0.4 + i * 0.1 }} />
              <div className="text-sm font-medium">{m}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* AI showcase */}
      <Section eyebrow="AI collaboration" title="Six minds. One creative consciousness.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Trend AI", "Reads the cultural pulse in real time."],
            ["Hook AI", "Writes the first three seconds you can't scroll past."],
            ["Script AI", "Builds cinematic structure with story DNA."],
            ["SEO AI", "Tunes for discovery without losing voice."],
            ["Thumbnail AI", "Designs the click before it happens."],
            ["Virality AI", "Predicts performance frame-by-frame."],
          ].map(([t, d], i) => (
            <motion.div key={t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }} className="glass-strong rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-cyan-glow animate-pulse-glow" />
                <div className="text-sm font-semibold">{t}</div>
              </div>
              <p className="text-sm text-muted-foreground">{d}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="relative z-10 px-6 md:px-12 py-24">
        <div className="mx-auto max-w-3xl text-center glass-strong glow-primary rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient">Step into the studio</h2>
          <p className="mt-3 text-muted-foreground">Your AI team is already online.</p>
          <Link to="/onboarding" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground glow-primary">
            Launch my AI Studio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 px-6 md:px-12 py-8 text-xs text-muted-foreground flex flex-wrap justify-between gap-4">
        <span>© {new Date().getFullYear()} AI Content Studio</span>
        <span>Made for creators · Powered by intelligent agents</span>
      </footer>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative z-10 px-6 md:px-12 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow" />{eyebrow}
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-gradient">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay = 0 }: { icon: any; title: string; desc: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay }} whileHover={{ y: -4 }}
      className="glass-strong rounded-2xl p-6">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary glow-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
    </motion.div>
  );
}
