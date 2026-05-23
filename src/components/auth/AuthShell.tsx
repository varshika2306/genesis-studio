import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { NeuralBackground } from "@/components/NeuralBackground";

export function AuthShell({
  title, subtitle, children, footer,
}: { title: string; subtitle: string; children: React.ReactNode; footer: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <NeuralBackground />
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-glow via-primary to-accent" />
        <span className="font-semibold tracking-tight text-sm">AI Content Studio</span>
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md glass-strong glow-primary rounded-3xl p-8"
      >
        <h1 className="text-2xl font-semibold tracking-tight text-gradient">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-6 space-y-3">
          <button className="glass w-full rounded-xl py-2.5 text-sm hover:bg-white/10 transition flex items-center justify-center gap-2">
            <GoogleIcon /> Continue with Google
          </button>
          <button className="glass w-full rounded-xl py-2.5 text-sm hover:bg-white/10 transition flex items-center justify-center gap-2">
            <AppleIcon /> Continue with Apple
          </button>
        </div>
        <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
        </div>
        {children}
        <div className="mt-6 text-center text-xs text-muted-foreground">{footer}</div>
      </motion.div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.8 32.4 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1 7.4 2.8l5.7-5.7C33.6 6.6 29 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19c10.5 0 19-8.5 19-19 0-1.2-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c2.8 0 5.4 1 7.4 2.8l5.7-5.7C33.6 6.6 29 5 24 5 16.3 5 9.6 9 6.3 14.7z"/><path fill="#4CAF50" d="M24 43c5.2 0 9.8-1.6 13.4-4.4l-6.2-5c-2 1.5-4.5 2.4-7.2 2.4-5.3 0-9.8-2.6-11.3-7l-6.5 5C9.5 39 16.2 43 24 43z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2 3.7-3.7 4.9l6.2 5c-.4.4 6.2-4.5 6.2-13.9 0-1.2-.1-2.4-.4-3.5z"/></svg>
  );
}
function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.7c0-2.6 2.1-3.8 2.2-3.9-1.2-1.7-3-2-3.7-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.3.9 1.3 1.9 2.7 3.3 2.6 1.3-.1 1.8-.8 3.4-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.2-2.6 1-1.5 1.4-3 1.5-3.1-.1 0-2.8-1.1-2.3-3.8zM13.9 4.6c.7-.8 1.2-2 1-3.2-1.1.1-2.3.7-3 1.6-.7.7-1.3 2-1.1 3.1 1.2.1 2.4-.6 3.1-1.5z"/></svg>
  );
}
