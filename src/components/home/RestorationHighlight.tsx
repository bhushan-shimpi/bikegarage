import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Wrench, 
  Search, 
  ShieldCheck, 
  Flame, 
  Gem, 
  CheckCircle2, 
  Award,
  Quote
} from 'lucide-react';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';

export const RestorationHighlight: React.FC = () => {
  const restorationProcess = [
    {
      icon: Search,
      title: 'Complete Inspection',
      marathi: 'संपूर्ण तपासणी',
      desc: 'We thoroughly inspect every part of the motorcycle before starting the restoration.',
      accent: 'border-[#F5B900]/30 group-hover:border-[#F5B900]',
      iconColor: 'text-[#F5B900]',
    },
    {
      icon: ShieldCheck,
      title: '100% Original Spare Parts',
      marathi: 'ओरिजिनल स्पेअर पार्ट्स',
      desc: 'Wherever replacement is required, we focus on using genuine and original spare parts to maintain quality and reliability.',
      accent: 'border-emerald-500/30 group-hover:border-emerald-500',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Flame,
      title: 'Oven / Furnace Paint',
      marathi: 'ओव्हन / भट्टी पेंट प्रोसेस',
      desc: 'We use a professional oven/bhatti paint process to achieve a durable, smooth, and premium finish similar to the original factory finish.',
      accent: 'border-orange-500/30 group-hover:border-orange-500',
      iconColor: 'text-orange-400',
    },
    {
      icon: Gem,
      title: 'Ceramic Coating',
      marathi: 'सिरेमिक कोटिंग',
      desc: 'After restoration and paintwork, we apply ceramic coating to provide an additional layer of protection and enhance the bike’s finish.',
      accent: 'border-cyan-500/30 group-hover:border-cyan-500',
      iconColor: 'text-cyan-400',
    },
    {
      icon: CheckCircle2,
      title: 'Detailed Finishing',
      marathi: 'सुपर-फाईन फिनिशिंग',
      desc: 'We pay attention to even the smallest details to deliver a super-fine and premium finish.',
      accent: 'border-purple-500/30 group-hover:border-purple-500',
      iconColor: 'text-purple-400',
    },
    {
      icon: Award,
      title: 'Quality First',
      marathi: 'सर्वोत्कृष्ट दर्जा',
      desc: 'For us, completing the work is not enough. We believe in delivering work that meets our highest quality standards.',
      accent: 'border-amber-500/30 group-hover:border-amber-500',
      iconColor: 'text-[#F5B900]',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#070707] border-y border-[#222222] relative overflow-hidden" id="restoration">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── SECTION HEADER ─── */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full border border-[#F5B900]/40 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>🏍️ BIKE RESTORATION – CHAUDHARI AUTO CENTRE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4 font-sans">
              BIKE RESTORATION
            </h2>

            {/* Philosophy Statement */}
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed max-w-2xl mx-auto font-medium">
              At Chaudhari Auto Centre, bike restoration is not just about repairing an old motorcycle. Our goal is to bring back its original beauty, performance, and finish while giving every detail the attention it deserves.
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 max-w-xl mx-auto">
              Our restoration process begins with a complete inspection of the bike, followed by detailed work on each component according to its condition and requirement.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── INTERACTIVE BEFORE & AFTER SLIDER ─── */}
        <ScrollReveal direction="up" delay={150}>
          <div className="mb-14 sm:mb-16">
            <BeforeAfterSlider
              bikeName="1996 Yamaha RX100 Retro Master Restoration"
              beforeImage="/images/about/bay3-restoration.jpg"
              afterImage="/images/services/bike-restoration.jpg"
            />
          </div>
        </ScrollReveal>

        {/* ─── 🔧 OUR RESTORATION PROCESS (6 Pillars) ─── */}
        <div className="mb-14">
          <ScrollReveal direction="up">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5B900]">
                Precision Step-by-Step Craftsmanship
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans mt-1">
                🔧 OUR RESTORATION PROCESS
              </h3>
              <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {restorationProcess.map((step, idx) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={idx} direction="up" delay={idx * 80}>
                  <div className={`p-5 sm:p-6 rounded-2xl bg-[#121212] border ${step.accent} transition-all duration-300 hover:-translate-y-1 hover:bg-[#161616] group h-full flex flex-col justify-between shadow-lg`}>
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${step.iconColor} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                          Step 0{idx + 1}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#F5B900] transition-colors">
                        {step.title}
                      </h4>
                      <span className="text-xs font-medium text-[#F5B900]/80 block mb-2">
                        {step.marathi}
                      </span>

                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* ─── ⭐ OUR PROMISE CARD ─── */}
        <ScrollReveal direction="up" delay={200}>
          <div className="relative rounded-3xl bg-gradient-to-b from-[#181818] to-[#101010] border border-[#F5B900]/30 p-6 sm:p-10 mb-12 text-center shadow-2xl overflow-hidden">
            {/* Top decorative emblem */}
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[#F5B900]/10 border border-[#F5B900]/40 flex items-center justify-center text-[#F5B900]">
              <Quote className="w-6 h-6 rotate-180" />
            </div>

            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#F5B900] block mb-2">
              ⭐ OUR PROMISE
            </span>

            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-sans max-w-3xl mx-auto leading-snug mb-4">
              “When your bike comes back to you, it should look better, feel better, and be finished to the highest possible standard.”
            </blockquote>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              At <strong className="text-white">Chaudhari Auto Centre</strong>, we believe in <span className="text-[#F5B900] font-bold">Quality</span>, <span className="text-[#F5B900] font-bold">Genuine Parts</span>, <span className="text-[#F5B900] font-bold">Professional Workmanship</span>, and <span className="text-[#F5B900] font-bold">Super-Fine Finishing</span>.
            </p>

            <div className="mt-4 pt-4 border-t border-white/10 max-w-xl mx-auto">
              <p className="text-xs sm:text-sm italic font-serif text-[#F5B900]">
                Because restoration is not just about making an old bike look new — it’s about bringing the bike back to life.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── CTAs ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link to="/restoration-form" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
              className="w-full sm:w-auto font-black text-xs sm:text-sm py-3.5 px-7 shadow-xl shadow-[#F5B900]/25 bg-[#F5B900] text-black hover:bg-[#ffc71c]"
            >
              <span>Fill Restoration Form • फॉर्म भरा</span>
            </Button>
          </Link>

          <Link to="/services/bike-restoration" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Wrench className="w-4 h-4 text-[#F5B900] shrink-0" />}
              className="w-full sm:w-auto text-xs sm:text-sm py-3.5 px-6"
            >
              <span>View Restoration Details</span>
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};
