import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { PageHeader } from "@/components/workspace/PageHeader";

export const Route = createFileRoute("/app/thumbnail")({
  head: () => ({ meta: [{ title: "Thumbnail AI — AI Content Studio" }] }),
  component: ThumbnailPage,
});

const EMOTIONS = ["Shock", "Curiosity", "Luxury", "Mystery", "Excitement"] as const;
const PRESETS = ["Cinematic", "Editorial", "Minimal", "Maximalist", "Y2K", "Soft Lux"];

const PROMPTS = [
  "Cinematic close-up, electric rim light, shocked expression, glowing neural overlays",
  "Bold sans serif text, magenta-cyan gradient, isolated subject on black",
  "Aerial drone shot at golden hour, lens flare, sense of scale, mystery",
  "Macro product shot, dewy condensation, soft lux palette, museum lighting",
  "Y2K chrome typography, motion blur trails, glossy 3D characters",
  "Brutalist grid, oversized number, monochrome with a single neon accent",
];

const GRADIENTS = [
  "linear-gradient(135deg, oklch(0.7 0.22 295), oklch(0.72 0.2 240))",
  "linear-gradient(135deg, oklch(0.86 0.16 200), oklch(0.7 0.22 295))",
  "linear-gradient(135deg, oklch(0.65 0.24 25), oklch(0.7 0.22 295))",
  "linear-gradient(135deg, oklch(0.72 0.2 240), oklch(0.86 0.16 200))",
  "linear-gradient(135deg, oklch(0.7 0.22 295), oklch(0.65 0.24 25))",
  "linear-gradient(135deg, oklch(0.86 0.16 200), oklch(0.72 0.2 240))",
];

function ThumbnailPage() {
  const [emotion, setEmotion] = useState<typeof EMOTIONS[number]>("Shock");

  return (
    <>
      <PageHeader eyebrow="Thumbnail AI" title="Visual concepts that earn the click"
        subtitle="Emotion-tuned prompts, aesthetic presets, and a living moodboard." />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="glass flex gap-1 rounded-2xl p-1">
          {EMOTIONS.map((e) => (
            <button key={e} onClick={() => setEmotion(e)}
              className={`rounded-xl px-3 py-1.5 text-xs transition ${emotion === e ? "bg-accent/20 text-accent glow-violet" : "text-muted-foreground hover:text-foreground"}`}>
              {e}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <span key={p} className="glass rounded-lg px-2.5 py-1 text-[11px] text-muted-foreground">{p}</span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROMPTS.map((prompt, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group glass-strong overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/10] overflow-hidden" style={{ background: GRADIENTS[i] }}>
              <div className="absolute inset-0 grid-bg opacity-40" />
              <motion.div className="absolute inset-0"
                animate={{ background: ["radial-gradient(circle at 20% 30%, white, transparent 40%)", "radial-gradient(circle at 80% 70%, white, transparent 40%)"] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                style={{ mixBlendMode: "overlay", opacity: 0.4 }} />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="rounded-lg bg-black/40 px-2 py-1 text-[10px] backdrop-blur">{emotion} · Concept {i + 1}</div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{prompt}</p>
              <div className="mt-3 flex gap-2 text-[11px]">
                <button className="glass rounded-lg px-2.5 py-1 hover:bg-white/10">Copy prompt</button>
                <button className="glass rounded-lg px-2.5 py-1 hover:bg-white/10">Save</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
