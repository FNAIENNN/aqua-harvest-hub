import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/aqua/Shell";
import { ModuleHeaderTitle, NavPillBar, TagChip, PrimaryButton } from "@/components/aqua/ui";
import { QuickActionSheet, FormInput, FormSelect } from "@/components/aqua/FormComponents";
import { C } from "@/lib/aqua/tokens";
import { useSites, useFormValidation } from "@/core/hooks";
import { formatINR } from "@/core/utils";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const Route = createFileRoute("/masters/sites")({ component: SitesList });

function SitesList() {
  const [pill, setPill] = useState("All");
  const { sites, addSite, updateSite, deleteSite } = useSites();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingSite = editingId ? sites.find((s) => s.id === editingId) ?? null : null;

  const initialFormValues = useMemo(
    () =>
      editingSite
        ? {
            id: editingSite.id,
            name: editingSite.name,
            location: editingSite.location,
            ownerName: editingSite.ownerName,
            totalAcres: String(editingSite.totalAcres),
            numberOfPonds: String(editingSite.numberOfPonds),
            leaseType: editingSite.leaseType,
            leaseAmount: String(editingSite.leaseAmount),
            agreementStart: editingSite.agreementStart,
            agreementEnd: editingSite.agreementEnd,
            isActive: String(editingSite.isActive),
          }
        : {
            id: "",
            name: "",
            location: "",
            ownerName: "",
            totalAcres: "",
            numberOfPonds: "",
            leaseType: "monthly",
            leaseAmount: "",
            agreementStart: "",
            agreementEnd: "",
            isActive: "true",
          },
    [editingSite]
  );

  const { values, errors, handleChange, handleSubmit, resetForm, setValues } = useFormValidation(
    initialFormValues,
    (vals) => {
      const errs: Record<string, string> = {};
      if (!vals.id?.trim()) errs.id = "Site ID is required";
      if (!editingId && vals.id && sites.some((site) => site.id === vals.id.trim())) {
        errs.id = "Site ID already exists";
      }
      if (!vals.name?.trim()) errs.name = "Site name is required";
      if (!vals.location?.trim()) errs.location = "Location is required";
      if (!vals.ownerName?.trim()) errs.ownerName = "Owner name is required";
      if (!vals.totalAcres || Number(vals.totalAcres) <= 0) errs.totalAcres = "Total acres must be greater than 0";
      if (!vals.numberOfPonds || Number(vals.numberOfPonds) <= 0) errs.numberOfPonds = "Number of ponds must be greater than 0";
      if (!vals.leaseAmount || Number(vals.leaseAmount) <= 0) errs.leaseAmount = "Lease amount must be greater than 0";
      if (!vals.agreementStart) errs.agreementStart = "Start date is required";
      if (!vals.agreementEnd) errs.agreementEnd = "End date is required";
      return errs;
    },
    async (vals) => {
      const siteData = {
        id: vals.id?.trim(),
        name: vals.name.trim(),
        location: vals.location.trim(),
        ownerName: vals.ownerName.trim(),
        totalAcres: Number(vals.totalAcres) || 0,
        numberOfPonds: Number(vals.numberOfPonds) || 0,
        leaseType: vals.leaseType as "monthly" | "yearly" | "crop-wise",
        leaseAmount: Number(vals.leaseAmount) || 0,
        agreementStart: vals.agreementStart,
        agreementEnd: vals.agreementEnd,
        isActive: vals.isActive === "true",
        monthExpense: Math.max(0, Math.round(Number(vals.leaseAmount) * 12 * (Math.random() * 0.5 + 0.8))),
        ponds: Number(vals.numberOfPonds) || 0,
      };

      if (editingId) {
        updateSite(editingId, siteData);
      } else {
        addSite(siteData);
      }

      resetForm();
      setIsAddOpen(false);
      setEditingId(null);
    }
  );

  const filtered = sites.filter((s) => pill === "All" || (pill === "Active" ? s.isActive : !s.isActive));

  const handleOpenNew = () => {
    setEditingId(null);
    resetForm();
    setIsAddOpen(true);
  };

  const handleEdit = (site: typeof sites[number]) => {
    setEditingId(site.id);
    setValues({
      id: site.id,
      name: site.name,
      location: site.location,
      ownerName: site.ownerName,
      totalAcres: String(site.totalAcres),
      numberOfPonds: String(site.numberOfPonds),
      leaseType: site.leaseType,
      leaseAmount: String(site.leaseAmount),
      agreementStart: site.agreementStart,
      agreementEnd: site.agreementEnd,
      isActive: String(site.isActive),
    });
    setIsAddOpen(true);
  };

  const handleClose = () => {
    setIsAddOpen(false);
    setEditingId(null);
    resetForm();
  };

  return (
    <Shell title="Site Master">
      <ModuleHeaderTitle icon="🏢" title="Site Master" subtitle="Shrimp farm sites" bg={C.bgInfo} />
      <NavPillBar items={["All", "Active", "Inactive"]} active={pill} onChange={setPill} />

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏢</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: C.textPrimary, marginBottom: 6 }}>
            No sites found
          </div>
          <div style={{ fontSize: 13, color: C.textSecondary, marginBottom: 20 }}>
            Add your first site to get started
          </div>
          <PrimaryButton onClick={handleOpenNew}>Add First Site</PrimaryButton>
        </div>
      ) : (
        <div className="mt-3" style={{ border: `0.5px solid ${C.borderTertiary}`, borderRadius: 14, overflow: "hidden" }}>
          {filtered.map((site) => (
            <div
              key={site.id}
              className="group hover:bg-[#FAFAFA] transition-colors"
              style={{
                borderBottom: `0.5px solid ${C.borderTertiary}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
              }}
            >
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: 14, fontWeight: 500, color: C.textPrimary }}>
                  {site.name} <span style={{ color: C.textSecondary, fontSize: 11, fontWeight: 400 }}>· {site.id}</span>
                </div>
                <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>
                  📍 {site.location} · {site.numberOfPonds} ponds
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex flex-col items-end gap-1">
                  <div style={{ fontSize: 16, fontWeight: 600, color: C.textDanger }}>
                    {formatINR(site.monthExpense)}
                  </div>
                  <TagChip type={site.isActive ? "active" : "inactive"} />
                </div>
                <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(site)}
                    style={{
                      padding: "6px 8px",
                      background: C.bgSecondary,
                      border: `0.5px solid ${C.borderSecondary}`,
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                    title="Edit site"
                  >
                    <Edit2 size={14} color={C.textInfo} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${site.name}"? This action cannot be undone.`)) {
                        deleteSite(site.id);
                      }
                    }}
                    style={{
                      padding: "6px 8px",
                      background: C.bgDanger,
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                    title="Delete site"
                  >
                    <Trash2 size={14} color={C.textDanger} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleOpenNew}
        className="fixed bottom-20 right-4 z-30 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        style={{ width: 52, height: 52, borderRadius: 26, background: C.accent, color: "#fff" }}
        title="Add new site"
      >
        <Plus size={22} />
      </button>

      <QuickActionSheet
        isOpen={isAddOpen}
        onClose={handleClose}
        title={editingId ? "Edit Site" : "Add New Site"}
        onSubmit={handleSubmit}
        submitLabel={editingId ? "Update Site" : "Create Site"}
      >
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Site ID"
            placeholder="e.g., S001"
            name="id"
            value={values.id}
            onChange={handleChange}
            error={errors.id}
            disabled={!!editingId}
          />
          <FormInput
            label="Site Name"
            placeholder="e.g., Bhimavaram Farm"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
          />
          <FormInput
            label="Location"
            placeholder="e.g., Bhimavaram, AP"
            name="location"
            value={values.location}
            onChange={handleChange}
            error={errors.location}
          />
          <FormInput
            label="Owner Name"
            placeholder="e.g., Rama Rao"
            name="ownerName"
            value={values.ownerName}
            onChange={handleChange}
            error={errors.ownerName}
          />
          <FormInput
            label="Total Acres"
            type="number"
            placeholder="e.g., 15"
            name="totalAcres"
            value={values.totalAcres}
            onChange={handleChange}
            error={errors.totalAcres}
          />
          <FormInput
            label="Number of Ponds"
            type="number"
            placeholder="e.g., 4"
            name="numberOfPonds"
            value={values.numberOfPonds}
            onChange={handleChange}
            error={errors.numberOfPonds}
          />
          <FormSelect
            label="Lease Type"
            name="leaseType"
            value={values.leaseType}
            onChange={handleChange}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
              { value: "crop-wise", label: "Crop-wise" },
            ]}
          />
          <FormInput
            label="Lease Amount (₹)"
            type="number"
            placeholder="e.g., 45000"
            name="leaseAmount"
            value={values.leaseAmount}
            onChange={handleChange}
            error={errors.leaseAmount}
          />
          <FormInput
            label="Agreement Start"
            type="date"
            name="agreementStart"
            value={values.agreementStart}
            onChange={handleChange}
            error={errors.agreementStart}
          />
          <FormInput
            label="Agreement End"
            type="date"
            name="agreementEnd"
            value={values.agreementEnd}
            onChange={handleChange}
            error={errors.agreementEnd}
          />
          <FormSelect
            label="Status"
            name="isActive"
            value={values.isActive}
            onChange={handleChange}
            options={[
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },
            ]}
          />
        </form>
      </QuickActionSheet>
    </Shell>
  );
}
