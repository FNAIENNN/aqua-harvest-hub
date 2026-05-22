import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { fmtINR } from "@/lib/aqua/data";

export const Route = createFileRoute("/operations/electricity")({ component: Electricity });

const bills = [
  { site: "Bhimavaram Farm", meter: "4421005", month: "May-2026", units: 4820, amount: 38500, status: "pending" as const, due: "15-Jun" },
  { site: "Narsapur Site", meter: "4422109", month: "May-2026", units: 2210, amount: 18450, status: "overdue" as const, due: "10-Jun" },
  { site: "Kakinada Site", meter: "4419988", month: "Apr-2026", units: 1850, amount: 14200, status: "paid" as const, due: "—" },
];

function Electricity() {
  const [pill, setPill] = useState("Pending");
  const filtered = bills.filter(b => pill === "All" || (pill === "Pending" ? b.status !== "paid" : pill === "Paid" ? b.status === "paid" : true));
  return (
    <Shell title="Electricity Bills">
      <ModuleHeaderTitle icon="⚡" title="Electricity Bills" subtitle="Site meters" bg={C.bgWarning} />
      <NavPillBar items={["Pending", "Paid", "All"]} active={pill} onChange={setPill} />
      <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {filtered.map((b, i) => (
          <DenseListTile
            key={i}
            primary={`${b.site} · Meter ${b.meter}`}
            secondary={`${b.month} · ${b.units} units · Due ${b.due}`}
            amount={fmtINR(b.amount)}
            amountColor={b.status === "paid" ? C.textSuccess : C.textDanger}
            tag={<TagChip type={b.status} />}
          />
        ))}
      </div>
    </Shell>
  );
}