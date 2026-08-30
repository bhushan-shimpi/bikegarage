import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Phone,
  Eye,
  Filter,
  CheckCircle2,
  Bike,
  Wrench,
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/common/WhatsAppIcon';
import { CreateRestorationModal } from '../../components/admin/CreateRestorationModal';
import { EnquiryDetailsModal } from '../../components/admin/EnquiryDetailsModal';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry, EnquiryStatus, isRestorationEnquiry } from '../../types/enquiry';
import { formatDate, formatPhone } from '../../utils/formatters';

export const AdminRestorationsPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EnquiryStatus>('all');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedJobSheetId, setSelectedJobSheetId] = useState<string | null>(null);

  const loadData = async (force = false) => {
    const all = await enquiryService.syncWithBackend(force);
    setEnquiries(all);
  };

  useEffect(() => {
    loadData(true);
    const handleUpdate = () => loadData(false);
    window.addEventListener('chaudhari_enquiries_updated', handleUpdate);
    return () => window.removeEventListener('chaudhari_enquiries_updated', handleUpdate);
  }, []);

  // Filter restoration inquiries
  const restorationsList = enquiries.filter(isRestorationEnquiry);

  const handleStatusChange = (id: string, newStatus: EnquiryStatus) => {
    enquiryService.updateStatus(id, newStatus);
    loadData();
    setSuccessMsg(`Status updated to ${newStatus.toUpperCase().replace('_', ' ')}`);
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const filtered = restorationsList.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      item.customer.name.toLowerCase().includes(q) ||
      item.customer.mobile.includes(q) ||
      item.bike.model.toLowerCase().includes(q) ||
      item.bike.brand.toLowerCase().includes(q) ||
      (item.customer.city && item.customer.city.toLowerCase().includes(q))
    );
  });

  const newCount = restorationsList.filter((e) => e.status === 'new').length;
  const inProgressCount = restorationsList.filter((e) => e.status === 'in_progress' || e.status === 'contacted').length;
  const completedCount = restorationsList.filter((e) => e.status === 'completed').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex items-start sm:items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-[#DFA500]" />
            <span className="truncate">Bike Restorations</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
            Classic & vintage motorcycle restoration inquiries, overhaul job sheets & custom builds
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0 active:scale-95 cursor-pointer"
        >
          <Wrench className="w-4 h-4" />
          <span>Restoration Form</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 block">New Inquiries</span>
            <span className="text-xl font-bold text-gray-900">{newCount}</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 block">In Progress</span>
            <span className="text-xl font-bold text-amber-900">{inProgressCount}</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 block">Restored Bikes</span>
            <span className="text-xl font-bold text-emerald-800">{completedCount}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search rider, phone, village/city, or bike model..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
            />
          </div>

          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>Showing:</span>
            <strong className="text-gray-900">{filtered.length}</strong>
            <span>restorations</span>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-gray-100 pt-2 no-scrollbar">
          <span className="text-xs font-medium text-gray-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#DFA500]" />
            Status:
          </span>
          {[
            { key: 'all', label: 'All Projects' },
            { key: 'new', label: 'New' },
            { key: 'contacted', label: 'Contacted' },
            { key: 'in_progress', label: 'In Progress' },
            { key: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                statusFilter === tab.key
                  ? 'bg-[#F5B900] text-black border-[#F5B900] shadow-2xs'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Restorations List */}
      {/* ─── RESTORATIONS LIST / SEPARATE CARD FOR EACH ROW ─── */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xs text-center py-16 text-gray-500 space-y-2">
          <Bike className="w-10 h-10 mx-auto text-gray-300" />
          <p className="text-sm font-bold text-gray-700">No restoration enquiries found</p>
          <p className="text-xs text-gray-400">
            When customers submit the Bike Restoration Form, projects will show here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-amber-300 p-4 sm:p-5 shadow-xs transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Left Column: Customer info, Motorcycle specs & Scope */}
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">
                    {item.ticketNumber || 'RESTORE'}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedJobSheetId(item.id)}
                      className="font-bold text-gray-900 hover:text-amber-700 text-sm block truncate text-left cursor-pointer"
                    >
                      {item.customer.name}
                    </button>
                    <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                      {formatPhone(item.customer.mobile)}
                      {item.customer.city && ` • 📍 ${item.customer.city}`}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-gray-900 flex items-center gap-1.5">
                      <Bike className="w-3.5 h-3.5 text-[#DFA500]" />
                      <span>{item.bike.brand} {item.bike.model} {item.bike.year ? `(${item.bike.year})` : ''}</span>
                    </span>
                    {item.bike.registrationNumber && (
                      <span className="text-[11px] font-mono uppercase text-gray-500">
                        {item.bike.registrationNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* Scope of work */}
                <div className="pt-0.5 text-xs">
                  <span className="inline-block font-medium text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px] mr-2">
                    {item.service.serviceName}
                  </span>
                  {item.service.quickIssues && item.service.quickIssues.length > 0 ? (
                    <span className="text-gray-600 text-[11px]">
                      Works: {item.service.quickIssues.join(', ')}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-[11px] italic">
                      {item.service.problemDescription || 'Standard restoration overhaul'}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Status Select + Actions */}
              <div className="flex items-center justify-between lg:justify-end gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100 shrink-0">
                <select
                  value={item.status}
                  onChange={(e) =>
                    handleStatusChange(item.id, e.target.value as EnquiryStatus)
                  }
                  className="text-xs font-semibold rounded-xl px-3 py-2 border border-gray-300 bg-white text-gray-800 cursor-pointer focus:outline-none focus:border-[#F5B900]"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:+91${item.customer.mobile}`}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors border border-gray-200"
                    title="Call Customer"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#DFA500]" />
                  </a>

                  <a
                    href={`https://wa.me/91${item.customer.mobile}?text=${encodeURIComponent(
                      `Hello ${item.customer.name}, this is Chaudhari Auto Centre, Pahur. Regarding your bike restoration inquiry for ${item.bike.brand} ${item.bike.model}...`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-colors shadow-2xs"
                    title="WhatsApp Customer"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedJobSheetId(item.id)}
                    className="px-3 py-2 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-bold transition-colors shadow-2xs whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Job Sheet</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* In-Page Create Restoration Modal */}
      <CreateRestorationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={(msg) => {
          setSuccessMsg(msg || 'Restoration project saved');
          loadData();
          setTimeout(() => setSuccessMsg(null), 4000);
        }}
      />

      {/* In-Page Job Sheet Details Modal */}
      <EnquiryDetailsModal
        isOpen={!!selectedJobSheetId}
        enquiryId={selectedJobSheetId}
        onClose={() => setSelectedJobSheetId(null)}
        onUpdated={loadData}
      />
    </div>
  );
};
