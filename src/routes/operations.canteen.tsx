import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, NoteBox, PrimaryButton, SubHeader } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { fmtINR } from "@/lib/aqua/data";

export const Route = createFileRoute("/operations/canteen")({ component: Canteen });

const entries = [
  {
    date: "22-May-2026",
    site: "Bhimavaram Farm",
    workers: 24,
    items: [
      { name: "Rice", qty: "6 kg", amount: 420 },
      { name: "Dal", qty: "2 kg", amount: 360 },
      { name: "Oil", qty: "2 ltr", amount: 520 },
    ],
    total: 1300,
  },
  {
    date: "21-May-2026",
    site: "Narsapur Site",
    workers: 18,
    items: [
      { name: "Vegetables", qty: "8 kg", amount: 640 },
      { name: "Salt", qty: "0.5 kg", amount: 50 },
    ],
    total: 690,
  },
];

function Canteen() {
  const [tab, setTab] = useState("Daily Entry");

  return (
    <Shell title="Canteen Expenses">
      <ModuleHeaderTitle icon="🍚" title="Canteen Expenses" subtitle="Worker meals" bg={C.bgSuccess} />
      <NavPillBar items={["Daily Entry", "Monthly View", "Purchases"]} active={tab} onChange={setTab} />

      {tab === "Daily Entry" && (
        <div className="mt-4 space-y-4">
          <div
            style={{
              padding: 14,
              background: C.bgSecondary,
              borderRadius: 10,
              border: `0.5px solid ${C.borderTertiary}`,
            }}
          >
            <div style={{ fontSize: 13, color: C.textSecondary, marginBottom: 8 }}>
              <strong style={{ color: C.textPrimary }}>22-May-2026</strong> · Bhimavaram
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: C.textPrimary }}>Workers today: 24</div>
            <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 6 }}>From attendance marked</div>
          </div>

          <div>
            <SubHeader>Meals Served</SubHeader>
            <div className="flex gap-2 flex-wrap">
              {["🌅 Breakfast", "☀️ Lunch", "🌙 Dinner"].map((m) => (
                <button
                  key={m}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 20,
                    border: `0.5px solid ${C.borderSecondary}`,
                    background: C.bgSecondary,
                    color: C.textPrimary,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <SubHeader>Grocery Items</SubHeader>
            <div
              style={{
                border: `0.5px solid ${C.borderTertiary}`,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              {[
                { item: "Rice", qty: "6 kg", amt: 420 },
                { item: "Dal", qty: "2 kg", amt: 360 },
                { item: "Oil", qty: "2 ltr", amt: 520 },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2.5"
                  style={{
                    borderBottom: i < 2 ? `0.5px solid ${C.borderTertiary}` : "none",
                  }}
                >
                  <div className="flex-1">
                    <div style={{ fontSize: 14, fontWeight: 500, color: C.textPrimary }}>
                      {row.item}
                    </div>
                    <div style={{ fontSize: 11, color: C.textSecondary }}>{row.qty}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.textDanger }}>
                    {fmtINR(row.amt)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2 px-1">
              <button
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: C.textInfo,
                  padding: "6px 12px",
                  border: `0.5px solid ${C.borderInfo}`,
                  borderRadius: 20,
                }}
              >
                + Add Row
              </button>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>
                Total: {fmtINR(1300)}
              </div>
            </div>
          </div>

          <PrimaryButton fullWidth>Save Canteen Entry</PrimaryButton>
          <NoteBox>
            Tally: <strong style={{ color: C.textPrimary, fontWeight: 500 }}>Dr Canteen Expense</strong> / Cr Grocery Supplier / CC: Site
          </NoteBox>
        </div>
      )}

      {tab === "Monthly View" && (
        <div className="mt-3 space-y-3">
          {entries.map((e, i) => (
            <details
              key={i}
              style={{
                border: `0.5px solid ${C.borderTertiary}`,
                borderRadius: 10,
                padding: 12,
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                  color: C.textPrimary,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{e.site} · {e.workers} workers</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: C.textDanger }}>
                  {fmtINR(e.total)}
                </span>
              </summary>
              <div className="mt-3 space-y-1">
                {e.items.map((item, j) => (
                  <div
                    key={j}
                    className="flex items-center justify-between text-sm"
                  >
                    <span style={{ color: C.textSecondary }}>{item.name}</span>
                    <span style={{ color: C.textDanger, fontWeight: 500 }}>
                      {fmtINR(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}

      {tab === "Purchases" && (
        <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
          {[
            { supplier: "Local Grocery", date: "22-May-2026", items: "Rice, Dal, Oil", amount: 1300 },
            { supplier: "Vegetable Vendor", date: "21-May-2026", items: "Vegetables, Spices", amount: 690 },
          ].map((p, i) => (
            <DenseListTile
              key={i}
              primary={p.supplier}
              secondary={`${p.date} · ${p.items}`}
              amount={fmtINR(p.amount)}
              amountColor={C.textDanger}
              onClick={() => {}}
            />
          ))}
        </div>
      )}
    </Shell>
  );
}
