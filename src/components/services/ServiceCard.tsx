import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Cpu,
  Droplets,
  Disc,
  BatteryCharging,
  CircleDot,
  Zap,
  Sparkle,
  Sparkles,
  PackageCheck,
  ArrowRight,
  Info,
} from 'lucide-react';
import { ServiceItem } from '../../types/service';
import { OptimizedImage } from '../common/OptimizedImage';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServiceCardProps {
  service: ServiceItem;
}

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Cpu,
  Droplets,
  Disc,
  BatteryCharging,
  CircleDot,
  Zap,
  Sparkle,
  Sparkles,
  PackageCheck,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const IconComponent = iconMap[service.iconName] || Wrench;

  const hasSpecialPackage = !!service.packageBreakdown && service.packageBreakdown.length > 0;

  return (
    <>
      <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#F5B900] hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
        <div>
          {/* Top Image */}
          <div
            onClick={() => setIsDetailOpen(true)}
            className="relative h-28 sm:h-44 w-full overflow-hidden bg-neutral-900 cursor-pointer"
            title="Click to view complete service details"
          >
            <OptimizedImage
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {service.isPopular && (
              <div className="absolute top-2 right-2 bg-[#F5B900] text-black font-extrabold text-[9px] sm:text-[10px] uppercase px-1.5 sm:px-2 py-0.5 rounded shadow">
                {hasSpecialPackage ? 'Full Package' : 'Popular'}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-2.5 sm:p-5">
            <div className="flex items-start gap-2 sm:gap-3 mb-1 sm:mb-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#F5B900] flex items-center justify-center text-[#F5B900] shrink-0 mt-0.5 group-hover:bg-[#F5B900] group-hover:text-black transition-colors">
                <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>

              <div className="min-w-0 flex-1">
                <h3
                  onClick={() => setIsDetailOpen(true)}
                  className="text-xs sm:text-base font-bold text-gray-900 group-hover:text-[#DFA500] transition-colors leading-tight line-clamp-2 cursor-pointer"
                >
                  {service.name}
                </h3>
                <span className="text-[10px] sm:text-xs font-extrabold text-[#DFA500] block mt-0.5">
                  {hasSpecialPackage
                    ? `Package: ${service.totalPackagePrice || service.priceStartingAt}`
                    : `From ${service.priceStartingAt}`}
                </span>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed line-clamp-2 mt-1 hidden sm:block">
              {service.shortDescription}
            </p>
          </div>
        </div>

        {/* Action CTA Buttons */}
        <div className="p-2.5 sm:p-5 pt-0 flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setIsDetailOpen(true)}
            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 sm:py-2 px-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[10px] sm:text-xs font-bold text-amber-950 transition-all cursor-pointer active:scale-95"
            title="View Details & Checkpoints"
          >
            <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700 shrink-0" />
            <span>Details</span>
          </button>

          <Link
            to={`/inquiry?service=${encodeURIComponent(service.name)}`}
            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 sm:py-2 px-2 rounded-lg bg-gray-900 text-white hover:bg-[#F5B900] hover:text-black transition-all text-[10px] sm:text-xs font-bold uppercase tracking-wider active:scale-95"
          >
            <span>Enquire</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </Link>
        </div>
      </div>

      {/* Service Detail Popup Modal */}
      <ServiceDetailModal
        service={service}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
};
