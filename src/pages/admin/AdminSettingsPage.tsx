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
  Copy,
  Check,
  MessageCircle,
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

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCredentials = (mech: AdminUser) => {
    const passwordText = mech.passwordPreview || '••••••';
    const text = `🏍️ Chaudhari Auto Centre - Staff Login Credentials\n\n👤 Staff Name: ${mech.name}\n📱 Login Mobile: ${mech.mobile || mech.username}\n🔑 Password: ${passwordText}\n🌐 Login URL: ${window.location.origin}/garage/login`;
    navigator.clipboard.writeText(text);
    setCopiedId(mech.id);
    setMechSuccess(`Login credentials for ${mech.name} copied to clipboard!`);
    setTimeout(() => {
      setCopiedId(null);
      setMechSuccess(null);
    }, 2500);
  };

  const handleShareWhatsApp = (mech: AdminUser) => {
    const passwordText = mech.passwordPreview || 'Contact Garage Owner';
    const text = `🏍️ *Chaudhari Auto Centre - Staff Login Credentials*\n\n👤 *Staff Name:* ${mech.name}\n📱 *Login Mobile:* ${mech.mobile || mech.username}\n🔑 *Password:* ${passwordText}\n🌐 *Login URL:* ${window.location.origin}/garage/login\n\n_Please keep your password secure._`;
    const mobileDigits = (mech.mobile || '').replace(/\D/g, '');
    const targetMobile = mobileDigits.length === 10 ? `91${mobileDigits}` : mobileDigits;
    const url = targetMobile
      ? `https://wa.me/${targetMobile}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
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
            className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all shrink-0 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Mechanic</span>
          </button>
        </div>

        {/* Success / Notification Banner */}
        {mechSuccess && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{mechSuccess}</span>
          </div>
        )}

        {/* Mechanic Accounts List: Separate Card for Each Row */}
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
            <div className="space-y-3">
              {mechanics.map((mech) => (
                <div
                  key={mech.id}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-amber-300 p-4 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0">
                      {mech.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm truncate">{mech.name}</span>
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.2 rounded font-medium">
                          Workshop Staff
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-mono">
                        <span>
                          Login: <strong className="text-gray-900">{mech.mobile || mech.username}</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          Password:
                          <strong className="text-gray-900">
                            {revealedPasswords[mech.id] ? mech.passwordPreview || '••••••' : '••••••••'}
                          </strong>
                          <button
                            type="button"
                            onClick={() =>
                              setRevealedPasswords((prev) => ({
                                ...prev,
                                [mech.id]: !prev[mech.id],
                              }))
                            }
                            className="p-0.5 text-gray-400 hover:text-gray-700"
                            title={revealedPasswords[mech.id] ? 'Hide password' : 'Show password'}
                          >
                            {revealedPasswords[mech.id] ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </span>
                      </div>
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
                  </div>

                  <div className="flex items-center justify-end gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <button
                      type="button"
                      onClick={() => handleCopyCredentials(mech)}
                      className={`p-2 rounded-xl border transition-all ${
                        copiedId === mech.id
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                      title="Copy Login Credentials"
                    >
                      {copiedId === mech.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(mech)}
                      className="p-2 text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors shadow-2xs"
                      title="Send Login via WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteMechanic(mech.id, mech.name)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl border border-red-200 transition-colors"
                      title="Delete account"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
