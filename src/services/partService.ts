import { SparePart } from '../types/customer';
import { storageService } from './storageService';
import { apiClient } from './apiClient';

const STORAGE_KEY = 'chaudhari_spare_parts';

const defaultParts: SparePart[] = [
  { id: 'prt-1', name: '4T Engine Oil 10W-30 (1L)', category: 'Lubricants', price: 350, stockQuantity: 25 },
  { id: 'prt-2', name: '4T Engine Oil 20W-40 (1L)', category: 'Lubricants', price: 320, stockQuantity: 20 },
  { id: 'prt-3', name: 'Front Brake Shoe Set', category: 'Brakes', price: 180, stockQuantity: 15 },
  { id: 'prt-4', name: 'Rear Brake Shoe Set', category: 'Brakes', price: 180, stockQuantity: 15 },
  { id: 'prt-5', name: 'Front Disc Brake Pads', category: 'Brakes', price: 220, stockQuantity: 12 },
  { id: 'prt-6', name: 'Spark Plug (Champion / Bosch)', category: 'Electrical', price: 120, stockQuantity: 30 },
  { id: 'prt-7', name: 'Chain & Sprocket Kit', category: 'Transmission', price: 850, stockQuantity: 8 },
  { id: 'prt-8', name: 'Clutch Cable Assembly', category: 'Controls', price: 110, stockQuantity: 15 },
  { id: 'prt-9', name: 'Throttle / Accelerator Cable', category: 'Controls', price: 90, stockQuantity: 12 },
  { id: 'prt-10', name: 'OEM Air Filter Element', category: 'Engine', price: 150, stockQuantity: 18 },
  { id: 'prt-11', name: 'Halogen Headlight Bulb (12V 35W)', category: 'Electrical', price: 120, stockQuantity: 25 },
  { id: 'prt-12', name: '12V 4Ah Maintenance-Free Battery', category: 'Electrical', price: 1150, stockQuantity: 6 },
  { id: 'prt-13', name: 'Front Fork Oil Seal & Fork Oil', category: 'Suspension', price: 250, stockQuantity: 10 },
  { id: 'prt-14', name: 'Rear View Mirror Set (Pair)', category: 'Body', price: 180, stockQuantity: 8 },
  { id: 'prt-15', name: 'Drive Chain Lube & Cleaner Spray', category: 'General', price: 190, stockQuantity: 14 },
];

export const partService = {
  getAll: async (): Promise<SparePart[]> => {
    try {
      const res = await apiClient.get<{ success: boolean; data: any[] }>('/api/parts');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        const list: SparePart[] = res.data.map((p: any) => ({
          ...p,
          price: Number(p.price) || 0,
          stockQuantity: Number(p.stockQuantity) || 0,
        }));
        storageService.set(STORAGE_KEY, list);
        return list;
      }
    } catch (err) {
      console.warn('Failed to fetch parts from API, checking local storage:', err);
    }
    return storageService.get<SparePart[]>(STORAGE_KEY, defaultParts);
  },

  create: async (data: Omit<SparePart, 'id'>): Promise<SparePart> => {
    try {
      const res = await apiClient.post<{ success: boolean; data: any }>('/api/parts', data);
      if (res.success && res.data) {
        const created: SparePart = {
          ...res.data,
          price: Number(res.data.price) || 0,
          stockQuantity: Number(res.data.stockQuantity) || 0,
        };
        const existing = await partService.getAll();
        storageService.set(STORAGE_KEY, [...existing, created]);
        return created;
      }
    } catch (err) {
      console.error('Failed to create part via API:', err);
    }

    const fallback: SparePart = {
      id: `prt-${Date.now()}`,
      ...data,
      price: Number(data.price) || 0,
      stockQuantity: Number(data.stockQuantity) || 0,
    };
    const existing = await partService.getAll();
    storageService.set(STORAGE_KEY, [...existing, fallback]);
    return fallback;
  },

  update: async (id: string, data: Partial<SparePart>): Promise<SparePart> => {
    try {
      const res = await apiClient.put<{ success: boolean; data: any }>(`/api/parts/${id}`, data);
      if (res.success && res.data) {
        const updated: SparePart = {
          ...res.data,
          price: Number(res.data.price) || 0,
          stockQuantity: Number(res.data.stockQuantity) || 0,
        };
        const existing = await partService.getAll();
        storageService.set(
          STORAGE_KEY,
          existing.map((p) => (p.id === id ? updated : p))
        );
        return updated;
      }
    } catch (err) {
      console.error('Failed to update part via API:', err);
    }

    const existing = await partService.getAll();
    const updated = existing.map((p) => (p.id === id ? { ...p, ...data } : p));
    storageService.set(STORAGE_KEY, updated);
    return updated.find((p) => p.id === id)!;
  },

  delete: async (id: string): Promise<boolean> => {
    const existing = await partService.getAll();
    storageService.set(
      STORAGE_KEY,
      existing.filter((p) => p.id !== id)
    );
    try {
      await apiClient.delete(`/api/parts/${id}`);
      return true;
    } catch (err) {
      console.warn('Failed to delete part on API:', err);
      return true;
    }
  },
};
