import { fmtINR } from "./tokens";

export const sites = [
  { id: "S001", name: "Bhimavaram Farm", location: "Bhimavaram, AP", ponds: 8, active: true, monthExpense: 485000, owner: "Rama Rao" },
  { id: "S002", name: "Narsapur Site", location: "Narsapur, AP", ponds: 6, active: true, monthExpense: 312000, owner: "K. Sharma" },
  { id: "S003", name: "Kakinada Site", location: "Kakinada, AP", ponds: 4, active: true, monthExpense: 198000, owner: "P. Reddy" },
  { id: "S004", name: "Eluru Old", location: "Eluru, AP", ponds: 3, active: false, monthExpense: 0, owner: "G. Murthy" },
];

export const ponds = [
  { id: "P001", name: "Pond A1", siteId: "S001", siteName: "Bhimavaram Farm", culture: "Vannamei", batch: "2026-01", status: "Active" as const },
  { id: "P002", name: "Pond A2", siteId: "S001", siteName: "Bhimavaram Farm", culture: "Vannamei", batch: "2026-01", status: "Active" as const },
  { id: "P003", name: "Pond B1", siteId: "S002", siteName: "Narsapur Site", culture: "Black Tiger", batch: "2026-02", status: "Active" as const },
  { id: "P004", name: "Pond C1", siteId: "S003", siteName: "Kakinada Site", culture: "Vannamei", batch: "2025-12", status: "Harvested" as const },
];

export const workers = [
  { id: "W001", name: "Ravi Kumar", role: "Supervisor", siteName: "Bhimavaram Farm", rate: 800, active: true },
  { id: "W002", name: "Suresh Naidu", role: "Feeder", siteName: "Bhimavaram Farm", rate: 500, active: true },
  { id: "W003", name: "Prakash B.", role: "Labour", siteName: "Narsapur Site", rate: 450, active: true },
  { id: "W004", name: "Mahesh K.", role: "Driver", siteName: "Bhimavaram Farm", rate: 600, active: true },
  { id: "W005", name: "Kiran Y.", role: "Watchman", siteName: "Kakinada Site", rate: 400, active: true },
  { id: "W006", name: "Lakshmi G.", role: "Labour", siteName: "Narsapur Site", rate: 450, active: false },
];

export const suppliers = [
  { id: "SUP1", name: "ABC Feed Co.", type: "Feed", phone: "9876543210", outstanding: 180000 },
  { id: "SUP2", name: "MarineSeed Pvt", type: "Seed", phone: "9123456789", outstanding: 0 },
  { id: "SUP3", name: "AquaMed Labs", type: "Medicine", phone: "9988776655", outstanding: 42000 },
  { id: "SUP4", name: "BP Diesel", type: "Fuel", phone: "9871234560", outstanding: 15600 },
];

export const pendingAlerts = [
  { id: 1, primary: "Lease due: Bhimavaram Site", secondary: "Owner: Rama Rao · Due 25-May-2026", amount: 45000, tag: "overdue" as const },
  { id: 2, primary: "Salary unpaid: 12 workers", secondary: "Bhimavaram & Narsapur · This week", amount: 38400, tag: "unpaid" as const },
  { id: 3, primary: "Supplier: ABC Feed Co.", secondary: "Invoice INV-2025-118 · Due 10-Jun", amount: 180000, tag: "pending" as const },
  { id: 4, primary: "Electricity: Narsapur", secondary: "May-2026 · Meter 4422109", amount: 18450, tag: "overdue" as const },
];

export const dashboard = {
  expenses: 1085000,
  revenue: 1840000,
  netPL: 755000,
  pendingDues: 281850,
  pendingCount: 8,
  stockValue: 425000,
  salaryDue: 38400,
  cashBalance: 124500,
  bankBalance: 980000,
};

export const harvests = [
  { id: "H001", pond: "Pond A1", batch: "2026-01", buyer: "Sai Exports", site: "Bhimavaram Farm", date: "2026-05-12", net: 640000, received: 400000, balance: 240000 },
  { id: "H002", pond: "Pond C1", batch: "2025-12", buyer: "Coastal Foods", site: "Kakinada Site", date: "2026-04-28", net: 480000, received: 480000, balance: 0 },
  { id: "H003", pond: "Pond B1", batch: "2026-02", buyer: "Sai Exports", site: "Narsapur Site", date: "2026-05-18", net: 720000, received: 200000, balance: 520000 },
];

export const payments = [
  { id: "PM1", party: "Ravi Kumar (Wages)", date: "2026-05-20", amount: 24000, mode: "upi" as const, status: "paid" as const },
  { id: "PM2", party: "ABC Feed Co.", date: "2026-05-18", amount: 50000, mode: "bank" as const, status: "paid" as const },
  { id: "PM3", party: "BP Diesel", date: "2026-05-16", amount: 8400, mode: "cash" as const, status: "paid" as const },
  { id: "PM4", party: "Owner — Rama Rao (Lease)", date: "2026-05-15", amount: 45000, mode: "cheque" as const, status: "pending" as const },
];

export { fmtINR };