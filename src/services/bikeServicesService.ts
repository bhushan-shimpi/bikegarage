import { ServiceItem } from '../types/service';
import { servicesData } from '../data/servicesData';
import { storageService } from './storageService';

const STORAGE_KEY = 'chaudhari_auto_services';

export const bikeServicesService = {
  getAll: (): ServiceItem[] => {
    const saved = storageService.get<ServiceItem[] | null>(STORAGE_KEY, null);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      storageService.set(STORAGE_KEY, servicesData);
      return servicesData;
    }
    return saved;
  },

  getById: (id: string): ServiceItem | undefined => {
    const all = bikeServicesService.getAll();
    return all.find((s) => s.id === id || s.slug === id);
  },

  updatePrice: (id: string, newPrice: string): ServiceItem | null => {
    const all = bikeServicesService.getAll();
    const index = all.findIndex((s) => s.id === id || s.slug === id);
    if (index === -1) return null;

    all[index] = {
      ...all[index],
      priceStartingAt: newPrice.trim(),
    };

    storageService.set(STORAGE_KEY, all);
    window.dispatchEvent(new Event('chaudhari_services_updated'));
    return all[index];
  },

  updateService: (id: string, updates: Partial<ServiceItem>): ServiceItem | null => {
    const all = bikeServicesService.getAll();
    const index = all.findIndex((s) => s.id === id || s.slug === id);
    if (index === -1) return null;

    all[index] = {
      ...all[index],
      ...updates,
    };

    storageService.set(STORAGE_KEY, all);
    window.dispatchEvent(new Event('chaudhari_services_updated'));
    return all[index];
  },

  resetDefaults: (): ServiceItem[] => {
    storageService.set(STORAGE_KEY, servicesData);
    window.dispatchEvent(new Event('chaudhari_services_updated'));
    return servicesData;
  },
};
