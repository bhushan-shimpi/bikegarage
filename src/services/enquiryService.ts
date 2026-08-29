import { Enquiry, EnquiryStatus, InternalNote } from '../types/enquiry';
import { storage } from './storageService';
import { apiClient } from './apiClient';
import { customerService } from './customerService';

let isSyncingEnquiries = false;
let lastEnquiriesSync = 0;
const SYNC_COOLDOWN = 60 * 1000;

export const enquiryService = {
  // Syncs with Supabase PostgreSQL API, updates local cache
  syncWithBackend: async (): Promise<Enquiry[]> => {
    const now = Date.now();
    if (isSyncingEnquiries || now - lastEnquiriesSync < SYNC_COOLDOWN) {
      return enquiryService.getCached();
    }

    isSyncingEnquiries = true;
    lastEnquiriesSync = now;

    try {
      const res = await apiClient.get<{ success: boolean; data: Enquiry[] }>('/api/enquiries');
      if (res.success && Array.isArray(res.data)) {
        const realData = res.data.filter((e) => !['enq-001', 'enq-002', 'enq-003', 'enq-004', 'enq-005'].includes(e.id));
        storage.set(storage.keys.ENQUIRIES, realData);
        return realData;
      }
    } catch {
      // Graceful offline fallback to local cache
    } finally {
      isSyncingEnquiries = false;
    }
    return enquiryService.getCached();
  },

  getCached: (): Enquiry[] => {
    const cached = storage.get<Enquiry[]>(storage.keys.ENQUIRIES, []);
    return (cached || []).filter((e) => !['enq-001', 'enq-002', 'enq-003', 'enq-004', 'enq-005'].includes(e.id));
  },

  initialize: (): void => {
    const existing = storage.get<Enquiry[] | null>(storage.keys.ENQUIRIES, null);
    if (!existing || !Array.isArray(existing)) {
      storage.set(storage.keys.ENQUIRIES, []);
      return;
    }
    // Clean out legacy mock records from existing local cache
    const clean = existing.filter((e) => !['enq-001', 'enq-002', 'enq-003', 'enq-004', 'enq-005'].includes(e.id));
    if (clean.length !== existing.length) {
      storage.set(storage.keys.ENQUIRIES, clean);
    }
  },

  resetDefaults: (): void => {
    storage.set(storage.keys.ENQUIRIES, []);
  },

  getAll: (): Enquiry[] => {
    enquiryService.initialize();

    // Trigger background sync with live Supabase PostgreSQL
    enquiryService.syncWithBackend().catch(() => {});

    const cached = storage.get<Enquiry[]>(storage.keys.ENQUIRIES, []);
    return (cached || []).filter((e) => !['enq-001', 'enq-002', 'enq-003', 'enq-004', 'enq-005'].includes(e.id));
  },

  getById: (id: string): Enquiry | undefined => {
    const all = enquiryService.getAll();
    return all.find((e) => e.id === id || e.ticketNumber === id);
  },

  create: async (data: {
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
  }): Promise<Enquiry> => {
    const all = enquiryService.getAll();
    const count = all.length + 1;
    const padded = String(count).padStart(3, '0');
    const newId = `enq-${Date.now()}`;
    const newTicket = `CAC-2026-${padded}`;
    const nowIso = new Date().toISOString();

    let finalId = newId;
    let finalTicket = newTicket;

    // Save synchronously to Supabase PostgreSQL
    try {
      const res = await apiClient.post<{ success: boolean; data: { id: string; ticketNumber: string } }>(
        '/api/enquiries',
        data
      );
      if (res.success && res.data) {
        finalId = res.data.id;
        finalTicket = res.data.ticketNumber;
      }
    } catch (err) {
      console.warn('Saved enquiry locally, live sync pending:', err);
    }

    const newEnquiry: Enquiry = {
      id: finalId,
      ticketNumber: finalTicket,
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
          text: `Enquiry generated for ${data.bike.brand || ''} ${data.bike.model} (${data.service.serviceName}).`,
          createdAt: nowIso,
        },
      ],
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    const updatedList = [newEnquiry, ...all.filter((e) => e.id !== finalId)];
    storage.set(storage.keys.ENQUIRIES, updatedList);

    return newEnquiry;
  },

  delete: async (id: string): Promise<boolean> => {
    const all = storage.get<Enquiry[]>(storage.keys.ENQUIRIES, []);
    const updated = all.filter((e) => e.id !== id && e.ticketNumber !== id);
    storage.set(storage.keys.ENQUIRIES, updated);

    try {
      await apiClient.delete(`/api/enquiries/${id}`);
      return true;
    } catch (err) {
      console.warn('Failed to delete enquiry from backend, removed locally:', err);
      return true;
    }
  },

  deleteMultiple: async (ids: string[]): Promise<boolean> => {
    if (!ids || ids.length === 0) return true;
    const all = storage.get<Enquiry[]>(storage.keys.ENQUIRIES, []);
    const updated = all.filter((e) => !ids.includes(e.id) && !ids.includes(e.ticketNumber));
    storage.set(storage.keys.ENQUIRIES, updated);

    try {
      await apiClient.post('/api/enquiries/bulk-delete', { ids });
      return true;
    } catch (err) {
      console.warn('Failed to bulk delete enquiries from backend, removed locally:', err);
      return true;
    }
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

    // When enquiry is marked as in_progress, automatically save to Customer Directory
    if (newStatus === 'in_progress' && updated.customer?.name && updated.customer?.mobile) {
      customerService.create({
        name: updated.customer.name,
        mobile: updated.customer.mobile,
        bikeBrand: updated.bike?.brand,
        bikeModel: updated.bike?.model,
        registrationNumber: updated.bike?.registrationNumber,
        currentKm: updated.bike?.currentKm,
      }).catch((err) => console.warn('Customer directory auto-save error:', err));
    }

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
