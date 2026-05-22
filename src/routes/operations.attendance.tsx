import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, NoteBox, PrimaryButton } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { workers, fmtINR } from "@/lib/aqua/data";

export const Route = createFileRoute("/operations/attendance")({ component: Attendance });

type Status = "P" | "A" | "H";

function Attendance() {
  const [tab, setTab] = useState("Mark Attendance");
  const [marks, setMarks] = useState<Record<string, Status>>({});

  const grouped = workers.reduce<Record<string, typeof workers>>((acc, w) => {
    (acc[w.siteName] ||= []).push(w);
    return acc;
  }, {});

  const marked = Object.keys(marks).length;

  return (
    <Shell title="Attendance & Wages">
      <ModuleHeaderTitle icon="🪪" title="Attendance & Wages" subtitle="Daily entry & wage sheet" />
      <NavPillBar items={["Mark Attendance", "Wage Sheet", "Payment History"]} active={tab} onChange={setTab} />

      {tab === "Mark Attendance" && (
        <>
          <div className="mt-3 mb-4" style={{ fontSize: 12, color: C.textSecondary }}>
            Date: <strong style={{ color: C.textPrimary, fontWeight: 500 }}>22-May-2026</strong>
          </div>
          {Object.entries(grouped).map(([site, ws]) => (
            <div key={site} className="mb-4">
              <div
                style={{
                  fontSize: 13, fontWeight: 500, color: C.textSecondary,
                  textTransform: "uppercase", letterSpacing: "0.04em",
                  background: C.bgSecondary, padding: "6px 12px", borderRadius: 8,
                }}
              >
                {site}
              </div>
              <div style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, marginTop: 8, overflow: "hidden" }}>
                {ws.map((w) => (
                  <div key={w.id} className="flex items-center justify-between px-3 py-2.5" style={{ borderBottom: `0.5px solid ${C.borderTertiary}` }}>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: 14, fontWeight: 500, color: C.textPrimary }}>{w.name}</div>
                      <div style={{ fontSize: 12, color: C.textSecondary }}>{w.role} · {fmtINR(w.rate)}/day</div>
                    </div>
                    <Segment value={marks[w.id]} onChange={(v) => setMarks((m) => ({ ...m, [w.id]: v }))} />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div
            className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex items-center justify-between px-4 py-3"
            style={{ background: C.bgPrimary, borderTop: `0.5px solid ${C.borderTertiary}` }}
          >
            <span style={{ fontSize: 12, color: C.textSecondary }}>{marked} workers marked</span>
            <PrimaryButton>Calculate Wages →</PrimaryButton>
          </div>
        </>
      )}

      {tab === "Wage Sheet" && <WageSheet />}
      {tab === "Payment History" && (
        <div className="mt-4"><NoteBox>No payments recorded yet for this period.</NoteBox></div>
      )}
    </Shell>
  );
}

function Segment({ value, onChange }: { value?: Status; onChange: (v: Status) => void }) {
  const opts: { v: Status; bg: string; fg: string }[] = [
    { v: "P", bg: C.bgSuccess, fg: C.textSuccess },
    { v: "A", bg: C.bgDanger, fg: C.textDanger },
    { v: "H", bg: C.bgWarning, fg: C.textWarning },
  ];
  return (
    <div className="flex gap-1">
      {opts.map((o) => {
        const on = value === o.v;
        return (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            style={{
              width: 32, height: 32, borderRadius: 8,
              border: `0.5px solid ${on ? o.fg : C.borderSecondary}`,
              background: on ? o.bg : C.bgPrimary,
              color: on ? o.fg : C.textSecondary,
              fontSize: 13, fontWeight: 500,
            }}
          >
            {o.v === "H" ? "½" : o.v}
          </button>
        );
      })}
    </div>
  );
}

function WageSheet() {
  return (
    <div className="mt-4 overflow-x-auto" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 12 }}>
      <table className="w-full" style={{ fontSize: 13, color: C.textPrimary, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: C.bgSecondary }}>
            {["Worker", "Days", "Rate", "Total", "Paid", "Bal", ""].map(h => (
              <th key={h} style={{ padding: 10, fontSize: 11, fontWeight: 500, color: C.textSecondary, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {workers.filter(w => w.active).map((w) => {
            const total = w.rate * 22;
            const paid = total - 2400;
            return (
              <tr key={w.id} style={{ borderTop: `0.5px solid ${C.borderTertiary}` }}>
                <td style={{ padding: 10 }}>{w.name}</td>
                <td style={{ padding: 10 }}>22</td>
                <td style={{ padding: 10 }}>{fmtINR(w.rate)}</td>
                <td style={{ padding: 10, fontWeight: 500 }}>{fmtINR(total)}</td>
                <td style={{ padding: 10, color: C.textSuccess }}>{fmtINR(paid)}</td>
                <td style={{ padding: 10, color: C.textDanger }}>{fmtINR(2400)}</td>
                <td style={{ padding: 10 }}>
                  <button style={{ color: C.textInfo, fontSize: 12, fontWeight: 500 }}>Pay</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}