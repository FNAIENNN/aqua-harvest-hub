import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, DenseListTile, TagChip, SmallInfoGrid, NoteBox, PrimaryButton, SubHeader } from "@/components/aqua/ui";
import { C } from "@/lib/aqua/tokens";
import { fmtINR } from "@/lib/aqua/data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/operations/vehicles")({ component: Vehicles });

const trips = [
  { vehicle: "TG-09-AB-1234", purpose: "Feed Transport", from: "Vizag", to: "Bhimavaram", date: "22-May-2026", rent: 1200, fuel: 120, fuelAmt: 11400, total: 12600, paid: true },
  { vehicle: "TG-09-CD-5678", purpose: "Harvest", from: "Bhimavaram", to: "Export Port", date: "21-May-2026", rent: 1800, fuel: 180, fuelAmt: 17100, total: 18900, paid: false },
  { vehicle: "TG-09-EF-9012", purpose: "Worker Transport", from: "Narsapur", to: "Kakinada", date: "20-May-2026", rent: 600, fuel: 60, fuelAmt: 5700, total: 6300, paid: true },
];

const vehicles = [
  { number: "TG-09-AB-1234", type: "Truck", owner: "Ram Transport", rate: 1200, active: true },
  { number: "TG-09-CD-5678", type: "Truck", owner: "Sai Fleet", rate: 1800, active: true },
  { number: "TG-09-EF-9012", type: "Van", owner: "Ram Transport", rate: 600, active: true },
];

function Vehicles() {
  const [tab, setTab] = useState("Trips");

  return (
    <Shell title="Vehicles & Fuel">
      <ModuleHeaderTitle icon="🚗" title="Vehicles & Fuel" subtitle="Trips · fuel · rentals" bg={C.bgWarning} />
      <NavPillBar items={["Trips", "Fuel Log", "Vehicle Master", "Summary"]} active={tab} onChange={setTab} />

      {tab === "Trips" && (
        <>
          <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
            {trips.map((t, i) => (
              <DenseListTile
                key={i}
                primary={`${t.vehicle} · ${t.purpose}`}
                secondary={`📍 ${t.from} → ${t.to} · ${t.date}`}
                amount={fmtINR(t.total)}
                amountColor={C.textDanger}
                tag={<TagChip type={t.paid ? "paid" : "unpaid"} />}
              />
            ))}
          </div>
          <button
            className="fixed bottom-20 right-4 z-30 flex items-center justify-center shadow-lg"
            style={{ width: 52, height: 52, borderRadius: 26, background: C.accent, color: "#fff" }}
          >
            <Plus size={22} />
          </button>
        </>
      )}

      {tab === "Fuel Log" && (
        <div className="mt-3 space-y-2">
          {[
            { date: "22-May-2026", vehicle: "TG-09-AB-1234", qty: 120, rate: 95, amount: 11400 },
            { date: "21-May-2026", vehicle: "TG-09-CD-5678", qty: 180, rate: 95, amount: 17100 },
            { date: "20-May-2026", vehicle: "TG-09-EF-9012", qty: 60, rate: 95, amount: 5700 },
          ].map((f, i) => (
            <DenseListTile
              key={i}
              primary={f.vehicle}
              secondary={`${f.date} · ${f.qty} L @ ${fmtINR(f.rate)}/L`}
              amount={fmtINR(f.amount)}
              amountColor={C.textDanger}
              onClick={() => {}}
            />
          ))}
        </div>
      )}

      {tab === "Vehicle Master" && (
        <>
          <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
            {vehicles.map((v, i) => (
              <DenseListTile
                key={i}
                primary={v.number}
                secondary={`${v.type} · Owner: ${v.owner}`}
                amount={`${fmtINR(v.rate)}/day`}
                amountColor={C.textInfo}
                tag={<TagChip type={v.active ? "active" : "inactive"} />}
              />
            ))}
          </div>
          <button
            className="fixed bottom-20 right-4 z-30 flex items-center justify-center shadow-lg"
            style={{ width: 52, height: 52, borderRadius: 26, background: C.accent, color: "#fff" }}
          >
            <Plus size={22} />
          </button>
        </>
      )}

      {tab === "Summary" && (
        <div className="mt-4 space-y-4">
          <SubHeader>This Month Summary</SubHeader>
          <SmallInfoGrid
            items={[
              { label: "Total Trips", value: "12" },
              { label: "Total Rent", value: fmtINR(14400) },
              { label: "Total Fuel", value: fmtINR(34200) },
              { label: "Total Expense", value: fmtINR(48600) },
            ]}
          />
          <SmallInfoGrid
            items={[
              { label: "Paid", value: fmtINR(32400) },
              { label: "Pending", value: fmtINR(16200) },
              { label: "Active Vehicles", value: "3" },
              { label: "Avg per Trip", value: fmtINR(4050) },
            ]}
          />
          <NoteBox>
            Tally: <strong style={{ color: C.textPrimary, fontWeight: 500 }}>Dr Vehicle Rent + Diesel</strong> / Cr Vehicle Owner + Fuel Supplier / CC: Site
          </NoteBox>
        </div>
      )}
    </Shell>
  );
}
