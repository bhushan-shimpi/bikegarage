import React, { useState } from 'react';
import {
  Bike,
  User,
  Phone,
  MapPin,
  CheckSquare,
  Square,
  Printer,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ClipboardList,
  FileCheck
} from 'lucide-react';
import { PageBanner } from '../../components/common/PageBanner';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { enquiryService } from '../../services/enquiryService';

interface RestorationFormData {
  // 1. Customer Details
  customerName: string;
  mobileNumber: string;
  cityVillage: string;
  referralSource: string;
  referralOther: string;

  // 2. Bike Details
  bikeBrand: string;
  bikeName: string;
  bikeModel: string;
  modelYear: string;
  registrationNumber: string;
  bikeCondition: 'Good' | 'Average' | 'Poor' | 'Very Poor';

  // 3. Restoration Required
  restorationRequired: 'Yes' | 'No';

  // 4. Required Restoration Work (list of checked names)
  selectedWorks: string[];
  otherWorkText: string;

  // 5. Spare Parts Requirement
  originalPartsRequired: 'Yes' | 'No';
  customerSuppliedParts: 'Yes' | 'No';

  // 6. Inspection & Estimate
  inspectionDate: string;
  estimatedCost: string;
  advanceAmount: string;
  expectedDeliveryDate: string;

  // 7. Customer Special Requirements
  specialRequirements: string;

  // 8. Signature & Agreement
  customerSignature: string;
  agreementConfirmed: boolean;
  formDate: string;
}

const RESTORATION_WORKS = [
  { id: 'engine_work', label: 'Engine Work', marathi: 'इंजिन काम' },
  { id: 'engine_painting', label: 'Engine Painting', marathi: 'इंजिन पेंटिंग' },
  { id: 'body_painting', label: 'Body Painting', marathi: 'बॉडी पेंटिंग' },
  { id: 'bhatti_oven_paint', label: 'Bhatti / Oven Paint', marathi: 'ओव्हन / भट्टी पेंट प्रोसेस' },
  { id: 'electrical_work', label: 'Electrical Work', marathi: 'इलेक्ट्रिकल काम' },
  { id: 'wiring', label: 'Wiring', marathi: 'संपूर्ण नवीन वायरिंग' },
  { id: 'suspension_work', label: 'Suspension Work', marathi: 'सस्पेन्शन काम' },
  { id: 'brake_work', label: 'Brake Work', marathi: 'ब्रेक सिस्टीम काम' },
  { id: 'tyre_replacement', label: 'Tyre Replacement', marathi: 'टायर बदलणे' },
  { id: 'wheel_rim_work', label: 'Wheel / Rim Work', marathi: 'व्हील / रिम / स्पोक्स काम' },
  { id: 'chrome_work', label: 'Chrome Work', marathi: 'क्रोम प्लेटिंग / बफिंग' },
  { id: 'silencer_work', label: 'Silencer Work', marathi: 'सायलेन्सर काम' },
  { id: 'seat_work', label: 'Seat Work', marathi: 'सीट काम / फोम' },
  { id: 'body_metal_work', label: 'Body / Metal Work', marathi: 'डेंटिंग / पत्र्याचे काम' },
  { id: 'original_spare_parts', label: 'Original Spare Parts Replacement', marathi: 'ओरिजिनल स्पेअर पार्ट्स' },
  { id: 'engine_overhaul', label: 'Engine Overhaul', marathi: 'फुल इंजिन ओव्हरहॉल' },
  { id: 'carburettor_fuel', label: 'Carburettor / Fuel System Work', marathi: 'कार्बोरेटर / फ्युएल सिस्टीम' },
  { id: 'ceramic_coating', label: 'Ceramic Coating', marathi: 'सिरेमिक कोटिंग' },
  { id: 'full_bike_detailing', label: 'Full Bike Detailing', marathi: 'फुल बाईक डिटेलिंग' },
  { id: 'other', label: 'Other', marathi: 'इतर काम' },
];

export const RestorationFormPage: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<RestorationFormData>({
    customerName: '',
    mobileNumber: '',
    cityVillage: '',
    referralSource: 'Walk-in',
    referralOther: '',
    bikeBrand: 'Yamaha',
    bikeName: 'RX100',
    bikeModel: '',
    modelYear: '',
    registrationNumber: '',
    bikeCondition: 'Average',
    restorationRequired: 'Yes',
    selectedWorks: [
      'Complete Inspection',
      'Engine Work',
      'Bhatti / Oven Paint',
      'Original Spare Parts Replacement',
      'Ceramic Coating'
    ],
    otherWorkText: '',
    originalPartsRequired: 'Yes',
    customerSuppliedParts: 'No',
    inspectionDate: todayStr,
    estimatedCost: '',
    advanceAmount: '',
    expectedDeliveryDate: '',
    specialRequirements: '',
    customerSignature: '',
    agreementConfirmed: true,
    formDate: todayStr,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<RestorationFormData | null>(null);

  // Toggle single work item checkbox
  const toggleWorkItem = (label: string) => {
    setFormData((prev) => {
      const exists = prev.selectedWorks.includes(label);
      if (exists) {
        return { ...prev, selectedWorks: prev.selectedWorks.filter((w) => w !== label) };
      } else {
        return { ...prev, selectedWorks: [...prev.selectedWorks, label] };
      }
    });
  };

  // Select all or clear all
  const selectAllWorks = () => {
    setFormData((prev) => ({
      ...prev,
      selectedWorks: RESTORATION_WORKS.map((w) => w.label),
    }));
  };

  const clearAllWorks = () => {
    setFormData((prev) => ({
      ...prev,
      selectedWorks: [],
    }));
  };

  // Form Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'कृपया ग्राहकाचे नाव टाका (Customer Name is required)';
    }
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'मोबाईल नंबर आवश्यक आहे (Mobile Number is required)';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.replace(/\s+/g, ''))) {
      newErrors.mobileNumber = 'कृपया अचूक १० अंकी मोबाईल नंबर टाका (Valid 10-digit mobile required)';
    }
    if (!formData.cityVillage.trim()) {
      newErrors.cityVillage = 'गाव किंवा शहराचे नाव टाका (City / Village is required)';
    }
    if (!formData.bikeName.trim()) {
      newErrors.bikeName = 'बाईकचे नाव आवश्यक आहे (Bike Name/Model is required)';
    }
    if (formData.selectedWorks.length === 0 && !formData.otherWorkText.trim()) {
      newErrors.selectedWorks = 'कृपया किमान एक आवश्यक काम निवडा (Select at least 1 restoration task)';
    }
    if (!formData.agreementConfirmed) {
      newErrors.agreementConfirmed = 'कृपया संमती द्या (Please confirm agreement)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 350, behavior: 'smooth' });
      return;
    }

    const restorationSummary = `
[BIKE RESTORATION JOB SHEET]
Customer City/Village: ${formData.cityVillage}
Referral Source: ${formData.referralSource} ${formData.referralOther ? `(${formData.referralOther})` : ''}
Bike: ${formData.bikeBrand} ${formData.bikeName} ${formData.bikeModel} (${formData.modelYear || 'Year N/A'})
Reg No: ${formData.registrationNumber || 'N/A'}
Condition: ${formData.bikeCondition}
Restoration Desired: ${formData.restorationRequired}

REQUIRED RESTORATION WORKS (${formData.selectedWorks.length}):
${formData.selectedWorks.map((w, idx) => `${idx + 1}. ${w}`).join('\n')}
${formData.otherWorkText ? `Other Details: ${formData.otherWorkText}\n` : ''}

SPARE PARTS:
- 100% Original Genuine Parts: ${formData.originalPartsRequired}
- Customer Supplied Parts: ${formData.customerSuppliedParts}

ESTIMATE & DATES:
- Inspection Date: ${formData.inspectionDate || 'Immediate'}
- Estimated Cost: ₹${formData.estimatedCost || 'TBD on physical inspection'}
- Advance: ₹${formData.advanceAmount || '0'}
- Delivery Target: ${formData.expectedDeliveryDate || 'Standard Timeline'}

SPECIAL INSTRUCTIONS:
${formData.specialRequirements || 'None'}

CONFIRMED BY: ${formData.customerSignature || formData.customerName}
DATE: ${formData.formDate}
    `.trim();

    const created = enquiryService.create({
      type: 'quote_request',
      customer: {
        name: formData.customerName,
        mobile: formData.mobileNumber,
        city: formData.cityVillage,
      },
      bike: {
        brand: formData.bikeBrand,
        model: `${formData.bikeName} ${formData.bikeModel}`.trim(),
        registrationNumber: formData.registrationNumber,
        year: formData.modelYear,
      },
      service: {
        serviceName: 'Bike Restoration',
        preferredDate: formData.inspectionDate,
        problemDescription: restorationSummary,
        quickIssues: formData.selectedWorks,
      },
    });

    setSubmittedTicket(created.ticketNumber);
    setSubmittedData({ ...formData });
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // WhatsApp Message Formatter
  const getWhatsAppLink = () => {
    if (!submittedData) return '#';
    const msg = `🏍️ *CHAUDHARI AUTO CENTRE — BIKE RESTORATION JOB SHEET*
━━━━━━━━━━━━━━━━━━━━
📋 *Ticket:* ${submittedTicket || 'CAC-RESTORE'}
👤 *Customer:* ${submittedData.customerName}
📞 *Mobile:* ${submittedData.mobileNumber}
📍 *Village/City:* ${submittedData.cityVillage}
📢 *Source:* ${submittedData.referralSource} ${submittedData.referralOther ? `(${submittedData.referralOther})` : ''}

🏍️ *Bike Details:*
• Brand: ${submittedData.bikeBrand}
• Model/Name: ${submittedData.bikeName} ${submittedData.bikeModel}
• Model Year: ${submittedData.modelYear || 'N/A'}
• Reg. No: ${submittedData.registrationNumber || 'N/A'}
• Current Condition: ${submittedData.bikeCondition}
• Restoration Desired: ${submittedData.restorationRequired}

🔧 *Required Restoration Works (${submittedData.selectedWorks.length}):*
${submittedData.selectedWorks.map((w) => `✓ ${w}`).join('\n')}
${submittedData.otherWorkText ? `• Other Work: ${submittedData.otherWorkText}\n` : ''}
⚙️ *Spare Parts:*
• 100% Original Genuine Parts: ${submittedData.originalPartsRequired}
• Customer Supplied Parts: ${submittedData.customerSuppliedParts}

💰 *Inspection & Estimate:*
• Inspection Date: ${submittedData.inspectionDate || 'Immediate'}
• Estimated Cost: ₹${submittedData.estimatedCost || 'Quote on Inspection'}
• Advance Amount: ₹${submittedData.advanceAmount || '0'}
• Expected Delivery: ${submittedData.expectedDeliveryDate || 'Standard Timeline'}

📝 *Special Instructions:*
${submittedData.specialRequirements || 'Standard Factory Spec'}

✍️ *Customer Confirmation:* ${submittedData.customerSignature || submittedData.customerName}
📅 *Date:* ${submittedData.formDate}
━━━━━━━━━━━━━━━━━━━━
_Chaudhari Auto Centre, Jalgaon Road, Pahur_`;

    return `https://wa.me/917387448878?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen">
      {/* Top Banner */}
      <PageBanner
        title="BIKE RESTORATION FORM"
        breadcrumb="Restoration Form"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* ─── SUCCESS SCREEN (AFTER SUBMISSION) ─── */}
        {submittedTicket && submittedData ? (
          <ScrollReveal direction="up">
            <div className="bg-[#141414] border border-[#F5B900]/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <FileCheck className="w-8 h-8" />
              </div>

              <span className="text-xs font-black uppercase tracking-widest text-[#F5B900] block mb-1">
                Restoration Registered Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans mb-2">
                RESTORATION JOB SHEET CREATED
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto mb-6">
                तुमच्या <strong className="text-white">{submittedData.bikeBrand} {submittedData.bikeName}</strong> बाईकचे रिस्टोरेशन जॉब शीट तयार झाले आहे.
              </p>

              {/* Official Ticket Card */}
              <div className="inline-block p-4 sm:p-5 rounded-2xl bg-black border border-white/10 mb-8 max-w-md w-full text-left">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 mb-2.5">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase">Job Ticket</span>
                  <span className="text-sm sm:text-base font-black text-[#F5B900] font-sans">{submittedTicket}</span>
                </div>
                <div className="text-xs text-neutral-300 space-y-1.5">
                  <div><strong>Customer:</strong> {submittedData.customerName} ({submittedData.cityVillage})</div>
                  <div><strong>Mobile:</strong> {submittedData.mobileNumber}</div>
                  <div><strong>Bike:</strong> {submittedData.bikeBrand} {submittedData.bikeName} {submittedData.modelYear ? `(${submittedData.modelYear})` : ''}</div>
                  <div><strong>Tasks Selected:</strong> {submittedData.selectedWorks.length} Items</div>
                  {submittedData.estimatedCost && <div><strong>Estimated Cost:</strong> ₹{submittedData.estimatedCost}</div>}
                  {submittedData.advanceAmount && <div><strong>Advance Deposit:</strong> ₹{submittedData.advanceAmount}</div>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Job Sheet on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#222222] hover:bg-[#2c2c2c] border border-neutral-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <Printer className="w-4 h-4 text-[#F5B900]" />
                  <span>Print Official Sheet</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSubmittedTicket(null);
                    setSubmittedData(null);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-white/5 border border-neutral-700 text-neutral-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Submit Another Form</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        ) : (

          /* ─── MAIN RESTORATION FORM ─── */
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Notice pill */}
            <div className="p-4 rounded-2xl bg-[#141414] border border-[#F5B900]/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#F5B900] shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white block font-bold mb-0.5">
                  चौधरी ऑटो सेंटर — रिस्टोरेशन पारदर्शकता नियम
                </strong>
                ग्राहकासोबत restoration सुरू करण्यापूर्वी नेमकं कोणतं काम ठरलं आहे, याचे प्रत्येक कामाचे स्वतंत्र Checkbox खाली दिले आहेत. आवश्यक कामांची निवड करा.
              </div>
            </div>

            {/* ─── SECTION 1: CUSTOMER DETAILS ─── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#242424] shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                <div className="w-8 h-8 rounded-xl bg-[#F5B900]/10 text-[#F5B900] flex items-center justify-center font-black text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white font-sans">
                    CUSTOMER DETAILS (ग्राहकाची माहिती)
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Customer Name (नाव) <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="उदा. राहुल शांताराम पाटील"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] focus:ring-1 focus:ring-[#F5B900] rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-neutral-500 outline-none transition-all"
                    />
                  </div>
                  {errors.customerName && <p className="text-rose-400 text-xs mt-1">{errors.customerName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Mobile Number (मोबाईल नंबर) <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="९८२२००००००"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                      className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] focus:ring-1 focus:ring-[#F5B900] rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-neutral-500 outline-none transition-all"
                    />
                  </div>
                  {errors.mobileNumber && <p className="text-rose-400 text-xs mt-1">{errors.mobileNumber}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    City / Village (गाव / शहर) <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="उदा. पहूर, जामनेर, जळगाव"
                      value={formData.cityVillage}
                      onChange={(e) => setFormData({ ...formData, cityVillage: e.target.value })}
                      className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] focus:ring-1 focus:ring-[#F5B900] rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-neutral-500 outline-none transition-all"
                    />
                  </div>
                  {errors.cityVillage && <p className="text-rose-400 text-xs mt-1">{errors.cityVillage}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Customer कुठून आले? (Referral Source)
                  </label>
                  <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                    {['Instagram', 'Google', 'Reference', 'Walk-in', 'Other'].map((source) => (
                      <button
                        key={source}
                        type="button"
                        onClick={() => setFormData({ ...formData, referralSource: source })}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                          formData.referralSource === source
                            ? 'bg-[#F5B900] text-black border-[#F5B900]'
                            : 'bg-[#1C1C1C] text-neutral-300 border-[#303030] hover:border-neutral-500'
                        }`}
                      >
                        {source}
                      </button>
                    ))}
                  </div>
                  {formData.referralSource === 'Other' && (
                    <input
                      type="text"
                      placeholder="कुठून माहिती मिळाली ते सांगा"
                      value={formData.referralOther}
                      onChange={(e) => setFormData({ ...formData, referralOther: e.target.value })}
                      className="mt-2 w-full bg-[#1C1C1C] border border-[#303030] rounded-xl py-2 px-3 text-xs text-white placeholder-neutral-500 outline-none"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* ─── SECTION 2: BIKE DETAILS ─── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#242424] shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                <div className="w-8 h-8 rounded-xl bg-[#F5B900]/10 text-[#F5B900] flex items-center justify-center font-black text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white font-sans">
                    BIKE DETAILS (बाईकची माहिती)
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Bike Brand (ब्रँड)
                  </label>
                  <select
                    value={formData.bikeBrand}
                    onChange={(e) => setFormData({ ...formData, bikeBrand: e.target.value })}
                    className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] rounded-xl py-2.5 px-3 text-sm text-white outline-none"
                  >
                    <option value="Yamaha">Yamaha</option>
                    <option value="Royal Enfield">Royal Enfield</option>
                    <option value="Bajaj">Bajaj</option>
                    <option value="Honda">Honda</option>
                    <option value="Hero">Hero / Hero Honda</option>
                    <option value="TVS">TVS</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Jawa / Yezdi">Jawa / Yezdi</option>
                    <option value="Rajdoot">Rajdoot</option>
                    <option value="Other">Other Brand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Bike Name (नाव) <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Bike className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="उदा. RX100, Bullet 350, Chetak"
                      value={formData.bikeName}
                      onChange={(e) => setFormData({ ...formData, bikeName: e.target.value })}
                      className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] focus:ring-1 focus:ring-[#F5B900] rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-neutral-500 outline-none"
                    />
                  </div>
                  {errors.bikeName && <p className="text-rose-400 text-xs mt-1">{errors.bikeName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Bike Model / Variant (मॉडेल)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. 4-Speed, Standard, 2-Stroke"
                    value={formData.bikeModel}
                    onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                    className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] rounded-xl py-2.5 px-3 text-sm text-white placeholder-neutral-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Model Year (मॉडेल वर्ष)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. 1996, 2002"
                    value={formData.modelYear}
                    onChange={(e) => setFormData({ ...formData, modelYear: e.target.value })}
                    className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] rounded-xl py-2.5 px-3 text-sm text-white placeholder-neutral-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Registration Number (गाडी नंबर)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. MH 19 AB 1234"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value.toUpperCase() })}
                    className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] rounded-xl py-2.5 px-3 text-sm text-white placeholder-neutral-500 uppercase tracking-wider outline-none"
                  />
                </div>
              </div>

              {/* Current Bike Condition */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  Current Bike Condition (सध्याची गाडीची स्थिती)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['Good', 'Average', 'Poor', 'Very Poor'] as const).map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setFormData({ ...formData, bikeCondition: cond })}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        formData.bikeCondition === cond
                          ? 'bg-[#F5B900] text-black border-[#F5B900] font-black'
                          : 'bg-[#1C1C1C] text-neutral-300 border-[#303030] hover:border-neutral-500 font-bold'
                      }`}
                    >
                      <span className="text-xs uppercase block">{cond}</span>
                      <span className="text-[10px] opacity-80 block mt-0.5">
                        {cond === 'Good' && 'चांगली'}
                        {cond === 'Average' && 'मध्यम'}
                        {cond === 'Poor' && 'खराब'}
                        {cond === 'Very Poor' && 'अतिशय खराब'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── SECTION 3: RESTORATION REQUIRED ─── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#242424] shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                <div className="w-8 h-8 rounded-xl bg-[#F5B900]/10 text-[#F5B900] flex items-center justify-center font-black text-sm">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white font-sans">
                    RESTORATION REQUIRED
                  </h3>
                  <p className="text-xs text-neutral-400">Customer ला Bike Restoration करायचे आहे का?</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {(['Yes', 'No'] as const).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setFormData({ ...formData, restorationRequired: val })}
                    className={`flex-1 py-3 px-4 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      formData.restorationRequired === val
                        ? 'bg-[#F5B900] text-black border-[#F5B900] font-black'
                        : 'bg-[#1C1C1C] text-neutral-300 border-[#303030] hover:border-neutral-500'
                    }`}
                  >
                    {val === 'Yes' ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    <span>{val === 'Yes' ? 'होय (Yes — Restoration Required)' : 'नाही (No — General Work / Quote)'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ─── SECTION 4: REQUIRED RESTORATION WORK (20 CHECKBOXES) ─── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#242424] shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F5B900]/10 text-[#F5B900] flex items-center justify-center font-black text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-white font-sans">
                      REQUIRED RESTORATION WORK (आवश्यक कामांची यादी)
                    </h3>
                    <p className="text-xs text-neutral-400">खालीलपैकी आवश्यक कामांसमोर ✓ करा:</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={selectAllWorks}
                    className="text-[11px] font-bold text-[#F5B900] hover:underline px-2.5 py-1 rounded bg-[#F5B900]/10"
                  >
                    Select All (सर्व निवडा)
                  </button>
                  <button
                    type="button"
                    onClick={clearAllWorks}
                    className="text-[11px] font-bold text-neutral-400 hover:text-white px-2.5 py-1 rounded bg-neutral-800"
                  >
                    Clear All
                  </button>
                  <span className="text-xs font-black text-neutral-300 px-2.5 py-1 rounded-full bg-black border border-neutral-800">
                    {formData.selectedWorks.length} Selected
                  </span>
                </div>
              </div>

              {errors.selectedWorks && <p className="text-rose-400 text-xs">{errors.selectedWorks}</p>}

              {/* 20 Checkboxes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2.5">
                {RESTORATION_WORKS.map((work) => {
                  const isChecked = formData.selectedWorks.includes(work.label);
                  return (
                    <div
                      key={work.id}
                      onClick={() => toggleWorkItem(work.label)}
                      className={`p-3 rounded-2xl border cursor-pointer select-none transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#1C1C1C] border-[#F5B900] shadow-md shadow-[#F5B900]/10'
                          : 'bg-[#181818] border-[#2B2B2B] hover:border-neutral-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-[#F5B900] text-black font-black' : 'border border-neutral-600'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span className={`text-xs sm:text-sm font-bold block ${isChecked ? 'text-white' : 'text-neutral-300'}`}>
                            {work.label}
                          </span>
                          <span className="text-[10px] text-[#F5B900]/80 block font-medium">
                            {work.marathi}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Other Custom Work Input */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Other Work Details (इतर आवश्यक कामांची नोंद असल्यास येथे लिहा):
                </label>
                <input
                  type="text"
                  placeholder="उदा. Custom headlight visor, extra loud horn, special chrome crash guard..."
                  value={formData.otherWorkText}
                  onChange={(e) => setFormData({ ...formData, otherWorkText: e.target.value })}
                  className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] rounded-xl py-2 px-3 text-xs text-white placeholder-neutral-500 outline-none"
                />
              </div>
            </div>

            {/* ─── SECTION 5: SPARE PARTS REQUIREMENT ─── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#242424] shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                <div className="w-8 h-8 rounded-xl bg-[#F5B900]/10 text-[#F5B900] flex items-center justify-center font-black text-sm">
                  5
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white font-sans">
                    SPARE PARTS REQUIREMENT (स्पेअर पार्ट्स आवश्यकता)
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 100% Original Genuine Parts */}
                <div className="p-4 rounded-2xl bg-[#181818] border border-[#2B2B2B]">
                  <span className="text-xs font-bold text-white block mb-2">
                    Original / Genuine Spare Parts Required:
                  </span>
                  <span className="text-[11px] text-neutral-400 block mb-3">
                    १००% ओरिजिनल स्पेअर पार्ट्स हवे आहेत का?
                  </span>
                  <div className="flex gap-2.5">
                    {(['Yes', 'No'] as const).map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setFormData({ ...formData, originalPartsRequired: val })}
                        className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          formData.originalPartsRequired === val
                            ? 'bg-[#F5B900] text-black border-[#F5B900] font-black'
                            : 'bg-[#222222] text-neutral-300 border-[#333333]'
                        }`}
                      >
                        {val === 'Yes' ? '✓ Yes (होय)' : 'No (नाही)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Supplied Parts */}
                <div className="p-4 rounded-2xl bg-[#181818] border border-[#2B2B2B]">
                  <span className="text-xs font-bold text-white block mb-2">
                    Customer Supplied Parts:
                  </span>
                  <span className="text-[11px] text-neutral-400 block mb-3">
                    ग्राहक स्वतः काही पार्ट्स आणून देणार आहेत का?
                  </span>
                  <div className="flex gap-2.5">
                    {(['Yes', 'No'] as const).map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setFormData({ ...formData, customerSuppliedParts: val })}
                        className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          formData.customerSuppliedParts === val
                            ? 'bg-[#F5B900] text-black border-[#F5B900] font-black'
                            : 'bg-[#222222] text-neutral-300 border-[#333333]'
                        }`}
                      >
                        {val === 'Yes' ? '✓ Yes (होय)' : 'No (नाही)'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── SECTION 6: INSPECTION & ESTIMATE ─── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#242424] shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                <div className="w-8 h-8 rounded-xl bg-[#F5B900]/10 text-[#F5B900] flex items-center justify-center font-black text-sm">
                  6
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white font-sans">
                    INSPECTION & ESTIMATE (तपासणी व अंदाजपत्रक)
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Bike Inspection Date (तपासणी तारीख)
                  </label>
                  <input
                    type="date"
                    value={formData.inspectionDate}
                    onChange={(e) => setFormData({ ...formData, inspectionDate: e.target.value })}
                    className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Estimated Cost (अंदाजे खर्च — ₹)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. २५,०००"
                    value={formData.estimatedCost}
                    onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                    className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] rounded-xl py-2 px-3 text-xs text-white placeholder-neutral-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Advance Amount (अ‍ॅडव्हान्स — ₹)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. ५,०००"
                    value={formData.advanceAmount}
                    onChange={(e) => setFormData({ ...formData, advanceAmount: e.target.value })}
                    className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] rounded-xl py-2 px-3 text-xs text-white placeholder-neutral-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Expected Delivery (डिलिव्हरी तारीख)
                  </label>
                  <input
                    type="date"
                    value={formData.expectedDeliveryDate}
                    onChange={(e) => setFormData({ ...formData, expectedDeliveryDate: e.target.value })}
                    className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>

            {/* ─── SECTION 7: CUSTOMER SPECIAL REQUIREMENTS ─── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#242424] shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                <div className="w-8 h-8 rounded-xl bg-[#F5B900]/10 text-[#F5B900] flex items-center justify-center font-black text-sm">
                  7
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white font-sans">
                    CUSTOMER SPECIAL REQUIREMENTS (खास सूचना)
                  </h3>
                </div>
              </div>

              <textarea
                rows={4}
                placeholder="रंगाची शेड (उदा. Candy Maroon, Metallic Black), सायलेंसरचा आवाज, ओरिजिनल स्टिकर्स, किंवा इतर कोणत्याही खास सूचना येथे नोंदवा..."
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] rounded-xl p-3 text-sm text-white placeholder-neutral-500 outline-none leading-relaxed"
              />
            </div>

            {/* ─── SECTION 8: SIGNATURE & SUBMIT ─── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#F5B900]/30 shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                <div className="w-8 h-8 rounded-xl bg-[#F5B900]/10 text-[#F5B900] flex items-center justify-center font-black text-sm">
                  8
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white font-sans">
                    CONFIRMATION & SIGNATURE (खात्री व स्वाक्षरी)
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Customer Signature / Full Name (ग्राहकाची सही / नाव)
                  </label>
                  <input
                    type="text"
                    placeholder="ग्राहकाचे पूर्ण नाव सही म्हणून टाका"
                    value={formData.customerSignature}
                    onChange={(e) => setFormData({ ...formData, customerSignature: e.target.value })}
                    className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] rounded-xl py-2.5 px-3 text-sm text-white placeholder-neutral-500 font-serif italic outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Date (तारीख)
                  </label>
                  <input
                    type="date"
                    value={formData.formDate}
                    onChange={(e) => setFormData({ ...formData, formDate: e.target.value })}
                    className="w-full bg-[#1C1C1C] border border-[#303030] focus:border-[#F5B900] rounded-xl py-2.5 px-3 text-sm text-white outline-none"
                  />
                </div>
              </div>

              {/* Agreement checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.agreementConfirmed}
                    onChange={(e) => setFormData({ ...formData, agreementConfirmed: e.target.checked })}
                    className="w-4 h-4 mt-1 rounded border-neutral-600 text-[#F5B900] focus:ring-[#F5B900]"
                  />
                  <span className="text-xs text-neutral-300 leading-relaxed">
                    मी वरील सर्व माहिती व ठरलेली कामे तपासून नोंदणी करत आहे. चौधरी ऑटो सेंटरच्या रिस्टोरेशन मार्गदर्शक तत्त्वांनुसार काम करण्यास माझी संमती आहे.
                  </span>
                </label>
                {errors.agreementConfirmed && <p className="text-rose-400 text-xs mt-1">{errors.agreementConfirmed}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-[#F5B900] hover:bg-[#E5AC00] active:scale-[0.98] text-black font-black text-sm uppercase tracking-wider shadow-xl shadow-[#F5B900]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Submit Restoration Job Sheet • फॉर्म नोंदणी करा</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </form>
        )}

      </div>
    </div>
  );
};
