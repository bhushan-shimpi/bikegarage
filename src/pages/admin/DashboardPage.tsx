import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Receipt,
  Search,
  Phone,
  Eye,
  PlusCircle,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Clock,
  RotateCcw,
  TrendingUp,
  Printer,
  Wrench,
  Sparkles,
  Inbox,
  ArrowRight,
  ChevronRight,
  Plus,
  Bell,
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/common/WhatsAppIcon';
import { repairService } from '../../services/repairService';
import { enquiryService } from '../../services/enquiryService';
import { reminderService, ServiceReminder } from '../../services/reminderService';
import { RepairRecord } from '../../types/customer';
import { Enquiry, isRestorationEnquiry } from '../../types/enquiry';
import { formatPhone, formatDate } from '../../utils/formatters';
import { StatusBadge } from '../../components/common/StatusBadge';
import { CreateBillModal } from '../../components/admin/CreateBillModal';
import { CreateEnquiryModal } from '../../components/admin/CreateEnquiryModal';
import { CreateRestorationModal } from '../../components/admin/CreateRestorationModal';
import { ViewBillModal } from '../../components/admin/ViewBillModal';
import { EnquiryDetailsModal } from '../../components/admin/EnquiryDetailsModal';
import { getWhatsAppBillUrl } from './AdminRepairHistoryPage';
import { filterRecordByDate, DateFilterType } from '../../utils/dateFilters';
import { printInvoice } from '../../utils/printInvoice';

export const DashboardPage: React.FC = () => {
  const [repairs, setRepairs] = useState<RepairRecord[]>(() => repairService.getCached());
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [reminders, setReminders] = useState<ServiceReminder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'Paid' | 'Pending'>('all');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');
  const [customDate, setCustomDate] = useState(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  });

  // Modal states
  const [isCreateBillModalOpen, setIsCreateBillModalOpen] = useState(false);
  const [isCreateEnquiryModalOpen, setIsCreateEnquiryModalOpen] = useState(false);
  const [isCreateRestorationModalOpen, setIsCreateRestorationModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RepairRecord | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null);
  const [isEnquiryDetailsModalOpen, setIsEnquiryDetailsModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [billsList, enquiriesList] = await Promise.all([
        repairService.getAll(),
        enquiryService.syncWithBackend(false),
      ]);
      setRepairs(billsList);
      setEnquiries(enquiriesList);
      setReminders(reminderService.calculateReminders(billsList));
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('chaudhari_repairs_updated', handleUpdate);
    window.addEventListener('chaudhari_appointments_updated', handleUpdate);
    window.addEventListener('chaudhari_enquiries_updated', handleUpdate);
    window.addEventListener('chaudhari_reminders_updated', handleUpdate);

    return () => {
      window.removeEventListener('chaudhari_repairs_updated', handleUpdate);
      window.removeEventListener('chaudhari_appointments_updated', handleUpdate);
      window.removeEventListener('chaudhari_enquiries_updated', handleUpdate);
      window.removeEventListener('chaudhari_reminders_updated', handleUpdate);
    };
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

  // Top 10 Bills
  const top10Bills = filtered.slice(0, 10);

  const filteredPaidRecords = filtered.filter((r) => r.paymentStatus === 'Paid');
  const filteredRevenue = filteredPaidRecords.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  // Recent Service Enquiries (Exclude Restorations)
  const serviceEnquiries = enquiries.filter((e) => !isRestorationEnquiry(e));
  const top5Enquiries = serviceEnquiries.slice(0, 5);

  // Active Restorations
  const restorationEnquiries = enquiries.filter(isRestorationEnquiry);
  const top5Restorations = restorationEnquiries.slice(0, 5);

  const dateFilterTabs: { key: DateFilterType; label: string }[] = [
    { key: 'all', label: 'All Time' },
    { key: 'today', label: 'Today' },
    { key: 'yesterday', label: 'Yesterday' },
    { key: 'this_week', label: 'This Week' },
    { key: 'this_month', label: 'This Month' },
    { key: 'custom', label: 'Custom Day' },
  ];

  // 3-Month Periodic Service Reminders
  const overdueReminders = reminders.filter((r) => r.status === 'overdue' || r.status === 'due_soon');
  const reminderStats = reminderService.getStats(reminders);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 overflow-x-hidden">
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
            className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Receipt className="w-4 h-4" />
            <span>Create Bill</span>
          </button>

          <button
            onClick={() => setIsCreateEnquiryModalOpen(true)}
            className="px-3 sm:px-3.5 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#F5B900]" />
            <span className="hidden sm:inline">New Enquiry</span>
          </button>
        </div>
      </div>

      {/* ─── 3-MONTH SERVICE REMINDERS ALERT BANNER ─── */}
      {overdueReminders.length > 0 && (
        <div className="bg-gradient-to-r from-red-50/90 via-amber-50/80 to-white border border-red-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center justify-center shrink-0 shadow-2xs">
              <Bell className="w-5 h-5 text-red-700 animate-bounce" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-black uppercase text-red-950 font-sans tracking-tight">
                  3-Month Service Due Reminders
                </span>
                <span className="text-[10px] font-black bg-red-600 text-white px-2 py-0.5 rounded-full">
                  {reminderStats.overdue} Overdue • {reminderStats.dueSoon} Due Soon
                </span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong className="font-semibold text-gray-900">{overdueReminders.length} customer motorcycle{overdueReminders.length === 1 ? '' : 's'}</strong> completed 3 months since their last periodic service / engine oil change in Pahur.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
            <Link
              to="/garage/reminders"
              className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <span>Open Service Reminders ({overdueReminders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ─── 4 MAIN BILLING STATS (2 COLUMNS ON MOBILE, 4 ON DESKTOP) ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Stat 1: Today Collected */}
        <button
          onClick={() => {
            setDateFilter('today');
            setPaymentFilter('Paid');
          }}
          className={`p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs ${
            dateFilter === 'today' && paymentFilter === 'Paid'
              ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/50'
              : 'bg-white border-gray-200 hover:border-emerald-300'
          }`}
        >
          <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1 pr-1">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-800 block truncate uppercase tracking-wider">
              Today Collected
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-950 block font-mono">
              ₹{todayRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold block truncate">
              {todayPaidRecords.length} paid bill(s) today
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <IndianRupee className="w-5 h-5" />
          </div>
        </button>

        {/* Stat 2: Total Revenue */}
        <button
          onClick={() => {
            setDateFilter('all');
            setPaymentFilter('Paid');
          }}
          className={`p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs ${
            dateFilter === 'all' && paymentFilter === 'Paid'
              ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/50'
              : 'bg-white border-gray-200 hover:border-amber-300'
          }`}
        >
          <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1 pr-1">
            <span className="text-[11px] sm:text-xs font-bold text-amber-900 block truncate uppercase tracking-wider">
              Total Revenue
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-950 block font-mono">
              ₹{overallRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] sm:text-[11px] text-amber-800 font-semibold block truncate">
              {overallPaidRecords.length} paid invoices
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </button>

        {/* Stat 3: Total Invoices */}
        <button
          onClick={() => {
            setDateFilter('all');
            setPaymentFilter('all');
          }}
          className={`p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs ${
            paymentFilter === 'all' && dateFilter === 'all'
              ? 'bg-white border-gray-900 ring-2 ring-gray-900/20'
              : 'bg-white border-gray-200 hover:border-gray-400'
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

      {/* ─── SECTION 1: TOP 10 BILLS / INVOICES ─── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Header with Title, Search & Filter Tabs */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-600" />
                <h2 className="text-base sm:text-lg font-black text-gray-900 uppercase font-sans tracking-tight">
                  Recent Workshop Bills
                </h2>
                <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                  Top {top10Bills.length} of {filtered.length}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Showing the latest 10 repair invoices and customer job cards
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/garage/billing"
                className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>View All Invoices</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
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

          {/* Date Filter Tabs Bar */}
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

        {/* Top 10 Bills List or Empty State */}
        {top10Bills.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-xl space-y-2">
            <Receipt className="w-10 h-10 text-gray-300 mx-auto mb-1" />
            <p className="text-sm font-semibold text-gray-700">No Billing Records Found</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              No invoices match your selected filter. Click "+ Create Bill" to generate a new repair job card.
            </p>
            <button
              onClick={() => setIsCreateBillModalOpen(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>+ Create First Bill</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {top10Bills.map((rep) => (
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
                      className="font-bold text-gray-900 hover:text-amber-700 text-sm flex items-center gap-1.5 cursor-pointer"
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

                    {rep.mechanicName && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                        <Wrench className="w-2.5 h-2.5 text-purple-500" />
                        <span>{rep.mechanicName}</span>
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
                      className="p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#FFF9E6] hover:border-amber-300 text-gray-700 transition-colors cursor-pointer"
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
                      <WhatsAppIcon className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRecord(rep);
                        setIsViewModalOpen(true);
                      }}
                      className="p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
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

            {filtered.length > 10 && (
              <div className="pt-2 text-center">
                <Link
                  to="/garage/billing"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 text-xs font-bold transition-all shadow-2xs"
                >
                  <span>View Remaining {filtered.length - 10} Invoices</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── SECTION 2: 2 COLUMNS (ENQUIRIES & RESTORATIONS) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        
        {/* COLUMN 1: RECENT SERVICE ENQUIRIES */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Inbox className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-gray-900 uppercase font-sans tracking-tight">
                    Service Enquiries
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Online bookings & customer leads ({serviceEnquiries.length} total)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCreateEnquiryModalOpen(true)}
                  className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
                  title="Add New Enquiry"
                >
                  <Plus className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">Add</span>
                </button>
                <Link
                  to="/garage/enquiries"
                  className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {top5Enquiries.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-gray-200 rounded-xl space-y-1.5">
                <Inbox className="w-8 h-8 text-gray-300 mx-auto" />
                <p className="text-xs font-bold text-gray-700">No Pending Enquiries</p>
                <p className="text-[11px] text-gray-400">All customer enquiries are currently serviced.</p>
                <button
                  onClick={() => setIsCreateEnquiryModalOpen(true)}
                  className="mt-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Log New Enquiry</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {top5Enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50/40 border border-gray-200/80 hover:border-blue-200 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900 truncate">
                          {enq.customer.name}
                        </span>
                        <StatusBadge status={enq.status} />
                      </div>

                      <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-gray-500">
                        <span className="font-mono">{formatPhone(enq.customer.mobile)}</span>
                        <span>•</span>
                        <span className="text-gray-700 font-medium truncate">
                          {enq.bike.brand} {enq.bike.model}
                        </span>
                      </div>

                      <div className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{formatDate(enq.createdAt)}</span>
                        {enq.service?.preferredDate && (
                          <span className="text-amber-800 font-medium">
                            • Pref: {enq.service.preferredDate}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={`https://wa.me/91${enq.customer.mobile.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors"
                        title="WhatsApp Customer"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`tel:+91${enq.customer.mobile}`}
                        className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                        title="Call Customer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => {
                          setSelectedEnquiryId(enq.id);
                          setIsEnquiryDetailsModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2">
            <Link
              to="/garage/enquiries"
              className="w-full py-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Manage All {serviceEnquiries.length} Enquiries</span>
              <ArrowRight className="w-3 h-3 text-blue-600" />
            </Link>
          </div>
        </div>

        {/* COLUMN 2: ACTIVE BIKE RESTORATIONS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-gray-900 uppercase font-sans tracking-tight">
                    Bike Restorations
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Vintage & Complete Rebuilds ({restorationEnquiries.length} total)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCreateRestorationModalOpen(true)}
                  className="p-1.5 rounded-lg bg-[#FFF9E6] hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
                  title="Start New Restoration"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden sm:inline">New Project</span>
                </button>
                <Link
                  to="/garage/restorations"
                  className="text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {top5Restorations.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-gray-200 rounded-xl space-y-1.5">
                <Sparkles className="w-8 h-8 text-gray-300 mx-auto" />
                <p className="text-xs font-bold text-gray-700">No Active Restorations</p>
                <p className="text-[11px] text-gray-400">Log RX100, Splendor, Pulsar, or RD350 projects.</p>
                <button
                  onClick={() => setIsCreateRestorationModalOpen(true)}
                  className="mt-1 px-3 py-1.5 rounded-lg bg-[#FFF9E6] text-amber-900 border border-amber-300 hover:bg-amber-100 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-amber-700" />
                  <span>+ Start Restoration Job Sheet</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {top5Restorations.map((res) => (
                  <div
                    key={res.id}
                    className="p-3 rounded-xl bg-[#FFFDF7] hover:bg-[#FFF9E6] border border-amber-200/80 hover:border-amber-300 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-gray-900 truncate">
                          {res.bike.brand} {res.bike.model}
                        </span>
                        <StatusBadge status={res.status} />
                      </div>

                      <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-gray-600">
                        <span className="font-semibold text-gray-900">{res.customer.name}</span>
                        <span>•</span>
                        <span className="font-mono text-gray-500">{formatPhone(res.customer.mobile)}</span>
                        {res.customer.city && (
                          <>
                            <span>•</span>
                            <span className="text-gray-500 font-medium">{res.customer.city}</span>
                          </>
                        )}
                      </div>

                      <div className="text-[10px] text-gray-400 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span>{formatDate(res.createdAt)}</span>
                        </span>
                        <span className="text-neutral-500 truncate">
                          {res.service.serviceName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={`https://wa.me/91${res.customer.mobile.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors"
                        title="WhatsApp Customer"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`tel:+91${res.customer.mobile}`}
                        className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                        title="Call Customer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => {
                          setSelectedEnquiryId(res.id);
                          setIsEnquiryDetailsModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                        title="View Job Sheet"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2">
            <Link
              to="/garage/restorations"
              className="w-full py-2 rounded-xl bg-[#FFF9E6] hover:bg-amber-100 border border-amber-200 text-amber-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Manage All {restorationEnquiries.length} Restoration Projects</span>
              <ArrowRight className="w-3 h-3 text-amber-700" />
            </Link>
          </div>
        </div>

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
          loadData();
          setSuccessMsg('New enquiry logged successfully!');
          setTimeout(() => setSuccessMsg(null), 3000);
        }}
      />

      <CreateRestorationModal
        isOpen={isCreateRestorationModalOpen}
        onClose={() => setIsCreateRestorationModalOpen(false)}
        onSuccess={(msg) => {
          loadData();
          setSuccessMsg(msg || 'New bike restoration job sheet created!');
          setTimeout(() => setSuccessMsg(null), 3000);
        }}
      />

      <ViewBillModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        record={selectedRecord}
      />

      <EnquiryDetailsModal
        isOpen={isEnquiryDetailsModalOpen}
        enquiryId={selectedEnquiryId}
        onClose={() => {
          setIsEnquiryDetailsModalOpen(false);
          setSelectedEnquiryId(null);
        }}
        onUpdated={() => loadData()}
      />
    </div>
  );
};
