import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  IndianRupee,
  Calendar,
  Image as ImageIcon,
  Trash2,
  Eye,
  X,
  Save,
  Bike,
  User,
  FileText,
  UploadCloud,
  TrendingUp,
} from 'lucide-react';
import { repairService } from '../../services/repairService';
import { RepairRecord, DailyRepairStats, ReplacedPart } from '../../types/customer';
import { formatPhone } from '../../utils/formatters';

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

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RepairRecord | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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
  };

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
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

  // Handle Photo Upload (reads local files into data URL for instant view & storage)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, loadEvt.target!.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const partsTotal = formData.partsReplaced.reduce((sum, p) => sum + p.cost, 0);
  const grandTotal = partsTotal + (Number(formData.laborCharge) || 0);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.customerMobile.trim()) {
      setFormError('Customer name and mobile number are required.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      await repairService.create({
        ...formData,
        partsTotal,
        totalAmount: grandTotal,
      });

      setIsCreateModalOpen(false);
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
        paymentStatus: 'Paid',
        status: 'Completed',
        photos: [],
        repairDate: new Date().toISOString().split('T')[0],
      });

      loadData();
      setSuccessMsg('Bike repair job card successfully logged in Supabase DB!');
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
            Bike Repair History & Daily Workshop Tracker
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Record all repaired motorcycles, track daily workshop earnings, parts replaced, and attach service photos.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Bike Repair</span>
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
        {/* Today's Completed Bikes */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
              Today's Repaired Bikes
            </span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 font-mono">
              {stats.todayCompletedCount}
            </span>
          </div>
        </div>

        {/* Today's Total Billed Revenue */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
              Today's Workshop Revenue
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
              ₹{stats.todayRevenue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* In-Workshop Active Bikes */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
              In-Workshop (Work On)
            </span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 font-mono">
              {stats.inWorkshopCount}
            </span>
          </div>
        </div>

        {/* Lifetime Repaired Bikes & Revenue */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
              Total Lifetime Repaired
            </span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 font-mono">
              {stats.lifetimeRepairsCount}
            </span>
            <span className="text-[10px] text-gray-400 block">
              (₹{stats.lifetimeRevenue.toLocaleString('en-IN')})
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
            placeholder="Search Job #, Customer, Mobile, or MH 19..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
          />
        </form>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
          {['all', 'Completed', 'In Progress', 'Delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
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

                {/* Customer & Bike Info */}
                <div className="space-y-1 text-xs">
                  <div className="font-black text-gray-900 uppercase">
                    {rep.customerName}
                  </div>
                  <div className="text-gray-500 font-mono text-[11px]">
                    {formatPhone(rep.customerMobile)}
                  </div>

                  <div className="mt-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-800 font-bold">
                      <Bike className="w-3.5 h-3.5 text-[#DFA500] shrink-0" />
                      <span>{rep.bikeBrand} {rep.bikeModel || 'Motorcycle'}</span>
                    </div>
                    {rep.registrationNumber && (
                      <span className="font-mono text-[11px] text-gray-600 font-semibold uppercase">
                        {rep.registrationNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* Service Details */}
                <div className="mt-3 text-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Service Rendered:
                  </span>
                  <span className="font-bold text-amber-700 block">
                    {rep.serviceType}
                  </span>
                  {rep.problemDetails && (
                    <p className="text-gray-500 text-[11px] line-clamp-1 mt-0.5">
                      {rep.problemDetails}
                    </p>
                  )}
                </div>

                {/* Photos Thumbnail strip */}
                {rep.photos && rep.photos.length > 0 && (
                  <div className="mt-3 flex items-center gap-1.5 overflow-x-auto">
                    {rep.photos.map((ph, idx) => (
                      <img
                        key={idx}
                        src={ph}
                        alt="Service"
                        className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                      />
                    ))}
                    <span className="text-[10px] text-gray-400 font-semibold">
                      {rep.photos.length} Photo{rep.photos.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Total & Payment Row */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between font-mono">
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 block font-sans">
                    Total Amount Billed
                  </span>
                  <span className="text-base font-black text-gray-900">
                    ₹{rep.totalAmount}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-sans ${
                    rep.paymentStatus === 'Paid'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {rep.paymentStatus}
                </span>
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
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
                  {formError}
                </div>
              )}

              {/* Customer Info */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#DFA500]" />
                  Customer Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="e.g. Rahul Patil"
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
                      placeholder="e.g. Pulsar 125"
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
                      Service Type
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    >
                      <option value="General Bike Service">General Bike Service</option>
                      <option value="Premium Bike Service">Premium Bike Service</option>
                      <option value="Engine Repair & Overhaul">Engine Repair & Overhaul</option>
                      <option value="Oil & Filter Change">Oil & Filter Change</option>
                      <option value="Brake System Repair">Brake System Repair</option>
                      <option value="Electrical & Wiring">Electrical & Wiring</option>
                      <option value="Vintage 2-Stroke Restoration">Vintage 2-Stroke Restoration</option>
                      <option value="Foam Wash & Detailing">Foam Wash & Detailing</option>
                      <option value="Chain Sprocket Replacement">Chain Sprocket Replacement</option>
                      <option value="Clutch & Gearbox Work">Clutch & Gearbox Work</option>
                      <option value="Custom Repair">Custom Repair</option>
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
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Problem Details / Work Done Remarks
                  </label>
                  <textarea
                    rows={2}
                    value={formData.problemDetails}
                    onChange={(e) => setFormData({ ...formData, problemDetails: e.target.value })}
                    placeholder="e.g. Engine oil changed, valve clearance adjusted, front disc pads renewed..."
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>
              </div>

              {/* Parts Replaced Tracker */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                    Parts Replaced & Cost
                  </h4>
                  <span className="text-[11px] font-bold text-gray-600 font-mono">
                    Parts Total: ₹{partsTotal}
                  </span>
                </div>

                {/* Input row for part */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={partInputName}
                    onChange={(e) => setPartInputName(e.target.value)}
                    placeholder="Part Name (e.g. Brake Shoe, Engine Oil 10W-30)"
                    className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                  <input
                    type="number"
                    value={partInputCost}
                    onChange={(e) => setPartInputCost(e.target.value)}
                    placeholder="Cost (₹)"
                    className="w-24 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddPart}
                    className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-[#F5B900] hover:text-black text-gray-700 font-bold text-xs"
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

              {/* Labor Charge & Grand Total Calculation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Labor Charges (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.laborCharge}
                    onChange={(e) => setFormData({ ...formData, laborCharge: Number(e.target.value) || 0 })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono font-bold"
                  />
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
                    <option value="Paid">Paid (रोख / UPI)</option>
                    <option value="Pending">Pending (बाकी)</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Job Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Delivered">Delivered to Customer</option>
                  </select>
                </div>
              </div>

              {/* Total Calculation Banner */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between font-mono">
                <span className="text-amber-800 font-bold font-sans">
                  Total Bill (Parts ₹{partsTotal} + Labor ₹{formData.laborCharge}):
                </span>
                <span className="text-base font-black text-amber-900">
                  ₹{grandTotal}
                </span>
              </div>

              {/* Service Photos Upload Section */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#DFA500]" />
                    Upload Bike Service Photos
                  </h4>
                  <span className="text-[10px] text-gray-400">
                    Attach photos of repaired bike or replaced parts
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <label className="px-3.5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs flex items-center gap-2 cursor-pointer border border-gray-200 transition-colors">
                    <UploadCloud className="w-4 h-4" />
                    <span>Choose Photos</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-gray-400 text-[11px]">
                    {formData.photos.length} photo(s) selected
                  </span>
                </div>

                {formData.photos.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formData.photos.map((ph, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={ph}
                          alt={`Uploaded ${idx + 1}`}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs opacity-90 hover:opacity-100 shadow-xs"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                  <span>{isSubmitting ? 'Saving to DB...' : 'Save Job Sheet'}</span>
                </button>
              </div>
            </form>
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
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-sm font-black text-gray-900">
                  <span className="font-sans">Grand Total:</span>
                  <span className="text-emerald-700 font-bold">₹{selectedRecord.totalAmount}</span>
                </div>
              </div>

              {/* Photos Gallery */}
              {selectedRecord.photos && selectedRecord.photos.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Service Photos
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedRecord.photos.map((ph, idx) => (
                      <img
                        key={idx}
                        src={ph}
                        alt="Service proof"
                        className="w-24 h-24 rounded-xl object-cover border border-gray-200 shadow-sm"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold"
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
