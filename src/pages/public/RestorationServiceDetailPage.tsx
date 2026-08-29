import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Flame,
  Gem,
  CheckCircle2,
  Award,
  Clock,
  MapPin,
  ClipboardList,
  AlertTriangle,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { PageBanner } from '../../components/common/PageBanner';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { Button } from '../../components/common/Button';
import { RestorationQuotationCards } from '../../components/restoration/RestorationQuotationCards';

export const RestorationServiceDetailPage: React.FC = () => {
  const restorationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Bike Restoration Service (100cc & 150cc)',
    provider: {
      '@type': 'MotorcycleRepairShop',
      name: 'Chaudhary Auto',
      telephone: '+91-7387448878',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Main Road, Near Bus Stand',
        addressLocality: 'Pahur',
        addressRegion: 'Maharashtra',
        postalCode: '424205',
        addressCountry: 'IN',
      },
    },
    serviceType: 'Motorcycle Restoration and Overhaul',
    areaServed: ['Pahur', 'Jamner', 'Jalgaon'],
    description:
      'Complete bike restoration for 100cc and 150cc motorcycles: bhatti oven paint, ceramic coating, OEM fiber kit fitting, genuine stickers, and showroom condition rebuilding.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Restoration Quotations',
      itemListElement: [
        {
          '@type': 'Offer',
          name: '100cc Bike Restoration Standard Package',
          price: '18850',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          name: '150cc Bike Restoration Standard Package',
          price: '24500',
          priceCurrency: 'INR',
        },
      ],
    },
  };

  const restorationPillars = [
    {
      icon: Search,
      title: 'Complete Inspection',
      marathi: 'संपूर्ण तपासणी',
      desc: 'We thoroughly inspect every part of the motorcycle before starting the restoration — chassis alignment, engine compression, wiring, and suspension integrity.',
      accent: 'border-[#F5B900]/30 hover:border-[#F5B900]',
      iconColor: 'text-[#F5B900]',
    },
    {
      icon: ShieldCheck,
      title: '100% Original Spare Parts',
      marathi: 'ओरिजिनल स्पेअर पार्ट्स',
      desc: 'Wherever replacement is required, we focus on using genuine and original spare parts to maintain authentic factory quality and reliability.',
      accent: 'border-emerald-500/30 hover:border-emerald-500',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Flame,
      title: 'Oven / Furnace Paint',
      marathi: 'ओव्हन / भट्टी पेंट प्रोसेस',
      desc: 'We use a professional oven/bhatti paint baking process to achieve a durable, mirror-smooth, and premium factory finish.',
      accent: 'border-orange-500/30 hover:border-orange-500',
      iconColor: 'text-orange-400',
    },
    {
      icon: Gem,
      title: 'Ceramic Coating',
      marathi: 'सिरेमिक कोटिंग',
      desc: 'After restoration and paintwork, we apply hydrophobic ceramic coating to provide high-grade protection against weather, UV damage, and scratches.',
      accent: 'border-cyan-500/30 hover:border-cyan-500',
      iconColor: 'text-cyan-400',
    },
    {
      icon: CheckCircle2,
      title: 'Detailed Finishing',
      marathi: 'सुपर-फाईन फिनिशिंग',
      desc: 'We pay attention to even the smallest details — chrome buffing, stainless steel fasteners, cable routing, and precise torque specifications.',
      accent: 'border-purple-500/30 hover:border-purple-500',
      iconColor: 'text-purple-400',
    },
    {
      icon: Award,
      title: 'Quality First',
      marathi: 'सर्वोत्कृष्ट दर्जा',
      desc: 'For us, completing the work is not enough. We believe in delivering restoration work that meets our highest craftsmanship standards.',
      accent: 'border-amber-500/30 hover:border-amber-500',
      iconColor: 'text-[#F5B900]',
    },
  ];

  const checkpoints = [
    'Complete chassis & frame alignment check',
    'Disassembly down to the bare frame',
    'Bhatti / Oven baking paint on fuel tank & panels',
    'High-gloss ceramic coating protection',
    'Original OEM fiber kit (visor, mudguards, side & tail panels)',
    'Original brand stickers & 3D metallic monograms',
    'Wheel rim truing, spoke tightening or alloy inspection',
    'Front fork & rear suspension overhaul',
    'Complete brake system inspection & cable replacement',
    'Full electrical wiring harness testing & battery check',
    'Carburettor sonic cleaning & engine tuning',
    'Multi-point road test & final quality sign-off',
  ];

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <SEO
        title="Bike Restoration Service (100cc & 150cc) in Pahur, Jamner"
        description="Comprehensive motorcycle restoration in Pahur, Jalgaon: 100cc & 150cc quotations, oven paint process, ceramic coating, genuine fiber kits, and complete showroom rebuilds."
        canonicalPath="/services/bike-restoration"
        jsonLd={restorationSchema}
      />

      {/* Top Banner with semantic H1 */}
      <PageBanner
        title="BIKE RESTORATION SERVICE DETAILS"
        breadcrumb="Services / Bike Restoration"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
        
        {/* ─── 1. HERO OVERVIEW STRIP ─── */}
        <ScrollReveal direction="up">
          <div className="rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-neutral-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B900]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#F5B900] text-black">
                  ⭐ Signature Craftsmanship Service
                </span>
                <span className="flex items-center gap-1 text-xs text-neutral-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#F5B900]" />
                  Pahur, Tal. Jamner, Dist. Jalgaon
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
                Bike Restoration (100cc & 150cc)
              </h2>
              <p className="text-sm font-semibold text-[#F5B900]">
                बाईक रिस्टोरेशन — १००सीसी व १५०सीसी मोटरसायकल शोरूम कंडिशन सर्व्हिस
              </p>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1">
                At Chaudhary Auto Centre, bike restoration is not just about repairing an old motorcycle. Our goal is to bring back its original factory beauty, performance, and showroom finish. Whether restoring a 100cc commuter like Hero Honda Splendor, Passion, CD100, a 150cc street bike like Bajaj Pulsar 150, or a vintage two-stroke legend like Yamaha RX100, riders from Pahur, Jamner, Jalgaon, and across northern Maharashtra trust our workshop. We disassemble the motorcycle down to its bare frame, bake paint in professional bhatti ovens, apply ceramic protective coatings, and install 100% genuine OEM fiber parts and metallic monograms.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-neutral-300">
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <Clock className="w-4 h-4 text-[#F5B900]" />
                  Duration: 1 - 3 Weeks
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Prior Approval on All Additional Spares
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── 2. THE 100cc & 150cc RESTORATION QUOTATION MATRIX ─── */}
        <section id="quotations" className="space-y-6">
          <ScrollReveal direction="up">
            <RestorationQuotationCards theme="dark" />
          </ScrollReveal>
        </section>

        {/* ─── 3. 12 RESTORATION CHECKPOINTS ─── */}
        <section className="space-y-6">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5B900]">
                Thorough 12-Point Inspection & Restoration
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans mt-1">
                Included Work Checkpoints
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Every motorcycle passes through all stages of precision craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {checkpoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex items-start gap-3 hover:border-[#F5B900]/40 transition-colors shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* ─── 4. THE 6 CRAFTSMANSHIP PILLARS ─── */}
        <section className="space-y-6">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5B900]">
                Precision Step-by-Step Craftsmanship
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans mt-1">
                🔧 Our Restoration Process
              </h2>
              <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {restorationPillars.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className={`p-5 sm:p-6 rounded-2xl bg-[#121212] border ${step.accent} transition-all duration-300 hover:-translate-y-1 hover:bg-[#161616] group h-full flex flex-col justify-between shadow-lg`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${step.iconColor} group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                          Step 0{idx + 1}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#F5B900] transition-colors">
                        {step.title}
                      </h3>
                      <span className="text-xs font-medium text-[#F5B900]/80 block mb-2">
                        {step.marathi}
                      </span>

                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        {/* ─── 5. TRANSPARENCY NOTICE BANNER ─── */}
        <ScrollReveal direction="up">
          <div className="p-5 sm:p-7 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs sm:text-sm space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#F5B900]">
              <AlertTriangle className="w-4 h-4" />
              <span>महत्त्वाचा नियम व पारदर्शकता हमी (Transparency Guarantee):</span>
            </div>
            <p className="leading-relaxed">
              100cc बाईकसाठी फिक्स खर्च <strong>₹18,850/-</strong> व शोरूम कंडिशनसाठी अंदाजे खर्च <strong>₹20,000+</strong> आहे.
              150cc बाईकसाठी फिक्स खर्च <strong>₹24,500/-</strong> व शोरूम कंडिशनसाठी अंदाजे खर्च <strong>₹25,000+</strong> आहे.
            </p>
            <p className="text-neutral-400 text-xs">
              इतर कोणतेही नवीन स्पेअर पार्ट्स (उदा. टायर, बॅटरी, इंजिन पिस्टन इत्यादी) टाकायचे असल्यास त्याचे चार्जेस वेगळे लागतील. ग्राहकाच्या पूर्वसंमतीशिवाय कोणतेही काम केले जात नाही.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── 6. BOTTOM ACTION BUTTONS ─── */}
        <ScrollReveal direction="up">
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase text-white">
                Ready to Restore Your Motorcycle?
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Fill the official workshop job sheet or book an in-person workshop inspection.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link to="/restoration-form" className="flex-1 sm:flex-none">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<ClipboardList className="w-4 h-4" />}
                  className="w-full font-black text-xs uppercase tracking-wider bg-[#F5B900] text-black hover:bg-[#ffc71c] py-3 px-5 shadow-lg shadow-[#F5B900]/20"
                >
                  <span>Fill Restoration Form</span>
                </Button>
              </Link>

              <Link to="/inquiry?service=Bike%20Restoration" className="flex-1 sm:flex-none">
                <Button
                  variant="secondary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full text-xs font-bold py-3 px-5"
                >
                  <span>Book Inspection</span>
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
