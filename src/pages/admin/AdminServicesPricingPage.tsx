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
} from 'lucide-react';
import { bikeServicesService } from '../../services/bikeServicesService';
import { ServiceItem } from '../../types/service';

export const AdminServicesPricingPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editTime, setEditTime] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadData = () => {
    setServices(bikeServicesService.getAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setEditPrice(service.priceStartingAt || '');
    setEditTime(service.estimatedTime || '');
  };

  const handleSavePrice = (id: string) => {
    if (!editPrice.trim()) return;

    bikeServicesService.updateService(id, {
      priceStartingAt: editPrice.trim(),
      estimatedTime: editTime.trim() || undefined,
    });

    loadData();
    setEditingId(null);
    setSuccessMsg(`Price updated successfully to ${editPrice.trim()}`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleTogglePopular = (id: string, current: boolean) => {
    bikeServicesService.updateService(id, { isPopular: !current });
    loadData();
    setSuccessMsg('Service featured status updated');
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all service prices to standard garage defaults?')) {
      bikeServicesService.resetDefaults();
      loadData();
      setSuccessMsg('All service prices reset to defaults');
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
    (s.priceStartingAt && s.priceStartingAt.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-gray-900 tracking-tight font-sans">
            Services & Pricing Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Set starting rates and service times. Changes update live across the public website immediately.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-lg bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
            <span>Reset Factory Prices</span>
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
          <span>Total Two-Wheeler Services:</span>
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
                {/* Header row: Name, Badge, Image */}
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
                      <span className="text-[11px] text-gray-500 capitalize">
                        Category: {service.category}
                      </span>
                    </div>
                  </div>

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
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              {/* Price & Duration Controls */}
              <div className="pt-3 border-t border-gray-100">
                {isEditing ? (
                  /* Editing Mode */
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

                    <button
                      onClick={() => handleStartEdit(service)}
                      className="px-3.5 py-2 rounded-lg bg-gray-100 hover:bg-[#F5B900] text-gray-700 hover:text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Pricing</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
