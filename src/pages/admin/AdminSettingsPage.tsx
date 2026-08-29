import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  Users,
  Plus,
  Trash2,
  Key,
  Phone,
  ShieldCheck,
  X,
  AlertCircle,
  Eye,
  EyeOff,
  Receipt,
  Tag,
  Inbox,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { authService } from '../../services/authService';
import { AdminUser } from '../../types/auth';

export const AdminSettingsPage: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [mechanics, setMechanics] = useState<AdminUser[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mechName, setMechName] = useState('');
  const [mechUserOrMobile, setMechUserOrMobile] = useState('');
  const [mechPassword, setMechPassword] = useState('');
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [revealedPasswords, setRevealedPasswords] = useState<{ [id: string]: boolean }>({});
  const [mechPermissions, setMechPermissions] = useState<string[]>(['billing', 'parts']);
  const [mechError, setMechError] = useState<string | null>(null);
  const [mechSuccess, setMechSuccess] = useState<string | null>(null);

  const loadMechanics = async () => {
    const list = await authService.getMechanics();
    setMechanics(list);
  };

  useEffect(() => {
    loadMechanics();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCreateMechanic = async (e: React.FormEvent) => {
    e.preventDefault();
    setMechError(null);

    if (!mechName.trim() || !mechUserOrMobile.trim() || !mechPassword.trim()) {
      setMechError('Please enter Mechanic Name, Username/Mobile, and Password.');
      return;
    }

    if (mechPassword.trim().length < 4) {
      setMechError('Password must be at least 4 characters long.');
      return;
    }

    try {
      await authService.createMechanic({
        name: mechName.trim(),
        usernameOrMobile: mechUserOrMobile.trim(),
        password: mechPassword.trim(),
        permissions: mechPermissions,
      });

      setMechSuccess(`Mechanic account for "${mechName.trim()}" created successfully!`);
      setMechName('');
      setMechUserOrMobile('');
      setMechPassword('');
      setShowModalPassword(false);
      setMechPermissions(['billing', 'parts']);
      setIsAddModalOpen(false);
      await loadMechanics();
      setTimeout(() => setMechSuccess(null), 3500);
    } catch (err: any) {
      setMechError(err.message || 'Failed to create mechanic account.');
    }
  };

  const handleDeleteMechanic = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove mechanic account for "${name}"?`)) {
      await authService.deleteMechanic(id);
      await loadMechanics();
      setMechSuccess(`Mechanic account for "${name}" removed.`);
      setTimeout(() => setMechSuccess(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      {/* Workshop Profile Settings Card */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] border border-[#F5B900]/40 flex items-center justify-center text-[#DFA500]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black uppercase text-gray-900 tracking-tight font-sans">
              Garage Profile & Workshop Settings
            </h2>
            <p className="text-xs text-gray-500">
              Configure workshop operating hours, helpline numbers, and location info
            </p>
          </div>
        </div>

        {saved && (
          <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Settings saved successfully in workshop profile.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Garage Business Name
              </label>
              <input
                type="text"
                defaultValue="Chaudhari Auto Centre"
                className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#F5B900]"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Primary WhatsApp / Helpline
              </label>
              <input
                type="tel"
                defaultValue="+91 73874 48878 / +91 95038 53143"
                className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#F5B900]"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Operating Days & Hours
              </label>
              <input
                type="text"
                defaultValue="Monday – Sunday: 9:00 AM – 8:00 PM"
                className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#F5B900]"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Location Address
              </label>
              <input
                type="text"
                defaultValue="Main Road, Near Bus Stand, Pahur, Dist. Jalgaon, Maharashtra 424205"
                className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#F5B900]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-4 h-4" />}
              className="text-xs uppercase font-bold"
            >
              Save Configuration
            </Button>
          </div>
        </form>
      </div>

      {/* ─── MECHANIC & STAFF ACCOUNTS MANAGEMENT (SUPER ADMIN) ─── */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Mechanic & Staff Accounts
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                  Super Admin Feature
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Create mechanic logins with mobile number or username and password. Mechanics can only access Billing.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setMechError(null);
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-bold text-xs flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Mechanic</span>
          </button>
        </div>

        {/* Success / Notification Banner */}
        {mechSuccess && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{mechSuccess}</span>
          </div>
        )}

        {/* Mechanic Accounts List */}
        <div className="space-y-3">
          {mechanics.length === 0 ? (
            <div className="py-10 text-center border-2 border-dashed border-gray-200 rounded-xl">
              <ShieldCheck className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">No Mechanic Accounts Yet</p>
              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                Add mechanic staff members so they can log in using their mobile number or username to create bills and view job cards.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 uppercase font-bold text-[10px]">
                      <th className="py-3 px-4">Mechanic Name</th>
                      <th className="py-3 px-4">Login Username / Mobile</th>
                      <th className="py-3 px-4">Password</th>
                      <th className="py-3 px-4">Allowed Functionalities</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mechanics.map((mech) => (
                      <tr key={mech.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3 px-4 font-bold text-gray-900 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                            {mech.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span>{mech.name}</span>
                            <span className="block text-[10px] text-gray-400 font-normal">
                              Workshop Staff
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700 font-mono">
                          {mech.mobile || mech.username}
                        </td>
                        <td className="py-3 px-4 text-gray-700 font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-gray-900">
                              {revealedPasswords[mech.id]
                                ? mech.passwordPreview || '••••••'
                                : '••••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setRevealedPasswords((prev) => ({
                                  ...prev,
                                  [mech.id]: !prev[mech.id],
                                }))
                              }
                              className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors"
                              title={
                                revealedPasswords[mech.id]
                                  ? 'Hide password'
                                  : 'Show password'
                              }
                            >
                              {revealedPasswords[mech.id] ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <Receipt className="w-2.5 h-2.5" />
                              Billing
                            </span>
                            {mech.permissions?.includes('parts') && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                                <Tag className="w-2.5 h-2.5" />
                                Parts
                              </span>
                            )}
                            {mech.permissions?.includes('customers') && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                                <Users className="w-2.5 h-2.5" />
                                Customers
                              </span>
                            )}
                            {mech.permissions?.includes('enquiries') && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-200">
                                <Inbox className="w-2.5 h-2.5" />
                                Enquiries
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteMechanic(mech.id, mech.name)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Staff Cards View */}
              <div className="sm:hidden divide-y divide-gray-100">
                {mechanics.map((mech) => (
                  <div key={mech.id} className="p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                          {mech.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-gray-900 text-sm block truncate">
                            {mech.name}
                          </span>
                          <span className="text-[11px] text-gray-500 font-mono block">
                            {mech.mobile || mech.username}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteMechanic(mech.id, mech.name)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                        title="Delete account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Password Row */}
                    <div className="flex items-center justify-between text-xs font-mono bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200">
                      <span className="text-gray-500 text-[11px]">Password:</span>
                      <div className="flex items-center gap-1.5 font-bold text-gray-900">
                        <span>
                          {revealedPasswords[mech.id]
                            ? mech.passwordPreview || '••••••'
                            : '••••••••'}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setRevealedPasswords((prev) => ({
                              ...prev,
                              [mech.id]: !prev[mech.id],
                            }))
                          }
                          className="p-1 text-gray-500 hover:text-gray-800"
                          title={
                            revealedPasswords[mech.id]
                              ? 'Hide password'
                              : 'Show password'
                          }
                        >
                          {revealedPasswords[mech.id] ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Functionalities Badges */}
                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <Receipt className="w-2.5 h-2.5" />
                        Billing
                      </span>
                      {mech.permissions?.includes('parts') && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                          <Tag className="w-2.5 h-2.5" />
                          Parts Pricing
                        </span>
                      )}
                      {mech.permissions?.includes('customers') && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                          <Users className="w-2.5 h-2.5" />
                          Customers
                        </span>
                      )}
                      {mech.permissions?.includes('enquiries') && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-200">
                          <Inbox className="w-2.5 h-2.5" />
                          Enquiries
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ─── ADD MECHANIC MODAL ─── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-gray-100 animate-scale-up space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#F5B900]" />
                <h3 className="font-bold text-base text-gray-900">Create Mechanic Account</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {mechError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{mechError}</span>
              </div>
            )}

            <form onSubmit={handleCreateMechanic} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Mechanic Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil"
                  value={mechName}
                  onChange={(e) => setMechName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Username or 10-Digit Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9822112233 or ramesh_mech"
                    value={mechUserOrMobile}
                    onChange={(e) => setMechUserOrMobile(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  The mechanic will type this to log in to the garage portal.
                </p>
              </div>

              {/* Password with Show/Hide toggle */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-gray-700">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowModalPassword(!showModalPassword)}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                  >
                    {showModalPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide Password</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Show Password</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <Key className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showModalPassword ? 'text' : 'password'}
                    required
                    placeholder="Create a password (min 4 chars)"
                    value={mechPassword}
                    onChange={(e) => setMechPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-10 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#F5B900] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowModalPassword(!showModalPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1"
                    title={showModalPassword ? 'Hide password' : 'Show password'}
                  >
                    {showModalPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Functionality & Permissions Selection */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-gray-900 text-xs">
                    Choose Functionalities for Mechanic
                  </label>
                  <span className="text-[10px] text-gray-400 font-medium">Access Control</span>
                </div>

                <div className="space-y-2 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                  {/* Core: Billing */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-emerald-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <Receipt className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-xs block">
                          Billing & Invoices
                        </span>
                        <span className="text-[10px] text-gray-500 block">
                          Create bills, print invoices, WhatsApp receipts
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                      Core Access
                    </span>
                  </div>

                  {/* Spare Parts Pricing */}
                  <label className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200 hover:border-amber-300 cursor-pointer transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-xs block">
                          Spare Part Pricing
                        </span>
                        <span className="text-[10px] text-gray-500 block">
                          View parts catalog & standard rates while billing
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={mechPermissions.includes('parts')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMechPermissions((prev) => [...prev, 'parts']);
                        } else {
                          setMechPermissions((prev) => prev.filter((p) => p !== 'parts'));
                        }
                      }}
                      className="w-4 h-4 text-[#F5B900] accent-[#F5B900] rounded cursor-pointer"
                    />
                  </label>

                  {/* Customer Directory */}
                  <label className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-xs block">
                          Customer Directory
                        </span>
                        <span className="text-[10px] text-gray-500 block">
                          Lookup customer phone, bike model & previous service
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={mechPermissions.includes('customers')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMechPermissions((prev) => [...prev, 'customers']);
                        } else {
                          setMechPermissions((prev) => prev.filter((p) => p !== 'customers'));
                        }
                      }}
                      className="w-4 h-4 text-[#F5B900] accent-[#F5B900] rounded cursor-pointer"
                    />
                  </label>

                  {/* Customer Inquiries */}
                  <label className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200 hover:border-purple-300 cursor-pointer transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                        <Inbox className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-xs block">
                          Two-Wheeler Enquiries
                        </span>
                        <span className="text-[10px] text-gray-500 block">
                          View incoming service enquiries & leads
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={mechPermissions.includes('enquiries')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMechPermissions((prev) => [...prev, 'enquiries']);
                        } else {
                          setMechPermissions((prev) => prev.filter((p) => p !== 'enquiries'));
                        }
                      }}
                      className="w-4 h-4 text-[#F5B900] accent-[#F5B900] rounded cursor-pointer"
                    />
                  </label>
                </div>

                <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Super Admin Exclusive:</strong> Workshop Total Revenue, Profits, Services pricing modifications, and Staff Accounts are strictly hidden from mechanics.
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-bold text-xs shadow-xs"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
