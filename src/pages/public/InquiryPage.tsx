import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Bike,
  Wrench,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Droplets,
  Sun,
  Layers,
  Car,
  Info,
  Send,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { PageBanner } from '../../components/common/PageBanner';
import { inquirySchema, InquirySchemaType } from '../../utils/validators';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry } from '../../types/enquiry';
import { WhatsAppIcon } from '../../components/common/WhatsAppIcon';

const CERAMIC_BIKE_PRICES = [
  { model: 'Hero Splendor', price: 3000, desc: 'Complete 9H paint prep & ceramic protection' },
  { model: 'Honda Unicorn', price: 4000, desc: 'Tank, panels, engine buff & hydrophobic coat' },
  { model: 'Bajaj Pulsar', price: 4000, desc: 'Full body high-gloss ceramic shielding' },
  { model: 'Royal Enfield Bullet / Classic', price: 5000, desc: 'Heavy metal compounding, chrome & tank gloss' },
];

export const InquiryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('type') === 'ceramic' ? 'ceramic' : 'general';
  const [activeTab, setActiveTab] = useState<'general' | 'ceramic'>(initialTab);

  const preselectedService = searchParams.get('service') || 'General Bike Service';
  const prefilledNotes = searchParams.get('notes') || '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  // Ceramic Coating Specific Form State
  const [ceramicVehicleType, setCeramicVehicleType] = useState<'bike' | 'car'>('bike');
  const [ceramicBikeModel, setCeramicBikeModel] = useState('Hero Splendor');
  const [ceramicCarModel, setCeramicCarModel] = useState('');
  const [ceramicCarType, setCeramicCarType] = useState('Hatchback / Sedan');
  const [ceramicName, setCeramicName] = useState('');
  const [ceramicMobile, setCeramicMobile] = useState('');
  const [ceramicCity, setCeramicCity] = useState('');
  const [ceramicPaintCondition, setCeramicPaintCondition] = useState('Good Condition');
  const [ceramicDate, setCeramicDate] = useState(today);
  const [ceramicTime, setCeramicTime] = useState('Morning (09:00 AM - 12:00 PM)');
  const [ceramicNotes, setCeramicNotes] = useState('');
  const [ceramicError, setCeramicError] = useState<string | null>(null);

  // General Service Form
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
    if (searchParams.get('type') === 'ceramic') {
      setActiveTab('ceramic');
    }
  }, [searchParams]);

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

  // General Form Submit
  const onGeneralSubmit = async (data: InquirySchemaType) => {
    setIsSubmitting(true);
    try {
      const created = await enquiryService.create({
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

  // Ceramic Coating Submit
  const onCeramicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCeramicError(null);

    if (!ceramicName.trim() || !ceramicMobile.trim()) {
      setCeramicError('Please enter your Name and WhatsApp Mobile Number.');
      return;
    }

    const cleanMobile = ceramicMobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setCeramicError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const selectedBikePriceObj = CERAMIC_BIKE_PRICES.find((b) => b.model === ceramicBikeModel);
    const estimatedPrice = ceramicVehicleType === 'bike' ? (selectedBikePriceObj?.price || 4000) : undefined;
    const vehicleModelStr = ceramicVehicleType === 'bike' ? ceramicBikeModel : (ceramicCarModel.trim() || ceramicCarType);
    const vehicleBrandStr = ceramicVehicleType === 'bike' ? 'Motorcycle' : 'Car / 4-Wheeler';

    setIsSubmitting(true);
    try {
      const created = await enquiryService.create({
        type: 'ceramic_coating',
        customer: {
          name: ceramicName.trim(),
          mobile: cleanMobile,
          city: ceramicCity.trim() || 'Pahur',
        },
        bike: {
          brand: vehicleBrandStr,
          model: vehicleModelStr,
          vehicleType: ceramicVehicleType === 'bike' ? 'Motorcycle' : 'Car',
        },
        service: {
          serviceName: 'Premium Ceramic Coating (' + (ceramicVehicleType === 'bike' ? 'Bike' : 'Car') + ')',
          preferredDate: ceramicDate,
          preferredTime: ceramicTime,
          estimatedPrice,
          problemDescription: 'Ceramic Coating Requested. Paint condition: ' + ceramicPaintCondition + '.' + (ceramicNotes ? ' Notes: ' + ceramicNotes.trim() : ''),
        },
      });

      setSubmittedEnquiry(created);
    } catch (err: any) {
      setCeramicError(err.message || 'Failed to book Ceramic Coating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      <SEO
        title="Book Service & Premium Ceramic Coating | Chaudhari Auto Pahur"
        description="Book two-wheeler periodic servicing or premium 9H Ceramic Coating for bikes & cars at Chaudhari Auto Centre in Pahur, Jamner. Instant booking & transparent pricing."
        canonicalPath="/inquiry"
      />

      {/* Top Banner */}
      <PageBanner
        title={activeTab === 'ceramic' ? 'PREMIUM CERAMIC COATING' : 'BOOK SERVICE / ENQUIRY'}
        breadcrumb={activeTab === 'ceramic' ? 'Ceramic Coating' : 'Book & Enquire'}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-8">
        
        {/* ─── TAB TOGGLE SELECTOR ─── */}
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm max-w-xl mx-auto">
          <div className="grid grid-cols-2 gap-2 text-center">
            <button
              type="button"
              onClick={() => {
                setActiveTab('general');
                setSearchParams({});
              }}
              className={'py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ' + (
                activeTab === 'general'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              )}
            >
              <Wrench className={'w-4 h-4 ' + (activeTab === 'general' ? 'text-[#F5B900]' : '')} />
              <span>General Service</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('ceramic');
                setSearchParams({ type: 'ceramic' });
              }}
              className={'py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ' + (
                activeTab === 'ceramic'
                  ? 'bg-[#F5B900] text-black shadow-sm font-black'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              )}
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Ceramic Coating</span>
            </button>
          </div>
        </div>

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
              {submittedEnquiry.type === 'ceramic_coating' ? 'CERAMIC COATING BOOKED!' : 'ENQUIRY SUBMITTED!'}
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
              {submittedEnquiry.service.estimatedPrice && (
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-500">Estimated Price:</span>
                  <span className="font-mono font-black text-emerald-700 text-sm">₹{submittedEnquiry.service.estimatedPrice.toLocaleString('en-IN')}/-</span>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Share */}
            <div className="flex flex-col sm:row gap-3 justify-center">
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
        ) : activeTab === 'ceramic' ? (
          
          /* ═══════════════════════════════════════════════════════════════════
             ─── CERAMIC COATING GUIDE & BOOKING SECTION ───
             ═══════════════════════════════════════════════════════════════════ */
          <div className="space-y-10">
            {/* Hero Showcase Card */}
            <div className="bg-gradient-to-br from-[#121212] via-[#1A1A1A] to-[#101010] text-white rounded-3xl p-6 sm:p-10 border border-[#2B2B2B] shadow-xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5B900]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F5B900]/30 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" />
                  <span>PREMIUM VEHICLE DETAILING • PAHUR</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-sans leading-tight">
                  🏍️✨ Premium Ceramic Coating (Bike & Car)
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
                  तुमच्या वाहनाचा शाईन, पेंट आणि प्रीमियम फिनिश अधिक काळ टिकवण्यासाठी <strong className="text-[#F5B900]">Chaudhari Auto Centre</strong> मध्ये Professional Ceramic Coating Service उपलब्ध आहे.
                </p>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl">
                  Ceramic Coating ही वाहनाच्या पेंटच्या पृष्ठभागावर तयार होणारी <strong className="text-white">Protective Layer</strong> आहे. ही कोटिंग धूळ, पाणी, UV Rays आणि रोजच्या वापरामुळे होणाऱ्या सामान्य बाह्य परिणामांपासून पेंटचे संरक्षण करण्यास मदत करते आणि वाहनाला Glossy & Showroom Finish देते.
                </p>
              </div>

              {/* 6 Key Benefits Grid */}
              <div className="pt-4 border-t border-[#262626] space-y-3 relative z-10">
                <span className="text-xs font-black uppercase tracking-wider text-[#F5B900] block">
                  ✨ Ceramic Coating काय काम करते? (Key Benefits)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { icon: Sparkles, title: 'Deep Gloss & Premium Shine', mr: 'वाहनाला Deep Gloss & Premium Shine देते' },
                    { icon: Droplets, title: 'Hydrophobic Protection', mr: 'Hydrophobic Effect मुळे पाणी सहज वाहून जाते' },
                    { icon: Sun, title: 'UV Rays Protection', mr: 'UV Rays मुळे होणाऱ्या पेंट फेडिंगपासून संरक्षण' },
                    { icon: ShieldCheck, title: 'Paint Shield Layer', mr: 'पेंटला सामान्य बाह्य परिणामांपासून संरक्षण' },
                    { icon: Layers, title: 'Anti-Dust Resistance', mr: 'धूळ आणि मळ चिकटणे कमी होण्यास मदत' },
                    { icon: CheckCircle2, title: 'Easy Maintenance', mr: 'वाहनाची Cleaning & Washing सोपी होते' },
                  ].map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <div key={i} className="p-3.5 rounded-2xl bg-[#0E0E0E] border border-[#262626] space-y-1">
                        <div className="flex items-center gap-2 text-[#F5B900]">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="text-xs font-bold text-white uppercase font-sans">{b.title}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 leading-tight pl-6">{b.mr}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ─── PRICING CARDS: BIKE & CAR ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Bike Pricing Table */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Bike className="w-5 h-5 text-amber-600" />
                    <div>
                      <h3 className="text-base font-black text-gray-900 uppercase font-sans tracking-tight">
                        Bike Ceramic Coating Packages
                      </h3>
                      <p className="text-[11px] text-gray-500">Fixed rate transparency for popular motorcycles</p>
                    </div>
                  </div>
                  <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                    Pahur Garage
                  </span>
                </div>

                <div className="space-y-2.5">
                  {CERAMIC_BIKE_PRICES.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-3 hover:border-amber-300 transition-colors"
                    >
                      <div>
                        <span className="text-xs font-black text-gray-900 block font-sans uppercase">
                          {item.model}
                        </span>
                        <span className="text-[11px] text-gray-500 block">
                          {item.desc}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-base sm:text-lg font-black text-gray-900 font-mono block">
                          ₹{item.price.toLocaleString('en-IN')}/-
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold uppercase">All Inclusive</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>
                    <strong>टीप:</strong> अंतिम किंमत वाहनाची Condition, Paint Condition आणि Required Surface Compounding / Detailing यानुसार बदलू शकते.
                  </p>
                </div>
              </div>

              {/* Car Pricing & Workshop Guarantee */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Car className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="text-base font-black text-gray-900 uppercase font-sans tracking-tight">
                        🚗 Car Ceramic Coating
                      </h3>
                      <p className="text-[11px] text-gray-500">Hatchback, Sedan & SUV Packages</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed">
                    कारसाठी देखील Professional Ceramic Coating Service उपलब्ध आहे. कारच्या Model, Size, Paint Condition आणि Required Coating Package नुसार किंमत ठरवली जाते.
                  </p>

                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl space-y-1 text-xs">
                    <span className="font-bold text-blue-950 block uppercase">💰 Custom Car Quotes</span>
                    <p className="text-[11px] text-blue-800">
                      तुमच्या कारसाठी योग्य Coating आणि Cost जाणून घेण्यासाठी आमच्याशी संपर्क करा किंवा खालील फॉर्म भरा.
                    </p>
                  </div>
                </div>

                {/* Trust Points */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-2 text-xs">
                  <span className="font-black text-gray-900 block uppercase">🏆 Why Chaudhari Auto?</span>
                  <div className="grid grid-cols-1 gap-1 text-[11px] text-gray-700">
                    <span>✅ Professional 3-Stage Surface Compounding</span>
                    <span>✅ High-Grade 9H / Graphene Ceramic Layer</span>
                    <span>✅ Experienced Vehicle Detailing Experts (Est. 1994)</span>
                    <span>✅ Dust-Free Detailing Bay in Pahur</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ─── CERAMIC COATING BOOKING FORM ─── */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg sm:text-xl font-black text-gray-900 uppercase font-sans tracking-tight">
                    Book Ceramic Coating Appointment
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Fill out the details below to schedule your vehicle ceramic detailing at our Pahur workshop.
                </p>
              </div>

              {ceramicError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                  {ceramicError}
                </div>
              )}

              <form onSubmit={onCeramicSubmit} className="space-y-6">
                
                {/* Vehicle Type Switcher: Bike vs Car */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                    1. Select Vehicle Category (वाहन प्रकार) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    <button
                      type="button"
                      onClick={() => setCeramicVehicleType('bike')}
                      className={'p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ' + (
                        ceramicVehicleType === 'bike'
                          ? 'bg-amber-50 border-[#F5B900] ring-2 ring-[#F5B900]/40 text-black font-bold'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Bike className="w-4 h-4 text-amber-700" />
                        <span className="text-xs font-black uppercase">Motorcycle / Bike</span>
                      </div>
                      {ceramicVehicleType === 'bike' && <Check className="w-4 h-4 text-amber-700" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setCeramicVehicleType('car')}
                      className={'p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ' + (
                        ceramicVehicleType === 'car'
                          ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/40 text-black font-bold'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-blue-700" />
                        <span className="text-xs font-black uppercase">Car / 4-Wheeler</span>
                      </div>
                      {ceramicVehicleType === 'car' && <Check className="w-4 h-4 text-blue-700" />}
                    </button>
                  </div>
                </div>

                {/* Vehicle Model Selector */}
                {ceramicVehicleType === 'bike' ? (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                      2. Select Bike Model (किंमत पॅकेज) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CERAMIC_BIKE_PRICES.map((b) => (
                        <button
                          key={b.model}
                          type="button"
                          onClick={() => setCeramicBikeModel(b.model)}
                          className={'p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ' + (
                            ceramicBikeModel === b.model
                              ? 'bg-amber-50/80 border-[#F5B900] ring-2 ring-[#F5B900]/40 shadow-xs font-bold'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-white'
                          )}
                        >
                          <div>
                            <span className="text-xs font-black text-gray-900 block font-sans uppercase">
                              {b.model}
                            </span>
                            <span className="text-[10px] text-gray-500">{b.desc}</span>
                          </div>
                          <span className="text-sm font-black font-mono text-emerald-800 shrink-0">
                            ₹{b.price.toLocaleString('en-IN')}/-
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                        Car Body Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={ceramicCarType}
                        onChange={(e) => setCeramicCarType(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                      >
                        <option value="Hatchback (Swift, i20, WagonR)">Hatchback (Swift, i20, WagonR)</option>
                        <option value="Sedan (City, Verna, Dzire)">Sedan (City, Verna, Dzire)</option>
                        <option value="Compact SUV (Brezza, Creta, Nexon)">Compact SUV (Brezza, Creta, Nexon)</option>
                        <option value="Large SUV (Scorpio, Harrier, XUV700)">Large SUV (Scorpio, Harrier, XUV700)</option>
                        <option value="Luxury / Premium Car">Luxury / Premium Car</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                        Car Brand & Model Name
                      </label>
                      <input
                        type="text"
                        value={ceramicCarModel}
                        onChange={(e) => setCeramicCarModel(e.target.value)}
                        placeholder="e.g. Hyundai Creta, Maruti Swift"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Customer Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Full Name (नाव) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={ceramicName}
                      onChange={(e) => setCeramicName(e.target.value)}
                      placeholder="e.g. Rahul Patil"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      WhatsApp Number (मोबाईल) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={ceramicMobile}
                      onChange={(e) => setCeramicMobile(e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      City / Village (गाव / शहर)
                    </label>
                    <input
                      type="text"
                      value={ceramicCity}
                      onChange={(e) => setCeramicCity(e.target.value)}
                      placeholder="e.g. Pahur, Jamner, Jalgaon"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Paint Condition & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Current Paint Condition
                    </label>
                    <select
                      value={ceramicPaintCondition}
                      onChange={(e) => setCeramicPaintCondition(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    >
                      <option value="Brand New Showroom">Brand New Showroom Condition</option>
                      <option value="Good Condition (Minor swirl marks)">Good Condition (Minor swirl marks)</option>
                      <option value="Medium Scratches / Swirls">Medium Scratches / Swirl Marks</option>
                      <option value="Faded / Dull Paint (Needs Deep Buffing)">Faded / Dull Paint (Needs Deep Buffing)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={ceramicDate}
                      min={today}
                      onChange={(e) => setCeramicDate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Preferred Time Slot
                    </label>
                    <select
                      value={ceramicTime}
                      onChange={(e) => setCeramicTime(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    >
                      <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                      <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Special Notes or Specific Requirement (पर्यायी)
                  </label>
                  <textarea
                    value={ceramicNotes}
                    onChange={(e) => setCeramicNotes(e.target.value)}
                    rows={2}
                    placeholder="e.g. Deep scratches on tank, chrome buffing requested, etc."
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
                    <Sparkles className="w-4 h-4" />
                    <span>{isSubmitting ? 'Booking Ceramic Slot...' : 'Confirm Ceramic Coating Booking'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (

          /* ═══════════════════════════════════════════════════════════════════
             ─── GENERAL BIKE SERVICE ENQUIRY FORM ───
             ═══════════════════════════════════════════════════════════════════ */
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg sm:text-xl font-black text-gray-900 uppercase font-sans tracking-tight">
                  Book Two-Wheeler Service / Repair
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Schedule routine maintenance, engine repairs, or diagnostic checkups at our workshop in Pahur.
              </p>
            </div>

            <form onSubmit={handleSubmit(onGeneralSubmit)} className="space-y-5">
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
                    <option value="Other">Other Motorcycle</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Bike Model (मॉडेल नाव) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('vehicleModel')}
                    placeholder="e.g. Splendor Plus, RX100, Shine"
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
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  >
                    <option value="General Bike Service">General Bike Service & Oil Change</option>
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
                  placeholder="e.g. Engine starting trouble, abnormal sound, low mileage, brake noise, etc."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gray-900 hover:bg-black text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#F5B900]" />
                  <span>{isSubmitting ? 'Submitting Request...' : 'Submit Service Booking'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
