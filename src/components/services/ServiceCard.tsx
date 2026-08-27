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
    <Link
      to={`/inquiry?service=${encodeURIComponent(service.name)}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#F5B900] hover:shadow-md transition-all duration-200 flex flex-col"
    >
      {/* Top Image with fast loading & graceful fallback */}
      <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-gray-100">
        <OptimizedImage
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex items-start gap-3">
        {/* Yellow circle icon */}
        <div className="w-8 h-8 rounded-full border border-[#F5B900] flex items-center justify-center text-[#F5B900] shrink-0 mt-0.5 group-hover:bg-[#F5B900] group-hover:text-black transition-colors">
          <IconComponent className="w-4 h-4" />
        </div>

        <div>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#DFA500] transition-colors leading-tight">
            {service.name}
          </h3>
          <p className="text-[11px] text-gray-500 mt-1 leading-snug">
            {service.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
};
