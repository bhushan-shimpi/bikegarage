import React, { useState, useEffect } from 'react';
import {
  Users,
  Phone,
  MessageCircle,
  Bike,
  Plus,
  Trash2,
  History,
  Search,
  X,
  Save,
  CheckCircle2,
  Calendar,
  FileText,
} from 'lucide-react';
import { customerService } from '../../services/customerService';
import { Customer, RepairRecord } from '../../types/customer';
import { formatPhone } from '../../utils/formatters';

export const AdminCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerHistory, setCustomerHistory] = useState<RepairRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // New Customer Form
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: 'Pahur',
    bikeBrand: 'Hero',
    bikeModel: '',
    registrationNumber: '',
    currentKm: '',
    notes: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    const list = await customerService.getAll();
    setCustomers(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) {
      setFormError('Name and mobile number are required.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      await customerService.create(formData);
      setIsAddModalOpen(false);
      setFormData({
        name: '',
        mobile: '',
        email: '',
        city: 'Pahur',
        bikeBrand: 'Hero',
        bikeModel: '',
        registrationNumber: '',
        currentKm: '',
        notes: '',
      });
      loadData();
      setSuccessMsg(`Customer "${formData.name}" registered in database!`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save customer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete customer "${name}" from directory?`)) {
      setCustomers((prev) => prev.filter((c) => c.id !== id && c.mobile !== id));
      await customerService.delete(id);
      setSuccessMsg(`Customer "${name}" deleted.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const handleViewHistory = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsHistoryModalOpen(true);
    setLoadingHistory(true);
    const history = await customerService.getHistory(customer.mobile);
    setCustomerHistory(history);
    setLoadingHistory(false);
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search) ||
      (c.bikeModel && c.bikeModel.toLowerCase().includes(search.toLowerCase())) ||
      (c.registrationNumber && c.registrationNumber.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-gray-900 tracking-tight font-sans flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#DFA500]" />
            Customer Directory
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Registered motorcycle owners in Pahur • Contact info, bike details, and repair records
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Register Customer</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Search & Stats Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, mobile number, or registration (e.g. MH 19)..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
          />
        </div>

        <div className="text-xs text-gray-500 flex items-center gap-2 self-start sm:self-auto">
          <span>Registered Customers:</span>
          <span className="font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md">
            {customers.length}
          </span>
        </div>
      </div>

      {/* Customers Cards Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            No Customers Found
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Click "+ Register Customer" above to add a customer profile to the database.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id || item.mobile}
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-base font-black text-gray-900 uppercase tracking-tight">
                      {item.name}
                    </h4>
                    <span className="text-xs text-gray-600 block font-mono font-bold mt-0.5">
                      📞 {formatPhone(item.mobile)}
                    </span>
                    {item.city && (
                      <span className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium mt-1 inline-block">
                        📍 {item.city}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDelete(item.id || item.mobile, item.name)}
                      className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors"
                      title="Delete Customer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Primary Bike Details */}
                <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Bike className="w-4 h-4 text-[#DFA500] shrink-0" />
                    <span className="font-bold text-gray-900 text-sm">
                      {item.bikeBrand} {item.bikeModel || 'Motorcycle'}
                    </span>
                  </div>
                  {item.registrationNumber && (
                    <div className="text-xs text-gray-600 font-mono pl-6">
                      Reg: <span className="font-bold text-gray-900 uppercase">{item.registrationNumber}</span>
                    </div>
                  )}
                  {item.currentKm && (
                    <div className="text-[11px] text-gray-500 pl-6 font-mono">
                      Odometer: {item.currentKm} KM
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => handleViewHistory(item)}
                  className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <History className="w-3.5 h-3.5 text-[#DFA500]" />
                  <span>Repair History</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:+91${item.mobile}`}
                    className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-xs flex items-center gap-1 transition-colors border border-gray-200"
                    title="Call Customer"
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-700" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/91${item.mobile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-2xs"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── ADD CUSTOMER MODAL ─── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg border border-gray-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-700" />
                <h3 className="text-base font-black uppercase text-gray-900 tracking-tight">
                  Register New Customer
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-3.5 overflow-y-auto flex-1 text-xs">
              {formError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sunil Patil"
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="e.g. 9876543210"
                    required
                    maxLength={10}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    City / Village
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Pahur / Jamner"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@domain.com"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Bike Brand
                  </label>
                  <select
                    value={formData.bikeBrand}
                    onChange={(e) => setFormData({ ...formData, bikeBrand: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  >
                    <option value="Hero">Hero</option>
                    <option value="Bajaj">Bajaj</option>
                    <option value="Honda">Honda</option>
                    <option value="Yamaha">Yamaha</option>
                    <option value="TVS">TVS</option>
                    <option value="Royal Enfield">Royal Enfield</option>
                    <option value="KTM">KTM</option>
                    <option value="Suzuki">Suzuki</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Bike Model
                  </label>
                  <input
                    type="text"
                    value={formData.bikeModel}
                    onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                    placeholder="e.g. Splendor Plus / Pulsar 125"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Registration No.
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value.toUpperCase() })}
                    placeholder="e.g. MH 19 BJ 1234"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Current Odometer (KM)
                  </label>
                  <input
                    type="text"
                    value={formData.currentKm}
                    onChange={(e) => setFormData({ ...formData, currentKm: e.target.value })}
                    placeholder="e.g. 24,500"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold uppercase tracking-wide flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving...' : 'Save Customer'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── CUSTOMER REPAIR HISTORY MODAL ─── */}
      {isHistoryModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl border border-gray-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] border border-[#F5B900]/50 flex items-center justify-center text-amber-700">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase text-gray-900 tracking-tight">
                    {selectedCustomer.name}'s Bike Repair History
                  </h3>
                  <span className="text-xs text-gray-500 font-mono">
                    {selectedCustomer.bikeBrand} {selectedCustomer.bikeModel} • {selectedCustomer.registrationNumber || selectedCustomer.mobile}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              {loadingHistory ? (
                <div className="py-12 text-center text-gray-400">Loading repair records from database...</div>
              ) : customerHistory.length === 0 ? (
                <div className="py-12 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">No past repair records found for this customer.</p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    When you log a job sheet in the "Bike Repair History" page, it will automatically link here!
                  </p>
                </div>
              ) : (
                customerHistory.map((rep) => (
                  <div
                    key={rep.id || rep.jobNumber}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gray-900 text-sm">
                          {rep.jobNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {rep.status}
                        </span>
                      </div>
                      <span className="text-gray-500 text-[11px] flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        {rep.repairDate}
                      </span>
                    </div>

                    <div className="font-bold text-gray-900 text-xs">
                      Service: <span className="text-amber-700">{rep.serviceType}</span>
                    </div>

                    {rep.problemDetails && (
                      <p className="text-gray-600 leading-relaxed bg-white p-2.5 rounded-lg border border-gray-100">
                        {rep.problemDetails}
                      </p>
                    )}

                    {/* Parts Replaced */}
                    {rep.partsReplaced && rep.partsReplaced.length > 0 && (
                      <div>
                        <span className="font-bold text-gray-700 text-[10px] uppercase tracking-wider block mb-1">
                          Parts Replaced:
                        </span>
                        <div className="space-y-1">
                          {rep.partsReplaced.map((part, pIdx) => (
                            <div key={pIdx} className="flex items-center justify-between text-[11px] bg-white px-2.5 py-1 rounded border border-gray-100">
                              <span>• {part.name}</span>
                              <span className="font-mono font-bold">₹{part.cost}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Financial Summary */}
                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between font-mono">
                      <div className="text-[11px] text-gray-500">
                        Labor: ₹{rep.laborCharge} | Parts: ₹{rep.partsTotal}
                      </div>
                      <div className="text-sm font-black text-gray-900 flex items-center gap-1">
                        <span>Total:</span>
                        <span className="text-emerald-700">₹{rep.totalAmount}</span>
                        <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded ml-1 font-sans font-bold">
                          {rep.paymentStatus}
                        </span>
                      </div>
                    </div>

                    {/* Photos */}
                    {rep.photos && rep.photos.length > 0 && (
                      <div className="pt-2 border-t border-gray-200">
                        <span className="font-bold text-gray-700 text-[10px] uppercase tracking-wider block mb-1">
                          Service Photos:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {rep.photos.map((photo, phIdx) => (
                            <img
                              key={phIdx}
                              src={photo}
                              alt={`Service photo ${phIdx + 1}`}
                              className="w-16 h-16 rounded-lg object-cover border border-gray-200 shadow-2xs"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
