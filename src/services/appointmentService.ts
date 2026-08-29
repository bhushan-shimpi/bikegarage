import { Appointment, AppointmentFormData } from '../types/appointment';
import { storageService } from './storageService';
import { apiClient } from './apiClient';

const STORAGE_KEY = 'chaudhari_auto_appointments';

let isSyncingAppointments = false;
let lastAppointmentsSync = 0;
const SYNC_COOLDOWN = 60 * 1000;

export const appointmentService = {
  // Syncs from Supabase PostgreSQL API, updates local cache
  syncWithBackend: async (): Promise<Appointment[]> => {
    const now = Date.now();
    if (isSyncingAppointments || now - lastAppointmentsSync < SYNC_COOLDOWN) {
      return appointmentService.getCached();
    }

    isSyncingAppointments = true;
    lastAppointmentsSync = now;

    try {
      const res = await apiClient.get<{ success: boolean; data: Appointment[] }>('/api/appointments');
      if (res.success && Array.isArray(res.data)) {
        // Filter out any legacy dummy records
        const realData = res.data.filter((a) => !['APT-101', 'APT-102'].includes(a.id));
        storageService.set(STORAGE_KEY, realData);
        return realData;
      }
    } catch {
      // Graceful offline fallback to local cache
    } finally {
      isSyncingAppointments = false;
    }
    return appointmentService.getCached();
  },

  getCached: (): Appointment[] => {
    const saved = storageService.get<Appointment[]>(STORAGE_KEY, []);
    return (saved || []).filter((a) => !['APT-101', 'APT-102'].includes(a.id));
  },

  getAll: (): Appointment[] => {
    // Fire background sync with live Supabase PostgreSQL
    appointmentService.syncWithBackend().catch(() => {});

    const saved = storageService.get<Appointment[]>(STORAGE_KEY, []);
    const cleanReal = (saved || []).filter((a) => !['APT-101', 'APT-102'].includes(a.id));
    if (saved && saved.length !== cleanReal.length) {
      storageService.set(STORAGE_KEY, cleanReal);
    }
    return cleanReal;
  },

  getById: (id: string): Appointment | undefined => {
    const all = appointmentService.getAll();
    return all.find((a) => a.id === id);
  },

  create: (formData: AppointmentFormData): Appointment => {
    const all = appointmentService.getAll();
    const newAppointment: Appointment = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: formData.fullName,
      mobile: formData.mobile,
      email: formData.email,
      bikeBrand: formData.bikeBrand,
      bikeModel: formData.bikeModel,
      registrationNumber: formData.registrationNumber,
      currentKm: formData.currentKm,
      serviceRequired: formData.serviceRequired,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      additionalProblem: formData.additionalProblem,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    const updated = [newAppointment, ...all];
    storageService.set(STORAGE_KEY, updated);

    // Persist asynchronously to live Supabase PostgreSQL
    apiClient.post<{ success: boolean; data: Appointment }>('/api/appointments', formData)
      .then((res) => {
        if (res.success && res.data) {
          // Replace temporary client ID with database record ID
          const latest = storageService.get<Appointment[]>(STORAGE_KEY, []);
          const idx = latest.findIndex((a) => a.id === newAppointment.id);
          if (idx !== -1) {
            latest[idx] = res.data;
            storageService.set(STORAGE_KEY, latest);
          }
        }
      })
      .catch((err) => console.warn('Saved appointment locally, live sync pending:', err));

    return newAppointment;
  },

  updateStatus: (id: string, status: Appointment['status']): Appointment | null => {
    const all = appointmentService.getAll();
    const index = all.findIndex((a) => a.id === id);
    if (index === -1) return null;
    all[index].status = status;
    storageService.set(STORAGE_KEY, all);

    // Sync status with backend
    apiClient.patch(`/api/appointments/${id}/status`, { status }).catch(() => {});

    return all[index];
  },
};
