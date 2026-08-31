import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Droplets,
  Sun,
  ShieldCheck,
  Layers,
  CheckCircle2,
  Bike,
  Car,
  Info,
  Calendar,
  Phone,
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { ScrollReveal } from '../common/ScrollReveal';

const BIKE_PACKAGES = [
  { model: 'Hero Splendor', price: '₹3,000/-', desc: 'Complete 9H paint prep & ceramic protection' },
  { model: 'Honda Unicorn', price: '₹4,000/-', desc: 'Tank, panels, engine buff & hydrophobic coat' },
  { model: 'Bajaj Pulsar', price: '₹4,000/-', desc: 'Full body high-gloss ceramic shielding' },
  { model: 'Royal Enfield Bullet / Classic', price: '₹5,000/-', desc: 'Heavy metal compounding, chrome & tank gloss' },
];

export const CeramicCoatingSection: React.FC = () => {
  return (
    <section id="ceramic-coating" className="py-16 sm:py-24 bg-[#0D0D0D] relative overflow-hidden border-t border-[#1C1C1C]">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        
        {/* ─── HEADER & INTRO ─── */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F5B900]/30 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>PREMIUM VEHICLE DETAILING • PAHUR</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-sans">
              🏍️✨ Premium Ceramic Coating (Bike & Car)
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
              तुमच्या वाहनाचा शाईन, पेंट आणि प्रीमियम फिनिश अधिक काळ टिकवण्यासाठी <strong className="text-[#F5B900]">Chaudhari Auto Centre</strong> मध्ये Professional Ceramic Coating Service उपलब्ध आहे.
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Ceramic Coating ही वाहनाच्या पेंटच्या पृष्ठभागावर तयार होणारी <strong className="text-white font-semibold">Protective Layer</strong> आहे. ही कोटिंग धूळ, पाणी, UV Rays आणि रोजच्या वापरामुळे होणाऱ्या सामान्य बाह्य परिणामांपासून पेंटचे संरक्षण करण्यास मदत करते आणि वाहनाला Glossy & Showroom Finish देते.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── 6 KEY BENEFITS GRID ─── */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-2 border-b border-[#262626] pb-3">
              <Sparkles className="w-5 h-5 text-[#F5B900]" />
              <h3 className="text-sm sm:text-base font-black text-white uppercase font-sans tracking-wide">
                ✨ Ceramic Coating काय काम करते? (Key Benefits)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {[
                { icon: Sparkles, title: 'Deep Gloss & Premium Shine', mr: 'वाहनाला Deep Gloss & Showroom Shine देते' },
                { icon: Droplets, title: 'Hydrophobic Protection', mr: 'Hydrophobic Effect मुळे पाणी सहज वाहून जाते' },
                { icon: Sun, title: 'UV Rays Sun Protection', mr: 'UV Rays मुळे होणाऱ्या पेंट फेडिंगपासून संरक्षण' },
                { icon: ShieldCheck, title: 'Paint Shield Layer', mr: 'पेंटला सामान्य बाह्य परिणामांपासून संरक्षण देते' },
                { icon: Layers, title: 'Anti-Dust Resistance', mr: 'धूळ आणि मळ चिकटणे कमी होण्यास मदत' },
                { icon: CheckCircle2, title: 'Easy Maintenance', mr: 'वाहनाची Cleaning & Washing सोपी होते' },
              ].map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#0B0B0B] border border-[#262626] hover:border-[#F5B900]/50 transition-all group space-y-1.5"
                  >
                    <div className="flex items-center gap-2.5 text-[#F5B900]">
                      <div className="w-8 h-8 rounded-xl bg-[#F5B900]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-white uppercase font-sans tracking-tight">
                        {b.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-snug pl-10">{b.mr}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* ─── PRICING & VEHICLE PACKAGES ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Bike Pricing Table (7 Columns) */}
          <ScrollReveal direction="left" className="lg:col-span-7 flex flex-col">
            <div className="bg-[#141414] rounded-3xl p-6 sm:p-8 border border-[#282828] shadow-xl flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#F5B900]/10 text-[#F5B900] flex items-center justify-center">
                      <Bike className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white uppercase font-sans tracking-tight">
                        Bike Ceramic Coating Packages
                      </h3>
                      <p className="text-[11px] text-neutral-400">Fixed rate transparency for popular two-wheelers</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#F5B900]/15 text-[#F5B900] border border-[#F5B900]/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Pahur Garage
                  </span>
                </div>

                <div className="space-y-3">
                  {BIKE_PACKAGES.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-2xl bg-[#0B0B0B] border border-[#262626] flex items-center justify-between gap-3 hover:border-[#F5B900]/60 transition-all group"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-xs sm:text-sm font-black text-white block font-sans uppercase group-hover:text-[#F5B900] transition-colors">
                          {item.model}
                        </span>
                        <span className="text-[11px] text-neutral-400 block truncate mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-base sm:text-lg font-black text-[#F5B900] font-mono block">
                          {item.price}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                          All Inclusive
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-[#1B170B] border border-[#F5B900]/30 rounded-2xl text-[11px] text-[#F5B900] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#F5B900] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>टीप:</strong> अंतिम किंमत वाहनाची Condition, Paint Condition आणि Required Surface Compounding / Detailing यानुसार बदलू शकते.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Car Pricing & Workshop Guarantee (5 Columns) */}
          <ScrollReveal direction="right" className="lg:col-span-5 flex flex-col">
            <div className="bg-[#141414] rounded-3xl p-6 sm:p-8 border border-[#282828] shadow-xl flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-[#262626] pb-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white uppercase font-sans tracking-tight">
                      🚗 Car Ceramic Coating
                    </h3>
                    <p className="text-[11px] text-neutral-400">Hatchback, Sedan & SUV Packages</p>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  कारसाठी देखील Professional Ceramic Coating Service उपलब्ध आहे. कारच्या Model, Size, Paint Condition आणि Required Coating Package नुसार किंमत ठरवली जाते.
                </p>

                <div className="p-4 bg-blue-950/30 border border-blue-800/40 rounded-2xl space-y-1.5 text-xs">
                  <span className="font-black text-blue-300 block uppercase tracking-wider">💰 Custom Car Pricing</span>
                  <p className="text-[11px] text-blue-200/90 leading-relaxed">
                    तुमच्या कारसाठी योग्य Coating आणि Cost जाणून घेण्यासाठी आमच्याशी संपर्क करा किंवा खालील बटणावर क्लिक करा.
                  </p>
                </div>

                {/* Trust Points */}
                <div className="p-4 bg-[#0B0B0B] border border-[#262626] rounded-2xl space-y-2 text-xs">
                  <span className="font-black text-white block uppercase tracking-wider text-[11px]">
                    🏆 Why Chaudhari Auto?
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 text-[11px] text-neutral-300">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B900]" />
                      <span>Professional 3-Stage Surface Compounding</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B900]" />
                      <span>High-Grade 9H / Graphene Ceramic Layer</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B900]" />
                      <span>Experienced Detailing Team (Est. 1994)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B900]" />
                      <span>Dust-Free Detailing Bay in Pahur</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick CTA inside Car card */}
              <div className="pt-2">
                <a
                  href="https://wa.me/917387448878?text=Hello%20Chaudhari%20Auto!%20I%20am%20interested%20in%20Car%20Ceramic%20Coating%20for%20my%20vehicle."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Get Custom Car Quote</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* ─── CALL TO ACTION BANNER ─── */}
        <ScrollReveal direction="up">
          <div className="bg-gradient-to-r from-[#1E1B10] via-[#141414] to-[#121212] border border-[#F5B900]/30 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1.5 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight font-sans">
                Protect Your Paint. Enhance Your Shine.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300">
                तुमच्या बाइक किंवा कारला Premium Ceramic Protection द्या! आजच स्लॉट बुक करा.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to="/inquiry?service=Ceramic+Coating"
                className="px-6 py-3 rounded-xl bg-[#F5B900] hover:bg-[#E5AC00] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Ceramic Coating</span>
              </Link>

              <a
                href="https://wa.me/917387448878?text=Hello%20Chaudhari%20Auto!%20I%20want%20to%20know%20more%20about%20Ceramic%20Coating%20for%20my%20bike/car."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href="tel:+917387448878"
                className="px-5 py-3 rounded-xl bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#F5B900]" />
                <span>+91 7387448878</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
