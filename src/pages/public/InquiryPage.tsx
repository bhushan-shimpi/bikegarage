import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import {
  Tag,
  Zap,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  BellRing,
  X,
  Phone,
  MessageCircle,
  Clock,
  Bike,
  User,
  Plus,
  Copy,
  Check,
} from 'lucide-react';
import { PageBanner } from '../../components/common/PageBanner';
import { inquirySchema, InquirySchemaType } from '../../utils/validators';
import { enquiryService } from '../../services/enquiryService';
import { servicesData } from '../../data/servicesData';
import { Modal } from '../../components/common/Modal';
import { Enquiry } from '../../types/enquiry';

export const InquiryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefilledNotes = searchParams.get('notes') || '';
  const preselectedService = searchParams.get('service') || 'General Bike Service';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);
  const [mockUploadedImages, setMockUploadedImages] = useState<string[]>([]);
  const [copiedTicket, setCopiedTicket] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bikeTypes = [
    'Commuter Motorcycle (Splendor, Shine, Platina)',
    'Performance & Sports Bike (Pulsar, Apache, R15, Duke)',
    'Cruiser & Classic (Bullet 350, Classic, Jawa)',
    'Scooter / Moped (Activa, Jupiter, Access)',
    'Vintage 2-Stroke (Yamaha RX100, RX135, Rajdoot, Chetak)',
    'Other Two-Wheeler',
  ];

  const bikeBrands = [
    'Hero MotoCorp',
    'Honda 2Wheelers',
    'Bajaj Auto',
    'Royal Enfield',
    'Yamaha',
    'TVS Motor',
    'KTM',
    'Suzuki',
    'Jawa / Yezdi',
    'Other Brand',
  ];

  const quickIssueChips = [
    'Starting Trouble (Kick / Self)',
    'Low Mileage / Low Pickup',
    'Engine Noise / Tappet Sound',
    'Drive Chain Loose / Noise',
    'Front Fork Oil Leakage',
    'Disc / Drum Brake Squeak',
    'Carburetor / FI Missing',
    'Complete Bike Restoration',
    'Periodic General Servicing',
  ];

  const timeSlots = [
    'Morning (09:00 AM - 12:00 PM)',
    'Afternoon (12:00 PM - 03:00 PM)',
    'Evening (03:00 PM - 07:00 PM)',
    'Anytime Convenient',
  ];

  const today = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<InquirySchemaType>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      email: '',
      city: '',
      vehicleType: 'Commuter Motorcycle (Splendor, Shine, Platina)',
      vehicleBrand: '',
      vehicleModel: '',
      registrationNumber: '',
      fuelType: 'Petrol',
      serviceRequired: preselectedService,
      problemRequirement: prefilledNotes || '',
      preferredDate: '',
      preferredTime: 'Morning (09:00 AM - 12:00 PM)',
      urgency: 'normal',
    },
  });

  const currentProblem = watch('problemRequirement');

  useEffect(() => {
    if (preselectedService) {
      setValue('serviceRequired', preselectedService);
    }
    if (prefilledNotes) {
      setValue('problemRequirement', prefilledNotes);
    }
  }, [preselectedService, prefilledNotes, setValue]);

  const handleChipClick = (issue: string) => {
    const existing = currentProblem ? currentProblem.trim() : '';
    if (existing.includes(issue)) return;
    const updated = existing ? `${existing}, ${issue}` : issue;
    setValue('problemRequirement', updated, { shouldValidate: true });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      newUrls.push(URL.createObjectURL(files[i]));
    }
    setMockUploadedImages((prev) => [...prev, ...newUrls].slice(0, 5));
  };

  const removeImage = (index: number) => {
    setMockUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCopyTicket = (ticket: string) => {
    navigator.clipboard.writeText(ticket);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2500);
  };

  const onSubmit = async (data: InquirySchemaType) => {
    setIsSubmitting(true);
    setTimeout(() => {
      try {
        const created = enquiryService.create({
          type: data.urgency === 'urgent' ? 'breakdown' : 'quote_request',
          customer: {
            name: data.fullName,
            mobile: data.mobileNumber,
            email: data.email,
            address: data.city,
            city: data.city,
          },
          bike: {
            brand: data.vehicleBrand || 'Two-Wheeler',
            model: data.vehicleModel,
            registrationNumber: data.registrationNumber,
            vehicleType: data.vehicleType,
            fuelType: 'Petrol',
          },
          service: {
            serviceName: data.serviceRequired,
            preferredDate: data.preferredDate,
            preferredTime: data.preferredTime,
            problemDescription: data.problemRequirement,
            urgency: (data.urgency as 'normal' | 'urgent' | 'evening') || 'normal',
          },
          attachments: mockUploadedImages.length > 0 ? mockUploadedImages : undefined,
        });

        setSubmittedEnquiry(created);
        reset();
        setMockUploadedImages([]);
      } catch (err) {
        console.error('Failed to submit inquiry:', err);
      } finally {
        setIsSubmitting(false);
      }
    }, 500);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      {/* Top Page Banner */}
      <PageBanner title="BIKE INQUIRY / GET A QUOTE" breadcrumb="Bike Inquiry" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Main Split Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Two-Wheeler Form */}
            <div className="lg:col-span-8 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Send Bike Service Inquiry
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Share your bike details for honest inspection advice & prompt callback from Master Bhushan
                  </p>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-1 bg-[#FFF9E6] border border-[#F5B900]/40 text-[#DFA500] font-bold text-[11px] rounded-full">
                  Pahur Workshop
                </span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-xs" noValidate>
                {/* 1. Customer Information */}
                <div>
                  <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold uppercase tracking-wider text-[11px]">
                    <User className="w-4 h-4 text-[#F5B900]" />
                    <span>1. Rider Contact Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Patil"
                        {...register('fullName')}
                        className={`w-full bg-white border rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 ${
                          errors.fullName
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-[#F5B900] focus:ring-[#F5B900]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.fullName.message}</p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="98220 12345"
                          {...register('mobileNumber')}
                          className={`w-full bg-white border rounded-md pl-11 pr-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 ${
                            errors.mobileNumber
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 focus:border-[#F5B900] focus:ring-[#F5B900]'
                          }`}
                        />
                      </div>
                      {errors.mobileNumber && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.mobileNumber.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@gmail.com"
                        {...register('email')}
                        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900]"
                      />
                    </div>

                    {/* Village / Town */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Village / Town in Pahur Area (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Pahur Peth, Jamner Road, Shendurni, Wakod"
                        {...register('city')}
                        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Bike Details */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold uppercase tracking-wider text-[11px]">
                    <Bike className="w-4 h-4 text-[#F5B900]" />
                    <span>2. Bike / Two-Wheeler Specifications</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Bike Category */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Bike Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register('vehicleType')}
                        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900]"
                      >
                        {bikeTypes.map((bt) => (
                          <option key={bt} value={bt}>
                            {bt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Bike Brand */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Manufacturer / Brand
                      </label>
                      <select
                        {...register('vehicleBrand')}
                        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900]"
                      >
                        <option value="">Select Brand</option>
                        {bikeBrands.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Bike Model */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Bike Model <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Shine 125, RX100, Classic 350, Activa"
                        {...register('vehicleModel')}
                        className={`w-full bg-white border rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 ${
                          errors.vehicleModel
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-[#F5B900] focus:ring-[#F5B900]'
                        }`}
                      />
                      {errors.vehicleModel && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.vehicleModel.message}</p>
                      )}
                    </div>

                    {/* Registration Number */}
                    <div className="sm:col-span-3">
                      <label className="block font-medium text-gray-700 mb-1">
                        Bike Number Plate (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. MH 19 AC 4521"
                        {...register('registrationNumber')}
                        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 uppercase placeholder-gray-400 focus:outline-none focus:border-[#F5B900]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Service Required & Problem Description */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold uppercase tracking-wider text-[11px]">
                    <Wrench className="w-4 h-4 text-[#F5B900]" />
                    <span>3. Service & Symptoms</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Primary Service Required <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register('serviceRequired')}
                        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900]"
                      >
                        {servicesData.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name} ({s.shortDescription})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quick Issue Chips */}
                    <div>
                      <span className="block font-medium text-gray-700 mb-1.5">
                        Common Bike Issues (Tap to add):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {quickIssueChips.map((chip) => (
                          <button
                            type="button"
                            key={chip}
                            onClick={() => handleChipClick(chip)}
                            className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-[#FFF9E6] hover:text-black hover:border-[#F5B900] border border-gray-200 text-[11px] text-gray-700 transition-colors flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3 text-[#F5B900]" />
                            <span>{chip}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Problem Description */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Describe the Problem or Restoration Details <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Engine white smoke, morning kick slip, carburetor overflow, need full RX100 painting, front brake disc spongy..."
                        {...register('problemRequirement')}
                        className={`w-full bg-white border rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 ${
                          errors.problemRequirement
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-[#F5B900] focus:ring-[#F5B900]'
                        }`}
                      />
                      {errors.problemRequirement && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.problemRequirement.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. Preferred Inspection & Urgency */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold uppercase tracking-wider text-[11px]">
                    <Clock className="w-4 h-4 text-[#F5B900]" />
                    <span>4. Workshop Visit / Callback Preference</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Preferred Date */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Preferred Visit Date
                      </label>
                      <input
                        type="date"
                        min={today}
                        {...register('preferredDate')}
                        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900]"
                      />
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Preferred Time
                      </label>
                      <select
                        {...register('preferredTime')}
                        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900]"
                      >
                        {timeSlots.map((ts) => (
                          <option key={ts} value={ts}>
                            {ts}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Urgency */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Urgency
                      </label>
                      <select
                        {...register('urgency')}
                        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900]"
                      >
                        <option value="normal">Standard Service / Quote</option>
                        <option value="urgent">Urgent / Bike Breakdown</option>
                        <option value="evening">Call Me Today Evening</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 5. Photo Uploads */}
                <div className="pt-2 border-t border-gray-100">
                  <label className="block font-medium text-gray-700 mb-1.5">
                    Upload Photos of Bike / Engine / Tank (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                    />
                  </div>

                  {mockUploadedImages.length > 0 && (
                    <div className="flex flex-wrap gap-2.5 mt-3">
                      {mockUploadedImages.map((url, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-lg border border-gray-300 overflow-hidden shadow-xs">
                          <img src={url} alt="Bike upload preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute top-1 right-1 bg-black/75 hover:bg-red-600 text-white rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-md bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending Your Inquiry...' : 'Submit Bike Service Inquiry'}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Dark Black Info Sidebar matching reference */}
            <div className="lg:col-span-4 bg-[#141414] text-white p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
                  Why Chaudhari Auto?
                </h3>

                <div className="space-y-6">
                  {/* 1 */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full border border-[#F5B900] flex items-center justify-center text-[#F5B900] shrink-0">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Genuine Bike Parts</h4>
                      <p className="text-[11px] text-neutral-400">Hero, Bajaj, Yamaha & Enfield OEM spares</p>
                    </div>
                  </div>

                  {/* 2 */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full border border-[#F5B900] flex items-center justify-center text-[#F5B900] shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Quick Turnaround</h4>
                      <p className="text-[11px] text-neutral-400">Same-day general servicing & oil changes</p>
                    </div>
                  </div>

                  {/* 3 */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full border border-[#F5B900] flex items-center justify-center text-[#F5B900] shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">30+ Years Legacy</h4>
                      <p className="text-[11px] text-neutral-400">Master technicians in Pahur since 1994</p>
                    </div>
                  </div>

                  {/* 4 */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full border border-[#F5B900] flex items-center justify-center text-[#F5B900] shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Restoration Experts</h4>
                      <p className="text-[11px] text-neutral-400">Specialists in RX100, Bullet 350 & 2-stroke icons</p>
                    </div>
                  </div>
                </div>

                <div className="my-8 border-t border-[#262626]" />

                {/* Direct Contact Info */}
                <div className="space-y-2">
                  <span className="text-[11px] text-neutral-400 block font-medium">Need immediate advice from Bhushan?</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#F5B900]">
                    <Phone className="w-4 h-4" />
                    <a href="tel:+919822000000" className="hover:underline">
                      +91 98220 00000
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="pt-6">
                <a
                  href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto,%20I%20have%20an%20urgent%20bike%20service%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Workshop</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Yellow Callout Alert */}
        <div className="bg-[#FFF9E6] border border-[#F5B900]/40 rounded-xl p-4 sm:p-5 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#F5B900]/20 flex items-center justify-center text-[#DFA500] shrink-0 mt-0.5">
            <BellRing className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900">
              We will review your bike inquiry and contact you shortly.
            </h4>
            <p className="text-xs text-gray-600 mt-0.5">
              Thank you! Our master mechanic will diagnose your requirement and advise honest solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Confirmation Modal */}
      {submittedEnquiry && (
        <Modal
          isOpen={Boolean(submittedEnquiry)}
          onClose={() => setSubmittedEnquiry(null)}
          title="Bike Inquiry Received"
          maxWidth="md"
        >
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white uppercase tracking-tight">
              Bike Service Inquiry Submitted!
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300">
              Thank you! Your ticket is registered. Chaudhari Auto Centre will call you shortly with an estimate.
            </p>

            {/* Ticket Card */}
            <div className="p-3.5 bg-[#181818] rounded-xl text-left text-xs space-y-2 border border-[#2B2B2B]">
              <div className="flex justify-between items-center pb-2 border-b border-[#262626]">
                <span className="text-neutral-400 font-medium">Ticket Reference:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#F5B900]">{submittedEnquiry.ticketNumber}</span>
                  <button
                    onClick={() => handleCopyTicket(submittedEnquiry.ticketNumber)}
                    className="p-1 rounded bg-[#242424] hover:bg-[#333333] text-neutral-300"
                    title="Copy Ticket"
                  >
                    {copiedTicket ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Rider:</span>
                <span className="text-white font-semibold">{submittedEnquiry.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Bike:</span>
                <span className="text-white font-semibold">
                  {submittedEnquiry.bike.brand} {submittedEnquiry.bike.model}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Service:</span>
                <span className="text-[#F5B900] font-semibold">{submittedEnquiry.service.serviceName}</span>
              </div>
              {submittedEnquiry.service.preferredDate && (
                <div className="flex justify-between">
                  <span className="text-neutral-400">Preferred Slot:</span>
                  <span className="text-neutral-200">
                    {submittedEnquiry.service.preferredDate} ({submittedEnquiry.service.preferredTime || 'Anytime'})
                  </span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={`https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto,%20I%20just%20submitted%20a%20bike%20inquiry%20ticket%20*${submittedEnquiry.ticketNumber}*%20for%20my%20${encodeURIComponent(submittedEnquiry.bike.brand + ' ' + submittedEnquiry.bike.model)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Notify On WhatsApp</span>
              </a>

              <button
                onClick={() => setSubmittedEnquiry(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-[#242424] hover:bg-[#333333] text-white font-bold text-xs uppercase transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
