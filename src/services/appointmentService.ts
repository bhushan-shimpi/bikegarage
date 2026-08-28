import { Appointment, AppointmentFormData } from '../types/appointment';
import { storageService } from './storageService';
import { apiClient } from './apiClient';

const STORAGE_KEY = 'chaudhari_auto_appointments';

const defaultAppointments: Appointment[] = [
  {
    id: 'APT-101',
    fullName: 'Sunil Mahajan',
    mobile: '9822456781',
    email: 'sunil.mahajan@gmail.com',
    bikeBrand: 'Honda',
    bikeModel: 'Shine 125',
    registrationNumber: 'MH 19 BJ 4421',
    currentKm: '24,500 km',
    serviceRequired: 'General Bike Service',
    preferredDate: '2026-08-28',
    preferredTime: 'Morning (09:00 AM - 12:00 PM)',
    additionalProblem: 'Cold start issue, engine missing at 40 km/h, and front brake lever loose.',
    status: 'new',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'APT-102',
    fullName: 'Ganesh Shimpi',
    mobile: '9423187654',
    email: 'ganesh.s@yahoo.com',
    bikeBrand: 'Honda',
    bikeModel: 'CB Shine 125 SP',
    registrationNumber: 'MH 19 CK 1994',
    currentKm: '42,000 km',
    serviceRequired: 'Premium Bike Service',
    preferredDate: '2026-08-29',
    preferredTime: 'Afternoon (12:00 PM - 03:00 PM)',
    additionalProblem: 'Engine oil replacement, brake overhaul, chain lubrication, and complete foam wash.',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export const appointmentService = {
  // Syncs from Supabase PostgreSQL API, updates local cache
  syncWithBackend: async (): Promise<Appointment[]> => {
    try {
      const res = await apiClient.get<{ success: boolean; data: Appointment[] }>('/api/appointments');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        storageService.set(STORAGE_KEY, res.data);
        return res.data;
      }
    } catch {
      // Graceful offline fallback to local cache
    }
    return appointmentService.getAll();
  },

  getAll: (): Appointment[] => {
    // Fire background sync with live Supabase PostgreSQL
    appointmentService.syncWithBackend().catch(() => {});

    const saved = storageService.get<Appointment[]>(STORAGE_KEY, defaultAppointments);
    if (!saved || saved.length === 0) {
      storageService.set(STORAGE_KEY, defaultAppointments);
      return defaultAppointments;
    }
    return saved;
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
