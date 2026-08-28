export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  city?: string;
  bikeBrand?: string;
  bikeModel?: string;
  registrationNumber?: string;
  currentKm?: string;
  notes?: string;
  createdAt: string;
}

export interface ReplacedPart {
  name: string;
  cost: number;
}

export interface RepairRecord {
  id: string;
  jobNumber: string;
  customerId?: string;
  customerName: string;
  customerMobile: string;
  bikeBrand?: string;
  bikeModel?: string;
  registrationNumber?: string;
  currentKm?: string;
  serviceType: string;
  problemDetails?: string;
  partsReplaced: ReplacedPart[];
  laborCharge: number;
  partsTotal: number;
  discount?: number;
  totalAmount: number;
  paymentMode?: 'Cash' | 'Online' | 'Split' | 'Pending';
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
  status: 'In Progress' | 'Completed' | 'Delivered';
  photos: string[];
  repairDate: string;
  createdAt: string;
}

export interface SparePart {
  id: string;
  name: string;
  category: string;
  price: number;
  stockQuantity: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface DailyRepairStats {
  todayCompletedCount: number;
  todayRevenue: number;
  inWorkshopCount: number;
  lifetimeRepairsCount: number;
  lifetimeRevenue: number;
  todayDate: string;
}
