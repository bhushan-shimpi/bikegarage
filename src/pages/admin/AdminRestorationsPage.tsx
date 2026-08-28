import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Phone,
  MessageCircle,
  Eye,
  Filter,
  CheckCircle2,
  Bike,
  Wrench,
} from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry, EnquiryStatus, isRestorationEnquiry } from '../../types/enquiry';
import { formatDate, formatPhone } from '../../utils/formatters';

export const AdminRestorationsPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EnquiryStatus>('all');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadData = () => {
    setEnquiries(enquiryService.getAll());
  };

  useEffect(() => {
    loadData();
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-[#DFA500]" />
            <span>Bike Restoration Projects</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Classic & vintage motorcycle restoration inquiries, overhaul job sheets & custom builds
          </p>
        </div>

        <Link
          to="/bike-restoration-form"
          target="_blank"
          className="px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-bold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Wrench className="w-4 h-4" />
          <span>+ Open Restoration Form</span>
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
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-gray-100 pt-2">
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
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 space-y-2">
            <Bike className="w-10 h-10 mx-auto text-gray-300" />
            <p className="text-sm font-bold text-gray-700">No restoration enquiries found</p>
            <p className="text-xs text-gray-400">
              When customers submit the Bike Restoration Form, projects will show here.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-600">
                    <th className="py-3.5 px-4">Customer & Location</th>
                    <th className="py-3.5 px-4">Motorcycle Details</th>
                    <th className="py-3.5 px-4">Scope of Restoration</th>
                    <th className="py-3.5 px-4">Date</th>
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
                        <div className="text-xs text-gray-500 font-medium mt-0.5">
                          📞 {formatPhone(item.customer.mobile)}
                          {item.customer.city && ` • 📍 ${item.customer.city}`}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-gray-900 block">
                          {item.bike.brand} {item.bike.model}
                        </span>
                        {item.bike.year && (
                          <span className="text-[11px] text-gray-500 block">
                            Year: {item.bike.year}
                          </span>
                        )}
                        {item.bike.registrationNumber && (
                          <span className="text-[11px] text-gray-500 uppercase font-mono">
                            {item.bike.registrationNumber}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="inline-block font-medium text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px] mb-1">
                          {item.service.serviceName}
                        </span>
                        {item.service.quickIssues && item.service.quickIssues.length > 0 ? (
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {item.service.quickIssues.join(', ')}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500 italic line-clamp-2">
                            {item.service.problemDescription || 'Standard restoration requested'}
                          </p>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-gray-500 text-xs">
                        {formatDate(item.createdAt)}
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
                          <option value="in_progress">In Progress</option>
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
                              `Hello ${item.customer.name}, this is Chaudhari Auto Centre, Pahur. Regarding your bike restoration inquiry for ${item.bike.brand} ${item.bike.model}, we would be glad to discuss the restoration plan and quote with you.`
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
                            title="View Full Job Sheet"
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

            {/* Mobile Card List */}
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
                      <div className="text-xs text-gray-500">
                        {formatPhone(item.customer.mobile)}
                        {item.customer.city && ` • ${item.customer.city}`}
                      </div>
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
                          `Hello ${item.customer.name}, this is Chaudhari Auto Centre, Pahur. Regarding your bike restoration inquiry for ${item.bike.brand} ${item.bike.model}...`
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
                      🏍️ {item.bike.brand} {item.bike.model} {item.bike.year ? `(${item.bike.year})` : ''}
                    </div>
                    {item.service.quickIssues && item.service.quickIssues.length > 0 && (
                      <div className="text-gray-600 text-[11px] line-clamp-2">
                        Works: {item.service.quickIssues.join(', ')}
                      </div>
                    )}
                    <div className="text-gray-400 text-[10px]">
                      Received: {formatDate(item.createdAt)}
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
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <Link
                      to={`/garage/enquiries/${item.id}`}
                      className="px-3 py-1.5 rounded-lg bg-[#F5B900] text-black text-xs font-bold shadow-2xs"
                    >
                      View Job Sheet
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
