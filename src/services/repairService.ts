import { RepairRecord, DailyRepairStats } from '../types/customer';
import { storageService } from './storageService';
import { apiClient } from './apiClient';

const STORAGE_KEY = 'chaudhari_auto_repairs';

export const repairService = {
  getCached: (): RepairRecord[] => {
    return storageService.get<RepairRecord[]>(STORAGE_KEY, []);
  },

  getCachedStats: (): DailyRepairStats => {
    const all = storageService.get<RepairRecord[]>(STORAGE_KEY, []);
    const todayStr = new Date().toISOString().split('T')[0];
    const todayCompleted = all.filter((r) => r.status === 'Completed' && r.repairDate === todayStr);
    const todayRev = todayCompleted.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
    const inWork = all.filter((r) => r.status === 'In Progress').length;
    const lifeRev = all.reduce((sum, r) => sum + (r.totalAmount || 0), 0);

    return {
      todayCompletedCount: todayCompleted.length,
      todayRevenue: todayRev,
      inWorkshopCount: inWork,
      lifetimeRepairsCount: all.length,
      lifetimeRevenue: lifeRev,
      todayDate: todayStr,
    };
  },

  getAll: async (params?: { status?: string; search?: string; date?: string }): Promise<RepairRecord[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.status) queryParams.append('status', params.status);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.date) queryParams.append('date', params.date);

      const qs = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const res = await apiClient.get<{ success: boolean; data: RepairRecord[] }>(`/api/repairs${qs}`);
      if (res.success && Array.isArray(res.data)) {
        storageService.set(STORAGE_KEY, res.data);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('chaudhari_repairs_updated'));
        }
        return res.data;
      }
    } catch {
      // Fallback
    }
    return storageService.get<RepairRecord[]>(STORAGE_KEY, []);
  },

  getById: async (id: string): Promise<RepairRecord | null> => {
    try {
      const res = await apiClient.get<{ success: boolean; data: RepairRecord }>(`/api/repairs/${id}`);
      if (res.success && res.data) return res.data;
    } catch {
      // Fallback
    }
    const all = storageService.get<RepairRecord[]>(STORAGE_KEY, []);
    return all.find((r) => r.id === id || r.jobNumber === id) || null;
  },

  create: async (data: Partial<RepairRecord>): Promise<RepairRecord | null> => {
    try {
      const res = await apiClient.post<{ success: boolean; data: RepairRecord }>('/api/repairs', data);
      if (res.success && res.data) {
        const existing = storageService.get<RepairRecord[]>(STORAGE_KEY, []);
        storageService.set(STORAGE_KEY, [res.data, ...existing]);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('chaudhari_repairs_updated'));
        }
        return res.data;
      }
    } catch (err) {
      console.error('Failed to create repair record:', err);
      throw err;
    }
    return null;
  },

  update: async (id: string, data: Partial<RepairRecord>): Promise<RepairRecord | null> => {
    try {
      const res = await apiClient.put<{ success: boolean; data: RepairRecord }>(`/api/repairs/${id}`, data);
      if (res.success && res.data) {
        const existing = storageService.get<RepairRecord[]>(STORAGE_KEY, []);
        const updated = existing.map((r) => (r.id === id || r.jobNumber === id ? res.data : r));
        storageService.set(STORAGE_KEY, updated);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('chaudhari_repairs_updated'));
        }
        return res.data;
      }
    } catch (err) {
      console.warn('Update repair record remote failed:', err);
    }
    return null;
  },

  delete: async (id: string): Promise<boolean> => {
    // 1. Optimistic removal from cache
    const existing = storageService.get<RepairRecord[]>(STORAGE_KEY, []);
    storageService.set(STORAGE_KEY, existing.filter((r) => r.id !== id && r.jobNumber !== id));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chaudhari_repairs_updated'));
    }

    // 2. Remote delete from Supabase PostgreSQL
    try {
      await apiClient.delete(`/api/repairs/${id}`);
      return true;
    } catch (err) {
      console.warn('Delete repair record remote failed:', err);
      return true;
    }
  },

  getDailyStats: async (): Promise<DailyRepairStats> => {
    try {
      const res = await apiClient.get<{ success: boolean; stats: DailyRepairStats }>(
        '/api/repairs/stats/daily'
      );
      if (res.success && res.stats) {
        return res.stats;
      }
    } catch {
      // Fallback
    }

    const all = storageService.get<RepairRecord[]>(STORAGE_KEY, []);
    const todayStr = new Date().toISOString().split('T')[0];
    const todayCompleted = all.filter((r) => r.status === 'Completed' && r.repairDate === todayStr);
    const todayRev = todayCompleted.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
    const inWork = all.filter((r) => r.status === 'In Progress').length;
    const lifeRev = all.reduce((sum, r) => sum + (r.totalAmount || 0), 0);

    return {
      todayCompletedCount: todayCompleted.length,
      todayRevenue: todayRev,
      inWorkshopCount: inWork,
      lifetimeRepairsCount: all.length,
      lifetimeRevenue: lifeRev,
      todayDate: todayStr,
    };
  },
};
