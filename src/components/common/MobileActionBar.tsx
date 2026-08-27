import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export const MobileActionBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E0E]/95 backdrop-blur-md border-t border-[#262626] px-3 py-2 sm:hidden flex items-center justify-between gap-2 shadow-2xl safe-area-bottom">
      {/* Call Button */}
      <a
        href="tel:+919822000000"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#1F1F1F] text-neutral-200 border border-[#333333] active:bg-[#2A2A2A] text-xs font-bold transition-colors"
      >
        <Phone className="w-4 h-4 text-[#F5B900]" />
        <span>Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#25D366] text-white active:bg-[#1EBE5D] text-xs font-bold transition-colors shadow-sm"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>

      {/* Book Button (Yellow Primary Action) */}
      <Link
        to="/book-appointment"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#F5B900] text-black font-black text-xs uppercase tracking-wider shadow-md transition-transform active:scale-95 hover:bg-[#DFA500]"
      >
        <Calendar className="w-4 h-4" />
        <span>Book</span>
      </Link>
    </div>
  );
};
