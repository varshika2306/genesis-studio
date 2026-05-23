import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { NeuralBackground } from "@/components/NeuralBackground";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding — AI Content Studio" }] }),
  component: Onboarding,
});

const CREATOR_TYPES = ["Creator", "Influencer", "Agency", "Brand", "Educator", "Founder", "Freelancer"];
const PLATFORMS = ["Instagram", "TikTok", "YouTube", "LinkedIn", "X/Twitter", "Threads"];
const VIBES = ["Gen-Z", "Cinematic", "Luxury", "Minimal", "Storytelling", "Tech Creator"];

function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [tz, setTz] = useState("UTC");
  const [type, setType] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [vibe, setVibe] = useState<string | null>(null);

  function togglePlatform(p: string) {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12">
      <NeuralBackground />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8 flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1">
              <div className="flex items-center gap-2 mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${i <= step ? "bg-primary text-primary-foreground glow-primary" : "bg-white/10"}`}>
                  {i < step ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                {["Workspace", "Identity", "Vibe"][i]}
              </div>
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.5 }}
                  className="h-full" style={{ background: "linear-gradient(90deg, oklch(0.86 0.16 200), oklch(0.7 0.22 295))" }} />
              </div>
            </div>
          ))}
        </div>

        <div className="glass-strong glow-primary rounded-3xl p-8 min-h-[420px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-semibold tracking-tight text-gradient">Set up your studio</h2>
                <p className="mt-1 text-sm text-muted-foreground">A name, a workspace, a timezone. We'll handle the rest.</p>
                <div className="mt-6 space-y-3">
                  <Field label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nova Park" />
                  <Field label="Workspace name" value={workspace} onChange={(e) => setWorkspace(e.target.value)} placeholder="Nova Studio" />
                  <Field label="Timezone" value={tz} onChange={(e) => setTz(e.target.value)} placeholder="UTC, PT, CET…" />
                </div>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-semibold tracking-tight text-gradient">What kind of creator are you?</h2>
                <p className="mt-1 text-sm text-muted-foreground">Pick one — and the platforms you live on.</p>
                <div className="mt-5">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Creator type</div>
                  <div className="flex flex-wrap gap-2">
                    {CREATOR_TYPES.map((t) => (
                      <button key={t} onClick={() => setType(t)}
                        className={`rounded-xl px-3 py-2 text-sm transition ${type === t ? "bg-primary/20 text-primary glow-primary" : "glass text-muted-foreground hover:text-foreground"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Platforms</div>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((p) => (
                      <button key={p} onClick={() => togglePlatform(p)}
                        className={`rounded-xl px-3 py-2 text-sm transition flex items-center gap-1.5 ${platforms.includes(p) ? "bg-accent/20 text-accent glow-violet" : "glass text-muted-foreground hover:text-foreground"}`}>
                        {platforms.includes(p) && <Check className="h-3.5 w-3.5" />}{p}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-semibold tracking-tight text-gradient">Choose your vibe</h2>
                <p className="mt-1 text-sm text-muted-foreground">The studio shape-shifts to match.</p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {VIBES.map((v, i) => (
                    <motion.button key={v} onClick={() => setVibe(v)} whileHover={{ y: -3 }}
                      className={`relative overflow-hidden rounded-2xl p-5 text-left transition ${vibe === v ? "glass-strong glow-primary" : "glass"}`}>
                      <div className="absolute inset-0 opacity-30"
                        style={{ background: `linear-gradient(135deg, oklch(0.86 0.16 200), oklch(0.7 0.22 295))`, opacity: 0.2 + i * 0.05 }} />
                      <div className="relative text-sm font-medium">{v}</div>
                      <div className="relative mt-1 text-[11px] text-muted-foreground">Adaptive UI</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <button onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition">
              Back
            </button>
            {step < 2 ? (
              <button onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground glow-primary">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <Link to="/app" className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground glow-primary">
                Launch My AI Studio <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input {...props} className="mt-1 w-full glass rounded-xl bg-transparent px-3 py-2.5 text-sm outline-none focus:glow-primary transition" />
    </label>
  );
}
