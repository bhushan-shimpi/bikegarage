import React from 'react';
import { Menu } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  title?: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleSidebar,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 hover:text-black lg:hidden"
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
      <div className="flex items-center gap-3">

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
