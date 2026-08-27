import React from 'react';
import { Users, Phone, MessageCircle, Bike } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { formatPhone } from '../../utils/formatters';

export const AdminCustomersPage: React.FC = () => {
  const enquiries = enquiryService.getAll();

  // Extract unique customers by mobile
  const customers = Array.from(
    new Map(enquiries.map((e) => [e.customer.mobile, e])).values()
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] border border-[#F5B900]/40 flex items-center justify-center text-[#DFA500]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight font-sans">
              Two-Wheeler Customer Directory
            </h2>
            <p className="text-xs text-gray-500">
              Pahur workshop registered motorcycle and scooter owners ({customers.length} records)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {customers.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-gray-200 hover:border-[#F5B900] transition-colors flex flex-col justify-between space-y-3 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                    {item.customer.name}
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Regular Rider
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 font-mono">
                  <span>{formatPhone(item.customer.mobile)}</span>
                </div>

                <div className="mt-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-xs flex items-center gap-2 text-gray-700">
                  <Bike className="w-4 h-4 text-[#DFA500] shrink-0" />
                  <span className="font-semibold text-gray-900">
                    {item.bike.brand} {item.bike.model}
                  </span>
                  {item.bike.registrationNumber && (
                    <span className="text-gray-500 font-mono text-[11px]">
                      ({item.bike.registrationNumber})
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-600 font-medium truncate max-w-[170px]">
                  Last: {item.service.serviceName}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`tel:+91${item.customer.mobile}`}
                    className="p-1.5 rounded bg-gray-100 text-gray-700 hover:bg-[#F5B900] hover:text-black transition-colors"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/91${item.customer.mobile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-gray-100 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
