import { createFileRoute, useNavigate, Outlet } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, ModuleCard, NoteBox } from "@/components/aqua/ui";

export const Route = createFileRoute("/masters")({ component: MastersHub });

function MastersHub() {
  const nav = useNavigate();
  const location = useLocation();
  const items = [
    { e: "🏢", t: "Site Master", s: "Location · lease", to: "/masters/sites" },
    { e: "🔵", t: "Pond Master", s: "Ponds per site", to: "/masters/ponds" },
    { e: "👷", t: "Worker Master", s: "Labour · drivers", to: "/masters/workers" },
    { e: "🏪", t: "Supplier Master", s: "Vendors · creditors", to: "/masters/suppliers" },
    { e: "👤", t: "Buyer Master", s: "Harvest buyers", to: "/masters/buyers" },
    { e: "👨‍🌾", t: "Owner Master", s: "Land owners", to: "/masters/owners" },
    { e: "📦", t: "Stock Items", s: "Feed · seed · fuel", to: "/masters/stock" },
    { e: "💹", t: "Ledger Master", s: "Tally ledgers", to: "/masters/ledgers" },
    { e: "📍", t: "Cost Centres", s: "Site/Pond/Batch", to: "/masters/costcentres" },
  ];
  
  // Check if a child route is active (anything other than just /masters)
  const isChildRouteActive = location.pathname !== "/masters";
  
  if (isChildRouteActive) {
    return <Outlet />;
  }
  
  return (
    <Shell title="Masters">
      <ModuleHeaderTitle icon="🗂️" title="Masters" subtitle="Configure before recording" />
      <div className="grid grid-cols-2 gap-2">
        {items.map((it) => (
          <ModuleCard key={it.t} emoji={it.e} title={it.t} subtitle={it.s} onClick={() => nav({ to: it.to })} />
        ))}
      </div>
      <div className="mt-4">
        <NoteBox>Masters define your <strong style={{ color: "#111827", fontWeight: 500 }}>Cost Centres</strong> and <strong style={{ color: "#111827", fontWeight: 500 }}>Ledgers</strong> in Tally.</NoteBox>
      </div>
    </Shell>
  );
}