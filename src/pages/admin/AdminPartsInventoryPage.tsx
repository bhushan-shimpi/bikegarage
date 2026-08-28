import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  IndianRupee,
  Layers,
  X,
  Save,
  Wrench,
} from 'lucide-react';
import { partService } from '../../services/partService';
import { SparePart } from '../../types/customer';

const CATEGORIES = [
  'All',
  'Lubricants',
  'Brakes',
  'Electrical',
  'Engine',
  'Transmission',
  'Controls',
  'Suspension',
  'Body',
  'General',
];

export const AdminPartsInventoryPage: React.FC = () => {
  const [parts, setParts] = useState<SparePart[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<SparePart | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'General',
    price: 150,
    stockQuantity: 10,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadParts = async () => {
    setLoading(true);
    const data = await partService.getAll();
    setParts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadParts();
  }, []);

  const handleOpenAdd = () => {
    setEditingPart(null);
    setFormData({
      name: '',
      category: 'General',
      price: 150,
      stockQuantity: 10,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (part: SparePart) => {
    setEditingPart(part);
    setFormData({
      name: part.name,
      category: part.category || 'General',
      price: part.price,
      stockQuantity: part.stockQuantity,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Part name is required');
      return;
    }
    if (formData.price < 0) {
      setFormError('Price cannot be negative');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      if (editingPart) {
        await partService.update(editingPart.id, formData);
        setSuccessMsg(`Updated part: "${formData.name}"`);
      } else {
        await partService.create(formData);
        setSuccessMsg(`Added new part: "${formData.name}"`);
      }
      setIsModalOpen(false);
      loadParts();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save spare part');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (part: SparePart) => {
    if (window.confirm(`Are you sure you want to delete "${part.name}" from inventory?`)) {
      setParts((prev) => prev.filter((p) => p.id !== part.id));
      await partService.delete(part.id);
      loadParts();
      setSuccessMsg(`Deleted "${part.name}"`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const filtered = parts.filter((p) => {
    const matchesCategory =
      categoryFilter === 'All' || p.category.toLowerCase() === categoryFilter.toLowerCase();
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const totalValue = parts.reduce((acc, p) => acc + (p.price * p.stockQuantity), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-gray-900 tracking-tight font-sans flex items-center gap-2.5">
            <Package className="w-6 h-6 text-[#DFA500]" />
            Spare Parts Inventory & Price List
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage two-wheeler spare parts, selling prices, and stock levels for quick job card billing
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Part</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block">Total Parts Listed</span>
            <span className="text-xl font-black text-gray-900 font-mono">{parts.length}</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block">Total Stock Units</span>
            <span className="text-xl font-black text-blue-950 font-mono">
              {parts.reduce((sum, p) => sum + (p.stockQuantity || 0), 0)}
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center gap-3.5 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <IndianRupee className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block">Total Inventory Value</span>
            <span className="text-xl font-black text-emerald-700 font-mono">
              ₹{totalValue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search part by name, category, oil grade..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900] focus:bg-white"
            />
          </div>

          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>Showing:</span>
            <strong className="text-gray-900">{filtered.length}</strong>
            <span>of {parts.length} parts</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all border ${
                categoryFilter === cat
                  ? 'bg-[#F5B900] text-black border-[#F5B900] shadow-xs'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Parts Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-xs text-gray-400">Loading spare parts inventory...</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Package className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-sm font-bold text-gray-700">No parts found</p>
            <p className="text-xs text-gray-400">Try changing your search query or category filter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-black uppercase text-gray-500 tracking-wider">
                  <th className="py-3.5 px-4">Part Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Selling Price (₹)</th>
                  <th className="py-3.5 px-4">Available Stock</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((part) => (
                  <tr key={part.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-3.5 h-3.5 text-[#DFA500] shrink-0" />
                        <span>{part.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 border border-gray-200">
                        {part.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-black text-sm text-gray-900">
                      ₹{part.price}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold font-mono ${
                          part.stockQuantity <= 3
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {part.stockQuantity} in stock
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(part)}
                          className="p-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-[#F5B900] hover:text-black transition-colors"
                          title="Edit Part"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(part)}
                          className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Delete Part"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md border border-gray-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-700" />
                <h3 className="text-sm font-black uppercase text-gray-900 tracking-tight">
                  {editingPart ? 'Edit Spare Part' : 'Add New Spare Part'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              {formError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 font-medium">
                  {formError}
                </div>
              )}

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Part Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Front Disc Brake Pad Set"
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                >
                  {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) || 0 })}
                    min="0"
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) || 0 })}
                    min="0"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-black text-xs uppercase flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Saving...' : 'Save Part'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
