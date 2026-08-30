import React, { useState } from 'react';
import { X, Send, Wrench, Bike, User, Sparkles } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry } from '../../types/enquiry';

interface CreateEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (created: Enquiry) => void;
}

const COMMON_ISSUES = [
  'Starting Problem / Self-start fault',
  'Engine Sound / Abnormal Vibration',
  'Oil Leakage / Smoke from Silencer',
  'Mileage / Fuel Average Drop',
  'Brake Loose / Pad Worn Out',
  'Clutch Hard / Gear Shifting Issue',
  'Battery Discharged / Dead',
  'Electrical / Headlight / Wiring Fault',
  'Chain Slack / Sprocket Worn',
];

export const CreateEnquiryModal: React.FC<CreateEnquiryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerMobile: '',
    customerEmail: '',
    customerCity: 'Pahur',
    bikeBrand: 'Bajaj',
    bikeModel: '',
    registrationNumber: '',
    serviceName: 'General Bike Service',
    problemDescription: '',
    quickIssues: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleIssue = (issue: string) => {
    setFormData((prev) => ({
      ...prev,
      quickIssues: prev.quickIssues.includes(issue)
        ? prev.quickIssues.filter((i) => i !== issue)
        : [...prev.quickIssues, issue],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim()) {
      setError('Customer name is required');
      return;
    }
    if (!formData.customerMobile.trim() || formData.customerMobile.length < 10) {
      setError('Valid 10-digit mobile number is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const created = await enquiryService.create({
        customer: {
          name: formData.customerName.trim(),
          mobile: formData.customerMobile.trim(),
          email: formData.customerEmail.trim() || undefined,
          city: formData.customerCity.trim() || 'Pahur',
        },
        bike: {
          brand: formData.bikeBrand,
          model: formData.bikeModel.trim() || 'Motorcycle',
          registrationNumber: formData.registrationNumber.trim() || undefined,
        },
        service: {
          serviceName: formData.serviceName,
          problemDescription: formData.problemDescription.trim() || 'General service inquiry',
          quickIssues: formData.quickIssues,
        },
      });

      if (onSuccess) onSuccess(created);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl border border-gray-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5B900]/20 flex items-center justify-center text-amber-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black uppercase text-gray-900 tracking-tight font-sans">
                Create New Workshop Enquiry
              </h3>
              <p className="text-[11px] text-gray-500">
                Log customer complaint directly into Supabase DB without leaving admin panel.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
              {error}
            </div>
          )}

          {/* Customer Details */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#DFA500]" />
              Customer Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="e.g. Ramesh Patil"
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={formData.customerMobile}
                  onChange={(e) => setFormData({ ...formData, customerMobile: e.target.value })}
                  placeholder="e.g. 9876543210"
                  required
                  maxLength={10}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  City / Village
                </label>
                <input
                  type="text"
                  value={formData.customerCity}
                  onChange={(e) => setFormData({ ...formData, customerCity: e.target.value })}
                  placeholder="Pahur / Jamner / Shendurni"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  placeholder="customer@gmail.com"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Bike Details */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-[#DFA500]" />
              Motorcycle Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  value={formData.bikeBrand}
                  onChange={(e) => setFormData({ ...formData, bikeBrand: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-medium"
                >
                  <option value="Hero">Hero</option>
                  <option value="Honda">Honda</option>
                  <option value="Bajaj">Bajaj</option>
                  <option value="Yamaha">Yamaha</option>
                  <option value="TVS">TVS</option>
                  <option value="Royal Enfield">Royal Enfield</option>
                  <option value="KTM">KTM</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  value={formData.bikeModel}
                  onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                  placeholder="e.g. Pulsar 125 / Splendor"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Registration No.
                </label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value.toUpperCase() })}
                  placeholder="e.g. MH 19 BJ 1234"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono uppercase"
                />
              </div>
            </div>
          </div>

          {/* Service & Issues */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#DFA500]" />
              Service Required & Issues
            </h4>
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Primary Service
              </label>
              <select
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-semibold"
              >
                <option value="General Bike Service">General Bike Service (₹349)</option>
                <option value="Premium Bike Service">Premium Bike Service (₹799)</option>
                <option value="Engine Repair">Engine Repair / Overhaul</option>
                <option value="Oil Change">Oil Change</option>
                <option value="Brake Service">Brake Service</option>
                <option value="Battery Service">Battery Service</option>
                <option value="Electrical Repair">Electrical Repair</option>
                <option value="Bike Restoration">Vintage Bike Restoration</option>
                <option value="Washing & Detailing">Foam Wash & Detailing</option>
                <option value="Other">Other Mechanical Work</option>
              </select>
            </div>

            {/* Quick issues tags */}
            <div>
              <label className="block font-bold text-gray-700 mb-1.5">
                Common Symptoms / Tags
              </label>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_ISSUES.map((issue) => {
                  const selected = formData.quickIssues.includes(issue);
                  return (
                    <button
                      type="button"
                      key={issue}
                      onClick={() => toggleIssue(issue)}
                      className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                        selected
                          ? 'bg-[#F5B900] text-black border-[#DFA500] font-bold shadow-xs'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {issue}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Customer Problem Description
              </label>
              <textarea
                rows={2}
                value={formData.problemDescription}
                onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                placeholder="Specific problem told by customer or technician initial remark..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold uppercase tracking-wide flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting to DB...' : 'Save Enquiry'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
