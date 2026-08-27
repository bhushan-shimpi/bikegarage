import React from 'react';
import { ServiceCard } from '../services/ServiceCard';
import { servicesData } from '../../data/servicesData';

export const ServicesOverview: React.FC = () => {
  return (
    <section className="py-16 bg-[#F8F9FA]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading with Yellow Accent */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-gray-900 font-sans">
            OUR SERVICES
          </h2>
          <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />
        </div>

        {/* 10 Services in 5-Column Grid matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {servicesData.slice(0, 10).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
