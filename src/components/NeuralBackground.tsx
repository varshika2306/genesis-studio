import { motion } from "framer-motion";

export function NeuralBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      {/* Orbs */}
      <motion.div
        className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.2 240 / 0.45), transparent 60%)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.22 295 / 0.4), transparent 60%)" }}
        animate={{ x: [0, -40, 20, 0], y: [0, -30, 10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-10 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.86 0.16 200 / 0.32), transparent 60%)" }}
        animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Particles */}
      {Array.from({ length: 32 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/60"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            boxShadow: "0 0 8px oklch(0.86 0.16 200 / 0.8)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
