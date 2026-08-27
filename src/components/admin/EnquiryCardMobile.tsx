import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Eye, Calendar, Bike, Wrench } from 'lucide-react';
import { Enquiry } from '../../types/enquiry';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate, formatPhone } from '../../utils/formatters';

interface EnquiryCardMobileProps {
  enquiry: Enquiry;
}

export const EnquiryCardMobile: React.FC<EnquiryCardMobileProps> = ({ enquiry }) => {
  return (
    <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-3.5 shadow-xs text-gray-900">
      {/* Top row: Ticket & Status */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono font-bold text-gray-500">
          {enquiry.ticketNumber}
        </span>
        <StatusBadge status={enquiry.status} size="sm" />
      </div>

      {/* Customer & Mobile */}
      <div>
        <h4 className="text-base font-bold text-gray-900 uppercase tracking-tight">
          {enquiry.customer.name}
        </h4>
        <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
          <span className="font-mono">{formatPhone(enquiry.customer.mobile)}</span>
          <div className="flex items-center gap-1.5 ml-auto">
            <a
              href={`tel:+91${enquiry.customer.mobile}`}
              className="p-1.5 rounded-md bg-amber-50 text-amber-600 border border-amber-200"
              title="Call"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
            <a
              href={`https://wa.me/91${enquiry.customer.mobile}?text=${encodeURIComponent(
                `Hello ${enquiry.customer.name}, this is Chaudhari Auto Centre, Pahur. We received your enquiry regarding your bike service. Please let us know when you would like to visit.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200"
              title="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bike & Service Info */}
      <div className="p-2.5 rounded-lg bg-gray-50 text-xs space-y-1.5 border border-gray-100">
        <div className="flex items-center gap-2">
          <Bike className="w-4 h-4 text-[#DFA500] shrink-0" />
          <span className="font-bold text-gray-900">
            {enquiry.bike.brand} {enquiry.bike.model}
          </span>
          {enquiry.bike.registrationNumber && (
            <span className="text-gray-500 font-mono text-[11px]">
              ({enquiry.bike.registrationNumber})
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Wrench className="w-3.5 h-3.5 text-[#DFA500] shrink-0" />
          <span className="text-amber-800 font-medium">{enquiry.service.serviceName}</span>
        </div>
        {enquiry.service.preferredDate && (
          <div className="flex items-center gap-2 text-gray-500 text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>
              {formatDate(enquiry.service.preferredDate)} ({enquiry.service.preferredTime || 'Any Time'})
            </span>
          </div>
        )}
      </div>

      {/* Problem snippet */}
      {enquiry.service.problemDescription && (
        <p className="text-xs text-gray-600 line-clamp-2 italic">
          "{enquiry.service.problemDescription}"
        </p>
      )}

      {/* Bottom Action */}
      <div className="pt-2 flex items-center justify-between border-t border-gray-100">
        <span className="text-[10px] text-gray-400">
          {formatDate(enquiry.createdAt)}
        </span>
        <Link
          to={`/garage/enquiries/${enquiry.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#F5B900] text-black font-bold uppercase tracking-wider text-xs shadow-xs"
        >
          <span>View Details</span>
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
