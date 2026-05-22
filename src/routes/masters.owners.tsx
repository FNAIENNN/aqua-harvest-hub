import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { fmtINR } from "@/lib/aqua/data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/masters/owners")({ component: OwnersList });

const owners = [
  { id: "O001", name: "Rama Rao", sites: ["Bhimavaram Farm"], contact: "9876543210", lease: 45000, active: true },
  { id: "O002", name: "K. Sharma", sites: ["Narsapur Site"], contact: "9123456789", lease: 32000, active: true },
  { id: "O003", name: "M. Reddy", sites: ["Kakinada Farm"], contact: "9876543211", lease: 28000, active: true },
];

function OwnersList() {
  const [pill, setPill] = useState("All");
  const filtered = owners.filter((o) => pill === "All" || (pill === "Active" ? o.active : !o.active));
  return (
    <Shell title="Owner Master">
      <ModuleHeaderTitle icon="👨‍🌾" title="Owner Master" subtitle="Land owners" bg={C.bgSecondary} />
      <NavPillBar items={["All", "Active", "Inactive"]} active={pill} onChange={setPill} />
      <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {filtered.map((o) => (
          <DenseListTile
            key={o.id}
            primary={<>{o.name} <span style={{ color: C.textSecondary, fontSize: 11, fontWeight: 400 }}>· {o.id}</span></>}
            secondary={`${o.sites.join(", ")} · ${o.contact}`}
            amount={fmtINR(o.lease)}
            amountColor={C.textWarning}
            tag={<TagChip type={o.active ? "active" : "inactive"} />}
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
