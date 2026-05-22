import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { payments, fmtINR } from "@/lib/aqua/data";

export const Route = createFileRoute("/finance/payments")({ component: Payments });

function Payments() {
  const [tab, setTab] = useState("Payments");
  return (
    <Shell title="Payments & Receipts">
      <ModuleHeaderTitle icon="💳" title="Payments & Receipts" subtitle="All cash movement" bg={C.bgInfo} />
      <NavPillBar items={["Payments", "Receipts", "All"]} active={tab} onChange={setTab} />
      <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {payments.map((p) => (
          <DenseListTile
            key={p.id}
            primary={p.party}
            secondary={p.date}
            amount={fmtINR(p.amount)}
            amountColor={p.status === "paid" ? C.textSuccess : C.textWarning}
            tag={<TagChip type={p.mode} />}
          />
        ))}
      </div>
    </Shell>
  );
}