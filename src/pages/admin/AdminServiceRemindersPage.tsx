import React, { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  Phone,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Bike,
  Eye,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/common/WhatsAppIcon';
import { repairService } from '../../services/repairService';
import { reminderService, ServiceReminder } from '../../services/reminderService';
import { RepairRecord } from '../../types/customer';
import { formatPhone, formatDate } from '../../utils/formatters';
import { CreateBillModal } from '../../components/admin/CreateBillModal';
import { ViewBillModal } from '../../components/admin/ViewBillModal';

export const AdminServiceRemindersPage: React.FC = () => {
  const [repairs, setRepairs] = useState<RepairRecord[]>(() => repairService.getCached());
  const [reminders, setReminders] = useState<ServiceReminder[]>([]);
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState<'all_due' | 'overdue' | 'due_soon' | 'upcoming' | 'all'>('all_due');
  const [isCreateBillModalOpen, setIsCreateBillModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RepairRecord | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadData = async () => {
    const list = await repairService.getAll();
    setRepairs(list);
    const calculated = reminderService.calculateReminders(list);
    setReminders(calculated);
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('chaudhari_repairs_updated', handleUpdate);
    window.addEventListener('chaudhari_reminders_updated', handleUpdate);

    return () => {
      window.removeEventListener('chaudhari_repairs_updated', handleUpdate);
      window.removeEventListener('chaudhari_reminders_updated', handleUpdate);
    };
  }, []);

  const stats = reminderService.getStats(reminders);

  const handleSendWhatsApp = (rem: ServiceReminder) => {
    const url = reminderService.getWhatsAppReminderUrl(rem);
    window.open(url, '_blank');
    reminderService.markAsReminded(rem.id);
    setSuccessMsg(`WhatsApp reminder sent to ${rem.customerName} (${rem.bikeBrand} ${rem.bikeModel})!`);
    setTimeout(() => setSuccessMsg(null), 3500);
    // Reload local list to update lastRemindedAt
    setReminders(reminderService.calculateReminders(repairs));
  };

  const filtered = reminders.filter((rem) => {
    if (statusTab === 'all_due') {
      if (rem.status !== 'overdue' && rem.status !== 'due_soon') return false;
    } else if (statusTab === 'overdue') {
      if (rem.status !== 'overdue') return false;
    } else if (statusTab === 'due_soon') {
      if (rem.status !== 'due_soon') return false;
    } else if (statusTab === 'upcoming') {
      if (rem.status !== 'upcoming') return false;
    }

    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      rem.customerName.toLowerCase().includes(q) ||
      rem.customerMobile.includes(q) ||
      rem.bikeModel.toLowerCase().includes(q) ||
      rem.bikeBrand.toLowerCase().includes(q) ||
      (rem.registrationNumber && rem.registrationNumber.toLowerCase().includes(q)) ||
      rem.lastServiceJobNumber.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 overflow-x-hidden">
      {/* ─── TOP ACTION BAR ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-gray-900 uppercase font-sans tracking-tight">
                3-Month Service Reminders
              </h1>
              <p className="text-xs text-gray-500">
                Automated 90-day periodic maintenance & oil change tracking for serviced motorcycles
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
          <button
            onClick={() => loadData()}
            className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors flex items-center justify-center cursor-pointer"
            title="Refresh Reminders"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsCreateBillModalOpen(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Bill</span>
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

      {/* ─── 4 STAT CARDS ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Stat 1: Overdue */}
        <button
          onClick={() => setStatusTab('overdue')}
          className={`p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs cursor-pointer ${
            statusTab === 'overdue'
              ? 'bg-red-50/90 border-red-500 ring-2 ring-red-500/50'
              : 'bg-white border-gray-200 hover:border-red-300'
          }`}
        >
          <div className="space-y-0.5 min-w-0 flex-1 pr-1">
            <span className="text-[11px] sm:text-xs font-bold text-red-800 block truncate uppercase tracking-wider">
              Overdue (3+ Mos)
            </span>
            <span className="text-xl sm:text-2xl font-black text-red-950 block font-mono">
              {stats.overdue}
            </span>
            <span className="text-[10px] sm:text-[11px] text-red-700 font-semibold block truncate">
              Immediate attention
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-red-100 text-red-800 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </button>

        {/* Stat 2: Due This Week */}
        <button
          onClick={() => setStatusTab('due_soon')}
          className={`p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs cursor-pointer ${
            statusTab === 'due_soon'
              ? 'bg-amber-50/90 border-amber-500 ring-2 ring-amber-500/50'
              : 'bg-white border-gray-200 hover:border-amber-300'
          }`}
        >
          <div className="space-y-0.5 min-w-0 flex-1 pr-1">
            <span className="text-[11px] sm:text-xs font-bold text-amber-900 block truncate uppercase tracking-wider">
              Due This Week
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-950 block font-mono">
              {stats.dueSoon}
            </span>
            <span className="text-[10px] sm:text-[11px] text-amber-800 font-semibold block truncate">
              Due in 0-7 days
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </button>

        {/* Stat 3: Upcoming (30 Days) */}
        <button
          onClick={() => setStatusTab('upcoming')}
          className={`p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs cursor-pointer ${
            statusTab === 'upcoming'
              ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/50'
              : 'bg-white border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="space-y-0.5 min-w-0 flex-1 pr-1">
            <span className="text-[11px] sm:text-xs font-bold text-blue-800 block truncate uppercase tracking-wider">
              Upcoming (30d)
            </span>
            <span className="text-xl sm:text-2xl font-black text-blue-950 block font-mono">
              {stats.upcoming}
            </span>
            <span className="text-[10px] sm:text-[11px] text-blue-700 font-semibold block truncate">
              Due in 8-30 days
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
        </button>

        {/* Stat 4: Total Tracked */}
        <button
          onClick={() => setStatusTab('all')}
          className={`p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs cursor-pointer ${
            statusTab === 'all'
              ? 'bg-gray-100 border-gray-900 ring-2 ring-gray-900/20'
              : 'bg-white border-gray-200 hover:border-gray-400'
          }`}
        >
          <div className="space-y-0.5 min-w-0 flex-1 pr-1">
            <span className="text-[11px] sm:text-xs font-bold text-gray-700 block truncate uppercase tracking-wider">
              Active Vehicles
            </span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 block font-mono">
              {stats.total}
            </span>
            <span className="text-[10px] sm:text-[11px] text-gray-500 font-semibold block truncate">
              Total serviced bikes
            </span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center shrink-0">
            <Bike className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* ─── REMINDERS LIST CONTAINER ─── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search & Status Filter Tabs */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search rider, mobile, bike model, plate #, bill #..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { key: 'all_due', label: `All Due (${stats.overdue + stats.dueSoon})` },
                { key: 'overdue', label: `Overdue (${stats.overdue})` },
                { key: 'due_soon', label: `Due Soon (${stats.dueSoon})` },
                { key: 'upcoming', label: `Upcoming (${stats.upcoming})` },
                { key: 'all', label: `All (${stats.total})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setStatusTab(tab.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                    statusTab === tab.key
                      ? 'bg-gray-900 text-white border-gray-900 shadow-2xs'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reminders List / Empty State */}
        {filtered.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-xl space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-1" />
            <p className="text-sm font-semibold text-gray-700">No Service Reminders Found</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              All serviced motorcycles are within their regular 3-month maintenance interval.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((rem) => (
              <div
                key={rem.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs ${
                  rem.status === 'overdue'
                    ? 'bg-[#FFFBFB] border-red-200 hover:border-red-400'
                    : rem.status === 'due_soon'
                    ? 'bg-[#FFFDF7] border-amber-200 hover:border-amber-400'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                        rem.status === 'overdue'
                          ? 'bg-red-100 text-red-900 border border-red-300'
                          : rem.status === 'due_soon'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : rem.status === 'upcoming'
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {rem.status === 'overdue' && <AlertTriangle className="w-3 h-3 text-red-700" />}
                      {rem.status === 'due_soon' && <Clock className="w-3 h-3 text-amber-700" />}
                      <span>{rem.statusLabel}</span>
                    </span>

                    <span className="text-xs text-gray-500 font-medium">
                      Due: <strong className="text-gray-900">{rem.nextServiceDueDate}</strong>
                    </span>

                    {rem.reminderCount > 0 && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
                        Reminded {rem.reminderCount}x {rem.lastRemindedAt && `(${formatDate(rem.lastRemindedAt)})`}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block truncate">{rem.customerName}</span>
                      <span className="text-[11px] text-gray-500 font-mono">{formatPhone(rem.customerMobile)}</span>
                    </div>

                    <div>
                      <span className="font-bold text-gray-900 block truncate">
                        {rem.bikeBrand} {rem.bikeModel}
                      </span>
                      {rem.registrationNumber && (
                        <span className="text-[11px] font-mono uppercase text-amber-900 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          {rem.registrationNumber}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-gray-500">
                      <span>Last Serviced: <strong>{rem.lastServiceDate}</strong></span>
                      <span className="block text-[10px] text-gray-400">
                        Job: {rem.lastServiceJobNumber} (₹{rem.lastServiceTotal})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between md:justify-end gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 shrink-0">
                  {/* WhatsApp Reminder Button */}
                  <button
                    onClick={() => handleSendWhatsApp(rem)}
                    className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                    title="Send 3-Month Service Reminder via WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>WhatsApp Reminder</span>
                  </button>

                  <a
                    href={`tel:+91${rem.customerMobile}`}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    title="Call Customer"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRecord(rem.rawRecord);
                      setIsViewModalOpen(true);
                    }}
                    className="p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                    title="View Last Invoice"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
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

      <ViewBillModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        record={selectedRecord}
      />
    </div>
  );
};
