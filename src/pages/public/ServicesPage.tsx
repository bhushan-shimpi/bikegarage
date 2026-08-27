import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageBanner } from '../../components/common/PageBanner';
import { ServiceCard } from '../../components/services/ServiceCard';
import { bikeServicesService } from '../../services/bikeServicesService';
import { HelpCircle } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState(bikeServicesService.getAll());

  useEffect(() => {
    const handleUpdate = () => {
      setServices(bikeServicesService.getAll());
    };
    window.addEventListener('chaudhari_services_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('chaudhari_services_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <div className="bg-[#F8F9FA] min-h-screen flex flex-col justify-between">
      <div>
        {/* Top Dark Banner */}
        <PageBanner title="OUR BIKE SERVICES & PRICING" breadcrumb="Services" />

        {/* 12 Services Grid — 2 columns on mobile */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Yellow Banner */}
      <div className="bg-[#F5B900] text-black py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-black/10 flex items-center justify-center text-black shrink-0">
              <HelpCircle className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-black uppercase text-black font-sans">
                Looking for a custom repair or restoration estimate?
              </h3>
              <p className="text-xs font-semibold text-black/80">
                Our experts in Pahur are ready to assist you with transparent rates and genuine spares.
              </p>
            </div>
          </div>

          <Link to="/inquiry">
            <button className="px-5 py-2.5 rounded-md bg-black hover:bg-neutral-900 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95">
              Send Enquiry / Book
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
