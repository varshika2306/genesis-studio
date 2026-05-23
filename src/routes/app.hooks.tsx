import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Copy, RefreshCw, Shuffle, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/workspace/PageHeader";

export const Route = createFileRoute("/app/hooks")({
  head: () => ({ meta: [{ title: "Hook Lab — AI Content Studio" }] }),
  component: HooksPage,
});

const CATEGORIES = ["Curiosity", "Storytelling", "Emotional", "Fear", "Educational", "Controversial"] as const;

const HOOKS: Record<typeof CATEGORIES[number], { text: string; emotion: number; curiosity: number }[]> = {
  Curiosity: [
    { text: "I tried this for 30 days and the result shocked even me.", emotion: 72, curiosity: 96 },
    { text: "There's a hidden setting nobody talks about — and it changes everything.", emotion: 60, curiosity: 94 },
  ],
  Storytelling: [
    { text: "Three years ago I was broke in a tiny apartment. Then I noticed one thing.", emotion: 91, curiosity: 82 },
    { text: "She didn't believe me at first. Then I showed her the screen.", emotion: 84, curiosity: 80 },
  ],
  Emotional: [
    { text: "If you've ever felt invisible online, watch this until the end.", emotion: 95, curiosity: 70 },
  ],
  Fear: [
    { text: "Stop posting this on your reels — it's killing your reach.", emotion: 78, curiosity: 88 },
  ],
  Educational: [
    { text: "The 12-second framework every viral creator uses (but nobody explains).", emotion: 55, curiosity: 90 },
  ],
  Controversial: [
    { text: "Most creators are wrong about going viral. Here's the real math.", emotion: 70, curiosity: 92 },
  ],
};

function HooksPage() {
  const [cat, setCat] = useState<typeof CATEGORIES[number]>("Curiosity");
  const [seed, setSeed] = useState(0);
  const hooks = HOOKS[cat];

  return (
    <>
      <PageHeader eyebrow="Hook Lab" title="Generate hooks that stop the scroll"
        subtitle="Tune emotion, curiosity, and category — remix until it feels inevitable." />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="glass flex gap-1 rounded-2xl p-1">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-xl px-3 py-1.5 text-xs transition ${cat === c ? "bg-accent/20 text-accent glow-violet" : "text-muted-foreground hover:text-foreground"}`}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={() => setSeed(s => s + 1)}
          className="glass glow-primary flex items-center gap-2 rounded-xl px-4 py-2 text-sm">
          <Sparkles className="h-4 w-4" /> Generate batch
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2" key={seed}>
        {hooks.map((h, i) => (
          <motion.div key={i + seed} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass-strong rounded-2xl p-5 group">
            <p className="text-lg leading-snug">"{h.text}"</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Meter label="Emotion" value={h.emotion} color="oklch(0.7 0.22 295)" />
              <Meter label="Curiosity" value={h.curiosity} color="oklch(0.86 0.16 200)" />
            </div>
            <div className="mt-4 flex gap-2 text-xs">
              <button className="glass flex items-center gap-1.5 rounded-lg px-3 py-1.5 hover:bg-white/10 transition"><RefreshCw className="h-3.5 w-3.5" /> Regenerate</button>
              <button className="glass flex items-center gap-1.5 rounded-lg px-3 py-1.5 hover:bg-white/10 transition"><Shuffle className="h-3.5 w-3.5" /> Remix</button>
              <button className="glass flex items-center gap-1.5 rounded-lg px-3 py-1.5 hover:bg-white/10 transition"><Heart className="h-3.5 w-3.5" /> Save</button>
              <button className="glass flex items-center gap-1.5 rounded-lg px-3 py-1.5 hover:bg-white/10 transition ml-auto"><Copy className="h-3.5 w-3.5" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function Meter({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>{label}</span><span>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.9 }}
          className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${color}, oklch(0.72 0.2 240))`, boxShadow: `0 0 12px ${color}` }} />
      </div>
    </div>
  );
}
