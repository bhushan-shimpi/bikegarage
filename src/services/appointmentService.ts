import { AppointmentFormData } from '../types/appointment';
import { Enquiry } from '../types/enquiry';
import { enquiryService } from './enquiryService';

export const appointmentService = {
  create: (formData: AppointmentFormData): Enquiry => {
    return enquiryService.create({
      type: 'appointment',
      customer: {
        name: formData.fullName,
        mobile: formData.mobileNumber,
      },
      bike: {
        brand: formData.vehicleType,
        model: formData.vehicleModel,
        registrationNumber: formData.registrationNumber,
      },
      service: {
        serviceName: formData.serviceRequired,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        problemDescription: formData.additionalNotes || 'Service appointment requested via online booking portal.',
      },
    });
  },
};
