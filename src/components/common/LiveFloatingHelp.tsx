import React, { useState } from 'react';
import { MessageSquare, Phone, X, Sparkles, Clock, MapPin } from 'lucide-react';

export const LiveFloatingHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end hidden sm:flex">
      {/* Expanded Live Workshop Modal */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#121212]/95 backdrop-blur-xl border border-[#2A2A2A] rounded-2xl p-4 text-white shadow-2xl animate-fade-in-up">
          <div className="flex items-center justify-between border-b border-[#222222] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white">
                  Chaudhari Auto Desk
                </h4>
                <p className="text-[10px] text-emerald-400 font-bold">
                  Mechanics Available Live
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-neutral-300 mb-3 leading-relaxed">
            Need quick bike advice or want to book an emergency inspection? Talk directly to our workshop supervisor.
          </p>

          <div className="space-y-2">
            <a
              href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-950/40 group"
            >
              <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="tel:+919822000000"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1c1c1c] hover:bg-[#262626] border border-neutral-700 text-neutral-200 font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#F5B900]" />
              <span>Call +91 98220 00000</span>
            </a>

            <a
              href="https://www.instagram.com/chaudhari_auto_pahur/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-[#833ab4]/25 via-[#fd1d1d]/25 to-[#fcb045]/25 hover:from-[#833ab4]/35 hover:via-[#fd1d1d]/35 hover:to-[#fcb045]/35 border border-pink-500/30 text-pink-300 font-bold text-[11px] uppercase tracking-wider transition-all"
            >
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>@chaudhari_auto_pahur (Workshop Reels)</span>
            </a>

            <a
              href="https://www.instagram.com/_rcvlogs_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-1.5 px-4 rounded-xl bg-black/40 hover:bg-black/60 border border-neutral-800 text-neutral-300 font-semibold text-[10px] uppercase tracking-wider transition-all"
            >
              <span className="text-[#F5B900]">★</span>
              <span>@_rcvlogs_ (Owner Moto Vlogs)</span>
            </a>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#222222] flex items-center justify-between text-[10px] text-neutral-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-500" /> 9 AM – 8:30 PM
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-neutral-500" /> Pahur, MH
            </span>
          </div>
        </div>
      )}

      {/* Floating Pill / Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#161616] hover:bg-[#1f1f1f] border border-emerald-500/50 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Toggle Live Workshop Help"
      >
        {/* Animated radar ripple effect on button */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
        </span>

        <span className="text-xs font-bold uppercase tracking-wider text-neutral-200 group-hover:text-white">
          Live Workshop Help
        </span>

        <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
          <MessageSquare className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
