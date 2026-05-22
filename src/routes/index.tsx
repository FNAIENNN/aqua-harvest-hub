import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import {
  NavPillBar,
  FinanceSummaryCard,
  DenseListTile,
  TagChip,
  SubHeader,
  NoteBox,
} from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { dashboard, sites, pendingAlerts, fmtINR } from "@/lib/aqua/data";
import { UserCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const nav = useNavigate();
  const [filter, setFilter] = useState("All Sites");
  return (
    <Shell
      title="AquaFinance"
      right={<UserCircle2 size={26} color={C.textSecondary} strokeWidth={1.5} />}
    >
      <NavPillBar
        items={["All Sites", "Bhimavaram", "Narsapur", "Kakinada", "This Month", "Custom"]}
        active={filter}
        onChange={setFilter}
      />

      <SubHeader>Overview</SubHeader>
      <div className="grid grid-cols-2 gap-2">
        <FinanceSummaryCard label="Total Expenses" amount={fmtINR(dashboard.expenses)} icon="💸" color={C.textDanger} iconBg={C.bgDanger} />
        <FinanceSummaryCard label="Harvest Revenue" amount={fmtINR(dashboard.revenue)} icon="🦐" color={C.textSuccess} iconBg={C.bgSuccess} />
        <FinanceSummaryCard label="Net Profit" amount={fmtINR(dashboard.netPL)} icon="📊" color={dashboard.netPL >= 0 ? C.textSuccess : C.textDanger} iconBg={C.bgSuccess} />
        <FinanceSummaryCard label="Pending Dues" amount={fmtINR(dashboard.pendingDues)} icon="⏳" color={C.textWarning} iconBg={C.bgWarning} pending={`${dashboard.pendingCount} items due`} />
        <FinanceSummaryCard label="Stock Value" amount={fmtINR(dashboard.stockValue)} icon="📦" color={C.textInfo} iconBg={C.bgInfo} />
        <FinanceSummaryCard label="Salary Due" amount={fmtINR(dashboard.salaryDue)} icon="👷" color={C.textWarning} iconBg={C.bgWarning} />
        <FinanceSummaryCard label="Cash Balance" amount={fmtINR(dashboard.cashBalance)} icon="🏦" color={C.textSuccess} iconBg={C.bgSuccess} />
        <FinanceSummaryCard label="Bank Balance" amount={fmtINR(dashboard.bankBalance)} icon="💳" color={C.textInfo} iconBg={C.bgInfo} />
      </div>

      <SubHeader>Site-wise Expenses</SubHeader>
      <div className="-mx-4 px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 pb-1">
          {sites.filter(s => s.active).map((s) => (
            <button
              key={s.id}
              onClick={() => nav({ to: "/masters/sites" })}
              style={{
                padding: 12,
                border: `0.5px solid ${C.borderTertiary}`,
                borderRadius: 14,
                width: 168,
                flexShrink: 0,
                background: C.bgPrimary,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = C.bgSecondary;
                e.currentTarget.style.borderColor = C.borderPrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = C.bgPrimary;
                e.currentTarget.style.borderColor = C.borderTertiary;
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 500, color: C.textPrimary }}>{s.name}</div>
              <div style={{ fontSize: 11, color: C.textSecondary }}>{s.location}</div>
              <div style={{ marginTop: 8, fontSize: 18, fontWeight: 600, color: C.textDanger }}>
                {fmtINR(s.monthExpense)}
              </div>
              <div style={{ fontSize: 11, color: C.textSecondary }}>this month</div>
            </button>
          ))}
        </div>
      </div>

      <SubHeader>Pending Alerts</SubHeader>
      <div style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
        {pendingAlerts.map((a) => (
          <DenseListTile
            key={a.id}
            primary={a.primary}
            secondary={a.secondary}
            amount={fmtINR(a.amount)}
            amountColor={C.textDanger}
            tag={<TagChip type={a.tag} />}
          />
        ))}
      </div>

      <div className="mt-4">
        <NoteBox>
          Last Tally sync: <strong style={{ color: C.textPrimary, fontWeight: 500 }}>21-May-2026</strong> · 3 entries pending sync
        </NoteBox>
      </div>
    </Shell>
  );
}
