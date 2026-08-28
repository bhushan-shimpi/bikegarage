import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ServiceCard } from '../services/ServiceCard';
import { bikeServicesService } from '../../services/bikeServicesService';
import { ScrollReveal } from '../common/ScrollReveal';

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
        <ScrollReveal direction="up">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Professional Motorcycle Care
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-gray-900 font-sans mt-1">
              OUR MOTORCYCLE & BIKE SERVICES
            </h2>
            <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mt-2.5">
              From everyday commuter bikes like Hero, Honda, Bajaj, Yamaha, and KTM to classic 2-stroke restorations — expert care for motorcycles only (No Scooters / Mopeds).
            </p>
          </div>
        </ScrollReveal>

        {/* 12 Services Grid — 2 columns on mobile device */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service, idx) => (
            <ScrollReveal key={service.id} direction="up" delay={(idx % 4) * 80}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Booking CTA */}
        <ScrollReveal direction="up" delay={200}>
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0B0B0B] text-white hover:bg-[#F5B900] hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <span>Book A Service Slot</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
