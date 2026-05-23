import { motion } from "framer-motion";
import { Bell, Command, Sparkles, ChevronDown } from "lucide-react";

export function TopNav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-24 right-4 z-30"
    >
      <div className="glass-strong flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5">
        <button className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm hover:bg-white/5 transition">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-accent" />
          <span className="font-medium">Nova Studio</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <motion.span
            className="h-2 w-2 rounded-full bg-cyan-glow"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ boxShadow: "0 0 10px oklch(0.86 0.16 200 / 0.9)" }}
          />
          <span className="text-muted-foreground">6 agents online</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="glass flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition">
            <Command className="h-3.5 w-3.5" />
            <span>Ask anything</span>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>
          <button className="relative h-9 w-9 rounded-xl glass hover:bg-white/10 transition flex items-center justify-center">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>
          <button className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/60 to-accent/60 flex items-center justify-center text-xs font-semibold">
            N
          </button>
          <button className="glass flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs glow-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Create
          </button>
        </div>
      </div>
    </motion.header>
  );
}
