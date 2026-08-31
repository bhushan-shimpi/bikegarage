import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, ArrowRight, X, Inbox } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { reminderService, ServiceReminder } from '../../services/reminderService';
import { repairService } from '../../services/repairService';
import { enquiryService } from '../../services/enquiryService';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  title?: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [overdueReminders, setOverdueReminders] = useState<ServiceReminder[]>([]);
  const [newEnquiriesCount, setNewEnquiriesCount] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadNotifs = () => {
    try {
      const allRepairs = repairService.getCached();
      const reminders = reminderService.calculateReminders(allRepairs);
      const overdue = reminders.filter((r) => r.status === 'overdue' || r.status === 'due_soon');
      setOverdueReminders(overdue);

      const allEnquiries = enquiryService.getAll();
      const newCount = allEnquiries.filter((e) => e.status === 'new').length;
      setNewEnquiriesCount(newCount);
    } catch {}
  };

  useEffect(() => {
    loadNotifs();

    window.addEventListener('chaudhari_repairs_updated', loadNotifs);
    window.addEventListener('chaudhari_reminders_updated', loadNotifs);
    window.addEventListener('chaudhari_enquiries_updated', loadNotifs);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('chaudhari_repairs_updated', loadNotifs);
      window.removeEventListener('chaudhari_reminders_updated', loadNotifs);
      window.removeEventListener('chaudhari_enquiries_updated', loadNotifs);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const totalAlerts = overdueReminders.length + (newEnquiriesCount > 0 ? 1 : 0);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 hover:text-black lg:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="font-extrabold text-gray-900 tracking-wide uppercase">Chaudhari Auto</span>
          <span className="text-gray-300">/</span>
          <span className="text-amber-700 font-medium">Garage Desk</span>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2.5">
        {/* Notifications & Reminders Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer relative ${
              isNotifOpen
                ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                : totalAlerts > 0
                ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
            title="Service Reminders & Notices"
          >
            <Bell className="w-4 h-4" />
            {totalAlerts > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-red-600 text-white animate-pulse">
                {totalAlerts}
              </span>
            )}
          </button>

          {/* Popup Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-4 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-black uppercase text-gray-900 font-sans tracking-wide">
                    Service Alerts & Notices
                  </span>
                </div>
                <button
                  onClick={() => setIsNotifOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Reminders List */}
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {overdueReminders.length === 0 && newEnquiriesCount === 0 ? (
                  <div className="py-6 text-center text-xs text-gray-500">
                    <p className="font-semibold text-gray-700">All Clear! 🎉</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">No overdue 3-month service reminders.</p>
                  </div>
                ) : (
                  <>
                    {newEnquiriesCount > 0 && (
                      <Link
                        to="/garage/enquiries"
                        onClick={() => setIsNotifOpen(false)}
                        className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-between hover:bg-blue-100/80 transition-colors block text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Inbox className="w-4 h-4 text-blue-700" />
                          <span className="font-bold text-blue-950">
                            {newEnquiriesCount} New Service Enquir{newEnquiriesCount === 1 ? 'y' : 'ies'}
                          </span>
                        </div>
                        <span className="text-[10px] text-blue-700 font-bold">View &rarr;</span>
                      </Link>
                    )}

                    {overdueReminders.slice(0, 4).map((rem) => (
                      <div
                        key={rem.id}
                        className="p-2.5 rounded-xl bg-gray-50 hover:bg-amber-50/60 border border-gray-200 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-gray-900 truncate">{rem.customerName}</span>
                            <span
                              className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${
                                rem.status === 'overdue' ? 'bg-red-100 text-red-900' : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {rem.daysDiff >= 0 ? `${rem.daysDiff}d Overdue` : `Due in ${Math.abs(rem.daysDiff)}d`}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 truncate">
                            {rem.bikeBrand} {rem.bikeModel} • Last: {rem.lastServiceDate}
                          </p>
                        </div>

                        <a
                          href={reminderService.getWhatsAppReminderUrl(rem)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => reminderService.markAsReminded(rem.id)}
                          className="p-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-colors shrink-0 shadow-2xs"
                          title="WhatsApp Reminder"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-gray-100">
                <Link
                  to="/garage/reminders"
                  onClick={() => setIsNotifOpen(false)}
                  className="w-full py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Open 3-Month Reminders Page ({overdueReminders.length})</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5B900]" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Live Workshop Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-xs font-medium text-gray-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden md:inline">Workshop:</span>
          <span className="text-emerald-700 font-bold">Pahur Active</span>
        </div>
      </div>
    </header>
  );
};

