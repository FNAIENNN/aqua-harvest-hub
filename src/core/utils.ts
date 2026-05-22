import type { FormErrors } from './types';

// ── Validation Utilities ──
export const validators = {
  required: (value: string | number | undefined): string | undefined => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'This field is required';
    }
  },

  email: (value: string): string | undefined => {
    if (!value) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Enter a valid email address';
    }
  },

  phone: (value: string): string | undefined => {
    if (!value) return;
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      return 'Enter a valid 10-digit phone number';
    }
  },

  minLength: (min: number) => (value: string): string | undefined => {
    if (!value) return;
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
  },

  maxLength: (max: number) => (value: string): string | undefined => {
    if (!value) return;
    if (value.length > max) {
      return `Must be at most ${max} characters`;
    }
  },

  min: (minVal: number) => (value: number | string): string | undefined => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return 'Enter a valid number';
    if (num < minVal) {
      return `Must be at least ${minVal}`;
    }
  },

  max: (maxVal: number) => (value: number | string): string | undefined => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return 'Enter a valid number';
    if (num > maxVal) {
      return `Must be at most ${maxVal}`;
    }
  },

  number: (value: string | number): string | undefined => {
    if (!value && value !== 0) return;
    if (isNaN(Number(value))) {
      return 'Enter a valid number';
    }
  },

  date: (value: string): string | undefined => {
    if (!value) return;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) {
      return 'Enter a valid date (YYYY-MM-DD)';
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'Enter a valid date';
    }
  },

  gst: (value: string): string | undefined => {
    if (!value) return;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstRegex.test(value)) {
      return 'Enter a valid GST number';
    }
  },

  ifsc: (value: string): string | undefined => {
    if (!value) return;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(value)) {
      return 'Enter a valid IFSC code';
    }
  },
};

// ── Compose multiple validators ──
export function compose(...fns: Array<(value: any) => string | undefined>) {
  return (value: any): string | undefined => {
    for (const fn of fns) {
      const error = fn(value);
      if (error) return error;
    }
  };
}

// ── Format Utilities ──
export function formatINR(value: number): string {
  if (!value && value !== 0) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(value);
}

export function parseINR(value: string): number {
  return parseFloat(value.replace(/[^\d.-]/g, ''));
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

export function formatDateInput(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ── Percentage Calculation ──
export function calculatePercentage(value: number, percent: number): number {
  return (value * percent) / 100;
}

export function addPercentage(value: number, percent: number): number {
  return value + calculatePercentage(value, percent);
}

// ── Notification Helper ──
export function showNotification(message: string, type: 'success' | 'error' | 'info' = 'info') {
  // This can be replaced with a toast library like Sonner
  const bg = type === 'success' ? '#059669' : type === 'error' ? '#E11D48' : '#2563EB';
  console.log(`[${type.toUpperCase()}] ${message}`);
  // For now, just log to console
}

// ── Debounce Utility ──
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// ── Safe Local Storage ──
export const storage = {
  get: (key: string, defaultValue: any = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error('Failed to save to storage:', key);
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      console.error('Failed to remove from storage:', key);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch {
      console.error('Failed to clear storage');
    }
  },
};

// ── Array Utilities ──
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(arr: T[], key: keyof T, ascending = true): T[] {
  return [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return ascending ? -1 : 1;
    if (aVal > bVal) return ascending ? 1 : -1;
    return 0;
  });
}

export function filterBy<T>(arr: T[], key: keyof T, value: any): T[] {
  return arr.filter(item => item[key] === value);
}

// ── Unique Values ──
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

// ── Sum Calculation ──
export function sum<T>(arr: T[], key: keyof T): number {
  return arr.reduce((total, item) => {
    const val = item[key];
    return total + (typeof val === 'number' ? val : 0);
  }, 0);
}
