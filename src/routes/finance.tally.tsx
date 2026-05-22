import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, SmallInfoGrid, PrimaryButton, NoteBox, TagChip, DenseListTile } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";

export const Route = createFileRoute("/finance/tally")({ component: Tally });

function Tally() {
  const [tab, setTab] = useState("Export Masters");
  return (
    <Shell title="Tally Integration">
      <ModuleHeaderTitle icon="🔄" title="Tally Integration" subtitle="XML · Excel · API" bg={C.bgInfo} />
      <NavPillBar items={["Export Masters", "Export Vouchers", "Sync Logs"]} active={tab} onChange={setTab} />

      {tab === "Export Masters" && (
        <div className="mt-4 space-y-4">
          <div style={{ fontSize: 13, fontWeight: 500, color: C.textSecondary, textTransform: "uppercase", letterSpacing: "0.04em" }}>Ready to Export</div>
          <SmallInfoGrid items={[
            { label: "Sites", value: "4" },
            { label: "Ponds", value: "12" },
            { label: "Workers", value: "28" },
            { label: "Suppliers", value: "16" },
            { label: "Buyers", value: "6" },
            { label: "Stock Items", value: "34" },
            { label: "Ledgers", value: "22" },
            { label: "Cost Centres", value: "21" },
          ]} />
          <PrimaryButton fullWidth>Export All as XML</PrimaryButton>
          <button style={{ width: "100%", padding: "13px 24px", borderRadius: 20, border: `0.5px solid ${C.borderPrimary}`, fontSize: 14, fontWeight: 500, color: C.textPrimary }}>
            Export as Excel
          </button>
          <NoteBox>POSTs XML to <strong style={{ color: C.textPrimary, fontWeight: 500 }}>localhost:9000</strong> (TallyPrime HTTP) — or download for manual import.</NoteBox>
        </div>
      )}

      {tab === "Export Vouchers" && (
        <div className="mt-4 space-y-3">
          <SmallInfoGrid items={[
            { label: "Purchase Vouchers", value: "48" },
            { label: "Payment Vouchers", value: "32" },
            { label: "Receipt Vouchers", value: "14" },
            { label: "Journal Vouchers", value: "6" },
          ]} />
          <PrimaryButton fullWidth>Sync Now</PrimaryButton>
        </div>
      )}

      {tab === "Sync Logs" && (
        <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
          <DenseListTile primary="Site Master: Bhimavaram Farm" secondary="21-May-2026 14:22 · Cost Centre" tag={<TagChip type="synced" />} />
          <DenseListTile primary="Voucher: Feed Purchase #118" secondary="21-May-2026 14:24" tag={<TagChip type="synced" />} />
          <DenseListTile primary="Voucher: Lease Payment #44" secondary="21-May-2026 14:25" tag={<TagChip type="failed" />} />
          <DenseListTile primary="Voucher: Wages #221" secondary="22-May-2026 09:10" tag={<TagChip type="pending" />} />
        </div>
      )}
    </Shell>
  );
}