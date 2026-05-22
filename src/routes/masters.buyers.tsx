import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { fmtINR } from "@/lib/aqua/data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/masters/buyers")({ component: BuyersList });

const buyers = [
  { id: "B001", name: "Coastal Seafood", location: "Visakhapatnam", phone: "9876543210", outstanding: 145000, active: true },
  { id: "B002", name: "Export Foods Ltd", location: "Mumbai", phone: "9123456789", outstanding: 0, active: true },
  { id: "B003", name: "Premium Aqua", location: "Kolkata", phone: "9988776655", outstanding: 67500, active: true },
];

function BuyersList() {
  const [pill, setPill] = useState("All");
  const filtered = buyers.filter((b) => pill === "All" || (pill === "Active" ? b.active : !b.active));
  return (
    <Shell title="Buyer Master">
      <ModuleHeaderTitle icon="👤" title="Buyer Master" subtitle="Harvest buyers" bg={C.bgSecondary} />
      <NavPillBar items={["All", "Active", "Inactive"]} active={pill} onChange={setPill} />
      <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {filtered.map((b) => (
          <DenseListTile
            key={b.id}
            primary={<>{b.name} <span style={{ color: C.textSecondary, fontSize: 11, fontWeight: 400 }}>· {b.id}</span></>}
            secondary={`📍 ${b.location} · ${b.phone}`}
            amount={fmtINR(b.outstanding)}
            amountColor={b.outstanding > 0 ? C.textDanger : C.textSecondary}
            tag={<TagChip type={b.active ? "active" : "inactive"} />}
          />
        ))}
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
