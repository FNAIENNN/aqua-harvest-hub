import { createFileRoute, useNavigate, Outlet } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, ModuleCard, NoteBox } from "@/components/aqua/ui";

export const Route = createFileRoute("/finance")({ component: FinanceHub });

function FinanceHub() {
  const nav = useNavigate();
  const location = useLocation();
  const items = [
    { e: "🛒", t: "Purchases", s: "Seed · feed · medicine", to: "/finance/purchases" },
    { e: "💳", t: "Payments", s: "Out-flow log", to: "/finance/payments" },
    { e: "📥", t: "Receipts", s: "Harvest & advance", to: "/finance/payments" },
    { e: "🏠", t: "Lease", s: "Land payments", to: "/finance/lease" },
    { e: "🦐", t: "Harvest Sales", s: "Sale + balance", to: "/finance/harvest" },
    { e: "🔄", t: "Tally Export", s: "XML & Excel", to: "/finance/tally" },
  ];
  
  // Check if a child route is active (anything other than just /finance)
  const isChildRouteActive = location.pathname !== "/finance";
  
  if (isChildRouteActive) {
    return <Outlet />;
  }
  
  return (
    <Shell title="Finance">
      <ModuleHeaderTitle icon="📒" title="Finance" subtitle="All money in & out" />
      <div className="grid grid-cols-2 gap-2">
        {items.map((it) => (
          <ModuleCard key={it.t} emoji={it.e} title={it.t} subtitle={it.s} onClick={() => nav({ to: it.to })} />
        ))}
      </div>
      <div className="mt-4">
        <NoteBox>Each entry maps to a Tally voucher with the correct Cost Centre allocation.</NoteBox>
      </div>
    </Shell>
  );
}