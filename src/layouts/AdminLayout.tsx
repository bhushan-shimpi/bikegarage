import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { authService } from '../services/authService';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Route title mapper
  const getHeaderTitle = (pathname: string) => {
    if (pathname.includes('/garage/enquiries/')) return { title: 'Enquiry Details', subtitle: 'View customer problem, vehicle specs & update status' };
    if (pathname.includes('/garage/enquiries')) return { title: 'Garage Enquiries', subtitle: 'Manage customer service inquiries & vehicle leads' };
    if (pathname.includes('/garage/billing') || pathname.includes('/garage/repair-history')) return { title: 'Billing & Job Cards', subtitle: 'Customer invoices, repair logs & workshop billing records' };
    if (pathname.includes('/garage/restorations')) return { title: 'Bike Restorations', subtitle: 'Vintage & classic bike restoration requests' };
    if (pathname.includes('/garage/parts')) return { title: 'Spare Part Pricing', subtitle: 'Standard spare parts price list & rates' };
    if (pathname.includes('/garage/customers')) return { title: 'Customers List', subtitle: 'Registered vehicle owners & service history' };
    if (pathname.includes('/garage/services')) return { title: 'Services Table', subtitle: 'Two-wheeler service menu, pricing & packages' };
    if (pathname.includes('/garage/settings')) return { title: 'Garage Settings', subtitle: 'Workshop timings, helpline alerts & profile' };
    return { title: 'Workshop Dashboard', subtitle: 'Overview of inquiries, service requests & active vehicles' };
  };

  const { title, subtitle } = getHeaderTitle(location.pathname);

  // Check authentication & role-based route guard
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/garage/login');
      return;
    }

    // Role guard: Mechanic accounts only have access to Billing & Job Cards
    if (authService.isMechanic()) {
      const p = location.pathname;
      if (!p.includes('/garage/billing') && !p.includes('/garage/repair-history')) {
        navigate('/garage/billing', { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-gray-900 flex">
      {/* White Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title={title}
          subtitle={subtitle}
        />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 overflow-y-auto max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
