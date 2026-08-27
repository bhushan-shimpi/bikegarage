import React from 'react';
import { Menu, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  title: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleSidebar,
  title,
  subtitle,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 hover:text-black lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-gray-900 font-sans">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-gray-500 font-medium hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Quick Link to Public Enquiry Form */}
        <Link
          to="/inquiry"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F5B900] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#DFA500] shadow-xs transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Enquiry</span>
        </Link>

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
