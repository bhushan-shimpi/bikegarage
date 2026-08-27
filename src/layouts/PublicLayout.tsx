import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const PublicLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white selection:bg-[#F5B900] selection:text-black max-w-full overflow-x-hidden">
      <Navbar />
      {/* Spacer to offset fixed navbar height — hero image intentionally bleeds behind transparent nav */}
      <div className="h-14 sm:h-16 shrink-0" />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
