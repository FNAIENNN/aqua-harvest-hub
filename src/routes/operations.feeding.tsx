import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip, NoteBox } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { fmtINR } from "@/lib/aqua/data";

export const Route = createFileRoute("/operations/feeding")({ component: Feeding });

const entries = [
  { pond: "Pond A1 — Batch 2026-01 · Bhimavaram", logs: [
    { type: "Starter Feed", time: "Morning", qty: "8 bags", amt: 12400 },
    { type: "Grower Feed", time: "Evening", qty: "6 bags", amt: 9600 },
  ]},
  { pond: "Pond B1 — Batch 2026-02 · Narsapur", logs: [
    { type: "Grower Feed", time: "Morning", qty: "10 bags", amt: 16000 },
  ]},
];

function Feeding() {
  const [tab, setTab] = useState("Today");
  return (
    <Shell title="Daily Feeding">
      <ModuleHeaderTitle icon="🐟" title="Daily Feeding" subtitle="Per-pond logs" bg={C.bgSuccess} />
      <NavPillBar items={["Today", "Yesterday", "By Pond", "Date Range"]} active={tab} onChange={setTab} />
      <div className="mt-3 flex items-center justify-between">
        <div style={{ fontSize: 16, fontWeight: 500, color: C.textPrimary }}>22 May 2026</div>
        <div className="flex gap-3 text-lg" style={{ color: C.textSecondary }}>
          <button>‹</button><button>›</button>
        </div>
      </div>
      {entries.map((p) => {
        const total = p.logs.reduce((s, l) => s + l.amt, 0);
        return (
          <div key={p.pond} className="mt-3">
            <div style={{ fontSize: 13, fontWeight: 500, color: C.textSecondary, textTransform: "uppercase", letterSpacing: "0.04em", background: C.bgSecondary, padding: "6px 12px", borderRadius: 8 }}>
              {p.pond}
            </div>
            <div className="mt-2" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
              {p.logs.map((l, i) => (
                <DenseListTile key={i} primary={l.type} secondary={l.qty} amount={fmtINR(l.amt)} tag={<TagChip type="bank" label={l.time} />} />
              ))}
            </div>
            <div className="flex items-center justify-between mt-2 px-1" style={{ fontSize: 13, color: C.textSecondary }}>
              <span>Total today: {fmtINR(total)}</span>
              <button style={{ fontSize: 12, fontWeight: 500, color: C.textInfo, padding: "6px 12px", border: `0.5px solid ${C.borderInfo}`, borderRadius: 20 }}>+ Add</button>
            </div>
          </div>
        );
      })}
      <div className="mt-4"><NoteBox>Stock reduces automatically · Pond cost updated against batch.</NoteBox></div>
    </Shell>
  );
}