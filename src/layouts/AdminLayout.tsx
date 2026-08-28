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
    if (pathname.includes('/garage/appointments')) return { title: 'Appointments', subtitle: 'Scheduled service bookings & visits' };
    if (pathname.includes('/garage/repair-history')) return { title: 'Bike History', subtitle: 'Repair logs, job cards & customer bills' };
    if (pathname.includes('/garage/restorations')) return { title: 'Bike Restorations', subtitle: 'Vintage & classic bike restoration requests' };
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
        <main className="flex-1 p-3 sm:p-6 lg:p-8 overflow-y-auto max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
