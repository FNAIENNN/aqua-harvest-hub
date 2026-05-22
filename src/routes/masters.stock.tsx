import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { fmtINR } from "@/lib/aqua/data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/masters/stock")({ component: StockList });

const stock = [
  { id: "S001", name: "Starter Feed", group: "Feed", unit: "Bags", qty: 240, rate: 1600, reorder: 50, active: true },
  { id: "S002", name: "Grower Feed", group: "Feed", unit: "Bags", qty: 180, rate: 1600, reorder: 40, active: true },
  { id: "S003", name: "Finisher Feed", group: "Feed", unit: "Bags", qty: 120, rate: 1800, reorder: 30, active: true },
  { id: "S004", name: "PL Vannamei", group: "Seed", unit: "L.pcs", qty: 8, rate: 25000, reorder: 2, active: true },
  { id: "S005", name: "Probiotic Mix", group: "Medicine", unit: "Litre", qty: 35, rate: 2100, reorder: 5, active: true },
  { id: "S006", name: "Diesel", group: "Fuel", unit: "Litre", qty: 450, rate: 95, reorder: 100, active: true },
];

function StockList() {
  const [pill, setPill] = useState("All");
  const filtered = stock.filter((s) => pill === "All" || (pill === "Low Stock" ? s.qty <= s.reorder : s.qty > s.reorder));
  return (
    <Shell title="Stock Items">
      <ModuleHeaderTitle icon="📦" title="Stock Items" subtitle="Feed · seed · fuel" bg={C.bgSecondary} />
      <NavPillBar items={["All", "Feed", "Seed", "Medicine", "Fuel", "Low Stock"]} active={pill} onChange={setPill} />
      <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {filtered.map((s) => {
          const isLow = s.qty <= s.reorder;
          return (
            <DenseListTile
              key={s.id}
              primary={`${s.name} · ${s.group}`}
              secondary={`Qty: ${s.qty} ${s.unit} · Rate: ${fmtINR(s.rate)}`}
              amount={fmtINR(s.qty * s.rate)}
              amountColor={isLow ? C.textDanger : C.textSuccess}
              tag={<TagChip type={isLow ? "pending" : "synced"} label={isLow ? "Low Stock" : "OK"} />}
            />
          );
        })}
      </div>
      <button
        className="fixed bottom-20 right-4 z-30 flex items-center justify-center shadow-lg"
        style={{ width: 52, height: 52, borderRadius: 26, background: C.accent, color: "#fff" }}
      >
        <Plus size={22} />
      </button>
    </Shell>
  );
}
