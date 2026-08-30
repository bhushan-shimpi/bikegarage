import React, { useState } from 'react';
import {
  Sparkles,
  X,
  User,
  Bike,
  Wrench,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';

interface CreateRestorationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg?: string) => void;
}

const COMMON_RESTORATION_TASKS = [
  'Complete Engine Rebuild',
  'Chassis Sandblasting & Oven Paint',
  'Body Paint & 2K Clear Coat',
  'Complete New Wiring Loom',
  'Chrome Plating & Buffing',
  'Engine Buffing & Lacquer',
  'Original Genuine Spare Parts',
  'Wheel Rim & Spokes Truing',
  'Front & Rear Suspension Overhaul',
  'Silencer De-carbonizing / Replacement',
  'Carburettor & Fuel Tuning',
  'Ceramic Coating & Detailing',
];

export const CreateRestorationModal: React.FC<CreateRestorationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [cityVillage, setCityVillage] = useState('Pahur');

  const [bikeBrand, setBikeBrand] = useState('Yamaha');
  const [bikeModel, setBikeModel] = useState('RX 100');
  const [modelYear, setModelYear] = useState('1994');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [bikeCondition, setBikeCondition] = useState<'Good' | 'Average' | 'Poor' | 'Very Poor'>('Average');

  const [selectedWorks, setSelectedWorks] = useState<string[]>([
    'Complete Engine Rebuild',
    'Chassis Sandblasting & Oven Paint',
  ]);
  const [otherNotes, setOtherNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleWork = (task: string) => {
    setSelectedWorks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  const selectAll = () => setSelectedWorks([...COMMON_RESTORATION_TASKS]);
  const clearAll = () => setSelectedWorks([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Please enter customer name');
      return;
    }
    const cleanMobile = mobileNumber.replace(/\s+/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!bikeModel.trim()) {
      setErrorMsg('Please specify motorcycle model');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const restorationSummary = `
[BIKE RESTORATION JOB SHEET]
Customer City/Village: ${cityVillage || 'Pahur'}
Bike: ${bikeBrand} ${bikeModel} (${modelYear || 'Year N/A'})
Reg No: ${registrationNumber || 'N/A'}
Condition: ${bikeCondition}

REQUIRED RESTORATION WORKS (${selectedWorks.length}):
${selectedWorks.map((w, idx) => `${idx + 1}. ${w}`).join('\n')}
${otherNotes ? `\nSpecial Notes: ${otherNotes}` : ''}
      `.trim();

      await enquiryService.create({
        type: 'quote_request',
        customer: {
          name: customerName.trim(),
          mobile: cleanMobile,
          city: cityVillage.trim() || 'Pahur',
        },
        bike: {
          brand: bikeBrand,
          model: bikeModel.trim(),
          registrationNumber: registrationNumber.trim().toUpperCase(),
          year: modelYear.trim(),
        },
        service: {
          serviceName: 'Bike Restoration',
          preferredDate: todayStr,
          problemDescription: restorationSummary,
          quickIssues: selectedWorks,
        },
      });

      onSuccess('New restoration project registered successfully!');
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create restoration project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl border border-gray-200 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-[#FFFDF7] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFF9E6] border border-[#F5B900]/40 flex items-center justify-center text-[#DFA500]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                New Bike Restoration Project
              </h2>
              <p className="text-xs text-gray-500">
                Register customer restoration enquiry, build specifications & overhaul sheet
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Customer Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#DFA500]" />
              <span>Customer Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ramesh Patil"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  required
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit number"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  City / Village
                </label>
                <input
                  type="text"
                  value={cityVillage}
                  onChange={(e) => setCityVillage(e.target.value)}
                  placeholder="e.g. Pahur / Jamner"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Motorcycle Details */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-[#DFA500]" />
              <span>Motorcycle Specs & Condition</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  value={bikeBrand}
                  onChange={(e) => setBikeBrand(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white cursor-pointer"
                >
                  <option value="Hero">Hero</option>
                  <option value="Hero Honda">Hero Honda</option>
                  <option value="Honda">Honda</option>
                  <option value="Bajaj">Bajaj</option>
                  <option value="Yamaha">Yamaha</option>
                  <option value="TVS">TVS</option>
                  <option value="Royal Enfield">Royal Enfield</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Jawa / Yezdi">Jawa / Yezdi</option>
                  <option value="Rajdoot">Rajdoot</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Model Name *
                </label>
                <input
                  type="text"
                  required
                  value={bikeModel}
                  onChange={(e) => setBikeModel(e.target.value)}
                  placeholder="e.g. RX 100 / Bullet 350"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Model Year
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={modelYear}
                  onChange={(e) => setModelYear(e.target.value)}
                  placeholder="e.g. 1996"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-mono focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Registration Plate
                </label>
                <input
                  type="text"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. MH 19 C 1234"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 uppercase font-mono focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Current Condition
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Good', 'Average', 'Poor', 'Very Poor'] as const).map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setBikeCondition(cond)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      bikeCondition === cond
                        ? 'bg-[#F5B900] text-black border-[#F5B900] shadow-2xs font-extrabold'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Scope of Restoration */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-[#DFA500]" />
                <span>Scope of Restoration Work ({selectedWorks.length} selected)</span>
              </h3>
              <div className="flex items-center gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-amber-700 hover:underline font-semibold"
                >
                  Select All
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-gray-400 hover:underline font-semibold"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COMMON_RESTORATION_TASKS.map((task) => {
                const isChecked = selectedWorks.includes(task);
                return (
                  <button
                    key={task}
                    type="button"
                    onClick={() => toggleWork(task)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                      isChecked
                        ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-2xs'
                        : 'bg-gray-50/70 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 ${
                        isChecked
                          ? 'bg-[#F5B900] border-[#DFA500] text-black'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <span className="truncate">{task}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Special Instructions / Customer Notes
              </label>
              <textarea
                rows={2}
                value={otherNotes}
                onChange={(e) => setOtherNotes(e.target.value)}
                placeholder="e.g. Keep original tank emblems, high-compression piston, custom dual exhaust..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Registering...' : 'Register Restoration Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
