import { useState, useCallback, useEffect, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import type { Site, Worker, Supplier, AttendanceEntry, PurchaseRecord, FormErrors } from './types';

// ── Local Storage Helper ──
const STORAGE_PREFIX = 'aquafinance_';

function getStorageKey(key: string): string {
  return STORAGE_PREFIX + key;
}

function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(getStorageKey(key));
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(getStorageKey(key), JSON.stringify(value));
  } catch {
    console.error('Failed to save to storage:', key);
  }
}

// ── Sites Hook ──
export function useSites() {
  const defaultSites: Site[] = [
    {
      id: 'S001',
      name: 'Bhimavaram Farm',
      location: 'Bhimavaram, AP',
      ownerName: 'Rama Rao',
      totalAcres: 15,
      numberOfPonds: 4,
      leaseType: 'monthly',
      leaseAmount: 45000,
      agreementStart: '2024-01-01',
      agreementEnd: '2027-12-31',
      isActive: true,
      monthExpense: 485000,
      ponds: 4,
    },
    {
      id: 'S002',
      name: 'Narsapur Site',
      location: 'Narsapur, AP',
      ownerName: 'K. Sharma',
      totalAcres: 10,
      numberOfPonds: 3,
      leaseType: 'monthly',
      leaseAmount: 32000,
      agreementStart: '2024-02-01',
      agreementEnd: '2026-12-31',
      isActive: true,
      monthExpense: 312000,
      ponds: 3,
    },
  ];

  const [sites, setSites] = useState<Site[]>(() => getFromStorage('sites', defaultSites));

  const addSite = useCallback((site: Omit<Site, 'id'> & { id?: string }) => {
    const newSite: Site = { ...site, id: site.id?.trim() || `S${Date.now()}` } as Site;
    const updated = [...sites, newSite];
    setSites(updated);
    saveToStorage('sites', updated);
    return newSite;
  }, [sites]);

  const updateSite = useCallback((id: string, updates: Partial<Site>) => {
    const updated = sites.map(s => s.id === id ? { ...s, ...updates } : s);
    setSites(updated);
    saveToStorage('sites', updated);
  }, [sites]);

  const deleteSite = useCallback((id: string) => {
    const updated = sites.filter(s => s.id !== id);
    setSites(updated);
    saveToStorage('sites', updated);
  }, [sites]);

  return { sites, addSite, updateSite, deleteSite };
}

// ── Workers Hook ──
export function useWorkers() {
  const defaultWorkers: Worker[] = [
    {
      id: 'W001',
      name: 'Rajesh Kumar',
      role: 'Labour',
      siteName: 'Bhimavaram Farm',
      siteId: 'S001',
      wageType: 'daily',
      rate: 600,
      joiningDate: '2024-01-15',
      isActive: true,
    },
    {
      id: 'W002',
      name: 'Priya Singh',
      role: 'Feeder',
      siteName: 'Bhimavaram Farm',
      siteId: 'S001',
      wageType: 'daily',
      rate: 800,
      joiningDate: '2024-02-01',
      isActive: true,
    },
  ];

  const [workers, setWorkers] = useState<Worker[]>(() => getFromStorage('workers', defaultWorkers));

  const addWorker = useCallback((worker: Omit<Worker, 'id'>) => {
    const newWorker: Worker = { ...worker, id: `W${Date.now()}` };
    const updated = [...workers, newWorker];
    setWorkers(updated);
    saveToStorage('workers', updated);
    return newWorker;
  }, [workers]);

  const updateWorker = useCallback((id: string, updates: Partial<Worker>) => {
    const updated = workers.map(w => w.id === id ? { ...w, ...updates } : w);
    setWorkers(updated);
    saveToStorage('workers', updated);
  }, [workers]);

  const deleteWorker = useCallback((id: string) => {
    const updated = workers.filter(w => w.id !== id);
    setWorkers(updated);
    saveToStorage('workers', updated);
  }, [workers]);

  return { workers, addWorker, updateWorker, deleteWorker };
}

// ── Suppliers Hook ──
export function useSuppliers() {
  const defaultSuppliers: Supplier[] = [
    {
      id: 'SP001',
      name: 'ABC Feed Co.',
      type: 'Feed',
      gstNumber: '28AABCT1234F1Z0',
      contactNumber: '9876543210',
      address: 'Visakhapatnam',
      paymentTerms: '15 days',
      openingBalance: 0,
      isActive: true,
      outstandingAmount: 180000,
    },
  ];

  const [suppliers, setSuppliers] = useState<Supplier[]>(() =>
    getFromStorage('suppliers', defaultSuppliers)
  );

  const addSupplier = useCallback((supplier: Omit<Supplier, 'id'>) => {
    const newSupplier: Supplier = { ...supplier, id: `SP${Date.now()}` };
    const updated = [...suppliers, newSupplier];
    setSuppliers(updated);
    saveToStorage('suppliers', updated);
    return newSupplier;
  }, [suppliers]);

  const updateSupplier = useCallback((id: string, updates: Partial<Supplier>) => {
    const updated = suppliers.map(s => s.id === id ? { ...s, ...updates } : s);
    setSuppliers(updated);
    saveToStorage('suppliers', updated);
  }, [suppliers]);

  return { suppliers, addSupplier, updateSupplier };
}

// ── Attendance Hook ──
export function useAttendance() {
  const [attendance, setAttendance] = useState<AttendanceEntry[]>(() =>
    getFromStorage('attendance', [])
  );

  const markAttendance = useCallback((entry: AttendanceEntry) => {
    const updated = [
      ...attendance.filter(a => !(a.workerId === entry.workerId && a.date === entry.date)),
      entry,
    ];
    setAttendance(updated);
    saveToStorage('attendance', updated);
  }, [attendance]);

  const getAttendanceByDate = useCallback((date: string) => {
    return attendance.filter(a => a.date === date);
  }, [attendance]);

  return { attendance, markAttendance, getAttendanceByDate };
}

// ── Purchases Hook ──
export function usePurchases() {
  const [purchases, setPurchases] = useState<PurchaseRecord[]>(() =>
    getFromStorage('purchases', [])
  );

  const addPurchase = useCallback((purchase: Omit<PurchaseRecord, 'id'>) => {
    const newPurchase: PurchaseRecord = { ...purchase, id: `PUR${Date.now()}` };
    const updated = [...purchases, newPurchase];
    setPurchases(updated);
    saveToStorage('purchases', updated);
    return newPurchase;
  }, [purchases]);

  const updatePaymentStatus = useCallback((id: string, status: 'paid' | 'unpaid' | 'partial') => {
    const updated = purchases.map(p => p.id === id ? { ...p, paymentStatus: status } : p);
    setPurchases(updated);
    saveToStorage('purchases', updated);
  }, [purchases]);

  return { purchases, addPurchase, updatePaymentStatus };
}

// ── Form Validation Hook ──
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validate: (values: T) => FormErrors,
  onSubmit: (values: T) => Promise<void> | void
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setValues(initialValues);
    setErrors({});
    setSubmitError(null);
  }, [initialValues]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    const newErrors = validate(values);
    if (newErrors[name]) {
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  }, [values, validate]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        await onSubmit(values);
        setValues(initialValues);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validate, onSubmit, initialValues]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setSubmitError(null);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
  };
}

// ── Modal State Hook ──
export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  const openModal = useCallback((modalData?: any) => {
    setData(modalData);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  return { isOpen, data, openModal, closeModal };
}
