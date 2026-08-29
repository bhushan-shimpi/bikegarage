import React from 'react';
import { FileText, X, Phone, Printer, Wrench } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { RepairRecord } from '../../types/customer';
import { formatPhone } from '../../utils/formatters';
import { getWhatsAppBillUrl } from '../../pages/admin/AdminRepairHistoryPage';
import { printInvoice } from '../../utils/printInvoice';

interface ViewBillModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: RepairRecord | null;
}

export const ViewBillModal: React.FC<ViewBillModalProps> = ({ isOpen, onClose, record }) => {
  if (!isOpen || !record) return null;

  const partsTotal =
    record.partsTotal ||
    record.partsReplaced?.reduce((sum, p) => sum + (Number(p.cost) || 0), 0) ||
    0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl border border-gray-200 shadow-2xl overflow-hidden my-2 sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F5B900]/20 flex items-center justify-center text-amber-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">
                Repair Bill / Job Sheet: {record.jobNumber}
              </h3>
              <span className="text-[11px] text-gray-500 font-mono">
                Chaudhari Auto Centre, Pahur • {record.repairDate}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Customer</span>
              <div className="font-bold text-gray-900 text-sm">{record.customerName}</div>
              <div className="font-mono text-gray-600 flex items-center gap-2 mt-0.5">
                <span>{formatPhone(record.customerMobile)}</span>
                <a
                  href={`tel:+91${record.customerMobile}`}
                  className="text-amber-600 hover:underline inline-flex items-center gap-0.5 text-[11px]"
                >
                  <Phone className="w-3 h-3" /> Call
                </a>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Motorcycle</span>
              <div className="font-bold text-gray-900">{record.bikeBrand} {record.bikeModel}</div>
              <div className="font-mono font-bold text-amber-700 uppercase">
                {record.registrationNumber || 'No Plate Logged'}
                {record.currentKm && <span className="text-gray-500 font-normal font-sans ml-2">• {record.currentKm} KM</span>}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">Repaired By (Mechanic)</span>
              <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5 mt-0.5">
                <Wrench className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="truncate">{record.mechanicName || 'Master Mechanic'}</span>
              </div>
              <span className="text-[10px] text-gray-500 font-medium">Chaudhari Auto Workshop</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Service / Problem Details
            </span>
            <div className="p-3 rounded-lg border border-gray-200 bg-white font-medium text-gray-800">
              <div>{record.serviceType}</div>
              {record.problemDetails && (
                <div className="text-gray-500 text-[11px] mt-1 italic">"{record.problemDetails}"</div>
              )}
            </div>
          </div>

          {/* Replaced Parts */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Parts Replaced & Workshop Materials
            </span>
            {record.partsReplaced && record.partsReplaced.length > 0 ? (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-100 text-gray-600 font-bold">
                    <tr>
                      <th className="p-2.5">Part Name</th>
                      <th className="p-2.5 text-center">Qty</th>
                      <th className="p-2.5 text-right">Cost (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {record.partsReplaced.map((part, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-medium text-gray-900">{part.name}</td>
                        <td className="p-2.5 text-center font-mono">{(part as any).quantity || 1}</td>
                        <td className="p-2.5 text-right font-mono font-bold">₹{part.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-3 text-center border border-dashed border-gray-200 rounded-xl text-gray-400 text-xs">
                No spare parts charged (Labor only service)
              </div>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5 font-mono text-xs">
            <div className="flex justify-between text-gray-600 font-sans">
              <span>Spare Parts Total:</span>
              <span className="font-bold">₹{partsTotal}</span>
            </div>
            <div className="font-sans flex justify-between text-gray-600">
              <span>Labor & Service Charges:</span>
              <span className="font-bold">₹{record.laborCharge}</span>
            </div>
            {record.discount ? (
              <div className="flex justify-between text-emerald-700 font-sans font-bold">
                <span>Special Discount:</span>
                <span>-₹{record.discount}</span>
              </div>
            ) : null}
            <div className="pt-2 border-t border-amber-200 flex justify-between items-center text-sm font-sans font-bold text-gray-900">
              <span>Final Total Amount:</span>
              <span className="text-xl font-bold text-emerald-700 font-mono">₹{record.totalAmount}</span>
            </div>
            <div className="flex justify-between items-center pt-1 text-[11px] text-gray-500 font-sans">
              <span>Payment Mode: <strong>{record.paymentMode || 'Cash'}</strong></span>
              <span
                className={
                  record.paymentStatus === 'Paid'
                    ? 'px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800'
                    : 'px-2 py-0.5 rounded-full font-bold text-[10px] bg-amber-100 text-amber-800'
                }
              >
                {record.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <button
            onClick={() => printInvoice(record)}
            className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-amber-700" />
            <span>Print Tax Invoice</span>
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <a
              href={getWhatsAppBillUrl(record)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Send WhatsApp Bill</span>
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
