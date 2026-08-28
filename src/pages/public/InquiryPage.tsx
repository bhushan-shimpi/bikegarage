import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  Calendar,
  Bike,
  User,
  Wrench,
  FileText,
  Copy,
  Check,
} from 'lucide-react';
import { PageBanner } from '../../components/common/PageBanner';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { inquirySchema, InquirySchemaType } from '../../utils/validators';
import { enquiryService } from '../../services/enquiryService';
import { bikeServicesService } from '../../services/bikeServicesService';
import { Enquiry } from '../../types/enquiry';


export const InquiryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || 'General Bike Service';
  const prefilledNotes = searchParams.get('notes') || '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InquirySchemaType>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      email: '',
      city: '',
      vehicleType: 'Motorcycle',
      vehicleBrand: '',
      vehicleModel: '',
      registrationNumber: '',
      currentKm: '',
      serviceRequired: preselectedService,
      problemRequirement: prefilledNotes || '',
      preferredDate: today,
      preferredTime: 'Morning (09:00 AM - 12:00 PM)',
    },
  });

  useEffect(() => {
    if (preselectedService) {
      setValue('serviceRequired', preselectedService);
    }
    if (prefilledNotes) {
      setValue('problemRequirement', prefilledNotes);
    }
  }, [preselectedService, prefilledNotes, setValue]);

  const handleCopyTicket = (ticket: string) => {
    navigator.clipboard.writeText(ticket);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  const onSubmit = (data: InquirySchemaType) => {
    setIsSubmitting(true);
    try {
      const created = enquiryService.create({
        type: 'quote_request',
        customer: {
          name: data.fullName,
          mobile: data.mobileNumber,
          email: data.email,
          city: data.city,
        },
        bike: {
          brand: data.vehicleBrand || 'Two-Wheeler',
          model: data.vehicleModel,
          registrationNumber: data.registrationNumber,
          currentKm: data.currentKm,
          vehicleType: data.vehicleType,
        },
        service: {
          serviceName: data.serviceRequired,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          problemDescription:
            data.problemRequirement?.trim() || 'General service checkup and inspection requested.',
        },
      });

      setSubmittedEnquiry(created);
      reset();
    } catch (err) {
      console.error('Failed to submit enquiry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      {/* Top Banner */}
      <PageBanner title="BOOK SERVICE / ENQUIRY" breadcrumb="Book & Enquire" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {submittedEnquiry ? (
          /* Simplified Confirmation Card */
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#DFA500] block mb-1">
              Booking Ref: {submittedEnquiry.ticketNumber}
            </span>

            <h2 className="text-2xl sm:text-3xl font-black uppercase text-gray-900 tracking-tight mb-2 font-sans">
              ENQUIRY SUBMITTED!
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-6">
              Thank you! Your request is registered at Chaudhari Auto Centre, Pahur. Our team will contact you shortly to confirm intake timing.
            </p>

            {/* Summary Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left text-xs space-y-2 mb-6 max-w-md mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-500">Ticket Reference:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-gray-900">{submittedEnquiry.ticketNumber}</span>
                  <button
                    onClick={() => handleCopyTicket(submittedEnquiry.ticketNumber)}
                    className="p-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                    title="Copy Ticket"
                  >
                    {copiedTicket ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Rider:</span>
                <span className="font-bold text-gray-900">{submittedEnquiry.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bike:</span>
                <span className="font-bold text-gray-900">{submittedEnquiry.bike.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Service:</span>
                <span className="font-bold text-[#DFA500]">{submittedEnquiry.service.serviceName}</span>
              </div>
              {submittedEnquiry.service.preferredDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-bold text-gray-900">{submittedEnquiry.service.preferredDate}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/917387448878?text=${encodeURIComponent(
                  `Hello Chaudhari Auto Centre, I have submitted an enquiry (Ticket: ${submittedEnquiry.ticketNumber}) for my ${submittedEnquiry.bike.model} (${submittedEnquiry.service.serviceName}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Notify On WhatsApp</span>
              </a>

              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors"
              >
                Back To Home
              </Link>
            </div>
          </div>
        ) : (
          /* Simplified Clean Form Card */
          <ScrollReveal direction="up">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
              <div className="text-center pb-6 mb-6 border-b border-gray-100">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900 font-sans">
                  Book Service or Send Enquiry
                </h2>
              <p className="text-xs text-gray-500 mt-1">
                Fill the quick form below. Our Pahur workshop team will get back to you promptly.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs" noValidate>
              {/* Full Name */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Rahul Patil"
                    {...register('fullName')}
                    className={`w-full bg-gray-50 border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900] ${
                      errors.fullName ? 'border-red-400' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-xs">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="7387448878"
                    {...register('mobileNumber')}
                    className={`w-full bg-gray-50 border rounded-lg pl-12 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900] ${
                      errors.mobileNumber ? 'border-red-400' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.mobileNumber.message}</p>
                )}
              </div>

              {/* Bike Model */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Bike / Scooter Model <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Bike className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Honda Shine 125, Hero Splendor, Classic 350, Activa"
                    {...register('vehicleModel')}
                    className={`w-full bg-gray-50 border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900] ${
                      errors.vehicleModel ? 'border-red-400' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.vehicleModel && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.vehicleModel.message}</p>
                )}
              </div>

              {/* Grid: Service & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Service Required */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Service Required <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Wrench className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      {...register('serviceRequired')}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900]"
                    >
                      {bikeServicesService.getAll().map((opt) => (
                        <option key={opt.id} value={opt.name}>
                          {opt.name} ({opt.priceStartingAt})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      min={today}
                      {...register('preferredDate')}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900]"
                    />
                  </div>
                </div>
              </div>

              {/* Problem / Specific Symptoms (Optional) */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Problem Description / Symptoms <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <textarea
                    rows={3}
                    placeholder="e.g. Engine sound, low pickup, oil change needed, cold starting trouble..."
                    {...register('problemRequirement')}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#F5B900] hover:bg-[#DFA500] text-black font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking & Enquiry'}
                </button>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-gray-100 text-center">
                <p className="text-[11px] text-gray-500 mb-2">Prefer to talk directly?</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="tel:+917387448878"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F5B900]" />
                    <span>Call: +91 73874 48878</span>
                  </a>
                  <a
                    href="https://wa.me/917387448878?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors border border-emerald-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </ScrollReveal>
      )}
      </div>
    </div>
  );
};
