import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Users,
  Settings,
  Tag,
  LogOut,
  ExternalLink,
  ChevronRight,
  FileText,
  Package,
} from 'lucide-react';
import { authService } from '../../services/authService';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/garage/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/garage/dashboard', icon: LayoutDashboard },
    { name: 'Bike Repair History', path: '/garage/repair-history', icon: FileText },
    { name: 'Spare Parts Inventory', path: '/garage/parts', icon: Package },
    { name: 'Customer Directory', path: '/garage/customers', icon: Users },
    { name: 'Enquiries & Bookings', path: '/garage/enquiries', icon: Inbox },
    { name: 'Services & Pricing', path: '/garage/services', icon: Tag },
    { name: 'Garage Settings', path: '/garage/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* White Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/logo.png"
                alt="Chaudhari Auto Centre Logo"
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-tight text-gray-900 uppercase font-sans leading-tight">
                  CHAUDHARI AUTO
                </span>
                <span className="text-[9px] font-black tracking-[0.2em] text-[#DFA500] uppercase leading-tight">
                  PAHUR • PORTAL
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#F5B900] text-black shadow-xs font-black'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer Actions on Light Background */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/70 space-y-3">
          {/* User badge */}
          <div className="p-2.5 rounded-lg bg-white border border-gray-200 flex items-center gap-3 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-[#F5B900] text-black flex items-center justify-center font-black text-xs">
              CA
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-gray-900 truncate">
                {currentUser?.name || 'Chaudhari Auto Staff'}
              </span>
              <span className="text-[10px] text-[#DFA500] font-semibold truncate">
                Master Technician (Pahur)
              </span>
            </div>
          </div>

          {/* View Public Website */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-gray-600 hover:text-gray-900 hover:bg-white transition-colors border border-gray-200 bg-white"
          >
            <span className="font-semibold">Live Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#DFA500]" />
          </a>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 border border-red-200 transition-colors bg-white"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Portal</span>
          </button>
        </div>
      </aside>
    </>
  );
};
