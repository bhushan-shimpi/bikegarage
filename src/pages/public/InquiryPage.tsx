import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Wrench,
  Copy,
  Check,
  Send,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { PageBanner } from '../../components/common/PageBanner';
import { inquirySchema, InquirySchemaType } from '../../utils/validators';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry } from '../../types/enquiry';
import { WhatsAppIcon } from '../../components/common/WhatsAppIcon';

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

  const onSubmit = async (data: InquirySchemaType) => {
    setIsSubmitting(true);
    try {
      const isCeramic = data.serviceRequired.toLowerCase().includes('ceramic');
      const created = await enquiryService.create({
        type: isCeramic ? 'ceramic_coating' : 'quote_request',
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
            data.problemRequirement?.trim() || 'Service and checkup booking requested.',
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
      <SEO
        title="Book Two-Wheeler Service & Ceramic Coating | Chaudhari Auto Pahur"
        description="Book your motorcycle service, periodic maintenance, or premium ceramic coating appointment at Chaudhari Auto Centre in Pahur, Jamner."
        canonicalPath="/inquiry"
      />

      {/* Top Banner */}
      <PageBanner
        title="BOOK SERVICE / APPOINTMENT"
        breadcrumb="Book & Enquire"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        
        {/* ─── CONFIRMATION CARD (IF SUBMITTED) ─── */}
        {submittedEnquiry ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg text-center max-w-2xl mx-auto animate-fade-in">
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
              Thank you! Your booking is registered at Chaudhari Auto Centre, Pahur. Our team will contact you shortly to confirm your intake slot.
            </p>

            {/* Summary Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 text-left text-xs space-y-2.5 mb-6 max-w-md mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-500">Ticket Reference:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-gray-900">{submittedEnquiry.ticketNumber}</span>
                  <button
                    onClick={() => handleCopyTicket(submittedEnquiry.ticketNumber)}
                    className="p-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
                    title="Copy Ticket"
                  >
                    {copiedTicket ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="font-bold text-gray-900">{submittedEnquiry.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Mobile:</span>
                <span className="font-mono font-bold text-gray-900">{submittedEnquiry.customer.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle:</span>
                <span className="font-bold text-gray-900">{submittedEnquiry.bike.brand} {submittedEnquiry.bike.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Service:</span>
                <span className="font-bold text-amber-800">{submittedEnquiry.service.serviceName}</span>
              </div>
            </div>

            {/* Direct WhatsApp Share */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={'https://wa.me/917387448878?text=' + encodeURIComponent(
                  'Hello Chaudhari Auto! I have submitted a booking request for ' + submittedEnquiry.service.serviceName + '. Ticket: ' + submittedEnquiry.ticketNumber + ', Rider: ' + submittedEnquiry.customer.name
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={() => setSubmittedEnquiry(null)}
                className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Book Another Service
              </button>
            </div>
          </div>
        ) : (

          /* ─── GENERAL & CERAMIC BOOKING FORM ─── */
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg sm:text-xl font-black text-gray-900 uppercase font-sans tracking-tight">
                  Book Two-Wheeler Service / Ceramic Coating
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Schedule routine maintenance, engine repairs, periodic servicing, or premium ceramic coating at our Pahur workshop.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Rider Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Full Name (नाव) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('fullName')}
                    placeholder="e.g. Bhushan Chaudhari"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    WhatsApp Number (मोबाईल) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('mobileNumber')}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono"
                  />
                  {errors.mobileNumber && <p className="text-[11px] text-red-500">{errors.mobileNumber.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    City / Village (शहर / गाव)
                  </label>
                  <input
                    {...register('city')}
                    placeholder="e.g. Pahur, Jamner"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>
              </div>

              {/* Bike Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Bike Brand (कंपनी)
                  </label>
                  <select
                    {...register('vehicleBrand')}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  >
                    <option value="Hero">Hero (Splendor, HF Deluxe, Passion)</option>
                    <option value="Honda">Honda (Shine, Unicorn, SP125)</option>
                    <option value="Bajaj">Bajaj (Pulsar, Platina, Discover)</option>
                    <option value="Yamaha">Yamaha (RX100, FZ, MT-15, R15)</option>
                    <option value="Royal Enfield">Royal Enfield (Bullet, Classic 350)</option>
                    <option value="TVS">TVS (Apache, Raider, Star City)</option>
                    <option value="Car / Other">Car / Other Vehicle</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Bike / Vehicle Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('vehicleModel')}
                    placeholder="e.g. Splendor Plus, RX100, Shine, Unicorn"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                  {errors.vehicleModel && <p className="text-[11px] text-red-500">{errors.vehicleModel.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Registration Plate Number
                  </label>
                  <input
                    {...register('registrationNumber')}
                    placeholder="e.g. MH 19 XX 1234"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white uppercase font-mono"
                  />
                </div>
              </div>

              {/* Service Selection & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Service Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('serviceRequired')}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-medium"
                  >
                    <option value="General Bike Service">General Bike Service & Oil Change</option>
                    <option value="Premium Ceramic Coating (Bike)">✨ Premium Ceramic Coating (Bike)</option>
                    <option value="Premium Ceramic Coating (Car)">🚗 Premium Ceramic Coating (Car)</option>
                    <option value="Engine Repair & Overhaul">Engine Repair & Overhaul (4-Stroke / 2-Stroke)</option>
                    <option value="Periodic Maintenance (3-Month)">Periodic Maintenance (3-Month Checkup)</option>
                    <option value="Brake & Clutch Overhaul">Brake & Clutch Overhaul</option>
                    <option value="Electrical / Wiring / Battery">Electrical / Wiring / Battery Check</option>
                    <option value="Carburettor & FI Tuning">Carburettor & FI Tuning</option>
                    <option value="Other Service">Other Specific Repair</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    {...register('preferredDate')}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Preferred Time Slot
                  </label>
                  <select
                    {...register('preferredTime')}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  >
                    <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                    <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Problem Requirement / Notes */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  Problem Description / Specific Requests (तक्रार किंवा काम)
                </label>
                <textarea
                  rows={3}
                  {...register('problemRequirement')}
                  placeholder="e.g. Ceramic coating required on tank & panels, engine starting trouble, abnormal sound, etc."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold text-sm uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>{isSubmitting ? 'Submitting Request...' : 'Submit Booking Request'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
