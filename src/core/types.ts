// Data models with TypeScript types
export interface Site {
  id: string;
  name: string;
  location: string;
  ownerName: string;
  totalAcres: number;
  numberOfPonds: number;
  leaseType: 'monthly' | 'yearly' | 'crop-wise';
  leaseAmount: number;
  agreementStart: string;
  agreementEnd: string;
  isActive: boolean;
  monthExpense: number;
  ponds: number;
}

export interface Pond {
  id: string;
  siteId: string;
  name: string;
  cultureType: 'Vannamei' | 'Black Tiger' | 'Other';
  batchNumber: string;
  sizeAcres: number;
  startDate: string;
  expectedHarvestDate: string;
  status: 'Active' | 'Harvested' | 'Closed';
}

export interface Worker {
  id: string;
  name: string;
  role: 'Labour' | 'Feeder' | 'Supervisor' | 'Driver' | 'Watchman';
  siteName: string;
  siteId: string;
  wageType: 'hourly' | 'daily' | 'monthly';
  rate: number;
  bankAccount?: string;
  bankName?: string;
  ifsc?: string;
  joiningDate: string;
  isActive: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  type: 'Feed' | 'Seed' | 'Medicine' | 'Fuel' | 'Grocery' | 'Vehicle' | 'Other';
  gstNumber?: string;
  contactNumber: string;
  address: string;
  paymentTerms: string;
  openingBalance: number;
  isActive: boolean;
  outstandingAmount?: number;
}

export interface Buyer {
  id: string;
  name: string;
  location: string;
  contactNumber: string;
  gstNumber?: string;
  paymentTerms: string;
  openingBalance: number;
  isActive: boolean;
  outstanding?: number;
}

export interface StockItem {
  id: string;
  name: string;
  group: 'Feed' | 'Seed' | 'Medicine' | 'Fuel';
  unit: string;
  currentQty: number;
  rate: number;
  reorderLevel: number;
  isActive: boolean;
}

export interface AttendanceEntry {
  id: string;
  workerId: string;
  siteId: string;
  date: string;
  status: 'P' | 'A' | 'H'; // Present, Absent, Half-day
  workingHours?: number;
  wageAmount?: number;
}

export interface PurchaseRecord {
  id: string;
  type: 'Seed' | 'Feed' | 'Medicine' | 'Fuel';
  supplierId: string;
  supplierName: string;
  itemId: string;
  itemName: string;
  siteId?: string;
  pondId?: string;
  date: string;
  quantity: number;
  rate: number;
  totalAmount: number;
  gstPercent?: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
  invoiceNumber?: string;
  billPath?: string;
}

export interface LeasePayment {
  id: string;
  siteId: string;
  siteName: string;
  ownerName: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  paymentStatus: 'paid' | 'unpaid' | 'overdue';
  paymentMode?: 'cash' | 'bank' | 'upi' | 'cheque';
  receiptPath?: string;
}

export interface HarvestRecord {
  id: string;
  siteId: string;
  siteName: string;
  pondId: string;
  batchId: string;
  buyerId: string;
  buyerName: string;
  date: string;
  quantityKg: number;
  ratePerKg: number;
  grossAmount: number;
  deductions: { name: string; amount: number }[];
  netAmount: number;
  receivedAmount: number;
  balance: number;
  paymentMode?: 'cash' | 'bank' | 'upi';
  invoicePath?: string;
}

export interface PaymentRecord {
  id: string;
  type: string;
  partyId: string;
  partyName: string;
  date: string;
  amount: number;
  mode: 'cash' | 'upi' | 'bank' | 'cheque';
  reference?: string;
  status: 'paid' | 'pending';
  proofPath?: string;
}

export interface ElectricityBill {
  id: string;
  siteId: string;
  siteName: string;
  meterNumber: string;
  billMonth: string;
  previousReading: number;
  currentReading: number;
  unitsConsumed: number;
  billAmount: number;
  dueDate: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  paymentDate?: string;
  billImagePath?: string;
}

export interface FeedingEntry {
  id: string;
  siteId: string;
  pondId: string;
  batchId: string;
  date: string;
  feedType: string;
  quantity: number;
  feedingTime: 'Morning' | 'Evening' | 'Night';
  supervisorId?: string;
  amount: number;
}

export interface VehicleExpense {
  id: string;
  vehicleId: string;
  vehicleNumber: string;
  siteId: string;
  purpose: 'Feed Transport' | 'Harvest' | 'Worker' | 'General';
  date: string;
  from: string;
  to: string;
  rentAmount: number;
  fuelQty: number;
  fuelAmount: number;
  totalAmount: number;
  paymentStatus: 'paid' | 'unpaid';
  driverName?: string;
  billPath?: string;
}

export interface CanteenEntry {
  id: string;
  siteId: string;
  date: string;
  workersCount: number;
  items: { name: string; qty: string; amount: number }[];
  totalAmount: number;
  supplierId?: string;
  paymentMode?: 'cash' | 'bank';
}

export type FormErrors = Record<string, string>;

export interface DashboardSummary {
  totalExpenses: number;
  totalRevenue: number;
  netProfit: number;
  pendingDues: number;
  stockValue: number;
  salaryDue: number;
  cashBalance: number;
  bankBalance: number;
  pendingCount: number;
}
