import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, NoteBox } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { harvests, fmtINR } from "@/lib/aqua/data";

export const Route = createFileRoute("/finance/harvest")({ component: Harvest });

function Harvest() {
  const [pill, setPill] = useState("Pending Receipt");
  const filtered = harvests.filter(h => pill === "All" || (pill === "Pending Receipt" ? h.balance > 0 : pill === "Completed" ? h.balance === 0 : true));
  return (
    <Shell title="Harvest Sales">
      <ModuleHeaderTitle icon="🦐" title="Harvest Sales" subtitle="Buyer-wise sales" bg={C.bgSuccess} />
      <NavPillBar items={["Pending Receipt", "Completed", "By Site", "All"]} active={pill} onChange={setPill} />
      <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {filtered.map((h) => (
          <DenseListTile
            key={h.id}
            primary={`${h.pond} · ${h.batch} · ${h.buyer}`}
            secondary={`📅 ${h.date} · ${h.site}`}
            amount={fmtINR(h.net)}
            amountColor={C.textSuccess}
            tag={
              <span style={{ fontSize: 11 }}>
                <span style={{ color: C.textInfo }}>Recd {fmtINR(h.received)}</span>
                {h.balance > 0 && <span style={{ color: C.textDanger }}> · Bal {fmtINR(h.balance)}</span>}
              </span>
            }
          />
        ))}
      </div>
      <div className="mt-4"><NoteBox>Tally: Dr Buyer Ledger / Cr <strong style={{ color: C.textPrimary, fontWeight: 500 }}>Shrimp Harvest Sales</strong> / CC: Site/Pond/Batch</NoteBox></div>
    </Shell>
  );
}