import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/workspace/PageHeader";
import { Wand2 } from "lucide-react";

export const Route = createFileRoute("/app/script")({
  head: () => ({ meta: [{ title: "Script Studio — AI Content Studio" }] }),
  component: ScriptPage,
});

const TONES = ["Gen-Z", "Cinematic", "Professional", "Funny", "Storytelling"] as const;
const BLOCKS = ["Hook", "Problem", "Value", "CTA"] as const;

const SAMPLE: Record<typeof BLOCKS[number], string> = {
  Hook: "If your reels feel invisible, this 12-second framework will change that overnight.",
  Problem: "Most creators chase trends and burn out. The algorithm doesn't reward effort — it rewards retention.",
  Value: "Here's the structure I use: open with a pattern interrupt, reveal one specific insight, then collapse the loop in the last 3 seconds.",
  CTA: "Save this for your next reel. Follow for the part-two breakdown tomorrow.",
};

function ScriptPage() {
  const [tone, setTone] = useState<typeof TONES[number]>("Cinematic");
  const [active, setActive] = useState<typeof BLOCKS[number]>("Hook");
  const [text, setText] = useState("");

  useEffect(() => {
    const target = SAMPLE[active];
    let i = 0;
    setText("");
    const id = setInterval(() => {
      i++;
      setText(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, 14);
    return () => clearInterval(id);
  }, [active, tone]);

  return (
    <>
      <PageHeader eyebrow="Script Studio" title="Cinematic scripts, streamed live"
        subtitle="Co-write with an AI partner that adapts to your tone and story structure." />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-5">
          <div className="glass rounded-2xl p-4">
            <h4 className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Tone</h4>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button key={t} onClick={() => setTone(t)}
                  className={`rounded-xl px-3 py-1.5 text-xs transition ${tone === t ? "bg-primary/20 text-primary glow-primary" : "glass text-muted-foreground hover:text-foreground"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-4">
            <h4 className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Story blocks</h4>
            <ul className="space-y-1.5">
              {BLOCKS.map((b, i) => (
                <li key={b}>
                  <button onClick={() => setActive(b)}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm transition ${active === b ? "bg-accent/15 text-accent" : "hover:bg-white/5"}`}>
                    <span className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-md bg-white/5 text-[10px]">{i + 1}</span>
                      {b}
                    </span>
                    {active === b && <motion.span layoutId="block-dot" className="h-2 w-2 rounded-full bg-accent" style={{ boxShadow: "0 0 10px oklch(0.7 0.22 295)" }} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="glass-strong rounded-2xl p-6 min-h-[480px]">
          <div className="mb-4 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{tone} · {active}</span>
            <span className="flex items-center gap-1.5 text-cyan-glow"><span className="h-1.5 w-1.5 rounded-full bg-cyan-glow animate-pulse-glow" /> AI co-writing</span>
          </div>
          <div className="rounded-xl bg-black/20 p-5 font-mono text-[15px] leading-relaxed min-h-[280px]">
            {text}
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.9, repeat: Infinity }}
              className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyan-glow" />
          </div>
          <div className="mt-5 flex gap-2 text-xs">
            <button className="glass flex items-center gap-1.5 rounded-xl px-3 py-2"><Wand2 className="h-3.5 w-3.5" /> Rewrite this block</button>
            <button className="glass rounded-xl px-3 py-2">Continue scene</button>
            <button className="glass rounded-xl px-3 py-2">Insert B-roll cue</button>
          </div>
        </div>
      </div>
    </>
  );
}
