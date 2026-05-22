import * as React from "react";
import { BottomNav } from "./BottomNav";
import { C } from "@/lib/aqua/tokens";

export function Shell({
  title,
  right,
  children,
  back,
  onBack,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  back?: boolean;
  onBack?: () => void;
}) {
  return (
    <div className="min-h-screen flex justify-center" style={{ background: C.bgPrimary, fontFamily: "'DM Sans', sans-serif" }}>
      <div className="w-full max-w-[480px] relative" style={{ background: C.bgPrimary }}>
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-4"
          style={{
            height: 52,
            background: C.bgPrimary,
            borderBottom: `0.5px solid ${C.borderTertiary}`,
          }}
        >
          <div className="flex items-center gap-2">
            {back && (
              <button
                onClick={onBack}
                style={{ color: C.textPrimary, fontSize: 18, lineHeight: 1 }}
                aria-label="Back"
              >
                ‹
              </button>
            )}
            <h1 style={{ fontSize: 18, fontWeight: 500, color: C.textPrimary }}>{title}</h1>
          </div>
          <div>{right}</div>
        </header>
        <main className="px-4 pt-3 pb-24">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}