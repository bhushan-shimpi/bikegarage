import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  Bike,
  Calendar,
  Wrench,
  CheckCircle2,
  Trash2,
  Clock,
  FileText,
  Plus,
} from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry, EnquiryStatus } from '../../types/enquiry';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate, formatPhone } from '../../utils/formatters';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

interface EnquiryDetailsModalProps {
  isOpen: boolean;
  enquiryId: string | null;
  onClose: () => void;
  onUpdated?: () => void;
}

export const EnquiryDetailsModal: React.FC<EnquiryDetailsModalProps> = ({
  isOpen,
  enquiryId,
  onClose,
  onUpdated,
}) => {
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && enquiryId) {
      const data = enquiryService.getById(enquiryId);
      setEnquiry(data || null);
    } else {
      setEnquiry(null);
    }
  }, [isOpen, enquiryId]);

  if (!isOpen || !enquiry) return null;

  const showFeedback = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStatusChange = (status: EnquiryStatus) => {
    const updated = enquiryService.updateStatus(enquiry.id, status);
    if (updated) {
      setEnquiry(updated);
      showFeedback(`Status updated to ${status.toUpperCase()}`);
      onUpdated?.();
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const updated = enquiryService.addNote(
      enquiry.id,
      newNoteText.trim(),
      'Technician (Bhushan C.)'
    );

    if (updated) {
      setEnquiry(updated);
      setNewNoteText('');
      showFeedback('Note added to record timeline');
      onUpdated?.();
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to permanently delete enquiry "${enquiry.ticketNumber}" for ${enquiry.customer.name}?`
      )
    ) {
      await enquiryService.delete(enquiry.id);
      onUpdated?.();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl border border-gray-200 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-[#FFFDF7] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#FFF9E6] border border-[#F5B900]/40 flex items-center justify-center text-[#DFA500] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                  {enquiry.ticketNumber}
                </span>
                <StatusBadge status={enquiry.status} size="sm" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate mt-0.5">
                {enquiry.customer.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleDelete}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
              title="Delete Enquiry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback notification */}
        {notification && (
          <div className="px-6 py-2.5 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Quick Contact & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-xs">
              <span className="text-gray-500 block text-[11px]">Primary Phone</span>
              <strong className="text-gray-900 font-mono text-sm">{formatPhone(enquiry.customer.mobile)}</strong>
              {enquiry.customer.city && (
                <span className="text-gray-500 ml-2">📍 {enquiry.customer.city}</span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`tel:+91${enquiry.customer.mobile}`}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#DFA500]" />
                <span>Call</span>
              </a>

              <a
                href={`https://wa.me/91${enquiry.customer.mobile}?text=${encodeURIComponent(
                  `Hello ${enquiry.customer.name}, this is Chaudhari Auto Centre, Pahur. Regarding your bike service enquiry for ${enquiry.bike.brand} ${enquiry.bike.model}...`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Workflow Status Selector */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
              Workflow Status:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(['new', 'contacted', 'in_progress', 'completed', 'cancelled'] as EnquiryStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleStatusChange(st)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all text-center uppercase tracking-wider ${
                    enquiry.status === st
                      ? 'bg-[#F5B900] text-black border-[#F5B900] shadow-2xs'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Motorcycle Information */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-[#DFA500]" />
              <span>Motorcycle Specs</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50/70 p-3.5 rounded-xl border border-gray-200 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Brand</span>
                <strong className="text-gray-900">{enquiry.bike.brand}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Model</span>
                <strong className="text-gray-900">{enquiry.bike.model}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Reg Plate</span>
                <strong className="text-gray-900 font-mono uppercase">{enquiry.bike.registrationNumber || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Year</span>
                <strong className="text-gray-900">{enquiry.bike.year || 'N/A'}</strong>
              </div>
            </div>
          </div>

          {/* Scope of Work / Service Description */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#DFA500]" />
              <span>Service Requested & Scope of Work</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-gray-900 bg-amber-100 text-amber-950 px-2 py-0.5 rounded border border-amber-200">
                  {enquiry.service.serviceName}
                </span>
                {enquiry.service.estimatedPrice && (
                  <span className="font-mono font-black text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded text-xs">
                    ₹{enquiry.service.estimatedPrice.toLocaleString('en-IN')}/-
                  </span>
                )}
                {enquiry.service.preferredDate && (
                  <span className="text-gray-500 text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    Preferred: {formatDate(enquiry.service.preferredDate)}
                  </span>
                )}
              </div>

              {enquiry.service.quickIssues && enquiry.service.quickIssues.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {enquiry.service.quickIssues.map((issue, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white border border-gray-200 text-gray-700 text-[11px] font-medium"
                    >
                      ✓ {issue}
                    </span>
                  ))}
                </div>
              )}

              {enquiry.service.problemDescription && (
                <div className="pt-2 border-t border-gray-200/80">
                  <span className="text-[11px] font-bold text-gray-500 block mb-1">Detailed Requirements / Job Sheet:</span>
                  <p className="text-gray-800 whitespace-pre-line text-xs font-mono bg-white p-3 rounded-lg border border-gray-200 leading-relaxed">
                    {enquiry.service.problemDescription}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Timeline Notes */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#DFA500]" />
              <span>Workshop Timeline Notes ({enquiry.notes?.length || 0})</span>
            </h3>

            {enquiry.notes && enquiry.notes.length > 0 ? (
              <div className="space-y-2">
                {enquiry.notes.map((note) => (
                  <div key={note.id} className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-gray-400 text-[11px]">
                      <span className="font-bold text-gray-700">{note.author}</span>
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                    <p className="text-gray-800">{note.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No notes added yet.</p>
            )}

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Add technician note (e.g. Engine opened, bore 0.25 required)..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-bold flex items-center gap-1 transition-all active:scale-95 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
