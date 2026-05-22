import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip, NoteBox } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { fmtINR } from "@/lib/aqua/data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/masters/ledgers")({ component: LedgersList });

const ledgers = [
  { id: "L001", name: "Labour Wages", group: "Direct Expenses", type: "expense", balance: 0, active: true },
  { id: "L002", name: "Land Lease Rent", group: "Direct Expenses", type: "expense", balance: 0, active: true },
  { id: "L003", name: "Seed Purchase", group: "Purchase Accounts", type: "purchase", balance: 0, active: true },
  { id: "L004", name: "Feed Purchase", group: "Purchase Accounts", type: "purchase", balance: 0, active: true },
  { id: "L005", name: "Electricity Charges", group: "Direct Expenses", type: "expense", balance: 0, active: true },
  { id: "L006", name: "Shrimp Harvest Sales", group: "Sales Accounts", type: "income", balance: 0, active: true },
  { id: "L007", name: "Diesel Expense", group: "Direct Expenses", type: "expense", balance: 0, active: true },
  { id: "L008", name: "Vehicle Rent", group: "Direct Expenses", type: "expense", balance: 0, active: true },
];

function LedgersList() {
  const [pill, setPill] = useState("All");
  const types = ["All", "Purchase", "Sales", "Expense", "Income"];
  const filtered = ledgers.filter(
    (l) => pill === "All" || l.type.toLowerCase() === pill.toLowerCase()
  );

  return (
    <Shell title="Ledger Master">
      <ModuleHeaderTitle icon="💹" title="Ledger Master" subtitle="Tally ledgers" bg={C.bgSecondary} />
      <NavPillBar items={types} active={pill} onChange={setPill} />
      <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {filtered.map((l) => (
          <DenseListTile
            key={l.id}
            primary={`${l.name}`}
            secondary={`${l.group} · ${l.type}`}
            amount={fmtINR(l.balance)}
            amountColor={C.textSecondary}
            tag={<TagChip type={l.active ? "active" : "inactive"} />}
          />
        ))}
      </div>
      <div className="mt-4">
        <NoteBox>
          Ledgers map directly to <strong style={{ color: C.textPrimary, fontWeight: 500 }}>Tally Group Masters</strong>. Create purchase/expense ledgers before recording transactions.
        </NoteBox>
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
