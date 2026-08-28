import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  User,
  Bike,
  Wrench,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Trash2,
} from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry, EnquiryStatus } from '../../types/enquiry';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatDate, formatDateTime, formatPhone } from '../../utils/formatters';
import { Button } from '../../components/common/Button';

export const EnquiryDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const found = enquiryService.getById(id);
      if (found) {
        setEnquiry(found);
      } else {
        setEnquiry(null);
      }
    }
  }, [id]);

  const showFeedback = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleStatusChange = (status: EnquiryStatus) => {
    if (!enquiry) return;
    const updated = enquiryService.updateStatus(enquiry.id, status);
    if (updated) {
      setEnquiry(updated);
      showFeedback(`Status successfully updated to "${status.toUpperCase()}".`);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiry || !newNoteText.trim()) return;

    setIsAddingNote(true);
    const updated = enquiryService.addNote(
      enquiry.id,
      newNoteText.trim(),
      'Technician (Bhushan C.)'
    );

    if (updated) {
      setEnquiry(updated);
      setNewNoteText('');
      showFeedback('Internal note added to record timeline.');
    }
    setIsAddingNote(false);
  };

  const handleDelete = async () => {
    if (
      enquiry &&
      window.confirm(
        `Are you sure you want to permanently delete enquiry "${enquiry.ticketNumber}" for ${enquiry.customer.name}?`
      )
    ) {
      await enquiryService.delete(enquiry.id);
      navigate('/garage/enquiries');
    }
  };

  if (!enquiry) {
    return (
      <div className="py-16 text-center">
        <div className="p-8 bg-white border border-gray-200 rounded-2xl max-w-md mx-auto space-y-4 shadow-xs">
          <AlertCircle className="w-12 h-12 text-[#DFA500] mx-auto" />
          <h2 className="text-xl font-bold uppercase text-gray-900 font-sans">
            Enquiry Not Found
          </h2>
          <p className="text-xs text-gray-500">
            The requested ticket does not exist or may have been deleted.
          </p>
          <Link to="/garage/enquiries">
            <Button variant="primary" size="sm">
              Back to Enquiries List
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Back Link & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/garage/enquiries"
            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-black hover:border-gray-400 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-extrabold text-[#DFA500]">
                {enquiry.ticketNumber}
              </span>
              <StatusBadge status={enquiry.status} size="sm" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase text-gray-900 tracking-tight font-sans">
              {enquiry.customer.name}
            </h1>
          </div>
        </div>

        {/* Quick External Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={`tel:+91${enquiry.customer.mobile}`}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:border-gray-500 text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-2 transition-colors shadow-2xs"
          >
            <Phone className="w-4 h-4 text-amber-600" />
            <span>Call Customer</span>
          </a>

          <a
            href={`https://wa.me/91${enquiry.customer.mobile}?text=${encodeURIComponent(
              `Hello ${enquiry.customer.name}, this is Chaudhari Auto Centre, Pahur. We received your enquiry regarding your bike service. Please let us know when you would like to visit.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={handleDelete}
            className="px-3.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            title="Delete Enquiry"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Status Update Quick Bar */}
      <div className="p-4 rounded-xl bg-white border border-gray-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          Update Workflow Status:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleStatusChange('contacted')}
            disabled={enquiry.status === 'contacted'}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-colors ${
              enquiry.status === 'contacted'
                ? 'bg-blue-600 text-white cursor-default'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            Mark Contacted
          </button>
          <button
            onClick={() => handleStatusChange('in_progress')}
            disabled={enquiry.status === 'in_progress'}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-colors ${
              enquiry.status === 'in_progress'
                ? 'bg-[#F5B900] text-black font-extrabold cursor-default'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            Mark In Progress
          </button>
          <button
            onClick={() => handleStatusChange('completed')}
            disabled={enquiry.status === 'completed'}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-colors ${
              enquiry.status === 'completed'
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            Mark Completed
          </button>
          <button
            onClick={() => handleStatusChange('cancelled')}
            disabled={enquiry.status === 'cancelled'}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-colors ${
              enquiry.status === 'cancelled'
                ? 'bg-red-600 text-white cursor-default'
                : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Grid: Details (Left 7) and Notes/Timeline (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Customer */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
              <User className="w-4 h-4 text-[#DFA500]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Rider Information
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 font-semibold block">Full Name:</span>
                <span className="text-base font-bold text-gray-900 mt-0.5 block">
                  {enquiry.customer.name}
                </span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold block">Mobile Number:</span>
                <span className="text-sm font-semibold text-gray-900 mt-0.5 block font-mono">
                  {formatPhone(enquiry.customer.mobile)}
                </span>
              </div>
              {enquiry.customer.email && (
                <div>
                  <span className="text-gray-400 font-semibold block">Email Address:</span>
                  <span className="text-gray-700 mt-0.5 block">
                    {enquiry.customer.email}
                  </span>
                </div>
              )}
              {(enquiry.customer.address || enquiry.customer.city) && (
                <div>
                  <span className="text-gray-400 font-semibold block">Location / Village:</span>
                  <span className="text-gray-700 mt-0.5 block">
                    {enquiry.customer.address || enquiry.customer.city}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Bike Specifications */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
              <Bike className="w-4 h-4 text-[#DFA500]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Bike / Two-Wheeler Specifications
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-gray-400 font-semibold block">Brand / Make:</span>
                <span className="text-sm font-bold text-gray-900 mt-0.5 block">
                  {enquiry.bike.brand}
                </span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold block">Bike Model:</span>
                <span className="text-sm font-bold text-gray-900 mt-0.5 block">
                  {enquiry.bike.model}
                </span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold block">Number Plate:</span>
                <span className="text-sm font-mono font-bold text-gray-900 mt-0.5 block">
                  {enquiry.bike.registrationNumber || 'Not Provided'}
                </span>
              </div>
              {enquiry.bike.year && (
                <div>
                  <span className="text-gray-400 font-semibold block">Year / Model:</span>
                  <span className="text-sm font-medium text-gray-700 mt-0.5 block">
                    {enquiry.bike.year}
                  </span>
                </div>
              )}
              {enquiry.bike.currentKm && (
                <div>
                  <span className="text-gray-400 font-semibold block">Odometer:</span>
                  <span className="text-sm font-medium text-gray-700 mt-0.5 block">
                    {enquiry.bike.currentKm}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Service Requested */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
              <Wrench className="w-4 h-4 text-[#DFA500]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Service Details & Symptoms
              </h2>
            </div>
            <div className="space-y-4 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <span className="text-gray-500 font-semibold block">Requested Service:</span>
                  <span className="text-sm font-bold text-amber-800">
                    {enquiry.service.serviceName}
                  </span>
                </div>
                {enquiry.service.preferredDate && (
                  <div className="text-right">
                    <span className="text-gray-500 font-semibold block">Preferred Slot:</span>
                    <span className="text-xs text-gray-900 font-medium">
                      {formatDate(enquiry.service.preferredDate)} ({enquiry.service.preferredTime || 'Any'})
                    </span>
                  </div>
                )}
              </div>

              <div>
                <span className="text-gray-500 font-semibold block mb-1">
                  Problem / Requirement Description:
                </span>
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 leading-relaxed text-sm">
                  {enquiry.service.problemDescription}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Attachments */}
          {enquiry.attachments && enquiry.attachments.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
                <Paperclip className="w-4 h-4 text-[#DFA500]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  Uploaded Photos ({enquiry.attachments.length})
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {enquiry.attachments.map((imgUrl, i) => (
                  <a
                    key={i}
                    href={imgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group rounded-xl overflow-hidden border border-gray-200 h-32 block bg-gray-100"
                  >
                    <img src={imgUrl} alt="Bike enquiry upload" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-white">
                      View Full Size
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Internal Notes Timeline */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
                <FileText className="w-4 h-4 text-[#DFA500]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  Internal Workshop Notes
                </h2>
              </div>

              {/* Notes Timeline */}
              <div className="space-y-3 mb-6 max-h-80 overflow-y-auto pr-1">
                {enquiry.notes && enquiry.notes.length > 0 ? (
                  enquiry.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-gray-400 text-[10px]">
                        <span className="font-bold text-gray-800">{note.author}</span>
                        <span>{formatDateTime(note.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed font-sans">
                        {note.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic py-4 text-center">
                    No internal notes yet.
                  </p>
                )}
              </div>
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="space-y-3 pt-4 border-t border-gray-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Add Internal Note
              </label>
              <textarea
                rows={3}
                required
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Add technician notes, estimated parts price, lathe work status, or customer callback remarks..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                fullWidth
                disabled={isAddingNote || !newNoteText.trim()}
                rightIcon={<Send className="w-3.5 h-3.5" />}
                className="text-xs uppercase font-bold"
              >
                Save Note
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
