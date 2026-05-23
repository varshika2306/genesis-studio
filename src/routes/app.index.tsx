import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Send } from "lucide-react";
import { OrchestrationCanvas } from "@/components/agents/OrchestrationCanvas";
import { PageHeader } from "@/components/workspace/PageHeader";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Workspace — AI Content Studio" }] }),
  component: HomePage,
});

const platforms = ["Instagram", "TikTok", "YouTube", "LinkedIn", "X / Twitter", "Threads"];

const outputs = [
  { kind: "Hook", text: "I tried 7 AI tools so you don't have to — only one actually works.", score: 94 },
  { kind: "Caption", text: "Stop scrolling. This 12-second framework changed everything about my retention.", score: 89 },
  { kind: "Hashtags", text: "#aitools #contentcreator #creatoreconomy #viralcontent #studio", score: 82 },
  { kind: "Thumbnail Prompt", text: "Cinematic close-up, glowing neural overlays, electric blue rim light, shocked expression.", score: 91 },
];

function HomePage() {
  return (
    <>
      <PageHeader
        eyebrow="Live workspace"
        title="What do you want to create today?"
        subtitle="Six AI agents are online and ready to collaborate on your next viral moment."
      />

      {/* Command bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="glass-strong glow-primary mb-8 flex items-center gap-3 rounded-2xl p-3"
      >
        <Sparkles className="ml-2 h-5 w-5 text-cyan-glow" />
        <input
          placeholder="What do you want to create today?"
          className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />
        <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
          {["Reel", "Short", "Thread", "Carousel"].map((t) => (
            <button key={t} className="rounded-lg px-2 py-1 hover:bg-white/10 transition">{t}</button>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground glow-primary"
        >
          Run agents <ArrowRight className="h-4 w-4" />
        </motion.button>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <OrchestrationCanvas />

          {/* Platform adaptation */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Platform adaptation</h3>
              <span className="text-xs text-muted-foreground">Auto-tuned per channel</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p, i) => (
                <motion.button
                  key={p}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -2 }}
                  className={`rounded-xl px-3 py-1.5 text-xs glass ${i === 0 ? "glow-cyan text-cyan-glow" : "text-muted-foreground"}`}
                >
                  {p}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Right output window */}
        <div className="glass-strong rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Live outputs</h3>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow animate-pulse-glow" />
              streaming
            </span>
          </div>
          <div className="space-y-3">
            {outputs.map((o, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                className="group glass rounded-xl p-3 hover:bg-white/[0.04] transition"
              >
                <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider">
                  <span className="text-cyan-glow">{o.kind}</span>
                  <span className="rounded-md bg-emerald-400/10 px-1.5 py-0.5 text-emerald-300">{o.score} virality</span>
                </div>
                <p className="text-sm leading-relaxed">{o.text}</p>
                <div className="mt-2 flex gap-2 text-[11px] text-muted-foreground opacity-0 group-hover:opacity-100 transition">
                  <button className="hover:text-foreground">Regenerate</button>·
                  <button className="hover:text-foreground">Remix</button>·
                  <button className="hover:text-foreground">Copy</button>
                </div>
              </motion.div>
            ))}
          </div>
          <Link to="/app/publish" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary/15 py-2 text-xs text-primary hover:bg-primary/25 transition">
            <Send className="h-3.5 w-3.5" /> Send to Publishing Hub
          </Link>
        </div>
      </div>

      {/* Activity feed */}
      <div className="mt-6 glass rounded-2xl p-5">
        <h3 className="mb-3 text-sm font-semibold">Agent activity</h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          {[
            "Trend AI detected a rising audio: 'Late Night Loop' (+220% in 24h)",
            "Hook AI generated 12 variations · top score 94",
            "Script AI drafted a 45-second cinematic structure",
            "SEO AI optimized 8 keywords for YouTube Shorts",
            "Virality AI predicts 87% retention through second 7",
          ].map((line, i) => (
            <motion.li key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan-glow" />
              <span>{line}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
}
