import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  RefreshCw,
  Inbox,
  PlusCircle,
} from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry, EnquiryStatus } from '../../types/enquiry';
import { EnquiryTableRow } from '../../components/admin/EnquiryTableRow';
import { EnquiryCardMobile } from '../../components/admin/EnquiryCardMobile';

export const EnquiriesListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialFilter = (searchParams.get('status') as EnquiryStatus | 'all') || 'all';

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EnquiryStatus>(initialFilter);
  const typeFilter = searchParams.get('type') || 'all';

  const loadData = () => {
    setEnquiries(enquiryService.getAll());
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

  const handleResetDefaults = () => {
    if (window.confirm('Reset demo enquiries database to default bike records?')) {
      enquiryService.resetDefaults();
      loadData();
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Search & Actions Header Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by rider name, mobile, registration, or bike model..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
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

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              title="Reset mock data to initial demo state"
              className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 hover:bg-gray-200 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Reset Demo DB</span>
            </button>

            <a
              href="/inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Simulate Bike Inquiry</span>
            </a>
          </div>
        </div>

        {/* Status Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-2 flex items-center gap-1">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 ${
                  statusFilter === tab.key
                    ? 'bg-[#F5B900] text-black shadow-xs font-extrabold'
                    : 'bg-gray-100 text-gray-600 hover:text-black hover:bg-gray-200 border border-gray-200'
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

      {/* Main Table / Mobile Card View */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
            <span>Two-Wheeler Enquiries</span>
            <span className="text-xs text-[#DFA500] font-normal">
              ({filtered.length} found)
            </span>
          </h3>
        </div>

        {filtered.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 bg-gray-50/60">
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Mobile</th>
                    <th className="py-3 px-4">Bike / Model</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Preferred Slot</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Created</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((enq) => (
                    <EnquiryTableRow key={enq.id} enquiry={enq} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List */}
            <div className="md:hidden space-y-3">
              {filtered.map((enq) => (
                <EnquiryCardMobile key={enq.id} enquiry={enq} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-gray-500">
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
              className="px-4 py-2 rounded-lg bg-gray-100 text-xs font-bold text-gray-700 hover:bg-[#F5B900] hover:text-black transition-colors uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
