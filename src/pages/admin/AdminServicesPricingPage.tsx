import React, { useState, useEffect } from 'react';
import {
  Search,
  Check,
  RotateCcw,
  Sparkles,
  Clock,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  Layers,
  Wrench,
} from 'lucide-react';
import { bikeServicesService } from '../../services/bikeServicesService';
import { ServiceItem, ServiceCategory } from '../../types/service';

interface ServiceFormData {
  id?: string;
  name: string;
  marathiName: string;
  category: ServiceCategory;
  priceStartingAt: string;
  estimatedTime: string;
  shortDescription: string;
  fullDescription: string;
  included: string[];
  imageUrl: string;
  isPopular: boolean;
}

const initialForm: ServiceFormData = {
  name: '',
  marathiName: '',
  category: 'maintenance',
  priceStartingAt: '₹',
  estimatedTime: '1 - 2 Hours',
  shortDescription: '',
  fullDescription: '',
  included: [''],
  imageUrl: '/images/services/general-service.jpg',
  isPopular: false,
};

export const AdminServicesPricingPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editTime, setEditTime] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Full Modal State (Add or Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState<ServiceFormData>(initialForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    const data = await bikeServicesService.getAllAdmin();
    setServices(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Quick inline price edit
  const handleStartEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setEditPrice(service.priceStartingAt || '');
    setEditTime(service.estimatedTime || '');
  };

  const handleSavePrice = async (id: string) => {
    if (!editPrice.trim()) return;

    await bikeServicesService.updateService(id, {
      priceStartingAt: editPrice.trim(),
      estimatedTime: editTime.trim() || undefined,
    });

    loadData();
    setEditingId(null);
    setSuccessMsg(`Price updated successfully to ${editPrice.trim()}`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleTogglePopular = async (id: string, current: boolean) => {
    await bikeServicesService.updateService(id, { isPopular: !current });
    loadData();
    setSuccessMsg('Service featured status updated');
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleDeleteService = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the database?`)) {
      setServices((prev) => prev.filter((s) => s.id !== id && s.slug !== id));
      await bikeServicesService.deleteService(id);
      setSuccessMsg(`"${name}" deleted successfully from database.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  // Open Full Add Modal
  const handleOpenAddModal = () => {
    setModalMode('create');
    setFormData(initialForm);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open Full Edit Modal
  const handleOpenEditModal = (service: ServiceItem) => {
    setModalMode('edit');
    setFormData({
      id: service.id,
      name: service.name,
      marathiName: service.marathiName || '',
      category: service.category,
      priceStartingAt: service.priceStartingAt || '',
      estimatedTime: service.estimatedTime || '',
      shortDescription: service.shortDescription || '',
      fullDescription: service.fullDescription || '',
      included: service.included && service.included.length > 0 ? [...service.included] : [''],
      imageUrl: service.imageUrl || '/images/services/general-service.jpg',
      isPopular: !!service.isPopular,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Form input changes
  const handleAddChecklistPoint = () => {
    setFormData((prev) => ({ ...prev, included: [...prev.included, ''] }));
  };

  const handleUpdateChecklistPoint = (index: number, val: string) => {
    const updated = [...formData.included];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, included: updated }));
  };

  const handleRemoveChecklistPoint = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      included: prev.included.filter((_, i) => i !== index),
    }));
  };

  // Submit Modal Form to Supabase DB
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Service Name is required');
      return;
    }
    if (!formData.priceStartingAt.trim()) {
      setFormError('Price is required');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const cleanPoints = formData.included.map((p) => p.trim()).filter(Boolean);

    try {
      if (modalMode === 'create') {
        await bikeServicesService.createService({
          name: formData.name.trim(),
          marathiName: formData.marathiName.trim() || undefined,
          category: formData.category,
          priceStartingAt: formData.priceStartingAt.trim(),
          estimatedTime: formData.estimatedTime.trim() || undefined,
          shortDescription: formData.shortDescription.trim() || formData.name.trim(),
          fullDescription: formData.fullDescription.trim() || formData.shortDescription.trim(),
          included: cleanPoints,
          imageUrl: formData.imageUrl.trim() || '/images/services/general-service.jpg',
          isPopular: formData.isPopular,
        });
        setSuccessMsg(`New service "${formData.name}" added to Supabase DB!`);
      } else if (modalMode === 'edit' && formData.id) {
        await bikeServicesService.updateService(formData.id, {
          name: formData.name.trim(),
          marathiName: formData.marathiName.trim() || undefined,
          category: formData.category,
          priceStartingAt: formData.priceStartingAt.trim(),
          estimatedTime: formData.estimatedTime.trim() || undefined,
          shortDescription: formData.shortDescription.trim(),
          fullDescription: formData.fullDescription.trim(),
          included: cleanPoints,
          imageUrl: formData.imageUrl.trim(),
          isPopular: formData.isPopular,
        });
        setSuccessMsg(`Service "${formData.name}" updated in Supabase DB!`);
      }

      setIsModalOpen(false);
      loadData();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all service prices to standard garage defaults?')) {
      bikeServicesService.resetDefaults();
      loadData();
      setSuccessMsg('All service prices reset to defaults');
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.marathiName && s.marathiName.includes(search)) ||
      s.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      (s.priceStartingAt && s.priceStartingAt.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-gray-900 tracking-tight font-sans flex items-center gap-2.5">
            <Wrench className="w-6 h-6 text-[#DFA500]" />
            Services & Pricing Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your two-wheeler workshop services, pricing, and turnaround times in Supabase PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="px-3 py-2 rounded-xl bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Reset to factory preset rates"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Search & Overview Stats Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service name (e.g. Oil, Engine, Brake, Restoration)..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
          />
        </div>

        <div className="text-xs text-gray-500 flex items-center gap-2 self-start sm:self-auto">
          <span>Active Services in DB:</span>
          <span className="font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md">
            {services.length}
          </span>
        </div>
      </div>

      {/* Services List / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((service) => {
          const isEditing = editingId === service.id;

          return (
            <div
              key={service.id}
              className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all shadow-xs flex flex-col justify-between ${
                isEditing ? 'border-[#F5B900] ring-2 ring-[#F5B900]/20' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div>
                {/* Header row: Name, Badge, Actions */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0 bg-neutral-900"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                          {service.name}
                        </h3>
                        {service.isPopular && (
                          <span className="px-1.5 py-0.5 rounded bg-[#FFF9E6] border border-[#F5B900] text-[#DFA500] font-black text-[9px] uppercase tracking-wider">
                            Popular
                          </span>
                        )}
                      </div>
                      {service.marathiName && (
                        <span className="text-[11px] text-gray-500 block font-medium">
                          {service.marathiName}
                        </span>
                      )}
                      <span className="text-[10px] text-gray-400 capitalize inline-block mt-0.5">
                        Category: {service.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Toggle Popular */}
                    <button
                      onClick={() => handleTogglePopular(service.id, !!service.isPopular)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        service.isPopular
                          ? 'bg-[#F5B900] text-black border-[#F5B900]'
                          : 'bg-gray-50 text-gray-400 border-gray-200 hover:text-gray-700'
                      }`}
                      title={service.isPopular ? 'Remove Popular badge' : 'Mark as Popular on Website'}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>

                    {/* Full Edit Modal */}
                    <button
                      onClick={() => handleOpenEditModal(service)}
                      className="p-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 hover:text-black hover:border-gray-400 transition-colors"
                      title="Edit Full Service Details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Service */}
                    <button
                      onClick={() => handleDeleteService(service.id, service.name)}
                      className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Included Points Preview */}
                {service.included && service.included.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {service.included.slice(0, 3).map((pt, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md line-clamp-1 max-w-[220px]"
                      >
                        ✓ {pt}
                      </span>
                    ))}
                    {service.included.length > 3 && (
                      <span className="text-[10px] text-gray-400 font-bold self-center">
                        +{service.included.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Price & Duration Controls */}
              <div className="pt-3 border-t border-gray-100">
                {isEditing ? (
                  /* Quick Editing Mode */
                  <div className="space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Starting Price
                        </label>
                        <input
                          type="text"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          placeholder="e.g. ₹499"
                          className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#F5B900]"
                          autoFocus
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Est. Duration
                        </label>
                        <input
                          type="text"
                          value={editTime}
                          onChange={(e) => setEditTime(e.target.value)}
                          placeholder="e.g. 2 - 3 Hours"
                          className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                      <button
                        onClick={() => handleSavePrice(service.id)}
                        className="px-4 py-1.5 rounded-lg bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-extrabold uppercase flex items-center gap-1.5 shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Live</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Display Mode */
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        Website Display Price
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-base sm:text-lg font-black text-gray-900 font-mono">
                          {service.priceStartingAt}
                        </span>
                        {service.estimatedTime && (
                          <span className="text-[11px] text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {service.estimatedTime}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartEdit(service)}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all"
                      >
                        Quick Price
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(service)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Full</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── ADD / EDIT FULL SERVICE MODAL ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl border border-gray-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F5B900]/20 flex items-center justify-center text-amber-700">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black uppercase text-gray-900 tracking-tight">
                  {modalMode === 'create' ? 'Add New Two-Wheeler Service' : 'Edit Service Details'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleModalSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              {formError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
                  {formError}
                </div>
              )}

              {/* Service Name & Marathi Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Service Name (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Carburetor Tuning & Clean"
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Service Name (Marathi)
                  </label>
                  <input
                    type="text"
                    value={formData.marathiName}
                    onChange={(e) => setFormData({ ...formData, marathiName: e.target.value })}
                    placeholder="e.g. Carburetor Tuning & Clean (optional)"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>
              </div>

              {/* Category, Price, Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-medium"
                  >
                    <option value="maintenance">Routine Maintenance</option>
                    <option value="repair">Mechanical Repair</option>
                    <option value="restoration">Vintage Restoration</option>
                    <option value="cosmetic">Foam Wash & Detailing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Starting Price *
                  </label>
                  <input
                    type="text"
                    value={formData.priceStartingAt}
                    onChange={(e) => setFormData({ ...formData, priceStartingAt: e.target.value })}
                    placeholder="e.g. ₹299"
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Estimated Time
                  </label>
                  <input
                    type="text"
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                    placeholder="e.g. 1 - 2 Hours"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Short Description (Card Summary)
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief 1-sentence summary shown on service cards"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="In-depth details of what this service covers..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white leading-relaxed"
                />
              </div>

              {/* Included Checklist Points */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                    Included Points / Checklist
                  </label>
                  <button
                    type="button"
                    onClick={handleAddChecklistPoint}
                    className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Item</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.included.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs font-mono">{idx + 1}.</span>
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleUpdateChecklistPoint(idx, e.target.value)}
                        placeholder={`Feature / Inspection point ${idx + 1}`}
                        className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                      />
                      {formData.included.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveChecklistPoint(idx)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Image URL & Popular Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Image Path, URL or Upload File
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="/images/services/general-service.jpg"
                      className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900]"
                    />
                    <label className="px-2.5 py-1.5 rounded-lg bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-700 font-bold text-[11px] cursor-pointer shrink-0">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (loadEvt) => {
                              if (loadEvt.target?.result) {
                                setFormData((prev) => ({
                                  ...prev,
                                  imageUrl: loadEvt.target!.result as string,
                                }));
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Service Preview"
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 mt-1.5"
                    />
                  )}
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F5B900]"></div>
                    <span className="ml-2.5 text-xs font-bold text-gray-800">
                      Feature as "Popular" Service
                    </span>
                  </label>
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold uppercase tracking-wide flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving to DB...' : 'Save to Database'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
