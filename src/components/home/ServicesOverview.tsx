import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ServiceCard } from '../services/ServiceCard';
import { bikeServicesService } from '../../services/bikeServicesService';

export const ServicesOverview: React.FC = () => {
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
    <section className="py-14 sm:py-20 bg-[#F8F9FA]" id="services">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Centered Heading with Yellow Accent */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Professional Motorcycle Care
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-gray-900 font-sans mt-1">
            OUR TWO-WHEELER SERVICES
          </h2>
          <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mt-2.5">
            From daily commuter tune-ups to superbike diagnostics and classic 2-stroke restorations — expert care for every bike.
          </p>
        </div>

        {/* 12 Services Grid — 2 columns on mobile device */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Bottom Booking CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0B0B0B] text-white hover:bg-[#F5B900] hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <span>Book A Service Slot</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
