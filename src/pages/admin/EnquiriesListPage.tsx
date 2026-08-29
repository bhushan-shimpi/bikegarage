import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Inbox,
  PlusCircle,
  Trash2,
  CheckSquare,
  Bike,
  Phone,
  Eye,
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/common/WhatsAppIcon';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry, EnquiryStatus, isRestorationEnquiry } from '../../types/enquiry';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatDate, formatPhone } from '../../utils/formatters';
import { CreateEnquiryModal } from '../../components/admin/CreateEnquiryModal';
import { EnquiryDetailsModal } from '../../components/admin/EnquiryDetailsModal';

export const EnquiriesListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialFilter = (searchParams.get('status') as EnquiryStatus | 'all') || 'all';

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EnquiryStatus>(initialFilter);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const typeFilter = searchParams.get('type') || 'all';

  const loadData = () => {
    const all = enquiryService.getAll();
    setEnquiries(all.filter((e) => !isRestorationEnquiry(e)));
  };

  useEffect(() => {
    loadData();
  }, []);

  const filterTabs = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New' },
    { key: 'contacted', label: 'Contacted' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
  ] as const;

  // Filter and Search logic
  const filtered = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    const matchesType = typeFilter === 'all' || e.type === typeFilter;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      e.customer.name.toLowerCase().includes(query) ||
      e.customer.mobile.includes(query) ||
      e.bike.model.toLowerCase().includes(query) ||
      e.bike.brand.toLowerCase().includes(query) ||
      (e.bike.registrationNumber && e.bike.registrationNumber.toLowerCase().includes(query)) ||
      e.ticketNumber.toLowerCase().includes(query);

    return matchesStatus && matchesType && matchesSearch;
  });

  const isAllSelected =
    filtered.length > 0 && filtered.every((e) => selectedIds.includes(e.id));

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((e) => e.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSingle = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete enquiry for "${name}"?`)) {
      await enquiryService.delete(id);
      setSelectedIds((prev) => prev.filter((i) => i !== id));
      loadData();
    }
  };

  const handleDeleteMultiple = async () => {
    if (selectedIds.length === 0) return;
    if (
      window.confirm(
        `Are you sure you want to permanently delete all ${selectedIds.length} selected enquiries?`
      )
    ) {
      await enquiryService.deleteMultiple(selectedIds);
      setSelectedIds([]);
      loadData();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex items-start sm:items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            <Inbox className="w-6 h-6 text-[#DFA500]" />
            <span className="truncate">Customer Enquiries</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
            Customer service inquiries, booking requests, and bike leads from website
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Enquiry</span>
        </button>
      </div>

      {/* Search & Filters Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by rider name, mobile, registration, or bike model..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Status Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#DFA500]" />
            Status:
          </span>
          {filterTabs.map((tab) => {
            const count =
              tab.key === 'all'
                ? enquiries.length
                : enquiries.filter((e) => e.status === tab.key).length;

            return (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  statusFilter === tab.key
                    ? 'bg-[#F5B900] text-black border-[#F5B900] shadow-2xs'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    statusFilter === tab.key
                      ? 'bg-black/20 text-black font-extrabold'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <CreateEnquiryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => loadData()}
      />

      {/* Bulk Delete Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-950">
            <CheckSquare className="w-4 h-4 text-amber-700" />
            <span>{selectedIds.length} enquiry(s) selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors"
            >
              Deselect All
            </button>
            <button
              onClick={handleDeleteMultiple}
              className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected ({selectedIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── ENQUIRIES LIST / SEPARATE CARD FOR EACH ROW ─── */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-gray-500">
            <label className="flex items-center gap-2 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleToggleSelectAll}
                className="w-4 h-4 rounded text-[#F5B900] focus:ring-[#F5B900] border-gray-300 cursor-pointer"
              />
              <span>Select all {filtered.length} enquiries</span>
            </label>
          </div>
          {filtered.map((enq) => (
            <div
              key={enq.id}
              className={`bg-white rounded-2xl border transition-all p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                selectedIds.includes(enq.id)
                  ? 'border-[#F5B900] bg-amber-50/20'
                  : 'border-gray-200 hover:border-amber-300'
              }`}
            >
              {/* Left Column: Checkbox, Ticket, Customer, Bike info */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(enq.id)}
                  onChange={() => handleToggleSelect(enq.id)}
                  className="w-4 h-4 rounded text-[#F5B900] focus:ring-[#F5B900] border-gray-300 cursor-pointer mt-1 shrink-0"
                />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">
                      {enq.ticketNumber}
                    </span>
                    <StatusBadge status={enq.status} size="sm" />
                    {enq.createdAt && (
                      <span className="text-[11px] text-gray-400">
                        {formatDate(enq.createdAt)}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <button
                        type="button"
                        onClick={() => setSelectedEnquiryId(enq.id)}
                        className="font-bold text-gray-900 hover:text-amber-700 text-sm block truncate text-left cursor-pointer"
                      >
                        {enq.customer.name}
                      </button>
                      <span className="text-[11px] text-gray-500 font-mono">
                        {formatPhone(enq.customer.mobile)}
                      </span>
                    </div>

                    <div>
                      <span className="font-bold text-gray-900 flex items-center gap-1">
                        <Bike className="w-3.5 h-3.5 text-[#DFA500]" />
                        <span>{enq.bike.brand} {enq.bike.model}</span>
                      </span>
                      {enq.bike.registrationNumber && (
                        <span className="text-[11px] font-mono uppercase text-gray-500">
                          {enq.bike.registrationNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Service & Problem Description */}
                  <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs">
                    <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-medium">
                      {enq.service.serviceName}
                    </span>
                    {enq.service.problemDescription && (
                      <span className="text-gray-400 text-[11px] italic truncate max-w-sm">
                        "{enq.service.problemDescription}"
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Contact & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 shrink-0">
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:+91${enq.customer.mobile}`}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors border border-gray-200"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#DFA500]" />
                  </a>

                  <a
                    href={`https://wa.me/91${enq.customer.mobile}?text=${encodeURIComponent(
                      `Hello ${enq.customer.name}, this is Chaudhari Auto Centre, Pahur. We received your enquiry regarding your bike service.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-colors shadow-2xs"
                    title="WhatsApp"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedEnquiryId(enq.id)}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#DFA500]" />
                    <span>Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteSingle(enq.id, enq.customer.name)}
                    className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xs text-center py-16 text-gray-500">
          <Inbox className="w-10 h-10 mx-auto text-gray-400 mb-3" />
          <p className="text-sm font-semibold text-gray-700 mb-1">
            No bike enquiries match your search criteria.
          </p>
          <p className="text-xs text-gray-400 mb-4">
            Try searching with a different mobile number or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-bold text-gray-700 hover:bg-[#F5B900] hover:text-black transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* In-Page Enquiry Details Modal */}
      <EnquiryDetailsModal
        isOpen={!!selectedEnquiryId}
        enquiryId={selectedEnquiryId}
        onClose={() => setSelectedEnquiryId(null)}
        onUpdated={loadData}
      />
    </div>
  );
};
