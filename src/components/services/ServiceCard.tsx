import React from 'react';
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
} from 'lucide-react';
import { ServiceItem } from '../../types/service';
import { OptimizedImage } from '../common/OptimizedImage';

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
  const IconComponent = iconMap[service.iconName] || Wrench;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#F5B900] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Image */}
        <div className="relative h-28 sm:h-44 w-full overflow-hidden bg-neutral-900">
          <OptimizedImage
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {service.isPopular && (
            <div className="absolute top-2 right-2 bg-[#F5B900] text-black font-extrabold text-[9px] sm:text-[10px] uppercase px-1.5 sm:px-2 py-0.5 rounded shadow">
              Popular
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-2.5 sm:p-5">
          <div className="flex items-start gap-2 sm:gap-3 mb-1 sm:mb-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#F5B900] flex items-center justify-center text-[#F5B900] shrink-0 mt-0.5 group-hover:bg-[#F5B900] group-hover:text-black transition-colors">
              <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>

            <div>
              <h3 className="text-xs sm:text-base font-bold text-gray-900 group-hover:text-[#DFA500] transition-colors leading-tight line-clamp-2">
                {service.name}
              </h3>
              <span className="text-[10px] sm:text-xs font-extrabold text-[#DFA500] block mt-0.5">
                From {service.priceStartingAt}
              </span>
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed line-clamp-2 mt-1 hidden sm:block">
            {service.shortDescription}
          </p>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="p-2.5 sm:p-5 pt-0">
        <Link
          to={`/inquiry?service=${encodeURIComponent(service.name)}`}
          className="w-full inline-flex items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg bg-gray-50 border border-gray-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-800 hover:bg-[#F5B900] hover:text-black hover:border-[#F5B900] transition-all"
        >
          <span>Enquire</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </Link>
      </div>
    </div>
  );
};
