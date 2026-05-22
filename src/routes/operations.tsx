import { createFileRoute, useNavigate, Outlet } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, ModuleCard } from "@/components/aqua/ui";

export const Route = createFileRoute("/operations")({ component: OperationsHub });

function OperationsHub() {
  const nav = useNavigate();
  const location = useLocation();
  const items = [
    { e: "🪪", t: "Attendance & Wages", s: "Mark daily presence", to: "/operations/attendance" },
    { e: "🐟", t: "Daily Feeding", s: "Log feed per pond", to: "/operations/feeding" },
    { e: "🍚", t: "Canteen Expenses", s: "Worker meals", to: "/operations/canteen" },
    { e: "🚗", t: "Vehicle & Fuel", s: "Trips & diesel", to: "/operations/vehicles" },
    { e: "⚡", t: "Electricity Bills", s: "Site-wise meters", to: "/operations/electricity" },
  ];
  
  // Check if a child route is active (anything other than just /operations)
  const isChildRouteActive = location.pathname !== "/operations";
  
  if (isChildRouteActive) {
    return <Outlet />;
  }
  
  return (
    <Shell title="Operations">
      <ModuleHeaderTitle icon="🗓️" title="Operations" subtitle="Daily site activity" />
      <div className="grid grid-cols-2 gap-2">
        {items.map((it) => (
          <ModuleCard key={it.t} emoji={it.e} title={it.t} subtitle={it.s} onClick={() => nav({ to: it.to })} />
        ))}
      </div>
    </Shell>
  );
}