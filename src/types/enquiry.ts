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
  type: 'general_inquiry' | 'quote_request' | 'breakdown' | 'appointment' | 'ceramic_coating';
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
    estimatedPrice?: number;
  };
  attachments?: string[];
  status: EnquiryStatus;
  notes: InternalNote[];
  createdAt: string;
  updatedAt: string;
}

export const isRestorationEnquiry = (e: Enquiry): boolean => {
  if (!e) return false;
  const sName = e.service?.serviceName?.toLowerCase() || '';
  const pDesc = e.service?.problemDescription?.toLowerCase() || '';
  const quick = e.service?.quickIssues || [];
  return (
    sName.includes('restoration') ||
    pDesc.includes('restoration') ||
    quick.some((q) => q.toLowerCase().includes('restoration') || q.toLowerCase().includes('paint'))
  );
};

export const isCeramicCoatingEnquiry = (e: Enquiry): boolean => {
  if (!e) return false;
  const sName = e.service?.serviceName?.toLowerCase() || '';
  const pDesc = e.service?.problemDescription?.toLowerCase() || '';
  return (
    e.type === 'ceramic_coating' ||
    sName.includes('ceramic') ||
    pDesc.includes('ceramic')
  );
};
