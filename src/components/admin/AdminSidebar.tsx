import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Receipt,
  Sparkles,
  Tag,
  Users,
  ClipboardList,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { authService } from '../../services/authService';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const isMechanic = authService.isMechanic();

  const handleLogout = () => {
    authService.logout();
    navigate('/garage/login');
  };

  const permissions = currentUser?.permissions || ['billing'];

  interface NavSection {
    title: string;
    items: { name: string; path: string; icon: any }[];
  }

  const navSections: NavSection[] = isMechanic
    ? [
        {
          title: 'Workshop Access',
          items: [
            { name: 'Billing', path: '/garage/billing', icon: Receipt },
            ...(permissions.includes('customers')
              ? [{ name: 'Customers List', path: '/garage/customers', icon: Users }]
              : []),
            ...(permissions.includes('parts')
              ? [{ name: 'Spare Part Pricing', path: '/garage/parts', icon: Tag }]
              : []),
            ...(permissions.includes('enquiries')
              ? [{ name: 'Enquiries', path: '/garage/enquiries', icon: Inbox }]
              : []),
            { name: 'Restorations', path: '/garage/restorations', icon: Sparkles },
          ],
        },
      ]
    : [
        {
          title: 'Daily Operations',
          items: [
            { name: 'Dashboard', path: '/garage/dashboard', icon: LayoutDashboard },
            { name: 'Billing & Job Cards', path: '/garage/billing', icon: Receipt },
            { name: 'Customers Directory', path: '/garage/customers', icon: Users },
          ],
        },
        {
          title: 'Catalog & Inquiries',
          items: [
            { name: 'Spare Part Pricing', path: '/garage/parts', icon: Tag },
            { name: 'Services Table', path: '/garage/services', icon: ClipboardList },
            { name: 'Enquiries', path: '/garage/enquiries', icon: Inbox },
            { name: 'Restorations', path: '/garage/restorations', icon: Sparkles },
          ],
        },
        {
          title: 'System',
          items: [
            { name: 'Settings & Staff', path: '/garage/settings', icon: Settings },
          ],
        },
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
        <div className="flex flex-col h-full min-h-0">
          {/* Brand Header */}
          <div className="p-4 border-b border-gray-100 bg-white shrink-0">
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

          {/* Navigation Grouped Sections */}
          <nav className="p-3 space-y-3.5 overflow-y-auto flex-1">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <span className="px-3 text-[10px] font-black tracking-wider text-gray-400 uppercase block">
                  {section.title}
                </span>
                <div className="space-y-1 pt-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-[#F5B900] text-black shadow-xs font-black'
                              : 'text-gray-700 hover:text-black hover:bg-gray-100'
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Clean Footer Logout Action (User profile badge and Live website link removed) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/70">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-xs font-semibold text-gray-800 truncate">
              {currentUser?.name || currentUser?.username || 'Staff'}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 capitalize">
              {isMechanic ? 'Mechanic' : 'Super Admin'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors bg-white shadow-2xs active:scale-98"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Portal</span>
          </button>
        </div>
      </aside>
    </>
  );
};
