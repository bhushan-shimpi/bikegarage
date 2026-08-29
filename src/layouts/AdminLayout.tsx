import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { authService } from '../services/authService';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication & role-based route guard
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/garage/login');
      return;
    }

    // Role guard: Mechanic accounts only have access to permitted sections
    if (authService.isMechanic()) {
      const p = location.pathname;
      const currentUser = authService.getCurrentUser();
      const perms = currentUser?.permissions || ['billing'];

      const allowedPaths = ['/garage/billing', '/garage/repair-history', '/garage/restorations'];
      if (perms.includes('parts')) allowedPaths.push('/garage/parts');
      if (perms.includes('customers')) allowedPaths.push('/garage/customers');
      if (perms.includes('enquiries')) allowedPaths.push('/garage/enquiries');

      const isAllowed = allowedPaths.some((ap) => p.startsWith(ap));
      if (!isAllowed) {
        navigate('/garage/billing', { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-gray-900 flex font-sans antialiased">
      {/* White Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 overflow-y-auto max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
