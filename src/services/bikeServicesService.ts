import { ServiceItem } from '../types/service';
import { servicesData } from '../data/servicesData';
import { storageService } from './storageService';
import { apiClient } from './apiClient';

const STORAGE_KEY = 'chaudhari_auto_services';

let isSyncingServices = false;
let lastSyncAttempt = 0;
const SYNC_COOLDOWN_MS = 60 * 1000; // Only attempt sync once every 60 seconds

export const bikeServicesService = {
  // Syncs active services from Supabase PostgreSQL database
  syncWithBackend: async (): Promise<ServiceItem[]> => {
    const now = Date.now();
    if (isSyncingServices || now - lastSyncAttempt < SYNC_COOLDOWN_MS) {
      const saved = storageService.get<ServiceItem[] | null>(STORAGE_KEY, null);
      return (saved && Array.isArray(saved) && saved.length > 0) ? saved : servicesData;
    }

    isSyncingServices = true;
    lastSyncAttempt = now;

    try {
      const res = await apiClient.get<{ success: boolean; data: ServiceItem[] }>('/api/services');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        storageService.set(STORAGE_KEY, res.data);
        window.dispatchEvent(new Event('chaudhari_services_updated'));
        return res.data;
      }
    } catch {
      // Graceful fallback to local cache without recursion
    } finally {
      isSyncingServices = false;
    }

    const saved = storageService.get<ServiceItem[] | null>(STORAGE_KEY, null);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      storageService.set(STORAGE_KEY, servicesData);
      return servicesData;
    }
    return saved;
  },

  getAll: (): ServiceItem[] => {
    // Background sync with cooldown (fire-and-forget)
    bikeServicesService.syncWithBackend().catch(() => {});

    const saved = storageService.get<ServiceItem[] | null>(STORAGE_KEY, null);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      storageService.set(STORAGE_KEY, servicesData);
      return servicesData;
    }

    // Ensure cached s2 has latest package breakdown and pricing
    const s2Cached = saved.find((s) => s.id === 's2');
    if (s2Cached && (!s2Cached.packageBreakdown || s2Cached.priceStartingAt === '₹799')) {
      const s2Fresh = servicesData.find((d) => d.id === 's2');
      if (s2Fresh) {
        const merged = saved.map((s) => (s.id === 's2' ? { ...s, ...s2Fresh } : s));
        storageService.set(STORAGE_KEY, merged);
        return merged;
      }
    }

    return saved;
  },

  getAllAdmin: async (): Promise<ServiceItem[]> => {
    try {
      const res = await apiClient.get<{ success: boolean; data: ServiceItem[] }>('/api/services/all');
      if (res.success && Array.isArray(res.data)) {
        storageService.set(STORAGE_KEY, res.data);
        return res.data;
      }
    } catch {
      // Fallback
    }
    return bikeServicesService.getAll();
  },

  getById: (id: string): ServiceItem | undefined => {
    const all = bikeServicesService.getAll();
    return all.find((s) => s.id === id || s.slug === id);
  },

  createService: async (data: Partial<ServiceItem>): Promise<ServiceItem | null> => {
    try {
      const res = await apiClient.post<{ success: boolean; data: ServiceItem }>('/api/services', data);
      if (res.success && res.data) {
        const all = bikeServicesService.getAll();
        const updated = [...all, res.data];
        storageService.set(STORAGE_KEY, updated);
        window.dispatchEvent(new Event('chaudhari_services_updated'));
        return res.data;
      }
    } catch (err) {
      console.error('Failed to create service in database:', err);
      throw err;
    }
    return null;
  },

  updateService: async (id: string, updates: Partial<ServiceItem>): Promise<ServiceItem | null> => {
    // Optimistic local update
    const all = bikeServicesService.getAll();
    const index = all.findIndex((s) => s.id === id || s.slug === id);
    if (index !== -1) {
      all[index] = {
        ...all[index],
        ...updates,
      };
      storageService.set(STORAGE_KEY, all);
      window.dispatchEvent(new Event('chaudhari_services_updated'));
    }

    // Persist to Supabase PostgreSQL
    try {
      const res = await apiClient.put<{ success: boolean; data: ServiceItem }>(`/api/services/${id}`, updates);
      if (res.success && res.data) {
        const latest = bikeServicesService.getAll();
        const idx = latest.findIndex((s) => s.id === id || s.slug === id);
        if (idx !== -1) {
          latest[idx] = res.data;
          storageService.set(STORAGE_KEY, latest);
          window.dispatchEvent(new Event('chaudhari_services_updated'));
          return res.data;
        }
      }
    } catch (err) {
      console.warn('Updated locally, remote DB sync pending:', err);
    }

    return index !== -1 ? all[index] : null;
  },

  updatePrice: async (id: string, newPrice: string): Promise<ServiceItem | null> => {
    return bikeServicesService.updateService(id, { priceStartingAt: newPrice.trim() });
  },

  deleteService: async (id: string): Promise<boolean> => {
    // 1. Optimistic local removal from cache
    const all = bikeServicesService.getAll();
    const filtered = all.filter((s) => s.id !== id && s.slug !== id);
    storageService.set(STORAGE_KEY, filtered);
    window.dispatchEvent(new Event('chaudhari_services_updated'));

    // 2. Delete from Supabase PostgreSQL database
    try {
      await apiClient.delete(`/api/services/${id}`);
    } catch (err) {
      console.warn('API delete request failed or offline:', err);
    }

    return true;
  },

  resetDefaults: (): ServiceItem[] => {
    storageService.set(STORAGE_KEY, servicesData);
    window.dispatchEvent(new Event('chaudhari_services_updated'));
    return servicesData;
  },
};
