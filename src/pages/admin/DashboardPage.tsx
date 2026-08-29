import React, { useState, useEffect } from 'react';
import {
  Receipt,
  Search,
  Phone,
  MessageCircle,
  Eye,
  PlusCircle,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Clock,
  RotateCcw,
  TrendingUp,
  Printer,
} from 'lucide-react';
import { repairService } from '../../services/repairService';
import { RepairRecord } from '../../types/customer';
import { formatPhone } from '../../utils/formatters';
import { CreateBillModal } from '../../components/admin/CreateBillModal';
import { CreateEnquiryModal } from '../../components/admin/CreateEnquiryModal';
import { ViewBillModal } from '../../components/admin/ViewBillModal';
import { getWhatsAppBillUrl } from './AdminRepairHistoryPage';
import { filterRecordByDate, DateFilterType } from '../../utils/dateFilters';
import { printInvoice } from '../../utils/printInvoice';

export const DashboardPage: React.FC = () => {
  const [repairs, setRepairs] = useState<RepairRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'Paid' | 'Pending'>('all');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');
  const [customDate, setCustomDate] = useState(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  });

  const [isCreateBillModalOpen, setIsCreateBillModalOpen] = useState(false);
  const [isCreateEnquiryModalOpen, setIsCreateEnquiryModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RepairRecord | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadData = async () => {
    const list = await repairService.getAll();
    setRepairs(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ─── Core Garage Stats ───
  const todayPaidRecords = repairs.filter(
    (r) => filterRecordByDate(r.repairDate || r.createdAt, 'today') && r.paymentStatus === 'Paid'
  );
  const todayRevenue = todayPaidRecords.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  const overallPaidRecords = repairs.filter((r) => r.paymentStatus === 'Paid');
  const overallRevenue = overallPaidRecords.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  const pendingRecords = repairs.filter((r) => r.paymentStatus === 'Pending');
  const pendingDueAmount = pendingRecords.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);
  const totalBillsCount = repairs.length;

  // ─── Filtered Billing Records ───
  const filtered = repairs.filter((r) => {
    const recDate = r.repairDate || r.createdAt;
    if (!filterRecordByDate(recDate, dateFilter, customDate)) return false;

    if (paymentFilter !== 'all' && r.paymentStatus !== paymentFilter) return false;

    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      r.customerName.toLowerCase().includes(q) ||
      r.customerMobile.includes(q) ||
      r.jobNumber.toLowerCase().includes(q) ||
      (r.bikeModel && r.bikeModel.toLowerCase().includes(q)) ||
      (r.bikeBrand && r.bikeBrand.toLowerCase().includes(q)) ||
      (r.registrationNumber && r.registrationNumber.toLowerCase().includes(q))
    );
  });

  const filteredPaidRecords = filtered.filter((r) => r.paymentStatus === 'Paid');
  const filteredRevenue = filteredPaidRecords.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  const dateFilterTabs: { key: DateFilterType; label: string }[] = [
    { key: 'all', label: 'All Time' },
    { key: 'today', label: 'Today' },
    { key: 'yesterday', label: 'Yesterday' },
    { key: 'this_week', label: 'This Week' },
    { key: 'this_month', label: 'This Month' },
    { key: 'custom', label: 'Custom Day' },
  ];

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-10 overflow-x-hidden">
      {/* Clean Top Action Bar */}
      <div className="flex items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-sm sm:text-base font-bold text-gray-900 truncate">
              Chaudhari Auto Centre
            </span>
            <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded shrink-0">
              Pahur
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
            Workshop Billing & Revenue Dashboard • Quick Customer Job Sheet Management
          </p>
        </div>

        {/* Action Buttons: Create Bill & New Enquiry */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsCreateBillModalOpen(true)}
            className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
          >
            <Receipt className="w-4 h-4" />
            <span>Create Bill</span>
          </button>

          <button
            onClick={() => setIsCreateEnquiryModalOpen(true)}
            className="px-3 sm:px-3.5 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-[#F5B900]" />
            <span className="hidden sm:inline">New Enquiry</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ─── 4 MAIN BILLING STATS (2 COLUMNS ON MOBILE, 4 ON DESKTOP) ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Stat 1: Today's Revenue */}
        <div className="p-3 sm:p-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1 pr-1">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-800 block truncate uppercase tracking-wider">
              Today's Revenue
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-950 block font-mono">
              ₹{todayRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold block truncate">
              {todayPaidRecords.length} paid today
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <IndianRupee className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 2: Overall Revenue (Lifetime Collections) */}
        <div className="p-3 sm:p-4 rounded-2xl border border-amber-200 bg-[#FFF9E6] shadow-xs flex items-center justify-between">
          <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1 pr-1">
            <span className="text-[11px] sm:text-xs font-bold text-amber-900 block truncate uppercase tracking-wider">
              Overall Revenue
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-950 block font-mono">
              ₹{overallRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] sm:text-[11px] text-amber-700 font-semibold block truncate">
              Lifetime ({overallPaidRecords.length} paid)
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 3: Total Invoices */}
        <button
          onClick={() => setPaymentFilter('all')}
          className={`p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs ${
            paymentFilter === 'all'
              ? 'bg-white border-gray-200 hover:border-gray-400'
              : 'bg-gray-50 border-gray-200 hover:bg-white'
          }`}
        >
          <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1 pr-1">
            <span className="text-[11px] sm:text-xs font-bold text-gray-600 block truncate uppercase tracking-wider">
              Total Invoices
            </span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 block font-mono">
              {totalBillsCount}
            </span>
            <span className="text-[10px] sm:text-[11px] text-gray-500 font-semibold block truncate">
              {overallPaidRecords.length} paid • {pendingRecords.length} pending
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
        </button>

        {/* Stat 4: Pending Dues */}
        <button
          onClick={() => setPaymentFilter(paymentFilter === 'Pending' ? 'all' : 'Pending')}
          className={`p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs ${
            paymentFilter === 'Pending'
              ? 'bg-red-50/80 border-red-500 ring-2 ring-red-500/50'
              : 'bg-white border-gray-200 hover:border-red-300'
          }`}
        >
          <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1 pr-1">
            <span className="text-[11px] sm:text-xs font-bold text-red-800 block truncate uppercase tracking-wider">
              Pending Dues
            </span>
            <span className="text-xl sm:text-2xl font-black text-red-950 block font-mono">
              ₹{pendingDueAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] sm:text-[11px] text-red-700 font-semibold block truncate">
              {pendingRecords.length} unpaid bill(s)
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-red-100 text-red-800 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* ─── BILLING HISTORY & INVOICES TABLE ─── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Header with Search & Filter Tabs */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by rider, phone, bill #, bike model, plate..."
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

            {/* Payment Filter (All, Paid, Pending) */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <span className="text-xs font-bold text-gray-500 mr-1 hidden sm:inline">Payment:</span>
              {(['all', 'Paid', 'Pending'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setPaymentFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    paymentFilter === status
                      ? 'bg-gray-900 text-white border-gray-900 shadow-2xs'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {status === 'all' ? 'All' : status}
                </button>
              ))}
            </div>
          </div>

          {/* Date Filter Tabs Bar (Today, Yesterday, This Week, This Month, Custom Day) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100 no-scrollbar">
            <span className="text-xs font-semibold text-gray-500 mr-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              Date:
            </span>
            {dateFilterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setDateFilter(tab.key)}
                className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border ${
                  dateFilter === tab.key
                    ? 'bg-[#F5B900] text-black border-[#F5B900] shadow-2xs font-extrabold'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {/* Inline Custom Date Picker */}
            {dateFilter === 'custom' && (
              <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 animate-fade-in">
                <span className="text-[11px] font-bold text-amber-900">Pick Date:</span>
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="text-xs bg-white border border-gray-300 rounded px-2 py-0.5 text-gray-900 focus:outline-none focus:border-[#F5B900]"
                />
              </div>
            )}

            {dateFilter !== 'all' && (
              <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 animate-fade-in">
                <span>Period Revenue:</span>
                <strong className="text-emerald-800 font-mono text-xs">
                  ₹{filteredRevenue.toLocaleString('en-IN')}
                </strong>
                <span className="text-[10px] text-amber-700 font-normal">
                  ({filteredPaidRecords.length} paid)
                </span>
              </span>
            )}

            {(dateFilter !== 'all' || paymentFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setDateFilter('all');
                  setPaymentFilter('all');
                  setSearchQuery('');
                }}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 ml-auto flex items-center gap-1 text-[11px]"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Billing Table or Empty State */}
        {filtered.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-xl space-y-2">
            <Receipt className="w-10 h-10 text-gray-300 mx-auto mb-1" />
            <p className="text-sm font-semibold text-gray-700">No Billing Records Found</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              No invoices match your selected filter. Click "+ Create Bill" to generate a new repair job card.
            </p>
            <button
              onClick={() => setIsCreateBillModalOpen(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>+ Create First Bill</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((rep) => (
              <div
                key={rep.id || rep.jobNumber}
                className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-amber-300 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRecord(rep);
                        setIsViewModalOpen(true);
                      }}
                      className="font-bold text-gray-900 hover:text-amber-700 text-sm flex items-center gap-1.5"
                    >
                      <Receipt className="w-4 h-4 text-[#DFA500]" />
                      <span>{rep.jobNumber}</span>
                    </button>

                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{rep.repairDate}</span>
                    </span>

                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rep.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {rep.paymentStatus === 'Paid' ? 'PAID' : 'PENDING'}
                    </span>

                    {rep.paymentMode && (
                      <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md border border-gray-200">
                        {rep.paymentMode}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block truncate">{rep.customerName}</span>
                      <span className="text-[11px] text-gray-500 font-mono">{formatPhone(rep.customerMobile)}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block truncate">{rep.bikeBrand} {rep.bikeModel}</span>
                      {rep.registrationNumber && (
                        <span className="text-[11px] font-mono uppercase text-gray-500 font-semibold">{rep.registrationNumber}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">Bill Total</span>
                    <span className="text-lg font-black text-gray-900 font-mono">₹{rep.totalAmount}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => printInvoice(rep)}
                      className="p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#FFF9E6] hover:border-amber-300 text-gray-700 transition-colors"
                      title="Print Invoice"
                    >
                      <Printer className="w-4 h-4 text-amber-700" />
                    </button>
                    <a
                      href={getWhatsAppBillUrl(rep)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-colors shadow-2xs"
                      title="WhatsApp Bill"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRecord(rep);
                        setIsViewModalOpen(true);
                      }}
                      className="p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href={`tel:+91${rep.customerMobile}`}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      title="Call Customer"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── MODALS ─── */}
      <CreateBillModal
        isOpen={isCreateBillModalOpen}
        onClose={() => setIsCreateBillModalOpen(false)}
        onSuccess={() => {
          loadData();
          setSuccessMsg('Repair Bill created and saved in records!');
          setTimeout(() => setSuccessMsg(null), 3000);
        }}
      />

      <CreateEnquiryModal
        isOpen={isCreateEnquiryModalOpen}
        onClose={() => setIsCreateEnquiryModalOpen(false)}
        onSuccess={() => {
          setSuccessMsg('New enquiry logged successfully!');
          setTimeout(() => setSuccessMsg(null), 3000);
        }}
      />

      <ViewBillModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        record={selectedRecord}
      />
    </div>
  );
};
