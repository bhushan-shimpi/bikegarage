import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Calendar,
  Wrench,
  Search,
  Phone,
  MessageCircle,
  Eye,
  PlusCircle,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry, EnquiryStatus } from '../../types/enquiry';
import { formatDate, formatPhone } from '../../utils/formatters';
import { CreateEnquiryModal } from '../../components/admin/CreateEnquiryModal';

export const DashboardPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EnquiryStatus | 'today_appointments'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadData = () => {
    setEnquiries(enquiryService.getAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  // 3 Core Metrics
  const newCount = enquiries.filter((e) => e.status === 'new').length;
  const todayAppointmentsCount = enquiries.filter((e) => e.service?.preferredDate === todayStr).length;
  const inServiceCount = enquiries.filter(
    (e) => e.status === 'in_progress' || e.status === 'contacted'
  ).length;

  const handleStatusChange = (id: string, newStatus: EnquiryStatus) => {
    enquiryService.updateStatus(id, newStatus);
    loadData();
    setSuccessMsg(`Status updated to ${newStatus.toUpperCase().replace('_', ' ')}`);
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  // Filter list
  const filtered = enquiries.filter((item) => {
    if (statusFilter === 'today_appointments') {
      if (item.service?.preferredDate !== todayStr) return false;
    } else if (statusFilter !== 'all') {
      if (item.status !== statusFilter) return false;
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      item.customer.name.toLowerCase().includes(q) ||
      item.customer.mobile.includes(q) ||
      item.bike.model.toLowerCase().includes(q) ||
      item.bike.brand.toLowerCase().includes(q) ||
      (item.bike.registrationNumber &&
        item.bike.registrationNumber.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-10 overflow-x-hidden">
      {/* Clean Top Action Bar (No duplicate "Workshop Dashboard" heading) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm sm:text-base font-bold text-gray-900">
              Chaudhari Auto Centre
            </span>
            <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded">
              Pahur Workshop
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Quick garage overview • 5-second customer service action center
          </p>
        </div>

        {/* Single Primary Call To Action */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ New Enquiry</span>
        </button>
      </div>

      <CreateEnquiryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => loadData()}
      />

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ─── ONLY 3 MAIN STATS (Local garage owner focus) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Stat 1: New Enquiries */}
        <button
          onClick={() => setStatusFilter(statusFilter === 'new' ? 'all' : 'new')}
          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs ${
            statusFilter === 'new'
              ? 'bg-amber-50/80 border-[#F5B900] ring-2 ring-[#F5B900]/50'
              : 'bg-white border-gray-200 hover:border-amber-300 hover:bg-gray-50/50'
          }`}
        >
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500 block">
              New Enquiries
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
              {newCount}
            </span>
            <span className="text-[11px] text-amber-700 font-medium block">
              Awaiting customer call
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Inbox className="w-6 h-6" />
          </div>
        </button>

        {/* Stat 2: Today's Appointments */}
        <button
          onClick={() => setStatusFilter(statusFilter === 'today_appointments' ? 'all' : 'today_appointments')}
          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs ${
            statusFilter === 'today_appointments'
              ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/50'
              : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-gray-50/50'
          }`}
        >
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500 block">
              Today's Appointments
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-blue-950">
              {todayAppointmentsCount}
            </span>
            <span className="text-[11px] text-blue-700 font-medium block">
              Scheduled for today
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
        </button>

        {/* Stat 3: In Service */}
        <button
          onClick={() => setStatusFilter(statusFilter === 'in_progress' ? 'all' : 'in_progress')}
          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs ${
            statusFilter === 'in_progress'
              ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/50'
              : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-gray-50/50'
          }`}
        >
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500 block">
              In Service
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-emerald-950">
              {inServiceCount}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium block">
              Bikes under repair
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Wrench className="w-6 h-6" />
          </div>
        </button>
      </div>

      {/* ─── SIMPLIFIED ENQUIRIES LAYOUT ─── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search & Simple Status Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by rider name, phone, bike..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Simple Status Filters: New, Contacted, In Progress, Completed, Cancelled */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { key: 'all', label: 'All' },
              { key: 'new', label: 'New' },
              { key: 'contacted', label: 'Contacted' },
              { key: 'in_progress', label: 'In Progress' },
              { key: 'completed', label: 'Completed' },
              { key: 'cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border ${
                  statusFilter === tab.key
                    ? 'bg-[#F5B900] text-black border-[#F5B900] shadow-2xs'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {(statusFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 border border-gray-200 hover:bg-gray-100 shrink-0"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Counter */}
        <div className="text-xs text-gray-500 pt-1 border-t border-gray-100 flex items-center justify-between">
          <span>
            Showing <strong className="text-gray-900">{filtered.length}</strong> enquiries
            {statusFilter !== 'all' && ` (filtered)`}
          </span>
          <Link
            to="/garage/enquiries"
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline"
          >
            View All in Enquiries Page →
          </Link>
        </div>

        {/* List Content */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Inbox className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm font-semibold text-gray-700">No enquiries match your filter.</p>
            <p className="text-xs text-gray-400 mt-0.5">Try resetting search or filters.</p>
          </div>
        ) : (
          <>
            {/* Desktop Simple Table: Customer, Bike, Service, Status, Actions */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-xs font-semibold text-gray-600 bg-gray-50/70">
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Bike</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/20 transition-colors">
                      {/* Customer: Name + Phone */}
                      <td className="py-3.5 px-4">
                        <Link
                          to={`/garage/enquiries/${item.id}`}
                          className="font-semibold text-gray-900 hover:text-[#DFA500] text-sm block"
                        >
                          {item.customer.name}
                        </Link>
                        <span className="text-gray-500 text-xs">
                          {formatPhone(item.customer.mobile)}
                        </span>
                      </td>

                      {/* Bike */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-gray-900 block">
                          {item.bike.brand} {item.bike.model}
                        </span>
                        {item.bike.registrationNumber && (
                          <span className="text-[11px] text-gray-500">
                            {item.bike.registrationNumber}
                          </span>
                        )}
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block font-medium text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px]">
                          {item.service.serviceName}
                        </span>
                        {item.service.preferredDate && (
                          <span className="block text-[11px] text-gray-500 mt-0.5">
                            📅 {formatDate(item.service.preferredDate)}
                          </span>
                        )}
                      </td>

                      {/* Status Dropdown: Simple 5 options */}
                      <td className="py-3.5 px-4">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value as EnquiryStatus)
                          }
                          className="text-xs font-semibold rounded-lg px-2.5 py-1 border border-gray-300 bg-white text-gray-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F5B900]"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Direct Call, WhatsApp, View Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:+91${item.customer.mobile}`}
                            title="Direct Call"
                            className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-[#F5B900] hover:text-black transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`https://wa.me/91${item.customer.mobile}?text=${encodeURIComponent(
                              `Hello ${item.customer.name}, this is Chaudhari Auto Centre, Pahur. We received your enquiry for ${item.bike.brand} ${item.bike.model} (${item.service.serviceName}). Please let us know when you would like to bring your bike.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Direct WhatsApp"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          <Link
                            to={`/garage/enquiries/${item.id}`}
                            title="View Full Details"
                            className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List (Perfect for 320px–430px with NO horizontal scrolling) */}
            <div className="lg:hidden space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2.5"
                >
                  {/* Card Top: Customer info & Quick Action Buttons */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/garage/enquiries/${item.id}`}
                        className="font-bold text-gray-900 text-sm block truncate hover:text-[#DFA500]"
                      >
                        {item.customer.name}
                      </Link>
                      <span className="text-xs text-gray-500 font-medium block">
                        {formatPhone(item.customer.mobile)}
                      </span>
                    </div>

                    {/* Direct Call & WhatsApp Buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`tel:+91${item.customer.mobile}`}
                        className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 active:scale-95 transition-transform"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://wa.me/91${item.customer.mobile}?text=${encodeURIComponent(
                          `Hello ${item.customer.name}, this is Chaudhari Auto Centre, Pahur. Regarding your bike ${item.bike.brand} ${item.bike.model}...`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 active:scale-95 transition-transform"
                        title="WhatsApp Customer"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Card Details: Bike & Service */}
                  <div className="p-2 rounded-lg bg-white border border-gray-100 text-xs space-y-1">
                    <div className="font-semibold text-gray-900 truncate">
                      🛵 {item.bike.brand} {item.bike.model}{' '}
                      {item.bike.registrationNumber && `(${item.bike.registrationNumber})`}
                    </div>
                    <div className="text-amber-900 font-medium truncate">
                      🔧 {item.service.serviceName}
                    </div>
                    {item.service.preferredDate && (
                      <div className="text-gray-500 text-[11px]">
                        📅 {formatDate(item.service.preferredDate)}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Status dropdown & View details */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value as EnquiryStatus)
                      }
                      className="text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-gray-300 bg-white text-gray-800"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <Link
                      to={`/garage/enquiries/${item.id}`}
                      className="px-3 py-1.5 rounded-lg bg-[#F5B900] text-black text-xs font-bold shadow-2xs shrink-0"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
