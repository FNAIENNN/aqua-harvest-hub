import { Link, useLocation } from "@tanstack/react-router";
import { LayoutGrid, FolderTree, CalendarDays, ReceiptText, BarChart3 } from "lucide-react";
import { C } from "@/lib/aqua/tokens";

const TABS = [
  { to: "/", label: "Dashboard", icon: LayoutGrid },
  { to: "/masters", label: "Masters", icon: FolderTree },
  { to: "/operations", label: "Operations", icon: CalendarDays },
  { to: "/finance", label: "Finance", icon: ReceiptText },
  { to: "/reports", label: "Reports", icon: BarChart3 },
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40"
      style={{
        background: C.bgPrimary,
        borderTop: `0.5px solid ${C.borderTertiary}`,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex">
        {TABS.map((t) => {
          const active =
            t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
              style={{ color: active ? C.accent : C.textSecondary }}
            >
              <Icon size={20} strokeWidth={active ? 2.2 : 1.6} />
              <span style={{ fontSize: 10, fontWeight: active ? 500 : 400 }}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}