export type EnquiryStatus =
  | 'new'
  | 'contacted'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface InternalNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  ticketNumber: string;
  type: 'general_inquiry' | 'quote_request' | 'breakdown' | 'appointment';
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
  status: EnquiryStatus;
  notes: InternalNote[];
  createdAt: string;
  updatedAt: string;
}
