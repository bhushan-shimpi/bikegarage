import { Enquiry, EnquiryStatus, InternalNote } from '../types/enquiry';
import { initialEnquiriesData } from '../data/enquiriesData';
import { storage } from './storageService';
import { apiClient } from './apiClient';

export const enquiryService = {
  // Syncs with Supabase PostgreSQL API, updates local cache
  syncWithBackend: async (): Promise<Enquiry[]> => {
    try {
      const res = await apiClient.get<{ success: boolean; data: Enquiry[] }>('/api/enquiries');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        storage.set(storage.keys.ENQUIRIES, res.data);
        return res.data;
      }
    } catch {
      // Graceful offline fallback to local cache
    }
    return enquiryService.getAll();
  },

  initialize: (): void => {
    const existing = storage.get<Enquiry[] | null>(storage.keys.ENQUIRIES, null);
    if (!existing || !Array.isArray(existing) || existing.length === 0) {
      storage.set(storage.keys.ENQUIRIES, initialEnquiriesData);
    }
  },

  resetDefaults: (): void => {
    storage.set(storage.keys.ENQUIRIES, initialEnquiriesData);
  },

  getAll: (): Enquiry[] => {
    enquiryService.initialize();

    // Trigger background sync with live Supabase PostgreSQL
    enquiryService.syncWithBackend().catch(() => {});

    return storage.get<Enquiry[]>(storage.keys.ENQUIRIES, initialEnquiriesData);
  },

  getById: (id: string): Enquiry | undefined => {
    const all = enquiryService.getAll();
    return all.find((e) => e.id === id || e.ticketNumber === id);
  },

  create: (data: {
    type?: 'general_inquiry' | 'quote_request' | 'breakdown' | 'appointment';
    customer: {
      name: string;
      mobile: string;
      email?: string;
      address?: string;
      city?: string;
    };
    bike: {
      brand: string;
      model: string;
      registrationNumber?: string;
      vehicleType?: string;
      fuelType?: string;
      currentKm?: string;
      year?: string;
    };
    service: {
      serviceName: string;
      preferredDate?: string;
      preferredTime?: string;
      problemDescription: string;
      urgency?: 'normal' | 'urgent' | 'evening';
      quickIssues?: string[];
    };
    attachments?: string[];
  }): Enquiry => {
    const all = enquiryService.getAll();
    const count = all.length + 1;
    const padded = String(count).padStart(3, '0');
    const newId = `enq-${Date.now()}`;
    const newTicket = `CAC-2026-${padded}`;
    const nowIso = new Date().toISOString();

    const newEnquiry: Enquiry = {
      id: newId,
      ticketNumber: newTicket,
      type: data.type || 'general_inquiry',
      customer: data.customer,
      bike: data.bike,
      service: data.service,
      attachments: data.attachments || [],
      status: 'new',
      notes: [
        {
          id: `note-${Date.now()}`,
          author: 'System',
          text: `Enquiry generated via website portal for ${data.bike.brand || ''} ${data.bike.model} (${data.service.serviceName}).`,
          createdAt: nowIso,
        },
      ],
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    const updatedList = [newEnquiry, ...all];
    storage.set(storage.keys.ENQUIRIES, updatedList);

    // Save asynchronously to Supabase PostgreSQL
    apiClient.post<{ success: boolean; data: { id: string; ticketNumber: string } }>('/api/enquiries', data)
      .then((res) => {
        if (res.success && res.data) {
          const latest = storage.get<Enquiry[]>(storage.keys.ENQUIRIES, []);
          const idx = latest.findIndex((e) => e.id === newEnquiry.id);
          if (idx !== -1) {
            latest[idx].ticketNumber = res.data.ticketNumber;
            storage.set(storage.keys.ENQUIRIES, latest);
          }
        }
      })
      .catch((err) => console.warn('Saved enquiry locally, live sync pending:', err));

    return newEnquiry;
  },

  updateStatus: (id: string, newStatus: EnquiryStatus): Enquiry | null => {
    const all = enquiryService.getAll();
    const index = all.findIndex((e) => e.id === id || e.ticketNumber === id);
    if (index === -1) return null;

    const existing = all[index];
    const nowIso = new Date().toISOString();

    const systemNote: InternalNote = {
      id: `note-${Date.now()}`,
      author: 'System',
      text: `Status updated from "${existing.status.toUpperCase()}" to "${newStatus.toUpperCase()}".`,
      createdAt: nowIso,
    };

    const updated: Enquiry = {
      ...existing,
      status: newStatus,
      updatedAt: nowIso,
      notes: [...existing.notes, systemNote],
    };

    all[index] = updated;
    storage.set(storage.keys.ENQUIRIES, all);

    // Sync with backend API
    apiClient.patch(`/api/enquiries/${id}/status`, { status: newStatus }).catch(() => {});

    return updated;
  },

  addNote: (id: string, noteText: string, author: string = 'Staff'): Enquiry | null => {
    const all = enquiryService.getAll();
    const index = all.findIndex((e) => e.id === id || e.ticketNumber === id);
    if (index === -1) return null;

    const existing = all[index];
    const nowIso = new Date().toISOString();

    const newNote: InternalNote = {
      id: `note-${Date.now()}`,
      author,
      text: noteText,
      createdAt: nowIso,
    };

    const updated: Enquiry = {
      ...existing,
      updatedAt: nowIso,
      notes: [...existing.notes, newNote],
    };

    all[index] = updated;
    storage.set(storage.keys.ENQUIRIES, all);

    // Sync note with backend API
    apiClient.post(`/api/enquiries/${id}/notes`, { text: noteText, author }).catch(() => {});

    return updated;
  },
};
