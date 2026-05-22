// AquaFinance — Thavvu design tokens
export const C = {
  bgPrimary: "#FFFFFF",
  bgSecondary: "#F5F5F5",
  bgWash: "#FAFAFA",
  bgSuccess: "#ECFDF5",
  bgInfo: "#EFF6FF",
  bgWarning: "#FFFBEB",
  bgDanger: "#FFF1F2",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textSuccess: "#059669",
  textInfo: "#2563EB",
  textWarning: "#D97706",
  textDanger: "#E11D48",
  borderPrimary: "#D1D5DB",
  borderSecondary: "#E5E7EB",
  borderTertiary: "#F3F4F6",
  borderInfo: "#93C5FD",
  borderDanger: "#FECACA",
  accent: "#2563EB",
  accentLight: "#EFF6FF",
  brandPrimary: "#0891B2",
  brandDark: "#0E7490",
};

export const fmtINR = (n: number) =>
  "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.abs(n));

export const fmtDate = (d: Date | string) => {
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");
};