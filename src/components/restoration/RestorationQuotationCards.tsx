import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

interface QuotationProps {
  onSelectCCType?: (ccType: '100cc' | '150cc') => void;
  className?: string;
  theme?: 'dark' | 'light';
}

export const RestorationQuotationCards: React.FC<QuotationProps> = ({
  onSelectCCType,
  className = '',
  theme = 'dark',
}) => {
  const [activeTab, setActiveTab] = useState<'all' | '100cc' | '150cc'>('all');

  const isDark = theme === 'dark';

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Title & Badge */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F5B900]/40 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Standard Bike Restoration Quotations</span>
        </div>
        <h3 className={`text-xl sm:text-3xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
          अंदाजे कोटेशन व खर्च तपशील (100cc & 150cc)
        </h3>
        <p className={`text-xs sm:text-sm mt-1.5 ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
          Transparent fixed charges and showroom condition estimates for vintage & standard motorcycles.
        </p>

        {/* Mobile / Screen Tabs */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-4">
          <button
            type="button"
            onClick={() => setActiveTab('100cc')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === '100cc'
                ? 'bg-[#F5B900] text-black shadow-md'
                : isDark
                ? 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                : 'bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            100cc Bike
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('150cc')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === '150cc'
                ? 'bg-[#F5B900] text-black shadow-md'
                : isDark
                ? 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                : 'bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            150cc Bike
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white/20 text-white'
                : 'text-neutral-500'
            }`}
          >
            Both
          </button>
        </div>
      </div>

      {/* Quotation Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        
        {/* ─── 100cc BIKE QUOTATION CARD ─── */}
        {(activeTab === 'all' || activeTab === '100cc') && (
          <div
            className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${
              isDark
                ? 'bg-gradient-to-b from-[#161616] to-[#0f0f0f] border-[#2b2b2b] hover:border-[#F5B900]/60'
                : 'bg-white border-gray-200 hover:border-[#F5B900]'
            }`}
          >
            <div>
              {/* Card Header */}
              <div className={`p-5 sm:p-6 border-b ${isDark ? 'border-white/10 bg-neutral-900/60' : 'border-gray-100 bg-amber-50/50'}`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-[#F5B900] text-black">
                    100cc Category
                  </span>
                  <span className={`text-[11px] font-medium ${isDark ? 'text-neutral-400' : 'text-gray-500'}`}>
                    Splendor • Passion • CD Deluxe • Platina
                  </span>
                </div>

                <h4 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  100cc Bike Restoration
                </h4>
                <p className={`text-xs mt-1 ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>
                  Complete cosmetic & chassis restoration package
                </p>

                {/* Pricing Badges */}
                <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-black/40 border-neutral-800' : 'bg-gray-50 border-gray-200'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-neutral-400">
                      Fixed Base Cost (फिक्स)
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-mono text-[#F5B900]">
                      ₹18,850/-
                    </span>
                  </div>

                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-emerald-950/30 border-emerald-800/40' : 'bg-emerald-50 border-emerald-200'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-emerald-400 font-semibold">
                      Showroom Condition
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                      ₹20,000+
                    </span>
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xs">
                  <table className="w-full text-xs text-left">
                    <thead className={`${isDark ? 'bg-neutral-900 text-neutral-300' : 'bg-gray-100 text-gray-700'} font-bold`}>
                      <tr>
                        <th className="py-2.5 px-3">Scope of Work (तपशील)</th>
                        <th className="py-2.5 px-3 text-right">Fixed Cost</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-white/5 bg-[#121212] text-neutral-200' : 'divide-gray-100 bg-white text-gray-800'}`}>
                      <tr>
                        <td className="py-2 px-3 font-medium">
                          Colour & Ceramic Coating
                          <span className="block text-[10px] text-neutral-400 font-normal">
                            Bhatti / oven baked paint + gloss protection
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-[#F5B900]">
                          ₹8,500/-
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">
                          Assemble Full Bike Fitting
                          <span className="block text-[10px] text-neutral-400 font-normal">
                            Full disassembly, cleaning & precise reassembly
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-[#F5B900]">
                          ₹6,000/-
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">
                          Stickers / Monogram
                          <span className="block text-[10px] text-neutral-400 font-normal">
                            Complete OEM tank, side panel & tail badging
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-[#F5B900]">
                          ₹850/-
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">
                          Original Fibre Kit
                          <span className="block text-[10px] text-neutral-400 font-normal">
                            Headlight visor, front mudguard, side panels, tail panel, rear mudguard
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-[#F5B900]">
                          ₹3,500/-
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className={`${isDark ? 'bg-neutral-900 border-t border-white/10 text-white' : 'bg-amber-50 border-t border-amber-200 text-gray-900'} font-bold`}>
                      <tr>
                        <td className="py-2.5 px-3 font-extrabold text-xs">
                          Evdhe Paise Fix Lagtil (Total Fixed)
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-sm font-black text-[#F5B900]">
                          ₹18,850/-
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Important Notes Box */}
                <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                  isDark ? 'bg-amber-950/20 border-amber-800/40 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <p className="font-bold flex items-center gap-1.5 mb-0.5">
                    <Info className="w-3.5 h-3.5 text-[#F5B900] shrink-0" />
                    <span>महत्त्वाची नोंद (Showroom Condition):</span>
                  </p>
                  <p className="text-[11px]">
                    100cc बाईकला <strong>शोरूम कंडिशन (Showroom Condition)</strong> करायची असल्यास <strong>कमीत कमी ₹20,000+</strong> एवढा खर्च येऊ शकतो.
                  </p>
                  <p className="text-[11px] mt-1 text-neutral-400">
                    * Other spare parts टाकायचे असतील तर त्याचे separate charges द्यावे लागेल.
                  </p>
                </div>
              </div>
            </div>

            {/* Card Action CTAs */}
            <div className={`p-4 sm:p-5 border-t flex items-center gap-2 ${isDark ? 'border-white/10 bg-neutral-950/40' : 'border-gray-100 bg-gray-50'}`}>
              <a
                href={`https://wa.me/917387448878?text=${encodeURIComponent(
                  'Hello Chaudhari Auto! I want a restoration quotation for my 100cc motorcycle (₹18,850 fixed / ₹20,000+ showroom). Please assist.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>100cc WhatsApp Quote</span>
              </a>

              {onSelectCCType && (
                <button
                  type="button"
                  onClick={() => onSelectCCType('100cc')}
                  className="py-2.5 px-3 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                >
                  Select 100cc
                </button>
              )}
            </div>
          </div>
        )}

        {/* ─── 150cc BIKE QUOTATION CARD ─── */}
        {(activeTab === 'all' || activeTab === '150cc') && (
          <div
            className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${
              isDark
                ? 'bg-gradient-to-b from-[#161616] to-[#0f0f0f] border-[#2b2b2b] hover:border-[#F5B900]/60'
                : 'bg-white border-gray-200 hover:border-[#F5B900]'
            }`}
          >
            <div>
              {/* Card Header */}
              <div className={`p-5 sm:p-6 border-b ${isDark ? 'border-white/10 bg-neutral-900/60' : 'border-gray-100 bg-amber-50/50'}`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-orange-500 text-white">
                    150cc Category
                  </span>
                  <span className={`text-[11px] font-medium ${isDark ? 'text-neutral-400' : 'text-gray-500'}`}>
                    Pulsar 150/180 • Unicorn • FZ • Apache • Hunk
                  </span>
                </div>

                <h4 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  150cc Bike Restoration
                </h4>
                <p className={`text-xs mt-1 ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>
                  Heavy-duty performance & visual restoration package
                </p>

                {/* Pricing Badges */}
                <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-black/40 border-neutral-800' : 'bg-gray-50 border-gray-200'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-neutral-400">
                      Fixed Base Cost (फिक्स)
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-mono text-[#F5B900]">
                      ₹24,500/-
                    </span>
                  </div>

                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-emerald-950/30 border-emerald-800/40' : 'bg-emerald-50 border-emerald-200'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-emerald-400 font-semibold">
                      Showroom Condition
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                      ₹25,000+
                    </span>
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xs">
                  <table className="w-full text-xs text-left">
                    <thead className={`${isDark ? 'bg-neutral-900 text-neutral-300' : 'bg-gray-100 text-gray-700'} font-bold`}>
                      <tr>
                        <th className="py-2.5 px-3">Scope of Work (तपशील)</th>
                        <th className="py-2.5 px-3 text-right">Fixed Cost</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-white/5 bg-[#121212] text-neutral-200' : 'divide-gray-100 bg-white text-gray-800'}`}>
                      <tr>
                        <td className="py-2 px-3 font-medium">
                          Colour & Ceramic Coating
                          <span className="block text-[10px] text-neutral-400 font-normal">
                            High-durability oven baking + hydrophobic ceramic shield
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-[#F5B900]">
                          ₹9,000/-
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">
                          Assemble Full Bike Fitting
                          <span className="block text-[10px] text-neutral-400 font-normal">
                            Complete teardown, engine alignment & precision torque fitting
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-[#F5B900]">
                          ₹7,000/-
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">
                          Stickers / Monogram
                          <span className="block text-[10px] text-neutral-400 font-normal">
                            Original 3D metallic tank monograms & side badges
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-[#F5B900]">
                          ₹1,000/-
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">
                          Original Fibre Kit
                          <span className="block text-[10px] text-neutral-400 font-normal">
                            Headlight visor, front mudguard, side panels, tail panel, rear mudguard
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-[#F5B900]">
                          ₹7,500/-
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className={`${isDark ? 'bg-neutral-900 border-t border-white/10 text-white' : 'bg-amber-50 border-t border-amber-200 text-gray-900'} font-bold`}>
                      <tr>
                        <td className="py-2.5 px-3 font-extrabold text-xs">
                          Evdhe Paise Fix Lagtil (Total Fixed)
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-sm font-black text-[#F5B900]">
                          ₹24,500/-
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Important Notes Box */}
                <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                  isDark ? 'bg-amber-950/20 border-amber-800/40 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <p className="font-bold flex items-center gap-1.5 mb-0.5">
                    <Info className="w-3.5 h-3.5 text-[#F5B900] shrink-0" />
                    <span>महत्त्वाची नोंद (Showroom Condition):</span>
                  </p>
                  <p className="text-[11px]">
                    150cc बाईकला <strong>शोरूम कंडिशन (Showroom Condition)</strong> करायची असल्यास <strong>कमीत कमी ₹25,000+</strong> एवढा खर्च येऊ शकतो.
                  </p>
                  <p className="text-[11px] mt-1 text-neutral-400">
                    * Other spare parts टाकायचे असतील तर त्याचे separate charges द्यावे लागेल.
                  </p>
                </div>
              </div>
            </div>

            {/* Card Action CTAs */}
            <div className={`p-4 sm:p-5 border-t flex items-center gap-2 ${isDark ? 'border-white/10 bg-neutral-950/40' : 'border-gray-100 bg-gray-50'}`}>
              <a
                href={`https://wa.me/917387448878?text=${encodeURIComponent(
                  'Hello Chaudhari Auto! I want a restoration quotation for my 150cc motorcycle (₹24,500 fixed / ₹25,000+ showroom). Please assist.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>150cc WhatsApp Quote</span>
              </a>

              {onSelectCCType && (
                <button
                  type="button"
                  onClick={() => onSelectCCType('150cc')}
                  className="py-2.5 px-3 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black text-xs font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                >
                  Select 150cc
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* General Transparency Banner */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
        isDark ? 'bg-[#111111] border-[#222222] text-neutral-300' : 'bg-gray-50 border-gray-200 text-gray-700'
      }`}>
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#F5B900] shrink-0" />
          <span>
            <strong>पारदर्शक कामाची हमी:</strong> ग्राहकाच्या पूर्वपरवानगीशिवाय (Prior Approval) कोणतेही अतिरिक्त काम केले जात नाही.
          </span>
        </div>

        <span className="text-[11px] font-bold text-[#F5B900] whitespace-nowrap">
          📍 Chaudhari Auto, Pahur
        </span>
      </div>
    </div>
  );
};
