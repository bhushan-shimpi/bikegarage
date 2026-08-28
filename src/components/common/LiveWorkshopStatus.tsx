import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export const LiveWorkshopStatus: React.FC = () => {
  // Check if current Indian Standard Time is between 9:00 AM and 8:30 PM
  const isCurrentlyOpen = (() => {
    try {
      const now = new Date();
      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const timeInMinutes = hours * 60 + minutes;
      // 9:00 AM = 540, 8:30 PM = 1230
      return timeInMinutes >= 540 && timeInMinutes <= 1230;
    } catch {
      return true;
    }
  })();

  return (
    <div className="w-full bg-[#0E0E0E] border-b border-[#222222] text-xs text-neutral-300 py-1.5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        {/* Left: Live status with animated radar pulse */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCurrentlyOpen ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isCurrentlyOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          </span>
          <span className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-white">
            {isCurrentlyOpen ? 'LIVE: WORKSHOP OPEN NOW' : 'LIVE: APPOINTMENTS OPEN'}
          </span>
          <span className="hidden sm:inline text-neutral-500">•</span>
          <span className="hidden sm:inline text-[11px] text-neutral-400">
            Pahur Workshop Bays Active (Mon–Sun 9:00 AM – 8:30 PM)
          </span>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <a
            href="tel:+919822000000"
            className="flex items-center gap-1 text-[#F5B900] hover:text-[#E5AC00] font-bold transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span className="hidden xs:inline">Direct Desk:</span>
            <span>+91 98220 00000</span>
          </a>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <span className="text-neutral-400 hidden md:inline flex items-center gap-1">
            <MapPin className="w-3 h-3 text-neutral-500" />
            Pahur, Maharashtra
          </span>
        </div>
      </div>
    </div>
  );
};
