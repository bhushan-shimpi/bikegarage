import { z } from 'zod';

const indianMobileRegex = /^[6-9]\d{9}$/;

export const inquirySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Please enter your full name' })
    .max(60, { message: 'Name cannot exceed 60 characters' }),
  mobileNumber: z
    .string()
    .regex(indianMobileRegex, { message: 'Please enter a valid 10-digit mobile number' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .optional()
    .or(z.literal('')),
  city: z
    .string()
    .optional()
    .or(z.literal('')),
  vehicleType: z
    .string()
    .min(1, { message: 'Please select vehicle type' }),
  vehicleBrand: z
    .string()
    .optional()
    .or(z.literal('')),
  vehicleModel: z
    .string()
    .min(1, { message: 'Please enter vehicle model' }),
  registrationNumber: z
    .string()
    .optional()
    .or(z.literal('')),
  currentKm: z
    .string()
    .optional()
    .or(z.literal('')),
  fuelType: z
    .string()
    .optional()
    .or(z.literal('')),
  serviceRequired: z
    .string()
    .min(1, { message: 'Please select service required' }),
  problemRequirement: z
    .string()
    .optional()
    .or(z.literal('')),
  preferredDate: z
    .string()
    .optional()
    .or(z.literal('')),
  preferredTime: z
    .string()
    .optional()
    .or(z.literal('')),
  urgency: z
    .string()
    .optional()
    .or(z.literal('')),
});

export type InquirySchemaType = z.infer<typeof inquirySchema>;

// Retained for backward-compatibility if referenced
export const appointmentSchema = inquirySchema;
export type AppointmentSchemaType = InquirySchemaType;
