import React from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Bike,
  Award,
  Users,
  Wrench,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Calendar,
  Phone,
  Quote,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { PageBanner } from '../../components/common/PageBanner';
import { AnimatedNumber } from '../../components/common/AnimatedNumber';
import { ScrollReveal } from '../../components/common/ScrollReveal';

interface LeadershipMember {
  name: string;
  nameMr: string;
  role: string;
  roleMr: string;
  badge: string;
  image: string;
  bio: string;
}

export const AboutPage: React.FC = () => {
  const checkmarks = [
    'Four-Stroke & 2-Stroke Specialist Mechanics',
    '100% Genuine Hero, Bajaj, Yamaha & Honda OEM Spares',
    '30+ Years Unbroken Trust Since 1994',
    'Pan-India & Maharashtra Wide Bike Restoration Demand',
    '2K PU Oven Paint Baking & Ceramic Detailing Bay',
    'Digital Job Cards, Transparent Invoicing & Real-Time Updates',
  ];

  const leadershipTeam: LeadershipMember[] = [
    {
      name: 'Mr. Kailash Chaudhari',
      nameMr: 'श्री. कैलास चौधरी',
      role: 'Founder & Chief Mentor',
      roleMr: 'संस्थापक',
      badge: 'Founder (Est. 1994)',
      image: '/images/team/kailash-chaudhari.png',
      bio: 'Established Chaudhari Auto Centre in 1994 as a modest workshop. With uncompromising honesty and mechanical excellence, he established our identity as a premier Four-Stroke Specialist, earning the lifelong trust of thousands of riders across Jalgaon and Maharashtra.',
    },
    {
      name: 'Aniket Chaudhari',
      nameMr: 'अनिकेत चौधरी',
      role: 'Owner & Lead Restoration Specialist',
      roleMr: 'संचालक / ओनर',
      badge: 'Owner (2nd Generation)',
      image: '/images/team/aniket-chaudhari.png',
      bio: 'Carrying the legacy forward with high-precision motorcycle restorations, custom 2K PU oven paint finishes, complete engine rebuilds, and modern automobile engineering. Showcasing authentic workshop craftsmanship to enthusiasts nationwide.',
    },
    {
      name: 'Rishikesh Chaudhari',
      nameMr: 'ऋषिकेश चौधरी',
      role: 'Co-Founder & Operations Lead',
      roleMr: 'सह-संस्थापक',
      badge: 'Co-Founder (2nd Generation)',
      image: '/images/team/rishikesh-chaudhari.jpg',
      bio: 'Leading technical diagnostics, genuine spare parts procurement, client relations, and modern workshop operations. Passionately connecting bike lovers from across India with Chaudhari Auto\'s signature reliability.',
    },
  ];

  const stats = [
    { value: 30, suffix: '+', label: 'Years of Trust (Since 1994)', icon: Award },
    { value: 10000, suffix: '+', formatWithCommas: true, label: 'Happy Riders Served', icon: Users },
    { value: 15000, suffix: '+', formatWithCommas: true, label: 'Motorcycles Serviced & Restored', icon: Bike },
    { value: 100, suffix: '%', label: 'Genuine OEM Parts Guarantee', icon: Wrench },
  ];

  const workshopHighlights = [
    {
      title: 'Four-Stroke & Engine Rebuild Bay',
      desc: 'Precision cylinder boring, crank re-centering, valve grinding, and tappet adjustments for maximum mileage and engine life.',
      icon: Wrench,
    },
    {
      title: 'Full Bike Restoration & Detailing',
      desc: 'Complete chassis strip-down, anti-rust zinc coating, authentic factory graphics, and 2K PU bake paint finishes.',
      icon: Sparkles,
    },
    {
      title: 'Genuine OEM Spares Only',
      desc: 'Strict policy of using genuine manufacturer-certified parts to ensure top-notch performance and zero compromises on safety.',
      icon: ShieldCheck,
    },
    {
      title: 'Customer-First Transparency',
      desc: 'Transparent digital job cards, editable parts itemization, and clear communication at every stage of repair.',
      icon: HeartHandshake,
    },
  ];

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Chaudhari Auto — 30-Year Two-Wheeler Legacy in Pahur',
    description:
      'Serving riders in Pahur, Jamner, and across Maharashtra and India since 1994. Founded by Mr. Kailash Chaudhari, now led by Aniket and Rishikesh Chaudhari.',
    mainEntity: {
      '@type': 'MotorcycleRepairShop',
      name: 'Chaudhari Auto',
      foundingDate: '1994',
      telephone: '+91-7387448878',
      founder: {
        '@type': 'Person',
        name: 'Kailash Chaudhari',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Pahur Peth, Jamner',
        addressLocality: 'Pahur',
        addressRegion: 'Maharashtra',
        postalCode: '424205',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col justify-between">
      <SEO
        title="About Our 30-Year Bike Heritage & Leadership | Chaudhari Auto Pahur"
        description="Discover the story of Chaudhari Auto Centre since 1994. Founded by Mr. Kailash Chaudhari and led by Aniket & Rishikesh Chaudhari — Four-Stroke Specialists & Motorcycle Restoration Experts."
        canonicalPath="/about"
        jsonLd={aboutSchema}
      />

      <div>
        {/* Top Banner */}
        <PageBanner title="ABOUT CHAUDHARI AUTO" breadcrumb="About Us" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24">
          
          {/* ─── SECTION 1: 1994 HERITAGE & ORIGIN STORY ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Story */}
            <ScrollReveal direction="left" className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F5B900]/30 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-widest">
                <Award className="w-4 h-4" />
                <span>ESTABLISHED 1994 • ३० वर्षांची अखंड परंपरा</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-sans leading-tight">
                A Journey of Trust That Began in 1994…
              </h2>

              <p className="text-sm sm:text-base text-[#F5B900] font-semibold">
                १९९४ पासून सुरू झालेला विश्वासाचा अखंड प्रवास…
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                <p>
                  <strong className="text-white font-bold">Chaudhari Auto Centre</strong> was founded in <strong className="text-[#F5B900]">1994</strong> by <strong className="text-white font-bold">Mr. Kailash Chaudhari</strong> with a modest workshop in Pahur. In those early days, amidst simple beginnings, one guiding principle remained unshakeable — <span className="text-white font-semibold">providing honest workmanship, sound technical advice, and the highest standard of service to every motorcycle owner.</span>
                </p>

                <p>
                  Gradually, our dedication delivered outstanding results, and customer confidence grew exponentially. This uncompromising quality established our identity as the region's trusted <strong className="text-[#F5B900]">Four-Stroke Specialist</strong>. Soon, riders not just from Pahur, but across the entire taluka and district began bringing their motorcycles to Chaudhari Auto Centre.
                </p>

                <p>
                  With our customers' unwavering faith, goodwill, and word-of-mouth recommendations, our workshop grew and expanded step by step.
                </p>
              </div>

              {/* Checkmarks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {checkmarks.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-200">
                    <div className="w-4 h-4 rounded-full bg-[#F5B900] text-black flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Right Column: Founder & Workshop Legacy Feature Card */}
            <ScrollReveal direction="right" className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-[#141414] border border-[#262626] shadow-2xl p-4 sm:p-6 group">
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-black mb-5 border border-white/10">
                  <img
                    src="/images/team/kailash-chaudhari.png"
                    alt="Mr. Kailash Chaudhari - Founder of Chaudhari Auto Centre Pahur"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-[#F5B900] text-black text-[10px] font-black uppercase tracking-wider mb-1">
                      Founder & Pioneer
                    </span>
                    <h3 className="text-lg font-black uppercase text-white font-sans">
                      Mr. Kailash Chaudhari
                    </h3>
                    <p className="text-xs text-neutral-300 font-medium">
                      श्री. कैलास चौधरी — संस्थापक
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-neutral-400">
                  <p className="italic text-neutral-300 border-l-2 border-[#F5B900] pl-3 py-0.5">
                    "From a small single-bench repair desk in 1994 to a nationwide reputation for motorcycle restorations — our core belief has never changed: treat every bike as our own."
                  </p>
                  <p className="text-[11px] text-[#F5B900] font-bold text-right">
                    — 30+ Years of Dedication
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ─── SECTION 2: THE SECOND GENERATION ─── */}
          <div className="space-y-10">
            <ScrollReveal direction="up">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F5B900]/30 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" />
                  <span>SECOND GENERATION LEADERSHIP • नवी ऊर्जा, तोच विश्वास</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-sans">
                  Now, The Second Generation Carrying the Same Trust Forward…
                </h2>

                <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                  Today, <strong className="text-white">Aniket Chaudhari</strong> and <strong className="text-white">Rishikesh Chaudhari</strong> are proudly carrying this rich family heritage forward. Combining three decades of traditional mechanical mastery with cutting-edge automobile knowledge, advanced tools, and digital platforms, they are taking Chaudhari Auto Centre to new heights.
                </p>
              </div>
            </ScrollReveal>

            {/* Leadership Profiles Grid (3 Members) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {leadershipTeam.map((member, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 120}>
                  <div className="group bg-[#141414] rounded-3xl overflow-hidden border border-[#242424] hover:border-[#F5B900]/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F5B900]/15 flex flex-col justify-between h-full">
                    <div>
                      {/* Photo Box */}
                      <div className="relative h-80 w-full overflow-hidden bg-black">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                        
                        {/* Role Badge */}
                        <div className="absolute top-3.5 left-3.5 bg-black/80 backdrop-blur-sm border border-white/20 text-[#F5B900] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-lg">
                          {member.badge}
                        </div>
                      </div>

                      {/* Info & Bio */}
                      <div className="p-6 space-y-3">
                        <div>
                          <h3 className="text-lg font-black uppercase text-white group-hover:text-[#F5B900] transition-colors font-sans">
                            {member.name}
                          </h3>
                          <div className="flex items-center justify-between text-xs mt-0.5">
                            <span className="text-[#F5B900] font-bold">{member.role}</span>
                            <span className="text-neutral-400 font-medium">({member.nameMr})</span>
                          </div>
                        </div>

                        <p className="text-xs text-neutral-400 leading-relaxed pt-2 border-t border-[#222]">
                          {member.bio}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <span className="inline-block w-full py-2 text-center rounded-xl bg-[#1D1D1D] group-hover:bg-[#F5B900] group-hover:text-black text-neutral-300 text-xs font-bold uppercase tracking-wider transition-colors">
                        {member.roleMr} • Chaudhari Auto
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ─── SECTION 3: QUALITY PHILOSOPHY & WORKSHOP EXCELLENCE ─── */}
          <div className="bg-gradient-to-br from-[#151515] via-[#1A1A1A] to-[#121212] rounded-3xl border border-[#2B2B2B] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B900]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#F5B900] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>OUR CORE COMMITMENT</span>
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-sans">
                  For Us, Quality Means No Compromise
                </h2>
                <p className="text-xs sm:text-sm text-[#F5B900] font-semibold">
                  आमच्यासाठी Quality म्हणजे तडजोड नाही!
                </p>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  We believe in using <strong className="text-white">Original / OEM Spare Parts</strong> wherever possible. Every motorcycle is approached not just to fix symptoms, but to perform in-depth diagnostics, genuine parts assembly, and precision calibration — ensuring the bike is returned to the customer in showroom-grade condition.
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {workshopHighlights.map((hl, i) => {
                  const Icon = hl.icon;
                  return (
                    <div key={i} className="bg-[#0E0E0E]/90 border border-[#282828] rounded-2xl p-5 space-y-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#F5B900]/10 border border-[#F5B900]/30 text-[#F5B900] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-sans uppercase">
                        {hl.title}
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {hl.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Golden Motto Quote Box */}
              <div className="mt-8 pt-8 border-t border-[#2A2A2A] bg-black/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-8 text-center sm:text-left border border-white/5">
                <div className="w-14 h-14 rounded-2xl bg-[#F5B900] text-black flex items-center justify-center shrink-0 shadow-lg shadow-[#F5B900]/20">
                  <Quote className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <blockquote className="text-base sm:text-xl lg:text-2xl font-black uppercase text-white tracking-tight font-sans">
                    “Quality वर तडजोड नाही, आणि ग्राहकाच्या विश्वासाला पर्याय नाही.”
                  </blockquote>
                  <p className="text-xs sm:text-sm text-[#F5B900] font-bold">
                    “No compromise on quality, and no substitute for customer trust.”
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    — The Eternal Mission of Chaudhari Auto Centre since 1994
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── SECTION 4: CALL TO ACTION ─── */}
          <div className="bg-[#141414] border border-[#242424] rounded-3xl p-6 sm:p-10 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white tracking-tight font-sans">
              EXPERIENCE 30+ YEARS OF EXPERT MOTORCYCLE CARE
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
              Book periodic servicing, full engine overhaul, or start a complete bike restoration project with our specialist team in Pahur.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/book-appointment"
                className="px-6 py-3 rounded-xl bg-[#F5B900] hover:bg-[#E5AC00] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Service / Enquiry</span>
              </Link>
              <Link
                to="/restoration-form"
                className="px-6 py-3 rounded-xl bg-[#222] hover:bg-[#333] border border-[#444] text-white font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-[#F5B900]" />
                <span>Start Bike Restoration</span>
              </Link>
              <a
                href="tel:+917387448878"
                className="px-6 py-3 rounded-xl bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#F5B900]" />
                <span>+91 7387448878</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ─── STATS FOOTER BAR ─── */}
      <div className="bg-[#080808] border-t border-[#1C1C1C] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((st, i) => {
              const Icon = st.icon;
              return (
                <ScrollReveal key={i} direction="up" delay={i * 100}>
                  <div className="space-y-1.5 flex flex-col items-center group">
                    <div className="w-11 h-11 rounded-2xl bg-[#141414] border border-[#252525] flex items-center justify-center text-[#F5B900] mb-2 group-hover:border-[#F5B900] group-hover:scale-110 transition-all shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F5B900] font-sans tracking-tight block">
                      <AnimatedNumber
                        value={st.value}
                        suffix={st.suffix}
                        formatWithCommas={st.formatWithCommas}
                        duration={2000}
                      />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 block">
                      {st.label}
                    </span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
