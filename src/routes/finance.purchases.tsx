import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip, NoteBox } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { fmtINR } from "@/lib/aqua/data";

export const Route = createFileRoute("/finance/purchases")({ component: Purchases });

const data = {
  Seed: [
    { supplier: "MarineSeed Pvt", item: "PL Vannamei", qty: "5L pcs", amount: 125000, status: "paid" as const, date: "12-May-2026" },
  ],
  Feed: [
    { supplier: "ABC Feed Co.", item: "Starter Feed · 40 bags", qty: "40 bags", amount: 64000, status: "unpaid" as const, date: "18-May-2026" },
    { supplier: "ABC Feed Co.", item: "Grower Feed · 60 bags", qty: "60 bags", amount: 96000, status: "partial" as const, date: "20-May-2026" },
  ],
  Medicine: [
    { supplier: "AquaMed Labs", item: "Probiotic Mix", qty: "20 ltr", amount: 42000, status: "unpaid" as const, date: "15-May-2026" },
  ],
  Fuel: [
    { supplier: "BP Diesel", item: "Diesel", qty: "120 ltr", amount: 11400, status: "paid" as const, date: "21-May-2026" },
  ],
};

function Purchases() {
  const [tab, setTab] = useState("Feed");
  const items = data[tab as keyof typeof data] || [];
  const total = items.reduce((s, i) => s + i.amount, 0);
  const unpaid = items.filter(i => i.status !== "paid").length;
  return (
    <Shell title="Purchases">
      <ModuleHeaderTitle icon="🛒" title="Purchases" subtitle="Inflow of goods" bg={C.bgInfo} />
      <NavPillBar items={["Seed", "Feed", "Medicine", "Fuel"]} active={tab} onChange={setTab} />
      <div className="mt-3 mb-2 flex items-center justify-between" style={{ fontSize: 12, color: C.textSecondary }}>
        <span>{items.length} purchases · {fmtINR(total)}</span>
        <span style={{ color: unpaid ? C.textDanger : C.textSecondary }}>{unpaid} unpaid</span>
      </div>
      <div style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {items.map((p, i) => (
          <DenseListTile
            key={i}
            primary={`${p.supplier} · ${p.item}`}
            secondary={`${p.date} · ${p.qty}`}
            amount={fmtINR(p.amount)}
            amountColor={p.status === "paid" ? C.textSuccess : C.textDanger}
            tag={<TagChip type={p.status} />}
          />
        ))}
      </div>
      <div className="mt-4"><NoteBox>Tally: Dr <strong style={{ color: C.textPrimary, fontWeight: 500 }}>{tab} Purchase</strong> / Cr Supplier / CC: Site · Pond · Batch</NoteBox></div>
    </Shell>
  );
}