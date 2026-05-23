import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, TrendingUp, Flame } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/workspace/PageHeader";

export const Route = createFileRoute("/app/trends")({
  head: () => ({ meta: [{ title: "Trend Scanner — AI Content Studio" }] }),
  component: TrendsPage,
});

const PLATFORMS = ["All", "TikTok", "Instagram", "YouTube", "X", "Threads"];

const TRENDS = [
  { topic: "AI agents replacing freelancers", platform: "TikTok", growth: 312, heat: 94, hashtags: ["#aiagents", "#futureofwork"] },
  { topic: "Cinematic POV vlogs", platform: "Instagram", growth: 187, heat: 88, hashtags: ["#pov", "#cinematic"] },
  { topic: "Late Night Loop audio", platform: "TikTok", growth: 220, heat: 92, hashtags: ["#audiotrend"] },
  { topic: "Day in the life of a builder", platform: "YouTube", growth: 142, heat: 81, hashtags: ["#buildinpublic"] },
  { topic: "Notion vs Apple Notes", platform: "X", growth: 96, heat: 73, hashtags: ["#productivity"] },
  { topic: "Aesthetic morning routines", platform: "Instagram", growth: 168, heat: 84, hashtags: ["#aesthetic"] },
  { topic: "AI thumbnail breakdowns", platform: "YouTube", growth: 244, heat: 90, hashtags: ["#thumbnails"] },
  { topic: "Quiet luxury creator look", platform: "Threads", growth: 121, heat: 76, hashtags: ["#quietluxury"] },
];

function TrendsPage() {
  const [q, setQ] = useState("");
  const [platform, setPlatform] = useState("All");

  const list = useMemo(() => {
    return TRENDS
      .filter(t => platform === "All" || t.platform === platform)
      .filter(t => t.topic.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => b.heat - a.heat);
  }, [q, platform]);

  return (
    <>
      <PageHeader eyebrow="Trend Scanner" title="Discover viral opportunities" subtitle="Live signals across every major platform, ranked by acceleration." />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="glass flex flex-1 min-w-[260px] items-center gap-2 rounded-2xl px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search topics, hashtags, sounds…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </div>
        <div className="glass flex gap-1 rounded-2xl p-1">
          {PLATFORMS.map((p) => (
            <button key={p} onClick={() => setPlatform(p)}
              className={`rounded-xl px-3 py-1.5 text-xs transition ${platform === p ? "bg-primary/20 text-primary glow-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div className="mb-6 glass rounded-2xl p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold flex items-center gap-2"><Flame className="h-4 w-4 text-accent" /> Velocity heatmap</h3>
          <span className="text-xs text-muted-foreground">Last 24 hours</span>
        </div>
        <div className="grid grid-cols-12 gap-1.5 sm:grid-cols-24" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
          {Array.from({ length: 24 * 6 }).map((_, i) => {
            const intensity = Math.abs(Math.sin(i * 0.37) + Math.cos(i * 0.21));
            const a = Math.min(1, intensity);
            return (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.005 }}
                className="aspect-square rounded-md"
                style={{ background: `oklch(0.72 0.2 240 / ${0.08 + a * 0.55})`, boxShadow: a > 0.7 ? `0 0 12px oklch(0.86 0.16 200 / ${a * 0.5})` : undefined }} />
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((t, i) => (
          <motion.div key={t.topic} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            whileHover={{ y: -3 }}
            className="glass rounded-2xl p-5 hover:bg-white/[0.04] transition">
            <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="rounded-md bg-white/5 px-2 py-0.5">{t.platform}</span>
              <span className="flex items-center gap-1 text-emerald-300"><TrendingUp className="h-3 w-3" /> +{t.growth}%</span>
            </div>
            <h4 className="text-lg font-medium">{t.topic}</h4>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
              {t.hashtags.map((h) => <span key={h} className="rounded-md bg-white/5 px-2 py-0.5">{h}</span>)}
            </div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                <span>Heat score</span><span>{t.heat}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${t.heat}%` }} transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full" style={{ background: "linear-gradient(90deg, oklch(0.86 0.16 200), oklch(0.7 0.22 295))" }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
