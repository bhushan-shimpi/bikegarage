import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Check,
  Copy
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
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

  // 6. Customer Special Requirements
  specialRequirements: string;

  // 7. Signature & Agreement
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
  { id: 'other', label: 'Other Work', marathi: 'इतर आवश्यक काम' },
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
      'Engine Work',
      'Bhatti / Oven Paint',
      'Original Spare Parts Replacement',
      'Ceramic Coating'
    ],
    otherWorkText: '',
    originalPartsRequired: 'Yes',
    customerSuppliedParts: 'No',
    specialRequirements: '',
    customerSignature: '',
    agreementConfirmed: true,
    formDate: todayStr,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<RestorationFormData | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

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

  const handleCopyTicket = (ticket: string) => {
    navigator.clipboard.writeText(ticket);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 320, behavior: 'smooth' });
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

SPECIAL INSTRUCTIONS:
${formData.specialRequirements || 'Standard Factory Spec Restoration'}

CONFIRMED BY: ${formData.customerSignature || formData.customerName}
DATE: ${formData.formDate}
    `.trim();

    const created = await enquiryService.create({
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
        preferredDate: formData.formDate,
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

🔧 *Required Restoration Works (${submittedData.selectedWorks.length} Selected):*
${submittedData.selectedWorks.map((w) => `✓ ${w}`).join('\n')}
${submittedData.otherWorkText ? `• Other Work: ${submittedData.otherWorkText}\n` : ''}
⚙️ *Spare Parts:*
• 100% Original Genuine Parts: ${submittedData.originalPartsRequired}
• Customer Supplied Parts: ${submittedData.customerSuppliedParts}

📝 *Special Instructions:*
${submittedData.specialRequirements || 'Standard Factory Spec'}

✍️ *Customer Confirmation:* ${submittedData.customerSignature || submittedData.customerName}
📅 *Date:* ${submittedData.formDate}
━━━━━━━━━━━━━━━━━━━━
_Chaudhari Auto Centre, Jalgaon Road, Pahur_`;

    return `https://wa.me/917387448878?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-900 pb-16">
      <SEO
        title="Bike Restoration Job Sheet Form in Pahur"
        description="Register your motorcycle for complete restoration at Chaudhary Auto Pahur. Choose your tasks: engine rebuild, oven paint, ceramic coating, and genuine parts."
        canonicalPath="/restoration-form"
      />
      {/* Top Banner */}
      <PageBanner
        title="BIKE RESTORATION FORM"
        breadcrumb="Restoration Form"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">

        {/* ─── SUCCESS SCREEN (AFTER SUBMISSION) ─── */}
        {submittedTicket && submittedData ? (
          <ScrollReveal direction="up">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#DFA500] block mb-1">
                Booking Ref: {submittedTicket}
              </span>

              <h2 className="text-2xl sm:text-3xl font-black uppercase text-gray-900 tracking-tight mb-2 font-sans">
                RESTORATION FORM SUBMITTED!
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-6">
                तुमच्या <strong className="text-gray-900">{submittedData.bikeBrand} {submittedData.bikeName}</strong> बाईकचे रिस्टोरेशन जॉब शीट नोंदवले गेले आहे. आमचे वर्कशॉप सुपरवायझर लवकरच तुमच्याशी संपर्क साधतील.
              </p>

              {/* Summary Box */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left text-xs space-y-2 mb-6 max-w-md mx-auto">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-500">Ticket Reference:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-gray-900">{submittedTicket}</span>
                    <button
                      onClick={() => handleCopyTicket(submittedTicket)}
                      className="p-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                      title="Copy Ticket"
                    >
                      {copiedTicket ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer:</span>
                  <span className="font-bold text-gray-900">{submittedData.customerName} ({submittedData.cityVillage})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mobile:</span>
                  <span className="font-bold text-gray-900">{submittedData.mobileNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bike:</span>
                  <span className="font-bold text-gray-900">{submittedData.bikeBrand} {submittedData.bikeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tasks Selected:</span>
                  <span className="font-bold text-[#DFA500]">{submittedData.selectedWorks.length} Restoration Works</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Send Job Sheet on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-gray-200 transition-colors"
                >
                  <Printer className="w-4 h-4 text-gray-600" />
                  <span>Print Sheet</span>
                </button>

                <Link
                  to="/"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Back To Home
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          /* ─── MAIN RESTORATION FORM (WHITE ENQUIRY DESIGN) ─── */
          <ScrollReveal direction="up">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
              
              {/* Form Title Header */}
              <div className="text-center pb-6 mb-6 border-b border-gray-100">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900 font-sans">
                  Bike Restoration Form
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  चौधरी ऑटो सेंटर — बाईक रिस्टोरेशन नोंदणी व जॉब शीट. आवश्यक कामांची निवड करा.
                </p>
              </div>

              {/* Informational Banner */}
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#DFA500] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>पारदर्शकता नियम:</strong> ग्राहकासोबत restoration सुरू करण्यापूर्वी नेमकं कोणतं काम ठरलं आहे, याचे प्रत्येक कामाचे स्वतंत्र Checkbox खाली दिले आहेत.
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-xs" noValidate>

                {/* ─── 1. CUSTOMER DETAILS ─── */}
                <div className="space-y-4 pt-1">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-[#DFA500] font-black text-xs flex items-center justify-center">
                      1
                    </span>
                    <h3 className="font-black text-gray-900 uppercase text-sm tracking-wide">
                      Customer Details (ग्राहकाची माहिती)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Customer Name (नाव) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="उदा. राहुल पाटील"
                          value={formData.customerName}
                          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                          className={`w-full bg-gray-50 border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900] ${
                            errors.customerName ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                      </div>
                      {errors.customerName && <p className="text-red-500 text-[11px] mt-1">{errors.customerName}</p>}
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Mobile Number (मोबाईल नंबर) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="९८२२००००००"
                          value={formData.mobileNumber}
                          onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                          className={`w-full bg-gray-50 border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900] ${
                            errors.mobileNumber ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                      </div>
                      {errors.mobileNumber && <p className="text-red-500 text-[11px] mt-1">{errors.mobileNumber}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        City / Village (गाव / शहर) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="उदा. पहूर / जामनेर / जळगाव"
                          value={formData.cityVillage}
                          onChange={(e) => setFormData({ ...formData, cityVillage: e.target.value })}
                          className={`w-full bg-gray-50 border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900] ${
                            errors.cityVillage ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                      </div>
                      {errors.cityVillage && <p className="text-red-500 text-[11px] mt-1">{errors.cityVillage}</p>}
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Customer कुठून आले? (Referral Source)
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {['Instagram', 'Google', 'Reference', 'Walk-in', 'Other'].map((source) => (
                          <button
                            key={source}
                            type="button"
                            onClick={() => setFormData({ ...formData, referralSource: source })}
                            className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all text-center ${
                              formData.referralSource === source
                                ? 'bg-[#F5B900] text-black border-[#F5B900] font-bold shadow-sm'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {source}
                          </button>
                        ))}
                      </div>
                      {formData.referralSource === 'Other' && (
                        <input
                          type="text"
                          placeholder="इतर स्त्रोत सांगा..."
                          value={formData.referralOther}
                          onChange={(e) => setFormData({ ...formData, referralOther: e.target.value })}
                          className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-900 outline-none"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* ─── 2. BIKE DETAILS ─── */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-[#DFA500] font-black text-xs flex items-center justify-center">
                      2
                    </span>
                    <h3 className="font-black text-gray-900 uppercase text-sm tracking-wide">
                      Bike Details (बाईकची माहिती)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Bike Brand (ब्रँड)
                      </label>
                      <select
                        value={formData.bikeBrand}
                        onChange={(e) => setFormData({ ...formData, bikeBrand: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900]"
                      >
                        <option value="Yamaha">Yamaha</option>
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
                      <label className="block font-bold text-gray-700 mb-1">
                        Bike Name (नाव) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Bike className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="उदा. RX100, Bullet 350"
                          value={formData.bikeName}
                          onChange={(e) => setFormData({ ...formData, bikeName: e.target.value })}
                          className={`w-full bg-gray-50 border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900] ${
                            errors.bikeName ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                      </div>
                      {errors.bikeName && <p className="text-red-500 text-[11px] mt-1">{errors.bikeName}</p>}
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Model / Variant (व्हेरियंट)
                      </label>
                      <input
                        type="text"
                        placeholder="उदा. 4-Speed, Standard"
                        value={formData.bikeModel}
                        onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Model Year (मॉडेल वर्ष)
                      </label>
                      <input
                        type="text"
                        placeholder="उदा. 1996, 2004"
                        value={formData.modelYear}
                        onChange={(e) => setFormData({ ...formData, modelYear: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Registration Number (गाडी नंबर)
                      </label>
                      <input
                        type="text"
                        placeholder="उदा. MH 19 AB 1234"
                        value={formData.registrationNumber}
                        onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value.toUpperCase() })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-900 placeholder-gray-400 uppercase tracking-wider focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900]"
                      />
                    </div>
                  </div>

                  {/* Current Bike Condition */}
                  <div>
                    <label className="block font-bold text-gray-700 mb-1.5">
                      Current Bike Condition (सध्याची गाडीची स्थिती)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['Good', 'Average', 'Poor', 'Very Poor'] as const).map((cond) => (
                        <button
                          key={cond}
                          type="button"
                          onClick={() => setFormData({ ...formData, bikeCondition: cond })}
                          className={`p-2.5 rounded-lg border text-center transition-all ${
                            formData.bikeCondition === cond
                              ? 'bg-[#F5B900] text-black border-[#F5B900] font-black shadow-sm'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 font-bold'
                          }`}
                        >
                          <span className="text-xs uppercase block">{cond}</span>
                          <span className="text-[10px] opacity-75 block">
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

                {/* ─── 3. RESTORATION REQUIRED ─── */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-[#DFA500] font-black text-xs flex items-center justify-center">
                      3
                    </span>
                    <h3 className="font-black text-gray-900 uppercase text-sm tracking-wide">
                      Restoration Required
                    </h3>
                  </div>

                  <p className="text-xs text-gray-600">Customer ला Bike Restoration करायचे आहे का?</p>
                  <div className="flex items-center gap-3">
                    {(['Yes', 'No'] as const).map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setFormData({ ...formData, restorationRequired: val })}
                        className={`flex-1 py-2.5 px-4 rounded-lg border font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                          formData.restorationRequired === val
                            ? 'bg-[#F5B900] text-black border-[#F5B900] font-black shadow-sm'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {val === 'Yes' ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                        <span>{val === 'Yes' ? 'होय (Yes — Restoration)' : 'नाही (No — Quote Only)'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ─── 4. REQUIRED RESTORATION WORK (20 CHECKBOXES) ─── */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-[#DFA500] font-black text-xs flex items-center justify-center">
                        4
                      </span>
                      <h3 className="font-black text-gray-900 uppercase text-sm tracking-wide">
                        Required Restoration Work (आवश्यक कामांची यादी)
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={selectAllWorks}
                        className="text-[11px] font-bold text-[#DFA500] hover:underline px-2 py-0.5 rounded bg-amber-50"
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        onClick={clearAllWorks}
                        className="text-[11px] font-bold text-gray-500 hover:text-gray-700 px-2 py-0.5 rounded bg-gray-100"
                      >
                        Clear All
                      </button>
                      <span className="text-[11px] font-bold text-gray-700 px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                        {formData.selectedWorks.length} Selected
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">खालीलपैकी आवश्यक कामांसमोर ✓ करा:</p>
                  {errors.selectedWorks && <p className="text-red-500 text-[11px]">{errors.selectedWorks}</p>}

                  {/* 20 Checkboxes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {RESTORATION_WORKS.map((work) => {
                      const isChecked = formData.selectedWorks.includes(work.label);
                      return (
                        <div
                          key={work.id}
                          onClick={() => toggleWorkItem(work.label)}
                          className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex items-center justify-between ${
                            isChecked
                              ? 'bg-amber-50/80 border-[#F5B900] shadow-sm ring-1 ring-[#F5B900]/30'
                              : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100/60'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-[#F5B900] text-black font-black' : 'border border-gray-300 bg-white'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <div>
                              <span className={`text-xs font-bold block ${isChecked ? 'text-gray-900' : 'text-gray-700'}`}>
                                {work.label}
                              </span>
                              <span className="text-[10px] text-gray-500 block">
                                {work.marathi}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Other Custom Work Input */}
                  <div>
                    <label className="block font-bold text-gray-600 mb-1">
                      Other Work Details (इतर कामांची नोंद असल्यास येथे लिहा):
                    </label>
                    <input
                      type="text"
                      placeholder="उदा. Custom chrome crash guard, specialized horn..."
                      value={formData.otherWorkText}
                      onChange={(e) => setFormData({ ...formData, otherWorkText: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900]"
                    />
                  </div>
                </div>

                {/* ─── 5. SPARE PARTS REQUIREMENT ─── */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-[#DFA500] font-black text-xs flex items-center justify-center">
                      5
                    </span>
                    <h3 className="font-black text-gray-900 uppercase text-sm tracking-wide">
                      Spare Parts Requirement (स्पेअर पार्ट्स आवश्यकता)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="text-xs font-bold text-gray-900 block mb-1">
                        Original / Genuine Spare Parts Required:
                      </span>
                      <span className="text-[11px] text-gray-500 block mb-2.5">
                        १००% ओरिजिनल स्पेअर पार्ट्स हवे आहेत का?
                      </span>
                      <div className="flex gap-2">
                        {(['Yes', 'No'] as const).map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setFormData({ ...formData, originalPartsRequired: val })}
                            className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-bold transition-all ${
                              formData.originalPartsRequired === val
                                ? 'bg-[#F5B900] text-black border-[#F5B900] font-black shadow-sm'
                                : 'bg-white text-gray-700 border-gray-200'
                            }`}
                          >
                            {val === 'Yes' ? '✓ Yes (होय)' : 'No (नाही)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="text-xs font-bold text-gray-900 block mb-1">
                        Customer Supplied Parts:
                      </span>
                      <span className="text-[11px] text-gray-500 block mb-2.5">
                        ग्राहक स्वतः काही पार्ट्स आणून देणार आहेत का?
                      </span>
                      <div className="flex gap-2">
                        {(['Yes', 'No'] as const).map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setFormData({ ...formData, customerSuppliedParts: val })}
                            className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-bold transition-all ${
                              formData.customerSuppliedParts === val
                                ? 'bg-[#F5B900] text-black border-[#F5B900] font-black shadow-sm'
                                : 'bg-white text-gray-700 border-gray-200'
                            }`}
                          >
                            {val === 'Yes' ? '✓ Yes (होय)' : 'No (नाही)'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── 6. CUSTOMER SPECIAL REQUIREMENTS ─── */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-[#DFA500] font-black text-xs flex items-center justify-center">
                      6
                    </span>
                    <h3 className="font-black text-gray-900 uppercase text-sm tracking-wide">
                      Customer Special Requirements (खास सूचना)
                    </h3>
                  </div>

                  <textarea
                    rows={3}
                    placeholder="रंगाची शेड (उदा. Candy Maroon, Jet Black), सायलेंसरचा आवाज, ओरिजिनल स्टिकर्स, किंवा इतर कोणत्याही खास सूचना येथे नोंदवा..."
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900] leading-relaxed"
                  />
                </div>

                {/* ─── 7. CONFIRMATION & SIGNATURE ─── */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-[#DFA500] font-black text-xs flex items-center justify-center">
                      7
                    </span>
                    <h3 className="font-black text-gray-900 uppercase text-sm tracking-wide">
                      Confirmation & Signature (खात्री व स्वाक्षरी)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Customer Signature / Name (स्वाक्षरी / नाव)
                      </label>
                      <input
                        type="text"
                        placeholder="ग्राहकाचे पूर्ण नाव"
                        value={formData.customerSignature}
                        onChange={(e) => setFormData({ ...formData, customerSignature: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-900 placeholder-gray-400 font-serif italic focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Date (तारीख)
                      </label>
                      <input
                        type="date"
                        value={formData.formDate}
                        onChange={(e) => setFormData({ ...formData, formDate: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#F5B900]"
                      />
                    </div>
                  </div>

                  {/* Agreement Checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1">
                    <input
                      type="checkbox"
                      checked={formData.agreementConfirmed}
                      onChange={(e) => setFormData({ ...formData, agreementConfirmed: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#F5B900] focus:ring-[#F5B900]"
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      मी वरील सर्व माहिती व ठरलेली कामे तपासून नोंदणी करत आहे. चौधरी ऑटो सेंटरच्या रिस्टोरेशन मार्गदर्शक तत्त्वांनुसार काम करण्यास माझी संमती आहे.
                    </span>
                  </label>
                  {errors.agreementConfirmed && <p className="text-red-500 text-[11px]">{errors.agreementConfirmed}</p>}
                </div>

                {/* Submit CTA */}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-lg bg-[#F5B900] hover:bg-[#E5AC00] active:scale-[0.98] text-black font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span>Submit Restoration Job Sheet • फॉर्म नोंदणी करा</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>

            </div>
          </ScrollReveal>
        )}

      </div>
    </div>
  );
};
