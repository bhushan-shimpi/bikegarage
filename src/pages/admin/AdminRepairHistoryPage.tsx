import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  IndianRupee,
  Calendar,
  Trash2,
  Eye,
  Bike,
  FileText,
  TrendingUp,
  Phone,
  Filter,
  Receipt,
  RotateCcw,
  Printer,
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/common/WhatsAppIcon';
import { CreateBillModal } from '../../components/admin/CreateBillModal';
import { ViewBillModal } from '../../components/admin/ViewBillModal';
import { repairService } from '../../services/repairService';
import {
  RepairRecord,
  DailyRepairStats,
} from '../../types/customer';
import { formatPhone } from '../../utils/formatters';
import { filterRecordByDate, DateFilterType } from '../../utils/dateFilters';
import { printInvoice } from '../../utils/printInvoice';

export const getWhatsAppBillUrl = (record: RepairRecord): string => {
  const cleanMobile = record.customerMobile.replace(/\D/g, '').slice(-10);
  const partsList =
    record.partsReplaced && record.partsReplaced.length > 0
      ? record.partsReplaced.map((p) => `• ${p.name}: ₹${p.cost}`).join('\n')
      : '• No parts replaced';

  const partsTotal =
    record.partsTotal ||
    record.partsReplaced?.reduce((sum, p) => sum + (Number(p.cost) || 0), 0) ||
    0;
  const servicePriceStr =
    record.servicePrice && record.servicePrice > 0 ? `\n🏷️ *Base Service Rate:* ₹${record.servicePrice}` : '';
  const discountStr =
    record.discount && record.discount > 0 ? `\n🎁 *Overall Bill Discount:* -₹${record.discount}` : '';
  const paymentModeStr = record.paymentMode || 'Cash';

  const message = `🏍️ *CHAUDHARI AUTO CENTRE, PAHUR*
*Repair Invoice / Job Sheet: ${record.jobNumber}*
----------------------------------------
👤 *Customer:* ${record.customerName}
📱 *Phone:* ${record.customerMobile}
🛵 *Vehicle:* ${record.bikeBrand || ''} ${record.bikeModel || ''} ${
    record.registrationNumber ? `(${record.registrationNumber})` : ''
  }
📅 *Date:* ${record.repairDate}

🔧 *Service:* ${record.serviceType}${servicePriceStr}
${record.problemDetails ? `Note: ${record.problemDetails}` : ''}

📦 *Parts Replaced:*
${partsList}
*Parts Total:* ₹${partsTotal}

⚙️ *Labor Charges:* ₹${record.laborCharge}${discountStr}
----------------------------------------
💰 *FINAL AMOUNT:* ₹${record.totalAmount}
💳 *Payment Mode:* ${paymentModeStr}
📊 *Payment Status:* ${record.paymentStatus}
----------------------------------------
🙏 *Thank you for choosing Chaudhari Auto Centre!*
📍 Main Road, Near Bus Stand, Pahur, Jalgaon (MH)
📞 Helpline: +91 7387448878 / 9503853143`;

  return `https://wa.me/91${cleanMobile}?text=${encodeURIComponent(message)}`;
};

export const AdminRepairHistoryPage: React.FC = () => {
  const [repairs, setRepairs] = useState<RepairRecord[]>(() => repairService.getCached());
  const [stats, setStats] = useState<DailyRepairStats>(() => repairService.getCachedStats());

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'Paid' | 'Pending'>('all');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');
  const [customDate, setCustomDate] = useState(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  });
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RepairRecord | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const loadData = async () => {
    const [list, s] = await Promise.all([
      repairService.getAll({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: search || undefined,
      }),
      repairService.getDailyStats(),
    ]);
    setRepairs(list);
    setStats(s);
  };

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
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

  const filtered = repairs.filter((r) => {
    const recDate = r.repairDate || (r as any).createdAt;
    if (!filterRecordByDate(recDate, dateFilter, customDate)) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (paymentFilter !== 'all' && r.paymentStatus !== paymentFilter) return false;

    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      r.jobNumber.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.customerMobile.includes(q) ||
      (r.registrationNumber && r.registrationNumber.toLowerCase().includes(q)) ||
      (r.bikeModel && r.bikeModel.toLowerCase().includes(q)) ||
      (r.bikeBrand && r.bikeBrand.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex items-start sm:items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            <Receipt className="w-6 h-6 text-[#DFA500] shrink-0" />
            <span className="truncate">Billing & Invoices</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
            Workshop repair log, customer invoices, parts billing, and daily revenue tracker
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0 active:scale-95 cursor-pointer"
        >
          <Receipt className="w-4 h-4" />
          <span>Create Bill / Job Card</span>
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
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 block leading-tight">
              Today's Completed
            </span>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              {stats.todayCompletedCount}
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 block leading-tight">
              Today's Revenue
            </span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-700">
              ₹{stats.todayRevenue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 block leading-tight">
              In Workshop
            </span>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              {stats.inWorkshopCount}
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 block leading-tight">
              Total Lifetime
            </span>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              {stats.lifetimeRepairsCount}
            </span>
            <span className="text-xs text-emerald-700 font-semibold block">
              ₹{stats.lifetimeRevenue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* ─── SEARCH & FILTER BAR ─── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Job Number, customer, bike model, or MH 19..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
            />
          </form>

          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>Showing:</span>
            <strong className="text-gray-900">{filtered.length}</strong>
            <span>of {repairs.length} records</span>
          </div>
        </div>

        {/* Date Filter Tabs Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100 no-scrollbar">
          <span className="text-xs font-semibold text-gray-500 mr-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            Date:
          </span>
          {[
            { key: 'all', label: 'All Time' },
            { key: 'today', label: 'Today' },
            { key: 'yesterday', label: 'Yesterday' },
            { key: 'this_week', label: 'This Week' },
            { key: 'this_month', label: 'This Month' },
            { key: 'custom', label: 'Custom Day' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setDateFilter(tab.key as any)}
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

          {(dateFilter !== 'all' || statusFilter !== 'all' || paymentFilter !== 'all' || search) && (
            <button
              onClick={() => {
                setDateFilter('all');
                setStatusFilter('all');
                setPaymentFilter('all');
                setSearch('');
              }}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 ml-auto flex items-center gap-1 text-[11px]"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Status & Payment Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#DFA500]" />
            Status:
          </span>
          {['all', 'In Progress', 'Completed', 'Delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                statusFilter === st
                  ? 'bg-[#F5B900] text-black border-[#F5B900] shadow-2xs'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {st === 'all' ? 'All Jobs' : st}
            </button>
          ))}

          <span className="text-xs font-medium text-gray-500 ml-2 mr-1">Payment:</span>
          {['all', 'Paid', 'Pending'].map((pay) => (
            <button
              key={pay}
              onClick={() => setPaymentFilter(pay as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                paymentFilter === pay
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {pay === 'all' ? 'All' : pay}
            </button>
          ))}
        </div>
      </div>

      {/* ─── REPAIR RECORDS IN ROWS / TABLE ─── */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-gray-700">
            No Repair Records Found
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Click "+ Create Bill / Job Card" above to create a job card for a serviced motorcycle.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((rep) => (
            <div
              key={rep.id || rep.jobNumber}
              className="bg-white rounded-2xl border border-gray-200 hover:border-amber-300 p-4 sm:p-5 shadow-xs transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Left Column: Job Number, Date, Customer & Motorcycle info */}
              <div className="flex-1 min-w-0 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRecord(rep);
                      setIsViewModalOpen(true);
                    }}
                    className="font-bold text-gray-900 hover:text-amber-700 text-sm sm:text-base flex items-center gap-1.5 transition-colors"
                  >
                    <Receipt className="w-4 h-4 text-[#DFA500]" />
                    <span>{rep.jobNumber}</span>
                  </button>

                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{rep.repairDate}</span>
                  </span>

                  {/* Payment Status Badge */}
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

                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      rep.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rep.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {rep.status}
                  </span>
                </div>

                {/* Customer & Vehicle specs row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200">
                      {rep.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-gray-900 block truncate">
                        {rep.customerName}
                      </span>
                      <span className="text-[11px] text-gray-500 font-mono">
                        {formatPhone(rep.customerMobile)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-200">
                      <Bike className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-gray-900 block truncate">
                        {rep.bikeBrand} {rep.bikeModel}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono">
                        {rep.registrationNumber && (
                          <span className="uppercase font-semibold text-gray-700">
                            {rep.registrationNumber}
                          </span>
                        )}
                        {rep.currentKm && <span>• {rep.currentKm} KM</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Tag & Parts summary */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs">
                  <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-medium">
                    {rep.serviceType}
                  </span>
                  {rep.partsReplaced && rep.partsReplaced.length > 0 && (
                    <span className="text-gray-500 text-[11px]">
                      {rep.partsReplaced.length} part(s) replaced
                    </span>
                  )}
                  {rep.problemDetails && (
                    <span className="text-gray-400 text-[11px] truncate max-w-xs">
                      • {rep.problemDetails}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Grand Total & Action Buttons */}
              <div className="flex sm:flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100 shrink-0">
                <div className="text-left lg:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">
                    Invoice Total
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-gray-900 font-mono">
                    ₹{rep.totalAmount}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => printInvoice(rep)}
                    className="p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-[#FFF9E6] hover:border-amber-300 text-gray-700 transition-colors shadow-2xs"
                    title="Print Invoice Job Sheet"
                  >
                    <Printer className="w-4 h-4 text-amber-700" />
                  </button>

                  <a
                    href={getWhatsAppBillUrl(rep)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-colors shadow-2xs"
                    title="Send Bill via WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRecord(rep);
                      setIsViewModalOpen(true);
                    }}
                    className="p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors shadow-2xs"
                    title="View Job Sheet Details"
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

                  <button
                    type="button"
                    onClick={() => handleDelete(rep.id || rep.jobNumber, rep.jobNumber)}
                    className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── CREATE REPAIR BILL / JOB CARD MODAL ─── */}
      <CreateBillModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          loadData();
          setSuccessMsg('Repair Bill / Job Card created and saved successfully!');
          setTimeout(() => setSuccessMsg(null), 3000);
        }}
      />
      {/* ─── VIEW REPAIR BILL / JOB SHEET MODAL ─── */}
      <ViewBillModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedRecord(null);
        }}
        record={selectedRecord}
      />
    </div>
  );
};
