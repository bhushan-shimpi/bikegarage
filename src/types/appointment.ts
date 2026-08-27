export interface AppointmentFormData {
  fullName: string;
  mobileNumber: string;
  vehicleType: string;
  vehicleModel: string;
  registrationNumber: string;
  serviceRequired: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes?: string;
}

export interface InquiryFormData {
  fullName: string;
  mobileNumber: string;
  email?: string;
  vehicleType: string;
  vehicleModel: string;
  registrationNumber: string;
  problemRequirement: string;
  uploadedImages?: string[];
}
