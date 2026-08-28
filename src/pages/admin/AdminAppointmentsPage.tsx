import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Search,
  Phone,
  MessageCircle,
  Eye,
  Filter,
  CheckCircle2,
  CalendarCheck2,
} from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry, EnquiryStatus } from '../../types/enquiry';
import { formatDate, formatPhone } from '../../utils/formatters';

export const AdminAppointmentsPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'tomorrow' | 'upcoming' | 'past'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | EnquiryStatus>('all');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadData = () => {
    setEnquiries(enquiryService.getAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Filter only enquiries that have a preferred service date or are appointment-based
  const appointmentsList = enquiries.filter((e) => Boolean(e.service?.preferredDate));

  const handleStatusChange = (id: string, newStatus: EnquiryStatus) => {
    enquiryService.updateStatus(id, newStatus);
    loadData();
    setSuccessMsg(`Status updated to ${newStatus.toUpperCase().replace('_', ' ')}`);
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const filtered = appointmentsList.filter((item) => {
    const prefDate = item.service?.preferredDate || '';

    // Date filtering
    if (dateFilter === 'today' && prefDate !== todayStr) return false;
    if (dateFilter === 'tomorrow' && prefDate !== tomorrowStr) return false;
    if (dateFilter === 'upcoming' && prefDate < todayStr) return false;
    if (dateFilter === 'past' && prefDate >= todayStr) return false;

    // Status filtering
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;

    // Search query
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      item.customer.name.toLowerCase().includes(q) ||
      item.customer.mobile.includes(q) ||
      item.bike.model.toLowerCase().includes(q) ||
      item.bike.brand.toLowerCase().includes(q) ||
      (item.bike.registrationNumber && item.bike.registrationNumber.toLowerCase().includes(q))
    );
  });

  const todayCount = appointmentsList.filter((e) => e.service?.preferredDate === todayStr).length;
  const tomorrowCount = appointmentsList.filter((e) => e.service?.preferredDate === tomorrowStr).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-[#DFA500]" />
            <span>Service Appointments</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Scheduled customer bike servicing dates, timeslots, and confirmation status
          </p>
        </div>

        <Link
          to="/inquiry"
          target="_blank"
          className="px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-bold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <CalendarCheck2 className="w-4 h-4" />
          <span>+ Book Appointment</span>
        </Link>
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
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 block">Today's Bookings</span>
            <span className="text-xl font-bold text-gray-900">{todayCount}</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 block">Tomorrow</span>
            <span className="text-xl font-bold text-blue-900">{tomorrowCount}</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CalendarCheck2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 block">Total Appointments</span>
            <span className="text-xl font-bold text-emerald-800">{appointmentsList.length}</span>
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
              placeholder="Search rider name, mobile, registration, or bike model..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
            />
          </div>

          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>Showing:</span>
            <strong className="text-gray-900">{filtered.length}</strong>
            <span>appointments</span>
          </div>
        </div>

        {/* Date Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#DFA500]" />
            Date:
          </span>
          {[
            { key: 'all', label: 'All Dates' },
            { key: 'today', label: "Today's" },
            { key: 'tomorrow', label: 'Tomorrow' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'past', label: 'Past' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setDateFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                dateFilter === tab.key
                  ? 'bg-[#F5B900] text-black border-[#F5B900] shadow-2xs'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <span className="text-xs font-medium text-gray-500 ml-2 mr-1">Status:</span>
          {[
            { key: 'all', label: 'All' },
            { key: 'new', label: 'New' },
            { key: 'contacted', label: 'Contacted' },
            { key: 'in_progress', label: 'In Service' },
            { key: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === tab.key
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List / Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 space-y-2">
            <Calendar className="w-10 h-10 mx-auto text-gray-300" />
            <p className="text-sm font-bold text-gray-700">No appointments found</p>
            <p className="text-xs text-gray-400">Try changing date filters or search query.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-600">
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Motorcycle</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Appointment Slot</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <Link
                          to={`/garage/enquiries/${item.id}`}
                          className="font-semibold text-gray-900 hover:text-[#DFA500] text-sm block"
                        >
                          {item.customer.name}
                        </Link>
                        <span className="text-xs text-gray-500 font-medium">
                          {formatPhone(item.customer.mobile)}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-gray-900 block">
                          {item.bike.brand} {item.bike.model}
                        </span>
                        {item.bike.registrationNumber && (
                          <span className="text-[11px] text-gray-500 uppercase">
                            {item.bike.registrationNumber}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block font-medium text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px]">
                          {item.service.serviceName}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-gray-900 block">
                          📅 {formatDate(item.service.preferredDate || '')}
                        </span>
                        <span className="text-xs text-gray-500">
                          ⏰ {item.service.preferredTime || 'Any Time'}
                        </span>
                      </td>

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
                          <option value="in_progress">In Service</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:+91${item.customer.mobile}`}
                            title="Call Customer"
                            className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-[#F5B900] hover:text-black transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/91${item.customer.mobile}?text=${encodeURIComponent(
                              `Hello ${item.customer.name}, this is Chaudhari Auto Centre, Pahur. Confirming your bike service appointment on ${formatDate(
                                item.service.preferredDate || ''
                              )} (${item.service.preferredTime || 'Flexible'}) for your ${item.bike.brand} ${item.bike.model}. We look forward to servicing your bike!`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="WhatsApp Customer"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <Link
                            to={`/garage/enquiries/${item.id}`}
                            title="View Details"
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

            {/* Mobile Card List (Zero horizontal scrolling at 320-430px) */}
            <div className="lg:hidden divide-y divide-gray-100">
              {filtered.map((item) => (
                <div key={item.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/garage/enquiries/${item.id}`}
                        className="font-bold text-gray-900 text-sm block hover:text-[#DFA500]"
                      >
                        {item.customer.name}
                      </Link>
                      <span className="text-xs text-gray-500">
                        {formatPhone(item.customer.mobile)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`tel:+91${item.customer.mobile}`}
                        className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200"
                        title="Call"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`https://wa.me/91${item.customer.mobile}?text=${encodeURIComponent(
                          `Hello ${item.customer.name}, this is Chaudhari Auto Centre, Pahur. Confirming your bike service appointment on ${formatDate(
                            item.service.preferredDate || ''
                          )} (${item.service.preferredTime || 'Flexible'}) for your ${item.bike.brand} ${item.bike.model}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200"
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs space-y-1">
                    <div className="font-semibold text-gray-900">
                      🛵 {item.bike.brand} {item.bike.model}{' '}
                      {item.bike.registrationNumber && `(${item.bike.registrationNumber})`}
                    </div>
                    <div className="text-amber-900 font-medium">
                      🔧 {item.service.serviceName}
                    </div>
                    <div className="text-gray-700 font-bold">
                      📅 {formatDate(item.service.preferredDate || '')} • ⏰ {item.service.preferredTime || 'Any Time'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value as EnquiryStatus)
                      }
                      className="text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-gray-300 bg-white"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Service</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <Link
                      to={`/garage/enquiries/${item.id}`}
                      className="px-3 py-1.5 rounded-lg bg-[#F5B900] text-black text-xs font-bold shadow-2xs"
                    >
                      View Details
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
