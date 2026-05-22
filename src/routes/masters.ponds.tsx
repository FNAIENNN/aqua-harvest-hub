import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { ponds, sites } from "@/lib/aqua/data";

export const Route = createFileRoute("/masters/ponds")({ component: PondsList });

function PondsList() {
  const [pill, setPill] = useState("All Sites");
  const items = ["All Sites", ...sites.filter(s => s.active).map(s => s.name)];
  const filtered = ponds.filter(p => pill === "All Sites" || p.siteName === pill);
  return (
    <Shell title="Pond Master">
      <ModuleHeaderTitle icon="🔵" title="Pond Master" subtitle="Per-site ponds & batches" bg={C.bgInfo} />
      <NavPillBar items={items} active={pill} onChange={setPill} />
      <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {filtered.map((p) => (
          <DenseListTile
            key={p.id}
            primary={<>{p.name} <span style={{ color: C.textSecondary, fontSize: 11, fontWeight: 400 }}>· {p.id}</span></>}
            secondary={`🏢 ${p.siteName} · ${p.culture} · Batch ${p.batch}`}
            tag={<TagChip type={p.status === "Active" ? "active" : p.status === "Harvested" ? "paid" : "inactive"} label={p.status} />}
          />
        ))}
      </div>
    </Shell>
  );
}