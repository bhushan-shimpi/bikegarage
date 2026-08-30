import React, { useState, useEffect } from 'react';
import {
  Wrench,
  X,
  Trash2,
  Bike,
  User,
  Search,
  CheckCircle2,
  Receipt,
  Copy,
  Check,
  Printer,
  Plus,
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { repairService } from '../../services/repairService';
import { customerService } from '../../services/customerService';
import { partService } from '../../services/partService';
import { bikeServicesService } from '../../services/bikeServicesService';
import { ServiceItem } from '../../types/service';
import {
  RepairRecord,
  Customer,
  SparePart,
} from '../../types/customer';
import { formatPhone } from '../../utils/formatters';
import { getWhatsAppBillUrl } from '../../pages/admin/AdminRepairHistoryPage';
import { printInvoice } from '../../utils/printInvoice';

import { authService } from '../../services/authService';
import { AdminUser } from '../../types/auth';

interface CreateBillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  prefillCustomer?: Customer | null;
}

export const CreateBillModal: React.FC<CreateBillModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  prefillCustomer,
}) => {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [allParts, setAllParts] = useState<SparePart[]>([]);
  const [availableServices, setAvailableServices] = useState<ServiceItem[]>([]);
  const [mechanicsList, setMechanicsList] = useState<AdminUser[]>([]);

  // Customer suggestions
  const [customerSuggestions, setCustomerSuggestions] = useState<Customer[]>([]);
  const [showCustomerSuggestions, setShowCustomerSuggestions] = useState(false);

  // Search state for spare parts
  const [partSearchQuery, setPartSearchQuery] = useState('');
  const [showPartSuggestions, setShowPartSuggestions] = useState(false);

  // Dynamic custom part input
  const [customPartName, setCustomPartName] = useState('');
  const [customPartCost, setCustomPartCost] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // WhatsApp post-creation modal state
  const [createdBillRecord, setCreatedBillRecord] = useState<RepairRecord | null>(null);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const initialFormData = {
    customerName: '',
    customerMobile: '',
    bikeBrand: 'Bajaj',
    bikeModel: '',
    registrationNumber: '',
    currentKm: '',
    mechanicName: '',
    serviceType: 'General Bike Service',
    servicePrice: 299,
    problemDetails: '',
    partsReplaced: [] as { name: string; cost: number }[],
    laborCharge: 200,
    discount: 0,
    paymentMode: 'Cash' as 'Cash' | 'Online',
    paymentStatus: 'Paid' as 'Paid' | 'Pending',
    status: 'Completed' as 'Completed' | 'In Progress' | 'Delivered',
    photos: [] as string[],
    repairDate: new Date().toISOString().split('T')[0],
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isOpen) {
      customerService.getAll().then(setAllCustomers);
      partService.getAll().then(setAllParts);
      const services = bikeServicesService.getAll();
      setAvailableServices(services);
      authService.getMechanics().then(setMechanicsList);

      const currentUser = authService.getCurrentUser();
      const defaultMechanic = currentUser?.name || '';

      const defaultSvc = services.find((s) => s.name === 'General Bike Service') || services[0];
      const defaultPrice = defaultSvc?.priceStartingAt
        ? Number(defaultSvc.priceStartingAt.replace(/[^\d.]/g, '')) || 299
        : 299;

      if (prefillCustomer) {
        setFormData({
          ...initialFormData,
          customerName: prefillCustomer.name || '',
          customerMobile: prefillCustomer.mobile || '',
          bikeBrand: prefillCustomer.bikeBrand || 'Bajaj',
          bikeModel: prefillCustomer.bikeModel || '',
          registrationNumber: prefillCustomer.registrationNumber || '',
          currentKm: prefillCustomer.currentKm || '',
          mechanicName: defaultMechanic,
          serviceType: defaultSvc?.name || 'General Bike Service',
          servicePrice: defaultPrice,
        });
      } else {
        setFormData({
          ...initialFormData,
          mechanicName: defaultMechanic,
          serviceType: defaultSvc?.name || 'General Bike Service',
          servicePrice: defaultPrice,
        });
      }
      setFormError(null);
    }
  }, [isOpen, prefillCustomer]);

  if (!isOpen && !showWhatsAppModal) return null;

  // Customer autocomplete
  const handleCustomerInputChange = (field: 'customerName' | 'customerMobile', val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (val.trim().length >= 2) {
      const q = val.trim().toLowerCase();
      const matches = allCustomers.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.mobile.includes(q) ||
          (c.registrationNumber && c.registrationNumber.toLowerCase().includes(q))
      );
      setCustomerSuggestions(matches.slice(0, 5));
      setShowCustomerSuggestions(matches.length > 0);
    } else {
      setShowCustomerSuggestions(false);
    }
  };

  const handleSelectCustomer = (c: Customer) => {
    setFormData((prev) => ({
      ...prev,
      customerName: c.name,
      customerMobile: c.mobile,
      bikeBrand: c.bikeBrand || prev.bikeBrand,
      bikeModel: c.bikeModel || '',
      registrationNumber: c.registrationNumber || '',
      currentKm: c.currentKm || '',
    }));
    setShowCustomerSuggestions(false);
  };

  // Add searched part
  const filteredSearchedParts = allParts.filter((p) => {
    if (!partSearchQuery.trim()) return true;
    const q = partSearchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const handleSelectSearchedPart = (part: SparePart) => {
    setFormData((prev) => ({
      ...prev,
      partsReplaced: [...prev.partsReplaced, { name: part.name, cost: part.price }],
    }));
    setPartSearchQuery('');
    setShowPartSuggestions(false);
  };

  // Add custom manual part
  const handleAddCustomPart = () => {
    if (!customPartName.trim()) return;
    const cost = parseFloat(customPartCost) || 0;
    setFormData((prev) => ({
      ...prev,
      partsReplaced: [...prev.partsReplaced, { name: customPartName.trim(), cost }],
    }));
    setCustomPartName('');
    setCustomPartCost('');
  };

  const handleRemovePart = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      partsReplaced: prev.partsReplaced.filter((_, i) => i !== index),
    }));
  };

  const handleUpdatePartCost = (index: number, newCost: string) => {
    setFormData((prev) => ({
      ...prev,
      partsReplaced: prev.partsReplaced.map((p, i) =>
        i === index ? { ...p, cost: Number(newCost) || 0 } : p
      ),
    }));
  };

  const partsTotal = formData.partsReplaced.reduce((sum, p) => sum + (Number(p.cost) || 0), 0);
  const serviceTotal = Number(formData.servicePrice) || 0;
  const laborTotal = Number(formData.laborCharge) || 0;
  const billSubtotal = partsTotal + serviceTotal + laborTotal;
  const overallDiscount = Number(formData.discount) || 0;
  const grandTotal = Math.max(0, billSubtotal - overallDiscount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.customerMobile.trim()) {
      setFormError('Customer name and mobile number are required.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const created = await repairService.create({
        ...formData,
        servicePrice: serviceTotal,
        partsTotal,
        laborCharge: laborTotal,
        discount: overallDiscount,
        paymentMode: formData.paymentMode,
        totalAmount: grandTotal,
      });

      setCreatedBillRecord(created);
      setShowWhatsAppModal(true);
      setFormData(initialFormData);
      onSuccess?.();
    } catch (err: any) {
      setFormError(err.message || 'Failed to generate repair bill');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyBill = () => {
    if (!createdBillRecord) return;
    const partsList =
      createdBillRecord.partsReplaced && createdBillRecord.partsReplaced.length > 0
        ? createdBillRecord.partsReplaced.map((p) => `• ${p.name}: ₹${p.cost}`).join('\n')
        : '• No parts replaced';

    const pTotal =
      createdBillRecord.partsTotal ||
      createdBillRecord.partsReplaced?.reduce((sum, p) => sum + (Number(p.cost) || 0), 0) ||
      0;
    const sPrice = createdBillRecord.servicePrice || 0;
    const lCharge = createdBillRecord.laborCharge || 0;
    const bSubtotal = pTotal + sPrice + lCharge;
    const discountStr =
      createdBillRecord.discount && createdBillRecord.discount > 0
        ? `\n🎁 Overall Bill Discount: -₹${createdBillRecord.discount}`
        : '';

    const text = `🏍️ CHAUDHARI AUTO CENTRE, PAHUR
Repair Invoice / Job Sheet: ${createdBillRecord.jobNumber}
----------------------------------------
Customer: ${createdBillRecord.customerName}
Phone: ${createdBillRecord.customerMobile}
Vehicle: ${createdBillRecord.bikeBrand || ''} ${createdBillRecord.bikeModel || ''} ${
      createdBillRecord.registrationNumber ? `(${createdBillRecord.registrationNumber})` : ''
    }
Date: ${createdBillRecord.repairDate}
${createdBillRecord.mechanicName ? `Repaired By / Mechanic: ${createdBillRecord.mechanicName}\n` : ''}
Service: ${createdBillRecord.serviceType}${sPrice > 0 ? ` (₹${sPrice})` : ''}

Parts Replaced:
${partsList}
Parts Total: ₹${pTotal}

Labor Charges: ₹${lCharge}
Bill Subtotal: ₹${bSubtotal}${discountStr}
----------------------------------------
FINAL AMOUNT: ₹${createdBillRecord.totalAmount}
Payment Mode: ${createdBillRecord.paymentMode || 'Cash'}
Payment Status: ${createdBillRecord.paymentStatus}
----------------------------------------
Thank you for choosing Chaudhari Auto Centre!
Helpline: +91 7387448878 / 9503853143`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Main Bill Creation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl border border-gray-200 shadow-2xl overflow-hidden my-2 sm:my-6 max-h-[95vh] sm:max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Create Repair Bill
                  </h3>
                  <p className="text-xs text-gray-500">
                    Calculate spare parts, labor, discount & generate customer invoice
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              {formError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 font-medium">
                  {formError}
                </div>
              )}

              {/* Customer Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#DFA500]" />
                    Customer Details
                  </h4>
                  <span className="text-[11px] text-gray-400">
                    Type to search registered owners
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <label className="block font-semibold text-gray-700 mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => handleCustomerInputChange('customerName', e.target.value)}
                      placeholder="Type name or search customer..."
                      required
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    />

                    {showCustomerSuggestions && customerSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl divide-y divide-gray-100 overflow-hidden">
                        <div className="p-1.5 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase">
                          Registered Customers:
                        </div>
                        {customerSuggestions.map((c) => (
                          <button
                            key={c.id || c.mobile}
                            type="button"
                            onClick={() => handleSelectCustomer(c)}
                            className="w-full text-left p-2.5 hover:bg-amber-50/80 transition-colors flex items-center justify-between text-xs"
                          >
                            <div>
                              <div className="font-bold text-gray-900">{c.name}</div>
                              <div className="text-[11px] text-gray-500 font-mono">
                                {formatPhone(c.mobile)} • {c.bikeBrand} {c.bikeModel || ''}
                              </div>
                            </div>
                            {c.registrationNumber && (
                              <span className="text-[10px] font-mono font-bold bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded">
                                {c.registrationNumber}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      value={formData.customerMobile}
                      onChange={(e) => handleCustomerInputChange('customerMobile', e.target.value)}
                      placeholder="10-digit mobile number"
                      required
                      maxLength={10}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Motorcycle Details */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Bike className="w-3.5 h-3.5 text-[#DFA500]" />
                  Motorcycle Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Brand</label>
                    <select
                      value={formData.bikeBrand}
                      onChange={(e) => setFormData({ ...formData, bikeBrand: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    >
                      <option value="Hero">Hero</option>
                      <option value="Honda">Honda</option>
                      <option value="Bajaj">Bajaj</option>
                      <option value="Yamaha">Yamaha</option>
                      <option value="TVS">TVS</option>
                      <option value="Royal Enfield">Royal Enfield</option>
                      <option value="KTM">KTM</option>
                      <option value="Suzuki">Suzuki</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Bike Model</label>
                    <input
                      type="text"
                      value={formData.bikeModel}
                      onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                      placeholder="e.g. Pulsar 150 / Splendor"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Reg. Number</label>
                    <input
                      type="text"
                      value={formData.registrationNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, registrationNumber: e.target.value.toUpperCase() })
                      }
                      placeholder="e.g. MH 19 AW 1234"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 uppercase font-mono focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Service & Spare Parts */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#DFA500]" />
                  Service & Spare Parts Fitted
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-gray-700 mb-1">
                      Service Type (from Services Catalog)
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => {
                        const selectedName = e.target.value;
                        const matched = availableServices.find((s) => s.name === selectedName);
                        const numPrice = matched?.priceStartingAt
                          ? Number(matched.priceStartingAt.replace(/[^\d.]/g, '')) || 0
                          : 0;
                        setFormData((prev) => ({
                          ...prev,
                          serviceType: selectedName,
                          servicePrice: numPrice,
                        }));
                      }}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    >
                      {availableServices.map((svc) => (
                        <option key={svc.id || svc.name} value={svc.name}>
                          {svc.name} {svc.priceStartingAt ? `(${svc.priceStartingAt})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Service Price (₹)
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={formData.servicePrice}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, servicePrice: Number(e.target.value) || 0 }))
                      }
                      placeholder="0"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Odometer (KM)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.currentKm}
                      onChange={(e) => setFormData({ ...formData, currentKm: e.target.value })}
                      placeholder="e.g. 24,500"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Wrench className="w-3.5 h-3.5 text-[#DFA500]" />
                        Repaired By (Mechanic Name)
                      </span>
                      {mechanicsList.length > 0 && (
                        <span className="text-[10px] text-gray-400 font-normal">Choose or type</span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        list="mechanic-name-suggestions"
                        value={formData.mechanicName}
                        onChange={(e) => setFormData({ ...formData, mechanicName: e.target.value })}
                        placeholder="e.g. Bhushan Chaudhari or Rahul"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                      />
                      <datalist id="mechanic-name-suggestions">
                        {mechanicsList.map((m) => (
                          <option key={m.id || m.username} value={m.name} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>

                {/* Live Spare Part Autocomplete Search Bar */}
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-2">
                  <label className="block text-xs font-bold text-gray-900">
                    🔍 Search Spare Part from Price List:
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={partSearchQuery}
                      onChange={(e) => {
                        setPartSearchQuery(e.target.value);
                        setShowPartSuggestions(true);
                      }}
                      onFocus={() => setShowPartSuggestions(true)}
                      placeholder="Type keyword (e.g. oil, brake, chain, plug, filter)..."
                      className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-8 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900]"
                    />
                    {partSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setPartSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    )}

                    {showPartSuggestions && (
                      <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-52 overflow-y-auto divide-y divide-gray-100">
                        {filteredSearchedParts.length === 0 ? (
                          <div className="p-3 text-center text-xs text-gray-400">
                            No parts found matching "{partSearchQuery}". Add it below as custom part.
                          </div>
                        ) : (
                          filteredSearchedParts.map((p) => (
                            <button
                              key={p.id || p.name}
                              type="button"
                              onClick={() => handleSelectSearchedPart(p)}
                              className="w-full text-left p-2.5 hover:bg-amber-50 transition-colors flex items-center justify-between text-xs group"
                            >
                              <div>
                                <span className="font-semibold text-gray-900 group-hover:text-amber-900">
                                  {p.name}
                                </span>
                                <span className="text-[11px] text-gray-500 block">
                                  Category: {p.category}
                                </span>
                              </div>
                              <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-xs">
                                ₹{p.price}
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  {/* Manual Custom Part Inputs */}
                  <div className="pt-2.5 border-t border-amber-200/60 space-y-2">
                    <span className="text-[11px] font-semibold text-gray-700 block">
                      Or add custom spare part:
                    </span>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        value={customPartName}
                        onChange={(e) => setCustomPartName(e.target.value)}
                        placeholder="Enter custom part name..."
                        className="flex-1 min-w-0 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900]"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          inputMode="numeric"
                          value={customPartCost}
                          onChange={(e) => setCustomPartCost(e.target.value)}
                          placeholder="₹ Price"
                          className="flex-1 sm:w-28 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900]"
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomPart}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg font-bold text-xs hover:bg-black transition-colors shrink-0 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-xs min-h-[36px] whitespace-nowrap"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Part</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Replaced Parts List Table */}
                {formData.partsReplaced.length > 0 && (
                  <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                    <div className="bg-gray-50 px-3 py-2 text-[11px] font-bold text-gray-600 flex justify-between">
                      <span>Parts Fitted ({formData.partsReplaced.length})</span>
                      <span>Rate (₹)</span>
                    </div>
                    {formData.partsReplaced.map((part, idx) => (
                      <div key={idx} className="px-3 py-2 flex items-center justify-between text-xs gap-2">
                        <span className="font-medium text-gray-900 flex-1 min-w-0 truncate">{part.name}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-gray-500 text-[11px]">₹</span>
                          <input
                            type="number"
                            inputMode="numeric"
                            value={part.cost}
                            onChange={(e) => handleUpdatePartCost(idx, e.target.value)}
                            className="w-20 text-right font-bold text-gray-900 bg-amber-50 border border-amber-200 rounded-md px-2 py-0.5 text-xs focus:outline-none focus:border-[#F5B900] focus:bg-white transition-colors"
                            title="Edit price for this model/company"
                            min="0"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePart(idx)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="bg-amber-50/60 px-3 py-2 text-xs font-bold text-amber-900 flex justify-between">
                      <span>Spare Parts Subtotal:</span>
                      <span>₹{partsTotal}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Billing: Labor, Discount, Payment & Grand Total */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-semibold text-gray-700 text-xs">Labor (₹)</label>
                    </div>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={formData.laborCharge}
                      onChange={(e) =>
                        setFormData({ ...formData, laborCharge: Number(e.target.value) || 0 })
                      }
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#F5B900]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Discount on Bill (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) =>
                        setFormData({ ...formData, discount: Number(e.target.value) || 0 })
                      }
                      placeholder="0"
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold text-emerald-700 focus:outline-none focus:border-[#F5B900]"
                    />
                    <span className="text-[10px] text-gray-500 block mt-1">
                      Applied to overall bill total
                    </span>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Payment Mode</label>
                    <select
                      value={formData.paymentMode}
                      onChange={(e) =>
                        setFormData({ ...formData, paymentMode: e.target.value as 'Cash' | 'Online' })
                      }
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#F5B900]"
                    >
                      <option value="Cash">Cash</option>
                      <option value="Online">Online / UPI</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Payment Status</label>
                    <select
                      value={formData.paymentStatus}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentStatus: e.target.value as 'Paid' | 'Pending',
                        })
                      }
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#F5B900]"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                {/* Overall Bill Financial Summary */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200 space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Service Rate ({formData.serviceType}):</span>
                      <span className="font-semibold text-gray-900">₹{serviceTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Spare Parts Total ({formData.partsReplaced.length} items):</span>
                      <span className="font-semibold text-gray-900">₹{partsTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Mechanic Labor Charges:</span>
                      <span className="font-semibold text-gray-900">₹{laborTotal}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-800 pt-1 border-t border-gray-200">
                      <span>Overall Bill Subtotal:</span>
                      <span>₹{billSubtotal}</span>
                    </div>
                    {overallDiscount > 0 && (
                      <div className="flex justify-between font-bold text-emerald-700">
                        <span>Overall Bill Discount:</span>
                        <span>-₹{overallDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-black text-gray-900 pt-1.5 border-t border-gray-200">
                      <span>FINAL AMOUNT PAYABLE:</span>
                      <span className="text-xl text-emerald-700 font-extrabold">₹{grandTotal}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs transition-colors text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                  <Receipt className="w-4 h-4" />
                  <span>{isSubmitting ? 'Generating Bill...' : 'Generate Bill & Save'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Bill Success Popup */}
      {showWhatsAppModal && createdBillRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md border border-gray-200 shadow-2xl p-6 space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Bill Generated Successfully!
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Job Card <span className="font-mono font-bold text-gray-900">{createdBillRecord.jobNumber}</span> is logged in records.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="font-bold text-gray-900">{createdBillRecord.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Mobile:</span>
                <span className="font-mono text-gray-900">{formatPhone(createdBillRecord.customerMobile)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle:</span>
                <span className="font-medium text-gray-900">
                  {createdBillRecord.bikeBrand} {createdBillRecord.bikeModel}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-gray-200 font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-emerald-700">₹{createdBillRecord.totalAmount}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getWhatsAppBillUrl(createdBillRecord)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setShowWhatsAppModal(false);
                    onClose();
                  }}
                  className="py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp Bill</span>
                </a>

                <button
                  type="button"
                  onClick={() => printInvoice(createdBillRecord)}
                  className="py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Invoice</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyBill}
                  className="flex-1 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Bill Text'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowWhatsAppModal(false);
                    onClose();
                  }}
                  className="flex-1 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
