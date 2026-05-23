import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/workspace/PageHeader";

export const Route = createFileRoute("/app/virality")({
  head: () => ({ meta: [{ title: "Virality Engine — AI Content Studio" }] }),
  component: ViralityPage,
});

const METRICS = [
  { label: "Virality Score", value: 87, color: "oklch(0.86 0.16 200)" },
  { label: "Predicted Engagement", value: 72, color: "oklch(0.72 0.2 240)" },
  { label: "Hook Strength", value: 94, color: "oklch(0.7 0.22 295)" },
  { label: "Retention at 7s", value: 81, color: "oklch(0.86 0.16 200)" },
];

const EMOTIONS = [
  { label: "Curiosity", value: 92 },
  { label: "Surprise", value: 78 },
  { label: "Joy", value: 54 },
  { label: "Tension", value: 41 },
];

function Ring({ value, color, label }: { value: number; color: string; label: string }) {
  const r = 56; const c = 2 * Math.PI * r;
  return (
    <div className="glass-strong rounded-2xl p-5 flex flex-col items-center">
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <defs>
            <linearGradient id={`g-${label}`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="oklch(0.7 0.22 295)" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth="10" fill="none" />
          <motion.circle cx="80" cy="80" r={r} stroke={`url(#g-${label})`} strokeWidth="10" fill="none"
            strokeLinecap="round" strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c - (value / 100) * c }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            transform="rotate(-90 80 80)"
            style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-3xl font-semibold">{value}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">/ 100</div>
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm">{label}</div>
    </div>
  );
}

function ViralityPage() {
  return (
    <>
      <PageHeader eyebrow="Virality Engine" title="Forecast performance before you publish"
        subtitle="Holographic readouts powered by retention, emotion, and hook analysis." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m) => <Ring key={m.label} {...m} />)}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <h3 className="mb-4 text-sm font-semibold">Emotional fingerprint</h3>
          <div className="space-y-3">
            {EMOTIONS.map((e, i) => (
              <div key={e.label}>
                <div className="mb-1 flex justify-between text-xs"><span>{e.label}</span><span className="text-muted-foreground">{e.value}</span></div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${e.value}%` }} transition={{ delay: i * 0.1, duration: 1 }}
                    className="h-full" style={{ background: "linear-gradient(90deg, oklch(0.86 0.16 200), oklch(0.7 0.22 295))" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h3 className="mb-4 text-sm font-semibold">Retention curve (predicted)</h3>
          <svg viewBox="0 0 300 140" className="w-full h-44">
            <defs>
              <linearGradient id="ret" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.86 0.16 200 / 0.7)" />
                <stop offset="100%" stopColor="oklch(0.86 0.16 200 / 0)" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4 }}
              d="M 0 30 C 60 20, 90 60, 140 70 S 230 110, 300 105"
              fill="none" stroke="oklch(0.86 0.16 200)" strokeWidth="2.5"
              style={{ filter: "drop-shadow(0 0 6px oklch(0.86 0.16 200))" }} />
            <path d="M 0 30 C 60 20, 90 60, 140 70 S 230 110, 300 105 L 300 140 L 0 140 Z" fill="url(#ret)" />
          </svg>
          <p className="mt-2 text-xs text-muted-foreground">Most drop-off predicted between seconds 12–18. Tighten the value reveal.</p>
        </div>
      </div>

      <div className="mt-6 glass rounded-2xl p-5">
        <h3 className="mb-3 text-sm font-semibold">Optimization insights</h3>
        <ul className="grid gap-2 text-sm md:grid-cols-2">
          {[
            "Move the value statement up 2 seconds",
            "Add a visual pattern interrupt at 0:08",
            "Strengthen CTA with a specific number",
            "Front-load the most surprising frame",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 rounded-xl bg-white/[0.03] p-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-glow" style={{ boxShadow: "0 0 8px oklch(0.86 0.16 200)" }} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
