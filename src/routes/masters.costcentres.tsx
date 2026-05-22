import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, NoteBox } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";

export const Route = createFileRoute("/masters/costcentres")({ component: CostCentresList });

const costCentres = [
  { id: "CC001", name: "Bhimavaram", type: "Site", parent: "-", level: "Site", active: true },
  { id: "CC002", name: "Bhimavaram - A1", type: "Pond", parent: "CC001", level: "Pond", active: true },
  { id: "CC003", name: "Bhimavaram - A1 - 2026-01", type: "Batch", parent: "CC002", level: "Batch", active: true },
  { id: "CC004", name: "Narsapur Site", type: "Site", parent: "-", level: "Site", active: true },
  { id: "CC005", name: "Narsapur - B1", type: "Pond", parent: "CC004", level: "Pond", active: true },
  { id: "CC006", name: "Kakinada Farm", type: "Site", parent: "-", level: "Site", active: true },
];

function CostCentresList() {
  const [pill, setPill] = useState("All");
  const filtered = costCentres.filter(
    (c) => pill === "All" || c.type === pill
  );

  return (
    <Shell title="Cost Centres">
      <ModuleHeaderTitle icon="📍" title="Cost Centres" subtitle="Site/Pond/Batch hierarchy" bg={C.bgSecondary} />
      <NavPillBar items={["All", "Site", "Pond", "Batch"]} active={pill} onChange={setPill} />
      <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {filtered.map((c) => {
          const indent = c.level === "Batch" ? "  " : c.level === "Pond" ? " " : "";
          return (
            <DenseListTile
              key={c.id}
              primary={`${indent}${c.name}`}
              secondary={`${c.type}${c.parent !== "-" ? ` · Parent: ${c.parent}` : ""}`}
              amountColor={C.textSecondary}
              onClick={() => {}}
            />
          );
        })}
      </div>
      <div className="mt-4">
        <NoteBox>
          <strong style={{ color: C.textPrimary, fontWeight: 500 }}>Tally Mapping:</strong> Site → Cost Centre (L1) → Pond (L2) → Batch (L3). Each transaction allocates to the respective Batch Cost Centre.
        </NoteBox>
      </div>
    </Shell>
  );
}
