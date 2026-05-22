import * as React from "react";
import { C } from "@/lib/aqua/tokens";
import { X } from "lucide-react";

export function QuickActionSheet({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = "Save",
  isLoading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void | Promise<void>;
  submitLabel?: string;
  isLoading?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 40,
        }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          background: C.bgPrimary,
          borderRadius: "24px 24px 0 0",
          borderTop: `0.5px solid ${C.borderTertiary}`,
          maxHeight: "90vh",
          zIndex: 50,
          animation: "slideUp 0.3s ease-out",
        }}
      >
        {/* Handle Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 12,
            paddingBottom: 8,
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              background: C.bgSecondary,
              borderRadius: 2,
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            borderBottom: `0.5px solid ${C.borderTertiary}`,
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 500, color: C.textPrimary }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
            }}
          >
            <X size={20} color={C.textSecondary} />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "16px",
            overflowY: "auto",
            maxHeight: "calc(90vh - 140px)",
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {onSubmit && (
          <div
            style={{
              padding: "16px",
              borderTop: `0.5px solid ${C.borderTertiary}`,
              background: C.bgPrimary,
            }}
          >
            <button
              onClick={onSubmit}
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "13px 24px",
                background: C.accent,
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                borderRadius: 20,
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? "Processing..." : submitLabel}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

export function FieldGroup({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 500,
          color: C.textSecondary,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <div>{children}</div>
      {error && (
        <div style={{ fontSize: 12, color: C.textDanger, marginTop: 4 }}>
          {error}
        </div>
      )}
    </div>
  );
}

export function FormInput({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
}: {
  label: string;
  name?: string;
  placeholder?: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <FieldGroup label={label} error={error}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        style={{
          width: "100%",
          minHeight: 48,
          padding: "13px 14px",
          fontSize: 14,
          color: C.textPrimary,
          background: C.bgSecondary,
          border: `0.5px solid ${error ? C.textDanger : C.borderSecondary}`,
          borderRadius: 10,
          outline: "none",
          fontFamily: "DM Sans, sans-serif",
          opacity: disabled ? 0.6 : 1,
        }}
      />
    </FieldGroup>
  );
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  options,
  placeholder = "Select an option",
}: {
  label: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}) {
  return (
    <FieldGroup label={label} error={error}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          width: "100%",
          minHeight: 48,
          padding: "13px 14px",
          fontSize: 14,
          color: C.textPrimary,
          background: C.bgSecondary,
          border: `0.5px solid ${error ? C.textDanger : C.borderSecondary}`,
          borderRadius: 10,
          outline: "none",
          fontFamily: "DM Sans, sans-serif",
          cursor: "pointer",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldGroup>
  );
}

export function FormTextarea({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  rows = 4,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
}) {
  return (
    <FieldGroup label={label} error={error}>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        style={{
          width: "100%",
          padding: "13px 14px",
          fontSize: 14,
          color: C.textPrimary,
          background: C.bgSecondary,
          border: `0.5px solid ${error ? C.textDanger : C.borderSecondary}`,
          borderRadius: 10,
          outline: "none",
          fontFamily: "DM Sans, sans-serif",
          resize: "vertical",
        }}
      />
    </FieldGroup>
  );
}

export function SegmentedControl({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: C.textSecondary,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            marginBottom: 8,
          }}
        >
          {label}
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              padding: "8px 12px",
              fontSize: 13,
              fontWeight: 500,
              border: `0.5px solid ${
                value === opt.value ? C.borderPrimary : C.borderSecondary
              }`,
              background: value === opt.value ? C.bgPrimary : C.bgSecondary,
              color: value === opt.value ? C.textPrimary : C.textSecondary,
              borderRadius: 10,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        fontSize: 14,
        color: C.textPrimary,
        marginBottom: 12,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{
          width: 18,
          height: 18,
          cursor: "pointer",
          accentColor: C.accent,
        }}
      />
      {label}
    </label>
  );
}
