import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Eye } from 'lucide-react';
import { Enquiry } from '../../types/enquiry';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate, formatPhone } from '../../utils/formatters';

interface EnquiryTableRowProps {
  enquiry: Enquiry;
}

export const EnquiryTableRow: React.FC<EnquiryTableRowProps> = ({ enquiry }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50/80 transition-colors text-xs">
      {/* Customer */}
      <td className="py-4 px-4 font-semibold text-gray-900">
        <div className="flex flex-col">
          <Link
            to={`/garage/enquiries/${enquiry.id}`}
            className="hover:text-[#DFA500] font-bold text-sm tracking-tight transition-colors text-gray-900"
          >
            {enquiry.customer.name}
          </Link>
          <span className="text-[11px] text-gray-400 font-mono">
            {enquiry.ticketNumber}
          </span>
        </div>
      </td>

      {/* Mobile */}
      <td className="py-4 px-4 text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-mono">{formatPhone(enquiry.customer.mobile)}</span>
          <a
            href={`https://wa.me/91${enquiry.customer.mobile}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="text-emerald-600 hover:text-emerald-700 p-1 rounded hover:bg-emerald-50"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
          <a
            href={`tel:+91${enquiry.customer.mobile}`}
            title="Call"
            className="text-amber-600 hover:text-amber-700 p-1 rounded hover:bg-amber-50"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        </div>
      </td>

      {/* Vehicle */}
      <td className="py-4 px-4 text-gray-900">
        <div className="flex flex-col">
          <span className="font-bold text-gray-900">
            {enquiry.bike.brand} {enquiry.bike.model}
          </span>
          {enquiry.bike.registrationNumber && (
            <span className="text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-wider">
              {enquiry.bike.registrationNumber}
            </span>
          )}
        </div>
      </td>

      {/* Service */}
      <td className="py-4 px-4">
        <span className="inline-block font-semibold text-amber-800 bg-[#FFF9E6] px-2.5 py-1 rounded border border-[#FDE68A]">
          {enquiry.service.serviceName}
        </span>
      </td>

      {/* Preferred Date / Callback */}
      <td className="py-4 px-4 text-gray-600">
        <div>
          <span className="font-medium text-gray-900">
            {enquiry.service.preferredDate ? formatDate(enquiry.service.preferredDate) : 'Not specified'}
          </span>
          {enquiry.service.preferredTime && (
            <span className="block text-[10px] text-gray-400">
              {enquiry.service.preferredTime}
            </span>
          )}
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-4">
        <StatusBadge status={enquiry.status} size="sm" />
      </td>

      {/* Created */}
      <td className="py-4 px-4 text-gray-500 text-[11px]">
        {formatDate(enquiry.createdAt)}
      </td>

      {/* Action */}
      <td className="py-4 px-4 text-right">
        <Link
          to={`/garage/enquiries/${enquiry.id}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-gray-100 hover:bg-[#F5B900] text-gray-700 hover:text-black font-bold uppercase tracking-wider text-[11px] border border-gray-200 transition-all shadow-2xs"
        >
          <span>Manage</span>
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </td>
    </tr>
  );
};
