import { Customer, RepairRecord } from '../types/customer';
import { storageService } from './storageService';
import { apiClient } from './apiClient';

const STORAGE_KEY = 'chaudhari_auto_customers';

export const customerService = {
  getAll: async (): Promise<Customer[]> => {
    try {
      const res = await apiClient.get<{ success: boolean; data: Customer[] }>('/api/customers');
      if (res.success && Array.isArray(res.data)) {
        storageService.set(STORAGE_KEY, res.data);
        return res.data;
      }
    } catch {
      // Fallback to cache
    }
    return storageService.get<Customer[]>(STORAGE_KEY, []);
  },

  create: async (data: Partial<Customer>): Promise<Customer | null> => {
    try {
      const res = await apiClient.post<{ success: boolean; data: Customer }>('/api/customers', data);
      if (res.success && res.data) {
        const existing = storageService.get<Customer[]>(STORAGE_KEY, []);
        const updated = [res.data, ...existing.filter((c) => c.mobile !== res.data.mobile)];
        storageService.set(STORAGE_KEY, updated);
        return res.data;
      }
    } catch (err) {
      console.error('Failed to create customer:', err);
      throw err;
    }
    return null;
  },

  delete: async (id: string): Promise<boolean> => {
    // 1. Optimistic removal from cache
    const existing = storageService.get<Customer[]>(STORAGE_KEY, []);
    storageService.set(STORAGE_KEY, existing.filter((c) => c.id !== id && c.mobile !== id));

    // 2. Remote delete from Supabase PostgreSQL
    try {
      await apiClient.delete(`/api/customers/${id}`);
      return true;
    } catch (err) {
      console.warn('Delete customer remote failed:', err);
      return true;
    }
  },

  getHistory: async (idOrMobile: string): Promise<RepairRecord[]> => {
    try {
      const res = await apiClient.get<{ success: boolean; data: RepairRecord[] }>(
        `/api/customers/${idOrMobile}/repairs`
      );
      if (res.success && Array.isArray(res.data)) {
        return res.data;
      }
    } catch (err) {
      console.warn('Failed to fetch repair history from API:', err);
    }
    return [];
  },
};
