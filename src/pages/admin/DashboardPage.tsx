import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Sparkles,
  Clock,
  CheckCircle2,
  Search,
  Phone,
  MessageCircle,
  Eye,
  PlusCircle,
  RotateCcw,
} from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry, EnquiryStatus } from '../../types/enquiry';
import { formatDate, formatPhone } from '../../utils/formatters';
import { CreateEnquiryModal } from '../../components/admin/CreateEnquiryModal';

export const DashboardPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | EnquiryStatus>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadData = () => {
    setEnquiries(enquiryService.getAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === 'new').length;
  const inProgressCount = enquiries.filter(
    (e) => e.status === 'in_progress' || e.status === 'contacted'
  ).length;
  const completedCount = enquiries.filter((e) => e.status === 'completed').length;

  const handleStatusChange = (id: string, newStatus: EnquiryStatus) => {
    enquiryService.updateStatus(id, newStatus);
    loadData();
  };

  const filtered = enquiries.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.customer.name.toLowerCase().includes(query) ||
      item.customer.mobile.includes(query) ||
      item.bike.model.toLowerCase().includes(query) ||
      item.bike.brand.toLowerCase().includes(query) ||
      (item.bike.registrationNumber &&
        item.bike.registrationNumber.toLowerCase().includes(query));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-gray-900 tracking-tight font-sans">
            गॅरेज डॅशबोर्ड (Garage Dashboard)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            चौधरी ऑटो सेंटर, पाहूर • ग्राहक चौकशी, चालू कामे आणि वर्कशॉप आढावा
          </p>
        </div>

        {/* Big Friendly Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/garage/repair-history"
            className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center gap-1.5 border border-amber-300 transition-colors shadow-2xs"
          >
            <span>🏍️ + नवीन बिल / काम</span>
          </Link>

          <Link
            to="/garage/customers"
            className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center gap-1.5 border border-gray-300 transition-colors shadow-2xs"
          >
            <span>👥 + नवीन ग्राहक</span>
          </Link>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ नवीन चौकशी</span>
          </button>
        </div>
      </div>

      <CreateEnquiryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => loadData()}
      />

      {/* 4 Clickable Metric Cards that Filter the List */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="All Enquiries (एकूण)"
          count={totalCount}
          icon={Inbox}
          subtext="सर्व चौकशी यादी"
          colorTheme="yellow"
          onClick={() => setStatusFilter('all')}
        />
        <StatCard
          label="New Leads (नवीन)"
          count={newCount}
          icon={Sparkles}
          subtext="ग्राहकांनी पाठवलेले"
          colorTheme="blue"
          onClick={() => setStatusFilter('new')}
        />
        <StatCard
          label="Under Repair (काम सुरू)"
          count={inProgressCount}
          icon={Clock}
          subtext="गॅरेजमध्ये चालू कामे"
          colorTheme="amber"
          onClick={() => setStatusFilter('in_progress')}
        />
        <StatCard
          label="Completed (पूर्ण झाले)"
          count={completedCount}
          icon={CheckCircle2}
          subtext="गाडी ग्राहकाला दिली"
          colorTheme="emerald"
          onClick={() => setStatusFilter('completed')}
        />
      </div>

      {/* Main Container: Search, Filter Tabs & Bookings List */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        {/* Search & Status Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rider name, mobile, bike model..."
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

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
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
                onClick={() => setStatusFilter(tab.key as 'all' | EnquiryStatus)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border ${
                  statusFilter === tab.key
                    ? 'bg-[#F5B900] text-black border-[#F5B900]'
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
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 border border-gray-200 hover:bg-gray-100"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Requests Count Header */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>
            Showing <strong className="text-gray-900">{filtered.length}</strong> records
            {statusFilter !== 'all' && ` (filtered by ${statusFilter.replace('_', ' ')})`}
          </span>
        </div>

        {/* List Content */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Inbox className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm font-semibold text-gray-700">No records match your search.</p>
            <p className="text-xs text-gray-400 mt-0.5">Try adjusting the filter or search keywords.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 bg-gray-50/70">
                    <th className="py-3 px-3.5">Rider / Phone</th>
                    <th className="py-3 px-3.5">Bike Model</th>
                    <th className="py-3 px-3.5">Service Requested</th>
                    <th className="py-3 px-3.5">Preferred Slot</th>
                    <th className="py-3 px-3.5">Status</th>
                    <th className="py-3 px-3.5 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      {/* Rider & Phone */}
                      <td className="py-3.5 px-3.5">
                        <Link
                          to={`/garage/enquiries/${item.id}`}
                          className="font-bold text-gray-900 hover:text-[#DFA500] text-sm block leading-tight"
                        >
                          {item.customer.name}
                        </Link>
                        <span className="text-gray-500 font-mono text-[11px]">
                          {formatPhone(item.customer.mobile)}
                        </span>
                      </td>

                      {/* Bike */}
                      <td className="py-3.5 px-3.5">
                        <span className="font-semibold text-gray-900 block">
                          {item.bike.brand} {item.bike.model}
                        </span>
                        {item.bike.registrationNumber && (
                          <span className="text-gray-500 font-mono text-[10px] uppercase">
                            {item.bike.registrationNumber}
                          </span>
                        )}
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-3.5">
                        <span className="font-medium text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px]">
                          {item.service.serviceName}
                        </span>
                      </td>

                      {/* Preferred Slot */}
                      <td className="py-3.5 px-3.5 text-gray-600">
                        <span className="font-semibold text-gray-800 block">
                          {item.service.preferredDate ? formatDate(item.service.preferredDate) : 'Flexible'}
                        </span>
                        {item.service.preferredTime && (
                          <span className="text-[10px] text-gray-400">
                            {item.service.preferredTime}
                          </span>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-3.5">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value as EnquiryStatus)
                          }
                          className="text-xs font-bold uppercase rounded-md px-2 py-1 border border-gray-300 bg-white text-gray-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F5B900]"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions: Call, WhatsApp, View */}
                      <td className="py-3.5 px-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:+91${item.customer.mobile}`}
                            title="Call Customer"
                            className="p-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-[#F5B900] hover:text-black transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`https://wa.me/91${item.customer.mobile}?text=${encodeURIComponent(
                              `Hello ${item.customer.name}, this is Chaudhari Auto Centre, Pahur. We received your enquiry regarding your bike service. Please let us know when you would like to visit.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="WhatsApp Customer"
                            className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          <Link
                            to={`/garage/enquiries/${item.id}`}
                            title="View Full Details"
                            className="p-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
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

            {/* Mobile Card List (Single column, big touch targets) */}
            <div className="lg:hidden space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-3"
                >
                  {/* Top: Rider & Status */}
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        to={`/garage/enquiries/${item.id}`}
                        className="font-bold text-gray-900 text-sm block hover:text-[#DFA500]"
                      >
                        {item.customer.name}
                      </Link>
                      <span className="text-gray-500 font-mono text-xs">
                        {formatPhone(item.customer.mobile)}
                      </span>
                    </div>

                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value as EnquiryStatus)
                      }
                      className="text-[11px] font-bold uppercase rounded px-2 py-1 border border-gray-300 bg-white"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Bike & Service Info */}
                  <div className="p-2.5 rounded-lg bg-white border border-gray-200 text-xs space-y-1">
                    <div className="font-semibold text-gray-900">
                      {item.bike.brand} {item.bike.model}
                      {item.bike.registrationNumber && (
                        <span className="text-gray-500 font-mono text-[11px] ml-1.5">
                          ({item.bike.registrationNumber})
                        </span>
                      )}
                    </div>
                    <div className="text-amber-800 font-medium">{item.service.serviceName}</div>
                    {item.service.preferredDate && (
                      <div className="text-[11px] text-gray-500">
                        Slot: {formatDate(item.service.preferredDate)} ({item.service.preferredTime || 'Anytime'})
                      </div>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`tel:+91${item.customer.mobile}`}
                      className="flex-1 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 text-xs font-bold uppercase flex items-center justify-center gap-1.5 hover:bg-gray-100"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-600" />
                      <span>Call</span>
                    </a>

                    <a
                      href={`https://wa.me/91${item.customer.mobile}?text=${encodeURIComponent(
                        `Hello ${item.customer.name}, this is Chaudhari Auto Centre, Pahur. We received your enquiry regarding your bike service. Please let us know when you would like to visit.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold uppercase flex items-center justify-center gap-1.5 hover:bg-emerald-700"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <Link
                      to={`/garage/enquiries/${item.id}`}
                      className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
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
