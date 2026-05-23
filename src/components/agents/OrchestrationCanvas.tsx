import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TrendingUp, Sparkles, FileText, Search, Image as ImageIcon, Activity } from "lucide-react";

type State = "idle" | "running" | "completed";

const agents = [
  { id: "trend", name: "Trend AI", icon: TrendingUp, x: 50, y: 12, color: "oklch(0.86 0.16 200)" },
  { id: "hook", name: "Hook AI", icon: Sparkles, x: 88, y: 32, color: "oklch(0.72 0.2 240)" },
  { id: "script", name: "Script AI", icon: FileText, x: 80, y: 76, color: "oklch(0.7 0.22 295)" },
  { id: "seo", name: "SEO AI", icon: Search, x: 22, y: 76, color: "oklch(0.86 0.16 200)" },
  { id: "thumb", name: "Thumbnail AI", icon: ImageIcon, x: 12, y: 32, color: "oklch(0.7 0.22 295)" },
  { id: "viral", name: "Virality AI", icon: Activity, x: 50, y: 50, color: "oklch(0.72 0.2 240)" },
] as const;

const edges: Array<[string, string]> = [
  ["trend", "viral"], ["hook", "viral"], ["script", "viral"],
  ["seo", "viral"], ["thumb", "viral"], ["trend", "hook"],
  ["hook", "script"], ["script", "seo"], ["seo", "thumb"], ["thumb", "trend"],
];

export function OrchestrationCanvas({ compact = false }: { compact?: boolean }) {
  const [states, setStates] = useState<Record<string, State>>(() =>
    Object.fromEntries(agents.map((a) => [a.id, "idle"])),
  );
  const [confidence, setConfidence] = useState<Record<string, number>>(() =>
    Object.fromEntries(agents.map((a) => [a.id, 60 + Math.floor(Math.random() * 30)])),
  );

  useEffect(() => {
    const t = setInterval(() => {
      setStates((prev) => {
        const next = { ...prev };
        const ids = agents.map((a) => a.id);
        const pick = ids[Math.floor(Math.random() * ids.length)];
        next[pick] = next[pick] === "running" ? "completed" : "running";
        return next;
      });
      setConfidence((prev) => {
        const n = { ...prev };
        for (const k of Object.keys(n)) {
          n[k] = Math.max(55, Math.min(99, n[k] + Math.round((Math.random() - 0.5) * 6)));
        }
        return n;
      });
    }, 1400);
    return () => clearInterval(t);
  }, []);

  const height = compact ? "h-[420px]" : "h-[560px]";
  const findAgent = (id: string) => agents.find((a) => a.id === id)!;

  return (
    <div className={`relative ${height} w-full glass-strong rounded-3xl overflow-hidden`}>
      <div className="absolute inset-0 grid-bg opacity-50" />
      {/* gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.2_240/0.18),transparent_70%)]" />

      {/* SVG connection lines */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.86 0.16 200)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.7 0.22 295)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => {
          const A = findAgent(a); const B = findAgent(b);
          return (
            <g key={i}>
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="url(#line)" strokeWidth="0.18" />
              <motion.circle
                r="0.6" fill="oklch(0.86 0.16 200)"
                initial={{ cx: A.x, cy: A.y, opacity: 0 }}
                animate={{ cx: [A.x, B.x], cy: [A.y, B.y], opacity: [0, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0 0 1px oklch(0.86 0.16 200))" }}
              />
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {agents.map((a, idx) => {
        const Icon = a.icon;
        const state = states[a.id];
        const conf = confidence[a.id];
        return (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{ delay: idx * 0.08, y: { duration: 4 + idx * 0.3, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
          >
            <div className="relative">
              {/* halo */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: state === "running" ? [1, 1.4, 1] : 1,
                  opacity: state === "running" ? [0.6, 0, 0.6] : 0.3,
                }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{ boxShadow: `0 0 40px ${a.color}` }}
              />
              <div
                className="relative flex h-16 w-16 items-center justify-center rounded-full glass-strong"
                style={{ boxShadow: `0 0 30px ${a.color}66, inset 0 0 20px ${a.color}33` }}
              >
                <Icon className="h-6 w-6" style={{ color: a.color }} />
              </div>
              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-center">
                <div className="text-[11px] font-medium">{a.name}</div>
                <div className="mt-0.5 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      state === "running" ? "bg-cyan-glow animate-pulse-glow" :
                      state === "completed" ? "bg-emerald-400" : "bg-white/30"
                    }`}
                  />
                  <span className="capitalize">{state}</span>
                  <span className="text-muted-foreground/60">· {conf}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Center status badge */}
      <div className="absolute bottom-4 left-4 glass rounded-xl px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <motion.span className="h-2 w-2 rounded-full bg-cyan-glow"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity }}
            style={{ boxShadow: "0 0 10px oklch(0.86 0.16 200)" }} />
          <span className="text-muted-foreground">Orchestrating</span>
          <span className="text-foreground">live workflow</span>
        </div>
      </div>
    </div>
  );
}
