import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  IndianRupee,
  Calendar,
  Trash2,
  Eye,
  X,
  Save,
  Bike,
  User,
  FileText,
  TrendingUp,
  MessageCircle,
  Package,
} from 'lucide-react';
import { repairService } from '../../services/repairService';
import { customerService } from '../../services/customerService';
import { partService } from '../../services/partService';
import {
  RepairRecord,
  DailyRepairStats,
  ReplacedPart,
  Customer,
  SparePart,
} from '../../types/customer';
import { formatPhone } from '../../utils/formatters';

export const getWhatsAppBillUrl = (record: RepairRecord): string => {
  const cleanMobile = record.customerMobile.replace(/\D/g, '').slice(-10);
  const partsList =
    record.partsReplaced && record.partsReplaced.length > 0
      ? record.partsReplaced.map((p) => `• ${p.name}: ₹${p.cost}`).join('\n')
      : '• No parts replaced';

  const partsTotal =
    record.partsTotal ||
    record.partsReplaced?.reduce((sum, p) => sum + (Number(p.cost) || 0), 0) ||
    0;
  const discountStr =
    record.discount && record.discount > 0 ? `\n🎁 *Discount:* -₹${record.discount}` : '';
  const paymentModeStr = record.paymentMode || 'Cash';

  const message = `🏍️ *CHAUDHARI AUTO CENTRE, PAHUR*
*Repair Invoice / Job Sheet: ${record.jobNumber}*
----------------------------------------
👤 *Customer:* ${record.customerName}
📱 *Phone:* ${record.customerMobile}
🛵 *Vehicle:* ${record.bikeBrand || ''} ${record.bikeModel || ''} ${
    record.registrationNumber ? `(${record.registrationNumber})` : ''
  }
📅 *Date:* ${record.repairDate}

🔧 *Service / Problem:*
${record.serviceType}
${record.problemDetails ? `Note: ${record.problemDetails}` : ''}

📦 *Parts Replaced:*
${partsList}
*Parts Total:* ₹${partsTotal}

⚙️ *Labor Charges:* ₹${record.laborCharge}${discountStr}
----------------------------------------
💰 *FINAL AMOUNT:* ₹${record.totalAmount}
💳 *Payment Mode:* ${paymentModeStr}
📊 *Payment Status:* ${record.paymentStatus}
----------------------------------------
🙏 *Thank you for choosing Chaudhari Auto Centre!*
📍 Main Road, Near Bus Stand, Pahur, Jalgaon (MH)
📞 Helpline: +91 7387448878 / 9503853143`;

  return `https://wa.me/91${cleanMobile}?text=${encodeURIComponent(message)}`;
};

export const AdminRepairHistoryPage: React.FC = () => {
  const [repairs, setRepairs] = useState<RepairRecord[]>([]);
  const [stats, setStats] = useState<DailyRepairStats>({
    todayCompletedCount: 0,
    todayRevenue: 0,
    inWorkshopCount: 0,
    lifetimeRepairsCount: 0,
    lifetimeRevenue: 0,
    todayDate: new Date().toISOString().split('T')[0],
  });

  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [allParts, setAllParts] = useState<SparePart[]>([]);

  // Autocomplete suggestions for customers
  const [customerSuggestions, setCustomerSuggestions] = useState<Customer[]>([]);
  const [showCustomerSuggestions, setShowCustomerSuggestions] = useState(false);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RepairRecord | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // WhatsApp post-creation modal
  const [createdBillRecord, setCreatedBillRecord] = useState<RepairRecord | null>(null);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  // Create Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerMobile: '',
    bikeBrand: 'Bajaj',
    bikeModel: '',
    registrationNumber: '',
    currentKm: '',
    serviceType: 'General Bike Service',
    problemDetails: '',
    partsReplaced: [] as ReplacedPart[],
    laborCharge: 200,
    discount: 0,
    paymentMode: 'Cash' as 'Cash' | 'Online' | 'Split' | 'Pending',
    paymentStatus: 'Paid' as 'Paid' | 'Pending' | 'Partial',
    status: 'Completed' as 'In Progress' | 'Completed' | 'Delivered',
    photos: [] as string[],
    repairDate: new Date().toISOString().split('T')[0],
  });

  // Dynamic parts input state
  const [partInputName, setPartInputName] = useState('');
  const [partInputCost, setPartInputCost] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadData = async () => {
    const list = await repairService.getAll({
      status: statusFilter !== 'all' ? statusFilter : undefined,
      search: search || undefined,
    });
    setRepairs(list);

    const s = await repairService.getDailyStats();
    setStats(s);

    const customersList = await customerService.getAll();
    setAllCustomers(customersList);

    const partsList = await partService.getAll();
    setAllParts(partsList);
  };

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  // Customer search & autocomplete
  const handleCustomerInputChange = (field: 'customerName' | 'customerMobile', val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (val.trim().length >= 2) {
      const q = val.trim().toLowerCase();
      const matches = allCustomers.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.mobile.includes(q) ||
          (c.registrationNumber && c.registrationNumber.toLowerCase().includes(q))
      );
      setCustomerSuggestions(matches.slice(0, 5));
      setShowCustomerSuggestions(matches.length > 0);
    } else {
      setShowCustomerSuggestions(false);
    }
  };

  const handleSelectCustomer = (c: Customer) => {
    setFormData((prev) => ({
      ...prev,
      customerName: c.name,
      customerMobile: c.mobile,
      bikeBrand: c.bikeBrand || prev.bikeBrand,
      bikeModel: c.bikeModel || '',
      registrationNumber: c.registrationNumber || '',
      currentKm: c.currentKm || '',
    }));
    setShowCustomerSuggestions(false);
  };

  // Add a part to partsReplaced
  const handleAddPart = () => {
    if (!partInputName.trim()) return;
    const cost = parseFloat(partInputCost) || 0;
    setFormData((prev) => ({
      ...prev,
      partsReplaced: [...prev.partsReplaced, { name: partInputName.trim(), cost }],
    }));
    setPartInputName('');
    setPartInputCost('');
  };

  const handleRemovePart = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      partsReplaced: prev.partsReplaced.filter((_, i) => i !== index),
    }));
  };

  const partsTotal = formData.partsReplaced.reduce((sum, p) => sum + (Number(p.cost) || 0), 0);
  const grandTotal = Math.max(
    0,
    partsTotal + (Number(formData.laborCharge) || 0) - (Number(formData.discount) || 0)
  );

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.customerMobile.trim()) {
      setFormError('Customer name and mobile number are required.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const created = await repairService.create({
        ...formData,
        partsTotal,
        discount: Number(formData.discount) || 0,
        paymentMode: formData.paymentMode,
        totalAmount: grandTotal,
      });

      setIsCreateModalOpen(false);
      setCreatedBillRecord(created);
      setShowWhatsAppModal(true);

      setFormData({
        customerName: '',
        customerMobile: '',
        bikeBrand: 'Bajaj',
        bikeModel: '',
        registrationNumber: '',
        currentKm: '',
        serviceType: 'General Bike Service',
        problemDetails: '',
        partsReplaced: [],
        laborCharge: 200,
        discount: 0,
        paymentMode: 'Cash',
        paymentStatus: 'Paid',
        status: 'Completed',
        photos: [],
        repairDate: new Date().toISOString().split('T')[0],
      });

      loadData();
      setSuccessMsg('Job Card created successfully in database!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save repair record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, jobNumber: string) => {
    if (window.confirm(`Delete repair record "${jobNumber}"?`)) {
      setRepairs((prev) => prev.filter((r) => r.id !== id && r.jobNumber !== id));
      await repairService.delete(id);
      loadData();
      setSuccessMsg(`Record "${jobNumber}" deleted.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const filtered = repairs.filter(
    (r) =>
      r.jobNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.customerMobile.includes(search) ||
      (r.registrationNumber && r.registrationNumber.toLowerCase().includes(search.toLowerCase())) ||
      (r.bikeModel && r.bikeModel.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-gray-900 tracking-tight font-sans flex items-center gap-2.5">
            <Wrench className="w-6 h-6 text-[#DFA500]" />
            Bike Repair History & Bills
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Workshop repair log, parts replaced, labor billing, and daily revenue tracker
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Log New Bike Repair</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ─── DAILY STATUS & WORKSHOP METRICS ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block leading-tight">
              Today's Completed
            </span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 font-mono">
              {stats.todayCompletedCount}
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block leading-tight">
              Today's Revenue
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
              ₹{stats.todayRevenue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block leading-tight">
              In Workshop
            </span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 font-mono">
              {stats.inWorkshopCount}
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block leading-tight">
              Total Lifetime
            </span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 font-mono">
              {stats.lifetimeRepairsCount}
            </span>
            <span className="text-[10px] text-emerald-700 font-bold block font-mono">
              ₹{stats.lifetimeRevenue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* ─── SEARCH & FILTER BAR ─── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Job Number, customer, bike model, or MH 19..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
          />
        </form>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 bg-gray-100 p-1 rounded-xl text-xs font-bold">
          {['all', 'Completed', 'In Progress', 'Delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-white text-black shadow-xs font-black'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {st === 'all' ? 'All Jobs' : st}
            </button>
          ))}
        </div>
      </div>

      {/* ─── REPAIR RECORDS LIST ─── */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            No Repair Records Found
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Click "Log New Bike Repair" above to create a job card for a serviced motorcycle.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((rep) => (
            <div
              key={rep.id || rep.jobNumber}
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div>
                {/* Top Row: Job Number, Status Badge & Actions */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="font-mono font-black text-gray-900 text-sm tracking-tight block">
                      {rep.jobNumber}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 font-mono mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {rep.repairDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        rep.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rep.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {rep.status}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedRecord(rep);
                        setIsViewModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 hover:text-black hover:border-gray-400 transition-colors"
                      title="View Full Job Sheet"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(rep.id || rep.jobNumber, rep.jobNumber)}
                      className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="text-xs">
                  <div className="font-black text-gray-900 uppercase text-sm">
                    {rep.customerName}
                  </div>
                  <div className="font-mono text-gray-500 text-[11px] mt-0.5">
                    📞 {formatPhone(rep.customerMobile)}
                  </div>
                </div>

                {/* Bike Details Box */}
                <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Bike className="w-4 h-4 text-[#DFA500] shrink-0" />
                    <span className="font-bold text-gray-900 text-sm">
                      {rep.bikeBrand} {rep.bikeModel}
                    </span>
                  </div>
                  {rep.registrationNumber && (
                    <div className="text-xs text-gray-600 font-mono pl-6">
                      Reg: <span className="font-bold text-gray-900 uppercase">{rep.registrationNumber}</span>
                    </div>
                  )}
                  {rep.currentKm && (
                    <div className="text-[11px] text-gray-500 pl-6 font-mono">
                      Odometer: {rep.currentKm} KM
                    </div>
                  )}
                </div>

                {/* Service Type & Diagnosis */}
                <div className="mt-3 text-xs">
                  <span className="font-bold text-gray-900 block">
                    🔧 {rep.serviceType}
                  </span>
                  {rep.problemDetails && (
                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                      {rep.problemDetails}
                    </p>
                  )}
                </div>

                {/* Parts Replaced Summary */}
                {rep.partsReplaced && rep.partsReplaced.length > 0 && (
                  <div className="mt-2 text-[11px] text-gray-600 bg-amber-50/50 p-2 rounded-lg border border-amber-100 font-mono">
                    <span className="font-bold font-sans block text-gray-700 mb-0.5">
                      Parts Fitted ({rep.partsReplaced.length}):
                    </span>
                    {rep.partsReplaced.map((p, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="truncate max-w-[180px]">• {p.name}</span>
                        <span className="font-bold">₹{p.cost}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total & Payment Row with WhatsApp Button */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between font-mono">
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 block font-sans">
                    Total Amount Billed
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-black text-gray-900">
                      ₹{rep.totalAmount}
                    </span>
                    {rep.discount && rep.discount > 0 ? (
                      <span className="text-[10px] text-emerald-600 font-bold font-sans">
                        (-₹{rep.discount})
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-sans ${
                      rep.paymentStatus === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {rep.paymentMode ? `${rep.paymentMode} • ` : ''}{rep.paymentStatus}
                  </span>

                  <a
                    href={getWhatsAppBillUrl(rep)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-colors shadow-2xs"
                    title="Send Bill via WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── CREATE REPAIR JOB SHEET MODAL ─── */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl border border-gray-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-700" />
                <h3 className="text-base font-black uppercase text-gray-900 tracking-tight">
                  Log Bike Repair / New Job Card
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              {formError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 font-medium">
                  {formError}
                </div>
              )}

              {/* Customer Info with Auto-complete from Customer Directory */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#DFA500]" />
                    Customer Details (Auto-links with Customer Directory)
                  </h4>
                  <span className="text-[10px] text-gray-400">
                    Type to search registered owners
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <label className="block font-bold text-gray-700 mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => handleCustomerInputChange('customerName', e.target.value)}
                      placeholder="Type name or search existing..."
                      required
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    />

                    {showCustomerSuggestions && customerSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl divide-y divide-gray-100 overflow-hidden">
                        <div className="p-1.5 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase">
                          Matching Registered Customers:
                        </div>
                        {customerSuggestions.map((c) => (
                          <button
                            key={c.id || c.mobile}
                            type="button"
                            onClick={() => handleSelectCustomer(c)}
                            className="w-full text-left p-2.5 hover:bg-amber-50/80 transition-colors flex items-center justify-between text-xs"
                          >
                            <div>
                              <div className="font-bold text-gray-900">{c.name}</div>
                              <div className="text-[11px] text-gray-500 font-mono">
                                {formatPhone(c.mobile)} • {c.bikeBrand} {c.bikeModel || ''}
                              </div>
                            </div>
                            {c.registrationNumber && (
                              <span className="text-[10px] font-mono font-bold bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded">
                                {c.registrationNumber}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.customerMobile}
                      onChange={(e) => handleCustomerInputChange('customerMobile', e.target.value)}
                      placeholder="10-digit mobile number"
                      required
                      maxLength={10}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Motorcycle Details */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
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
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    >
                      <option value="Hero">Hero</option>
                      <option value="Bajaj">Bajaj</option>
                      <option value="Honda">Honda</option>
                      <option value="Yamaha">Yamaha</option>
                      <option value="TVS">TVS</option>
                      <option value="Royal Enfield">Royal Enfield</option>
                      <option value="KTM">KTM</option>
                      <option value="Suzuki">Suzuki</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Bike Model
                    </label>
                    <input
                      type="text"
                      value={formData.bikeModel}
                      onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                      placeholder="e.g. Pulsar 150 / Splendor"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Reg. Number
                    </label>
                    <input
                      type="text"
                      value={formData.registrationNumber}
                      onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value.toUpperCase() })}
                      placeholder="e.g. MH 19 BJ 1234"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white uppercase font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Service Performed & Date */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-[#DFA500]" />
                  Service & Diagnosis
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Service Performed
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    >
                      <option value="General Bike Service">General Bike Service</option>
                      <option value="Engine Repair & Overhaul">Engine Repair & Overhaul</option>
                      <option value="Oil & Filter Change">Oil & Filter Change</option>
                      <option value="Brake Pad & Shoe Service">Brake Pad & Shoe Service</option>
                      <option value="Battery & Electrical Repair">Battery & Electrical Repair</option>
                      <option value="Chain Sprocket Replacement">Chain Sprocket Replacement</option>
                      <option value="Tyre & Wheel Service">Tyre & Wheel Service</option>
                      <option value="Foam Washing & Detailing">Foam Washing & Detailing</option>
                      <option value="Custom Bike Repair">Custom Bike Repair</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Repair Date
                    </label>
                    <input
                      type="date"
                      value={formData.repairDate}
                      onChange={(e) => setFormData({ ...formData, repairDate: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Problem Diagnostics / Technician Notes
                  </label>
                  <textarea
                    value={formData.problemDetails}
                    onChange={(e) => setFormData({ ...formData, problemDetails: e.target.value })}
                    rows={2}
                    placeholder="Work done, complaints solved, spark plug cleaned, etc."
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>
              </div>

              {/* ─── SPARE PARTS SELECTION & ITEMIZER ─── */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-[#DFA500]" />
                    Spare Parts Replaced
                  </h4>
                  <span className="text-xs font-mono font-bold text-gray-700">
                    Parts Total: ₹{partsTotal}
                  </span>
                </div>

                {/* Select directly from Parts Price List */}
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    🏷️ Pick from Spare Parts Price List (Auto-fills price):
                  </label>
                  <select
                    className="w-full bg-white border border-amber-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] font-medium"
                    onChange={(e) => {
                      const pId = e.target.value;
                      if (!pId) return;
                      const p = allParts.find((item) => item.id === pId);
                      if (p) {
                        setPartInputName(p.name);
                        setPartInputCost(String(p.price));
                      }
                    }}
                    value=""
                  >
                    <option value="">-- Choose Spare Part from Price List --</option>
                    {allParts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.category}) — ₹{p.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add Part Form */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={partInputName}
                    onChange={(e) => setPartInputName(e.target.value)}
                    placeholder="Part description (or pick from list above)"
                    className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                  <input
                    type="number"
                    value={partInputCost}
                    onChange={(e) => setPartInputCost(e.target.value)}
                    placeholder="Price (₹)"
                    min="0"
                    className="w-24 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddPart}
                    className="px-4 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-bold shrink-0 transition-colors"
                  >
                    + Add Part
                  </button>
                </div>

                {/* Parts list tags */}
                {formData.partsReplaced.length > 0 && (
                  <div className="space-y-1 pt-1">
                    {formData.partsReplaced.map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-800">{p.name}</span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="font-bold">₹{p.cost}</span>
                          <button
                            type="button"
                            onClick={() => handleRemovePart(idx)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ─── LABOR, DISCOUNT & PAYMENT OPTIONS ─── */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Labor Charges (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.laborCharge}
                    onChange={(e) => setFormData({ ...formData, laborCharge: Number(e.target.value) || 0 })}
                    min="0"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-800 mb-1">
                    Discount in ₹ (Off)
                  </label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) || 0 })}
                    min="0"
                    placeholder="e.g. 50"
                    className="w-full bg-emerald-50/50 border border-emerald-300 rounded-lg px-3 py-2 text-xs text-emerald-950 focus:outline-none focus:border-emerald-500 focus:bg-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Payment Mode
                  </label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value as any })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-bold"
                  >
                    <option value="Cash">💵 Cash</option>
                    <option value="Online">📱 Online (UPI / QR / GPay)</option>
                    <option value="Split">💳 Split (Cash + Online)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as any })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
              </div>

              {/* Total Calculation Banner */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
                <div className="text-xs text-amber-900 font-sans space-y-0.5">
                  <div>Parts: <strong>₹{partsTotal}</strong> + Labor: <strong>₹{formData.laborCharge}</strong></div>
                  {formData.discount > 0 && (
                    <div className="text-emerald-700 font-bold">Discount: -₹{formData.discount} in Rs</div>
                  )}
                  <div className="text-[11px] text-gray-500">
                    Mode: <strong>{formData.paymentMode}</strong> • Status: <strong>{formData.paymentStatus}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 uppercase font-sans">Final Payable:</span>
                  <span className="text-xl font-black text-emerald-800">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold uppercase tracking-wide flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving to DB...' : 'Save Job Card & Generate Bill'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── WHATSAPP BILL SEND MODAL (ON CREATION) ─── */}
      {showWhatsAppModal && createdBillRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md border border-gray-200 shadow-2xl p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-black text-gray-900 uppercase">
                Job Card Created: {createdBillRecord.jobNumber}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Final Bill: <strong className="text-emerald-700">₹{createdBillRecord.totalAmount}</strong> ({createdBillRecord.paymentMode || 'Cash'} - {createdBillRecord.paymentStatus})
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-left text-xs space-y-1 font-sans">
              <div>👤 Customer: <strong>{createdBillRecord.customerName}</strong></div>
              <div>📱 Phone: <strong>{createdBillRecord.customerMobile}</strong></div>
              <div>🛵 Bike: <strong>{createdBillRecord.bikeBrand} {createdBillRecord.bikeModel}</strong></div>
              {createdBillRecord.discount ? (
                <div className="text-emerald-700 font-bold">🎁 Discount Given: ₹{createdBillRecord.discount}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={getWhatsAppBillUrl(createdBillRecord)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowWhatsAppModal(false)}
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs uppercase flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Bill to Customer via WhatsApp</span>
              </a>

              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs"
              >
                Done / Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── VIEW JOB SHEET / RECEIPT MODAL ─── */}
      {isViewModalOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl border border-gray-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F5B900]/20 flex items-center justify-center text-amber-700">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase text-gray-900 tracking-tight font-sans">
                    Workshop Repair Job Sheet: {selectedRecord.jobNumber}
                  </h3>
                  <span className="text-[11px] text-gray-500 font-mono">
                    Chaudhari Auto Centre, Pahur
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Customer</span>
                  <div className="font-black text-gray-900 text-sm">{selectedRecord.customerName}</div>
                  <div className="font-mono text-gray-600">{formatPhone(selectedRecord.customerMobile)}</div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Motorcycle</span>
                  <div className="font-bold text-gray-900">{selectedRecord.bikeBrand} {selectedRecord.bikeModel}</div>
                  <div className="font-mono font-bold text-amber-700 uppercase">{selectedRecord.registrationNumber || 'N/A'}</div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Service Rendered
                </span>
                <div className="font-bold text-gray-900 text-sm">{selectedRecord.serviceType}</div>
                {selectedRecord.problemDetails && (
                  <p className="text-gray-600 mt-1 leading-relaxed">{selectedRecord.problemDetails}</p>
                )}
              </div>

              {/* Parts replaced table */}
              {selectedRecord.partsReplaced && selectedRecord.partsReplaced.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Spare Parts Fitted
                  </span>
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-gray-100 text-gray-700 font-bold">
                        <tr>
                          <th className="p-2.5">Part Description</th>
                          <th className="p-2.5 text-right font-mono">Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedRecord.partsReplaced.map((part, idx) => (
                          <tr key={idx}>
                            <td className="p-2.5 text-gray-800">{part.name}</td>
                            <td className="p-2.5 text-right font-mono font-bold">₹{part.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Billing Breakup */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Parts Subtotal:</span>
                  <span>₹{selectedRecord.partsTotal}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Labor Charges:</span>
                  <span>₹{selectedRecord.laborCharge}</span>
                </div>
                {selectedRecord.discount && selectedRecord.discount > 0 ? (
                  <div className="flex items-center justify-between text-emerald-700 font-bold">
                    <span>Discount in ₹:</span>
                    <span>-₹{selectedRecord.discount}</span>
                  </div>
                ) : null}
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-sm font-black text-gray-900">
                  <span className="font-sans">Final Payable:</span>
                  <span className="text-emerald-700 font-bold">₹{selectedRecord.totalAmount}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500 font-sans pt-1">
                  <span>Payment Mode: <strong>{selectedRecord.paymentMode || 'Cash'}</strong></span>
                  <span>Status: <strong>{selectedRecord.paymentStatus}</strong></span>
                </div>
              </div>
            </div>

            {/* Footer with Send WhatsApp Bill button */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
              <a
                href={getWhatsAppBillUrl(selectedRecord)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Bill via WhatsApp</span>
              </a>

              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs"
              >
                Close Job Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
