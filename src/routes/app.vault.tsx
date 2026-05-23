import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Folder } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/workspace/PageHeader";

export const Route = createFileRoute("/app/vault")({
  head: () => ({ meta: [{ title: "Media Vault — AI Content Studio" }] }),
  component: VaultPage,
});

const COLLECTIONS = [
  { name: "Hooks library", count: 124, tone: "oklch(0.86 0.16 200)" },
  { name: "Saved campaigns", count: 18, tone: "oklch(0.72 0.2 240)" },
  { name: "Scripts collection", count: 47, tone: "oklch(0.7 0.22 295)" },
  { name: "Thumbnail concepts", count: 92, tone: "oklch(0.86 0.16 200)" },
  { name: "AI favorites", count: 31, tone: "oklch(0.72 0.2 240)" },
  { name: "Caption swipe file", count: 68, tone: "oklch(0.7 0.22 295)" },
];

function VaultPage() {
  const [q, setQ] = useState("");
  const list = useMemo(() => COLLECTIONS.filter(c => c.name.toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <>
      <PageHeader eyebrow="Media Vault" title="Every spark, beautifully kept"
        subtitle="Your creative memory — searchable, taggable, never lost." />

      <div className="mb-6 glass flex items-center gap-2 rounded-2xl px-3 py-2 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the vault…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="glass-strong rounded-2xl p-5 cursor-pointer group relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition"
              style={{ background: c.tone }} />
            <div className="relative">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl glass">
                <Folder className="h-5 w-5" style={{ color: c.tone }} />
              </div>
              <h3 className="text-lg font-medium">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.count} items</p>
              <div className="mt-4 flex gap-1.5">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-10 flex-1 rounded-lg" style={{ background: `linear-gradient(135deg, ${c.tone}, oklch(0.7 0.22 295 / 0.5))`, opacity: 0.4 + j * 0.15 }} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
