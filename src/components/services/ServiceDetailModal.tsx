import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '../../types/service';
import { RestorationQuotationCards } from '../restoration/RestorationQuotationCards';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[92vh] border border-gray-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-neutral-900 via-gray-900 to-black text-white p-4 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#F5B900] text-black">
              Chaudhary Auto
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#F5B900]" />
              Pahur, Tal. Jamner, Dist. Jalgaon
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2 font-sans">
            <Sparkles className="w-5 h-5 text-[#F5B900] shrink-0" />
            <span>{service.name}</span>
          </h2>

          {service.marathiName && (
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {service.marathiName}
            </p>
          )}

          {/* Pricing & Duration Hero Strip */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold">
                Total Estimated Cost
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#F5B900]">
                {service.totalPackagePrice || service.priceStartingAt || '₹1,820/-'}
              </span>
            </div>

            {service.estimatedTime && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs font-semibold text-gray-200">
                <Clock className="w-4 h-4 text-[#F5B900]" />
                <span>Est. Time: {service.estimatedTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-gray-800 text-sm">
          {/* Intro Description */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5 text-xs sm:text-sm text-gray-800 leading-relaxed">
            <p className="font-semibold text-gray-900 mb-1">
              To improve your bike’s <span className="text-amber-900 font-bold">performance, mileage, and engine life</span>, we offer our specialized care package.
            </p>
            <p className="text-gray-600 text-xs">
              {service.fullDescription || service.shortDescription}
            </p>
          </div>

          {/* If Bike Restoration, show dedicated 100cc & 150cc quotation matrix */}
          {service.slug === 'bike-restoration' || service.id === 's10' ? (
            <div className="space-y-4 pt-1">
              <RestorationQuotationCards theme="light" />
              <div className="text-center pt-2">
                <Link
                  to="/services/bike-restoration"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black bg-[#F5B900] hover:bg-[#DFA500] px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <span>Open Full Restoration Details Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            service.packageBreakdown && service.packageBreakdown.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-2.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F5B900]" />
                  Materials & Service Charges
                </h3>

                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-gray-100/80 text-gray-700 font-bold border-b border-gray-200">
                      <tr>
                        <th className="py-2.5 px-3 sm:px-4">Service / Material</th>
                        <th className="py-2.5 px-3 sm:px-4 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {service.packageBreakdown.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-2 px-3 sm:px-4 font-medium text-gray-800">
                            {row.item}
                          </td>
                          <td className="py-2 px-3 sm:px-4 text-right font-mono font-bold text-gray-900">
                            {row.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-amber-50/80 border-t-2 border-amber-300 font-bold text-gray-900">
                      <tr>
                        <td className="py-2.5 px-3 sm:px-4 font-extrabold text-sm">
                          Total Estimated Cost
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-right font-mono text-base font-black text-amber-900">
                          {service.totalPackagePrice || '₹1,820/-'}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <p className="text-[11px] text-gray-500 italic mt-1.5">
                  *The cost of filters and any other required spare parts may be charged separately.
                </p>
              </div>
            )
          )}

          {/* Checklist: Premium Service Includes */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Premium Service Includes ({service.included.length} Checkpoints)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.included.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 border border-gray-200/80 text-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-gray-800 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits of Premium Servicing */}
          {service.benefits && service.benefits.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#DFA500]" />
                Benefits of Premium Servicing
              </h3>

              <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl border border-gray-200/80">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5B900] shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Note */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900 mb-0.5">⚠️ Important Note:</p>
              <p className="leading-relaxed text-amber-900/90">
                {service.importantNote ||
                  'If any additional spare part needs to be replaced during servicing, the cost will be added separately to the final bill. No additional work will be carried out without the customer’s prior approval.'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-3.5 sm:p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>

          <Link
            to={`/inquiry?service=${encodeURIComponent(service.name)}`}
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>Book Service</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};
