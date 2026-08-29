import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { PageBanner } from '../../components/common/PageBanner';
import { ServiceCard } from '../../components/services/ServiceCard';
import { ServiceDetailModal } from '../../components/services/ServiceDetailModal';
import { bikeServicesService } from '../../services/bikeServicesService';
import { HelpCircle, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { ScrollReveal } from '../../components/common/ScrollReveal';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState(bikeServicesService.getAll());
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

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

  const premiumPackage = services.find(
    (s) => s.id === 's2' || s.slug === 'premium-bike-service'
  );

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Bike Services & Pricing — Chaudhary Auto Pahur',
    description:
      'Complete catalog of motorcycle maintenance, engine repair, oil replacement, and bike restoration services in Pahur, Jamner, Jalgaon.',
    itemListElement: services.map((s, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        description: s.shortDescription,
        provider: {
          '@type': 'MotorcycleRepairShop',
          name: 'Chaudhary Auto',
        },
      },
    })),
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen flex flex-col justify-between">
      <SEO
        title="Bike Services & Pricing in Pahur, Jamner"
        description="Explore Chaudhary Auto's comprehensive two-wheeler service packages in Pahur, Jalgaon: General Service, Premium Package (₹1,820), Engine Overhaul, Oil Change, and Brake Service."
        canonicalPath="/services"
        jsonLd={servicesSchema}
      />
      <div>
        {/* Top Dark Banner */}
        <PageBanner title="OUR BIKE SERVICES & PRICING" breadcrumb="Services" />

        {/* Featured Premium Bike Servicing Package Banner */}
        {premiumPackage && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-8 sm:pt-10">
            <div className="bg-gradient-to-br from-neutral-950 via-gray-900 to-neutral-900 border-2 border-[#F5B900]/70 rounded-2xl p-4 sm:p-7 shadow-xl text-white relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#F5B900]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[#F5B900] text-black flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Special Workshop Package
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-300 font-medium">
                      <MapPin className="w-3 h-3 text-[#F5B900]" />
                      Pahur, Tal. Jamner, Dist. Jalgaon
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    {premiumPackage.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    To improve your bike’s <strong className="text-[#F5B900]">performance, mileage, and engine life</strong>. Includes 12-point inspection, fresh engine oil, engine flush, oil additive & chain overhaul.
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-gray-300">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      12 Quality Checkpoints
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      Engine Flush & Additive Included
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      Prior Customer Approval on Extra Spares
                    </span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10 shrink-0">
                  <div className="lg:text-right">
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold">
                      Total Estimated Cost
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#F5B900]">
                      {premiumPackage.totalPackagePrice || '₹1,820/-'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsPremiumModalOpen(true)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      View Breakdown
                    </button>
                    <Link
                      to={`/inquiry?service=${encodeURIComponent(premiumPackage.name)}`}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-black uppercase tracking-wider shadow-sm transition-all active:scale-95 text-center"
                    >
                      Book Package
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Featured Package */}
        <ServiceDetailModal
          service={premiumPackage || null}
          isOpen={isPremiumModalOpen}
          onClose={() => setIsPremiumModalOpen(false)}
        />

        {/* 12 Services Grid — 2 columns on mobile */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {services.map((service, idx) => (
              <ScrollReveal key={service.id} direction="up" delay={(idx % 4) * 80}>
                <ServiceCard service={service} />
              </ScrollReveal>
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
