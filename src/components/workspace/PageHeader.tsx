import { motion } from "framer-motion";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-2 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow" style={{ boxShadow: "0 0 8px oklch(0.86 0.16 200)" }} />
            {eyebrow}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            className="mt-2 max-w-2xl text-sm text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {children}
    </div>
  );
}
