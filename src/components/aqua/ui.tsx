import * as React from "react";
import { C } from "@/lib/aqua/tokens";
import { AlertCircle } from "lucide-react";

export function NavPillBar({
  items,
  active,
  onChange,
}: {
  items: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
      <div className="flex gap-1.5 pb-1">
        {items.map((it) => {
          const on = it === active;
          return (
            <button
              key={it}
              onClick={() => onChange(it)}
              className="whitespace-nowrap transition-colors"
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                border: `0.5px solid ${on ? C.borderPrimary : C.borderSecondary}`,
                background: on ? C.bgPrimary : C.bgSecondary,
                color: on ? C.textPrimary : C.textSecondary,
                fontWeight: on ? 500 : 400,
                fontSize: 12,
              }}
            >
              {it}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ModuleHeaderTitle({
  icon,
  title,
  subtitle,
  bg = C.bgSecondary,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  bg?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="flex items-center justify-center"
          style={{ width: 36, height: 36, borderRadius: 10, background: bg, fontSize: 20 }}
        >
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, color: C.textPrimary }}>{title}</div>
          {subtitle && (
            <div style={{ fontSize: 12, color: C.textSecondary }}>{subtitle}</div>
          )}
        </div>
      </div>
      <div style={{ height: 0.5, background: C.borderTertiary }} />
    </div>
  );
}

export function SubHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 13,
        fontWeight: 500,
        color: C.textSecondary,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        margin: "16px 0 8px",
      }}
    >
      {children}
    </div>
  );
}

type TagType =
  | "paid" | "unpaid" | "partial" | "overdue" | "active" | "inactive"
  | "cash" | "upi" | "bank" | "cheque" | "synced" | "pending" | "failed";

const TAG_STYLES: Record<TagType, { bg: string; color: string }> = {
  paid: { bg: C.bgSuccess, color: C.textSuccess },
  unpaid: { bg: C.bgDanger, color: C.textDanger },
  partial: { bg: C.bgWarning, color: C.textWarning },
  overdue: { bg: C.bgDanger, color: C.textDanger },
  active: { bg: C.bgSuccess, color: C.textSuccess },
  inactive: { bg: C.bgSecondary, color: C.textSecondary },
  cash: { bg: C.bgWarning, color: C.textWarning },
  upi: { bg: C.bgInfo, color: C.textInfo },
  bank: { bg: C.bgInfo, color: C.textInfo },
  cheque: { bg: C.bgSecondary, color: C.textSecondary },
  synced: { bg: C.bgSuccess, color: C.textSuccess },
  pending: { bg: C.bgWarning, color: C.textWarning },
  failed: { bg: C.bgDanger, color: C.textDanger },
};

export function TagChip({ type, label }: { type: TagType; label?: string }) {
  const s = TAG_STYLES[type];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 11,
        padding: "2px 8px",
        borderRadius: 12,
        fontWeight: 400,
        textTransform: "capitalize",
        display: "inline-block",
      }}
    >
      {label ?? type}
    </span>
  );
}

export function FinanceSummaryCard({
  label,
  amount,
  icon,
  color,
  iconBg,
  pending,
}: {
  label: string;
  amount: string;
  icon: string;
  color: string;
  iconBg: string;
  pending?: string;
}) {
  return (
    <div
      style={{
        padding: 14,
        background: C.bgPrimary,
        border: `0.5px solid ${C.borderTertiary}`,
        borderRadius: 14,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div
            style={{
              fontSize: 11,
              color: C.textSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              fontWeight: 500,
            }}
          >
            {label}
          </div>
          <div style={{ marginTop: 4, fontSize: 20, fontWeight: 600, color }}>{amount}</div>
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>
      {pending && (
        <div style={{ marginTop: 8, fontSize: 11, color: C.textDanger }}>{pending}</div>
      )}
    </div>
  );
}

export function DenseListTile({
  primary,
  secondary,
  amount,
  amountColor = C.textPrimary,
  tag,
  onClick,
}: {
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  amount?: string;
  amountColor?: string;
  tag?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left active:bg-[#FAFAFA] transition-colors"
      style={{
        padding: "10px 14px",
        borderBottom: `0.5px solid ${C.borderTertiary}`,
        background: C.bgPrimary,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div style={{ fontSize: 14, fontWeight: 500, color: C.textPrimary }} className="truncate">
            {primary}
          </div>
          {secondary && (
            <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }} className="truncate">
              {secondary}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {amount && (
            <div style={{ fontSize: 16, fontWeight: 600, color: amountColor }}>{amount}</div>
          )}
          {tag}
        </div>
      </div>
    </button>
  );
}

export function ModuleCard({
  emoji,
  title,
  subtitle,
  onClick,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  onClick?: () => void;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
      className="text-left transition-colors"
      style={{
        padding: 12,
        border: `0.5px solid ${hover ? C.borderPrimary : C.borderTertiary}`,
        borderRadius: 14,
        background: hover ? C.bgSecondary : C.bgPrimary,
      }}
    >
      <div style={{ fontSize: 22 }}>{emoji}</div>
      <div style={{ marginTop: 6, fontSize: 12, fontWeight: 500, color: C.textPrimary }}>
        {title}
      </div>
      <div style={{ fontSize: 11, color: C.textSecondary }}>{subtitle}</div>
    </button>
  );
}

export function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: C.bgSecondary,
        borderLeft: `2px solid ${C.borderInfo}`,
        borderRadius: "0 10px 10px 0",
        padding: "10px 12px",
        fontSize: 12,
        color: C.textSecondary,
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

export function ApprovalBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1"
      style={{
        background: C.bgDanger,
        color: C.textDanger,
        fontSize: 11,
        padding: "3px 8px",
        borderRadius: 12,
      }}
    >
      <AlertCircle size={12} />
      {label}
    </span>
  );
}

export function PrimaryButton({
  children,
  onClick,
  fullWidth,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: C.accent,
        color: "#fff",
        fontSize: 14,
        fontWeight: 500,
        padding: "13px 24px",
        borderRadius: 20,
        width: fullWidth ? "100%" : undefined,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}

export function FinanceInputField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="mb-3">
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: C.textSecondary,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          minHeight: 48,
          width: "100%",
          background: C.bgSecondary,
          border: `0.5px solid ${C.borderSecondary}`,
          borderRadius: 10,
          padding: "13px 14px",
          fontSize: 14,
          color: C.textPrimary,
          outline: "none",
        }}
      />
    </div>
  );
}

export function SmallInfoGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((it) => (
        <div
          key={it.label}
          style={{
            padding: "10px 12px",
            background: C.bgSecondary,
            border: `0.5px solid ${C.borderTertiary}`,
            borderRadius: 10,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 500, color: C.textPrimary }}>{it.value}</div>
          <div style={{ fontSize: 11, color: C.textSecondary }}>{it.label}</div>
        </div>
      ))}
    </div>
  );
}