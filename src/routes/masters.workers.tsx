import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { workers, fmtINR } from "@/lib/aqua/data";

export const Route = createFileRoute("/masters/workers")({ component: WorkersList });

function WorkersList() {
  const [pill, setPill] = useState("All");
  const filtered = workers.filter(w => pill === "All" || w.role === pill);
  return (
    <Shell title="Worker Master">
      <ModuleHeaderTitle icon="👷" title="Worker Master" subtitle="Labour, feeders, drivers" bg={C.bgWarning} />
      <NavPillBar items={["All", "Labour", "Feeder", "Supervisor", "Driver", "Watchman"]} active={pill} onChange={setPill} />
      <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {filtered.map((w) => (
          <DenseListTile
            key={w.id}
            primary={w.name}
            secondary={<><TagChip type="bank" label={w.role} /> <span style={{ marginLeft: 6 }}>{w.siteName} · {fmtINR(w.rate)}/day</span></>}
            tag={<span style={{ width: 8, height: 8, borderRadius: 4, background: w.active ? C.textSuccess : C.borderPrimary, display: "inline-block" }} />}
          />
        ))}
      </div>
    </Shell>
  );
}