import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { PageHeader } from "@/components/workspace/PageHeader";
import { Calendar, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/publish")({
  head: () => ({ meta: [{ title: "Publishing Hub — AI Content Studio" }] }),
  component: PublishPage,
});

const PLATFORMS = ["Instagram", "TikTok", "YouTube", "LinkedIn", "X / Twitter", "Threads"] as const;

function PublishPage() {
  const [platform, setPlatform] = useState<typeof PLATFORMS[number]>("Instagram");
  const [publishing, setPublishing] = useState(false);

  function simulate() {
    setPublishing(true);
    setTimeout(() => setPublishing(false), 2800);
  }

  return (
    <>
      <PageHeader eyebrow="Publishing Hub" title="Preview, schedule, publish"
        subtitle="A pixel-true preview of every platform — and an AI that knows the perfect moment." />

      <div className="mb-6 glass flex flex-wrap gap-1 rounded-2xl p-1 w-fit">
        {PLATFORMS.map(p => (
          <button key={p} onClick={() => setPlatform(p)}
            className={`rounded-xl px-3 py-1.5 text-xs transition ${platform === p ? "bg-primary/20 text-primary glow-primary" : "text-muted-foreground hover:text-foreground"}`}>
            {p}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Preview */}
        <div className="glass-strong rounded-3xl p-6">
          <div className="mb-4 text-xs text-muted-foreground">{platform} preview</div>
          <div className="flex justify-center">
            <PreviewFor platform={platform} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-cyan-glow" /> AI recommendation</h3>
            <p className="text-sm text-muted-foreground">Post Tuesday 7:42 PM local time for max reach on {platform}.</p>
            <div className="mt-3 flex gap-2 text-[11px]">
              <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 text-emerald-300">+38% est. reach</span>
              <span className="rounded-md bg-white/5 px-2 py-0.5">Hook score 94</span>
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Calendar className="h-4 w-4" /> Schedule</h3>
            <input type="datetime-local" className="w-full glass rounded-xl bg-transparent px-3 py-2 text-sm outline-none" />
            <button onClick={simulate} className="mt-3 w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground glow-primary hover:opacity-90 transition">
              {publishing ? "Publishing…" : "Publish now"}
            </button>
            {publishing && (
              <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.6 }}
                  className="h-full" style={{ background: "linear-gradient(90deg, oklch(0.86 0.16 200), oklch(0.7 0.22 295))" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function PreviewFor({ platform }: { platform: string }) {
  if (platform === "Instagram" || platform === "TikTok") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="relative w-[280px] aspect-[9/16] rounded-[36px] glass-strong p-3 overflow-hidden">
        <div className="absolute inset-3 rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, oklch(0.7 0.22 295), oklch(0.72 0.2 240))" }}>
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute bottom-4 left-4 right-12 text-white">
            <div className="text-sm font-semibold">@nova.studio</div>
            <div className="text-xs opacity-90 mt-1">The 12-second framework every viral creator uses 🧠</div>
            <div className="mt-2 flex gap-1.5 text-[10px] opacity-80">#aitools #creator</div>
          </div>
          <div className="absolute right-3 bottom-4 flex flex-col gap-3 text-white text-[10px] items-center">
            <span>♥ 14k</span><span>💬 482</span><span>↗</span>
          </div>
        </div>
      </motion.div>
    );
  }
  if (platform === "YouTube") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[520px]">
        <div className="aspect-video rounded-2xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, oklch(0.65 0.24 25), oklch(0.7 0.22 295))" }}>
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute bottom-3 left-3 text-3xl font-black tracking-tight text-white drop-shadow-lg">AI WON.</div>
          <div className="absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">10:42</div>
        </div>
        <div className="mt-3">
          <div className="text-sm font-medium">I let 6 AI agents run my channel for 30 days</div>
          <div className="text-xs text-muted-foreground">Nova Studio · 24k views · 2 hours ago</div>
        </div>
      </motion.div>
    );
  }
  // LinkedIn / X / Threads
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[520px] glass rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent" />
        <div>
          <div className="text-sm font-medium">Nova · {platform}</div>
          <div className="text-[11px] text-muted-foreground">2m · Public</div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed">
        I tried 7 AI tools so you don't have to. Only one actually works for creators.
        Here's the 12-second framework I now use every single post →
      </p>
      <div className="mt-4 h-44 rounded-xl" style={{ background: "linear-gradient(135deg, oklch(0.86 0.16 200), oklch(0.7 0.22 295))" }} />
      <div className="mt-3 flex gap-6 text-xs text-muted-foreground">
        <span>♥ 1.2k</span><span>💬 84</span><span>🔁 217</span>
      </div>
    </motion.div>
  );
}
