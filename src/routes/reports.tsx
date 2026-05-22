import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, SmallInfoGrid, NoteBox } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { sites, fmtINR } from "@/lib/aqua/data";

export const Route = createFileRoute("/reports")({ component: Reports });

function Reports() {
  const [tab, setTab] = useState("Site Expenses");
  return (
    <Shell title="Reports">
      <ModuleHeaderTitle icon="📊" title="Reports" subtitle="Filterable analytics" />
      <NavPillBar items={["Site Expenses", "Pond Costs", "Wages", "Supplier", "Harvest P&L", "Tally"]} active={tab} onChange={setTab} />

      {tab === "Site Expenses" && (
        <div className="mt-4 space-y-2">
          {sites.filter(s => s.active).map((s) => (
            <details key={s.id} style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, padding: 12 }}>
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: C.textPrimary }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: C.textSecondary }}>{s.location}</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: C.textDanger }}>{fmtINR(s.monthExpense)}</div>
              </summary>
              <div className="mt-3">
                <SmallInfoGrid items={[
                  { label: "Seed", value: fmtINR(s.monthExpense * 0.18) },
                  { label: "Feed", value: fmtINR(s.monthExpense * 0.32) },
                  { label: "Labour", value: fmtINR(s.monthExpense * 0.16) },
                  { label: "Lease", value: fmtINR(s.monthExpense * 0.10) },
                  { label: "Electricity", value: fmtINR(s.monthExpense * 0.08) },
                  { label: "Fuel", value: fmtINR(s.monthExpense * 0.06) },
                  { label: "Medicine", value: fmtINR(s.monthExpense * 0.05) },
                  { label: "Other", value: fmtINR(s.monthExpense * 0.05) },
                ]} />
              </div>
            </details>
          ))}
        </div>
      )}

      {tab === "Harvest P&L" && (
        <div className="mt-4 space-y-3">
          {[{ p: "Pond A1 · 2026-01 · Bhimavaram", rev: 640000, cost: 360000 },
            { p: "Pond B1 · 2026-02 · Narsapur", rev: 720000, cost: 480000 }].map((b, i) => {
            const net = b.rev - b.cost;
            return (
              <div key={i} style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.textPrimary }}>{b.p}</div>
                <div className="flex items-center justify-between mt-2" style={{ fontSize: 14 }}>
                  <span style={{ color: C.textSecondary }}>Revenue</span>
                  <span style={{ color: C.textSuccess, fontSize: 18, fontWeight: 600 }}>{fmtINR(b.rev)}</span>
                </div>
                <div className="flex items-center justify-between" style={{ fontSize: 13 }}>
                  <span style={{ color: C.textSecondary }}>Total costs</span>
                  <span style={{ color: C.textDanger }}>−{fmtINR(b.cost)}</span>
                </div>
                <div style={{ height: 0.5, background: C.borderTertiary, margin: "10px 0" }} />
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.textPrimary }}>Net Profit</span>
                  <span style={{ fontSize: 20, fontWeight: 600, color: net >= 0 ? C.textSuccess : C.textDanger }}>{fmtINR(net)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab !== "Site Expenses" && tab !== "Harvest P&L" && (
        <div className="mt-4">
          <NoteBox>{tab} report — connect data source to populate. Export to CSV / PDF available from filter bar.</NoteBox>
        </div>
      )}
    </Shell>
  );
}