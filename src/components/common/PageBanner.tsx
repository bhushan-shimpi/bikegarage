import React from 'react';
import { Link } from 'react-router-dom';

interface PageBannerProps {
  title: string;
  breadcrumb: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({ title, breadcrumb }) => {
  return (
    <div className="bg-[#0B0B0B] border-b border-[#222222] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white font-sans">
          {title}
        </h1>
        <div className="text-xs text-neutral-400 mt-1 font-medium flex items-center gap-1.5">
          <Link to="/" className="hover:text-[#F5B900] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#F5B900]">{breadcrumb}</span>
        </div>
      </div>
    </div>
  );
};
