import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip, NoteBox } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { fmtINR } from "@/lib/aqua/data";

export const Route = createFileRoute("/finance/lease")({ component: Lease });

const leases = [
  { site: "Bhimavaram Farm", owner: "Rama Rao", amt: 45000, due: "25-May-2026", status: "overdue" as const },
  { site: "Narsapur Site", owner: "K. Sharma", amt: 32000, due: "01-Jun-2026", status: "pending" as const },
  { site: "Kakinada Site", owner: "P. Reddy", amt: 28000, due: "05-May-2026", status: "paid" as const },
];

function Lease() {
  const [pill, setPill] = useState("All");
  return (
    <Shell title="Lease Payments">
      <ModuleHeaderTitle icon="🏠" title="Lease Payments" subtitle="Land owners" bg={C.bgWarning} />
      <NavPillBar items={["All", "Due Soon", "Overdue", "Paid"]} active={pill} onChange={setPill} />
      <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {leases.map((l, i) => (
          <DenseListTile
            key={i}
            primary={`${l.site} · ${l.owner}`}
            secondary={`Lease ${fmtINR(l.amt)}/mo · Due ${l.due}`}
            amount={fmtINR(l.amt)}
            amountColor={l.status === "paid" ? C.textSuccess : C.textDanger}
            tag={<TagChip type={l.status} />}
          />
        ))}
      </div>
      <div className="mt-4"><NoteBox>Tally: Dr <strong style={{ color: C.textPrimary, fontWeight: 500 }}>Land Lease Rent</strong> / Cr Cash-Bank / CC: Site</NoteBox></div>
    </Shell>
  );
}