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
    if (pathname.includes('/garage/services')) return { title: 'Services & Pricing', subtitle: 'Set and edit two-wheeler service prices live' };
    if (pathname.includes('/garage/customers')) return { title: 'Customer Directory', subtitle: 'Registered vehicle owners & contact history' };
    if (pathname.includes('/garage/settings')) return { title: 'Garage Settings', subtitle: 'Workshop timings, helpline alerts & profile' };
    return { title: 'Workshop Dashboard', subtitle: 'Overview of inquiries, service requests & active vehicles' };
  };

  const { title, subtitle } = getHeaderTitle(location.pathname);

  // Check mock authentication
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/garage/login');
    }
  }, [navigate]);

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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
