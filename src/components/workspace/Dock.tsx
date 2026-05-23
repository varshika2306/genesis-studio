import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Home, TrendingUp, Sparkles, FileText, ImageIcon, Activity, FolderHeart, Send,
} from "lucide-react";

const items = [
  { to: "/app", icon: Home, label: "Home" },
  { to: "/app/trends", icon: TrendingUp, label: "Trend Scanner" },
  { to: "/app/hooks", icon: Sparkles, label: "Hook Lab" },
  { to: "/app/script", icon: FileText, label: "Script Studio" },
  { to: "/app/thumbnail", icon: ImageIcon, label: "Thumbnail AI" },
  { to: "/app/virality", icon: Activity, label: "Virality Engine" },
  { to: "/app/vault", icon: FolderHeart, label: "Media Vault" },
  { to: "/app/publish", icon: Send, label: "Publishing Hub" },
] as const;

export function Dock() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-4 top-1/2 z-40 -translate-y-1/2"
    >
      <div className="glass-strong rounded-3xl p-2 shadow-2xl">
        <ul className="flex flex-col gap-1">
          {items.map(({ to, icon: Icon, label }) => {
            const active = pathname === to;
            return (
              <li key={to}>
                <Link to={to} className="group relative block">
                  <motion.div
                    whileHover={{ scale: 1.08, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                      active
                        ? "bg-primary/20 text-primary glow-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {active && (
                      <motion.span
                        layoutId="dock-active"
                        className="absolute -left-2 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                        style={{ boxShadow: "0 0 12px oklch(0.72 0.18 235 / 0.9)" }}
                      />
                    )}
                  </motion.div>
                  <span className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg glass px-2.5 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.aside>
  );
}
