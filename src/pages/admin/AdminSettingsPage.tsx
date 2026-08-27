import React, { useState } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const AdminSettingsPage: React.FC = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] border border-[#F5B900]/40 flex items-center justify-center text-[#DFA500]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight font-sans">
              Garage Portal Settings
            </h2>
            <p className="text-xs text-gray-500">
              Configure workshop operating hours, helpline numbers, and notification settings
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
                defaultValue="+91 98220 00000"
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
    </div>
  );
};
