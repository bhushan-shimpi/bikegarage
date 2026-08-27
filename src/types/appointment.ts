export interface AppointmentFormData {
  fullName: string;
  mobile: string;
  email?: string;
  bikeBrand: string;
  bikeModel: string;
  registrationNumber?: string;
  currentKm?: string;
  serviceRequired: string;
  preferredDate: string;
  preferredTime: string;
  additionalProblem?: string;
}

export interface Appointment {
  id: string;
  fullName: string;
  mobile: string;
  email?: string;
  bikeBrand: string;
  bikeModel: string;
  registrationNumber?: string;
  currentKm?: string;
  serviceRequired: string;
  preferredDate: string;
  preferredTime: string;
  additionalProblem?: string;
  status: 'new' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
}
