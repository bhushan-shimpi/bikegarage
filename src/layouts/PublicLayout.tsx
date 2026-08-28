import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { LiveFloatingHelp } from '../components/common/LiveFloatingHelp';
import { MobileActionBar } from '../components/common/MobileActionBar';
import { LiveWorkshopStatus } from '../components/common/LiveWorkshopStatus';

export const PublicLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white selection:bg-[#F5B900] selection:text-black max-w-full overflow-x-hidden">
      <Navbar />
      {/* Spacer to offset fixed navbar height */}
      <div className="h-14 sm:h-16 shrink-0" />
      {/* Live Workshop Status Bar on all inner pages */}
      {pathname !== '/' && <LiveWorkshopStatus />}
      <main className="flex-1 pb-16 sm:pb-0">
        <Outlet />
      </main>
      <Footer />
      {/* Live interactive floating help on all pages */}
      <LiveFloatingHelp />
      {/* Mobile action bar for quick booking and WhatsApp */}
      <MobileActionBar />
    </div>
  );
};
