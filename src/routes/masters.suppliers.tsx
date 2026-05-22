import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip, NoteBox } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { suppliers, fmtINR } from "@/lib/aqua/data";

export const Route = createFileRoute("/masters/suppliers")({ component: SuppliersList });

function SuppliersList() {
  const [pill, setPill] = useState("All");
  const filtered = suppliers.filter(s => pill === "All" || s.type === pill);
  return (
    <Shell title="Supplier Master">
      <ModuleHeaderTitle icon="🏪" title="Supplier Master" subtitle="Vendors & creditors" />
      <NavPillBar items={["All", "Feed", "Seed", "Medicine", "Fuel"]} active={pill} onChange={setPill} />
      <div className="mt-3 mb-4" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {filtered.map((s) => (
          <DenseListTile
            key={s.id}
            primary={s.name}
            secondary={<><TagChip type="bank" label={s.type} /> <span style={{ marginLeft: 6 }}>Ph: {s.phone}</span></>}
            amount={s.outstanding > 0 ? fmtINR(s.outstanding) : "₹0"}
            amountColor={s.outstanding > 0 ? C.textDanger : C.textSecondary}
          />
        ))}
      </div>
      <NoteBox>Sundry Creditor in Tally → Group: <strong style={{ color: C.textPrimary, fontWeight: 500 }}>Sundry Creditors</strong></NoteBox>
    </Shell>
  );
}