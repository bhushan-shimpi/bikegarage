import React from 'react';
import { Check, Bike, Award, Users, Wrench } from 'lucide-react';
import { PageBanner } from '../../components/common/PageBanner';
import { OptimizedImage } from '../../components/common/OptimizedImage';
import { AnimatedNumber } from '../../components/common/AnimatedNumber';
import { ScrollReveal } from '../../components/common/ScrollReveal';

export const AboutPage: React.FC = () => {
  const checkmarks = [
    'Specialist Two-Wheeler Mechanics',
    'Genuine Hero, Bajaj, Yamaha & Honda Spares Only',
    '30+ Years Experience Since 1994',
    'Specialized 2-Stroke Restoration Mastery',
  ];

  const workshopGallery = [
    {
      img: '/images/about/bay1-ramp.jpg',
      alt: 'Bay 1 - Motorcycle periodic servicing & ramp',
    },
    {
      img: '/images/about/bay2-engine.jpg',
      alt: 'Bay 2 - Engine rebuild & cylinder boring',
    },
    {
      img: '/images/about/bay3-restoration.jpg',
      alt: 'Bay 3 - Classic bike & 2-stroke restoration',
    },
    {
      img: '/images/about/bay4-wash.jpg',
      alt: 'Bay 4 - Foam washing & high gloss polish',
    },
  ];

  const stats = [
    { value: 30, suffix: '+', label: 'Years Legacy (Est. 1994)', icon: Award },
    { value: 10000, suffix: '+', formatWithCommas: true, label: 'Happy Riders in Pahur', icon: Users },
    { value: 15000, suffix: '+', formatWithCommas: true, label: 'Motorcycles & Bikes Serviced (Bikes Only)', icon: Bike },
    { value: 100, suffix: '%', label: 'Genuine Two-Wheeler Parts', icon: Wrench },
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen flex flex-col justify-between">
      <div>
        {/* Top Banner */}
        <PageBanner title="ABOUT CHAUDHARI AUTO CENTRE" breadcrumb="About Us" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
          {/* Top Section: Story & Workshop Facade */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Text Story */}
            <ScrollReveal direction="left" className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Our Two-Wheeler Heritage
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-gray-900 tracking-tight font-sans">
                Chaudhari Auto Centre, Pahur
              </h2>
              <div className="w-12 h-1 bg-[#F5B900] rounded-full" />

              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                १९९४ पासून पहूर आणि परिसरातील दुचाकीस्वारांचा विश्वासू साथीदार!
              </p>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Founded in 1994, Chaudhari Auto Centre has grown from a humble single-bench repair shop into Pahur's most respected two-wheeler service and restoration hub. Over the last 30 years, we have worked on thousands of commuter motorcycles (Hero, Honda, Bajaj, Yamaha) and vintage classics (फक्त मोटरसायकल व बाईक — स्कूटर किंवा मोपेडचे काम केले जात नाही).
              </p>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Whether it is diagnosing a stubborn cold-start problem, fine-tuning modern Fuel Injection (FI) systems, or breathing new life into a Yamaha RX100, Bajaj Pulsar, Hero Splendor, or Honda Shine, our passion for motorcycles shows in every bolt we tighten.
              </p>

              {/* Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {checkmarks.map((point, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                    <div className="w-4 h-4 rounded-full bg-[#F5B900] text-black flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Right: Workshop Photo */}
            <ScrollReveal direction="right" className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 group">
                <OptimizedImage
                  src="/images/about/workshop-facade.jpg"
                  alt="Chaudhari Auto Bike Workshop Pahur"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur rounded-lg border border-white/10 text-xs text-white">
                  <span className="text-[#F5B900] font-bold block uppercase">
                    Chaudhari Auto Workshop — Pahur (Est. 1994)
                  </span>
                  <span className="text-neutral-300">
                    Dedicated motorcycle repair bays, spare parts inventory & bike ramps
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Workshop Service Bays Gallery */}
          <div className="space-y-6">
            <ScrollReveal direction="up">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Our Facilities
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900 font-sans mt-1">
                  Inside Pahur Two-Wheeler Workshop
                </h3>
                <div className="w-10 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {workshopGallery.map((item, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                  <div className="group relative rounded-xl overflow-hidden shadow-sm border border-gray-200 h-52">
                    <OptimizedImage
                      src={item.img}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 pointer-events-none">
                      <span className="text-xs font-bold text-white leading-tight">
                        {item.alt}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dark Stats Bar at Bottom */}
      <div className="bg-[#101010] border-t border-[#202020] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((st, i) => {
              const Icon = st.icon;
              return (
                <ScrollReveal key={i} direction="up" delay={i * 120}>
                  <div className="space-y-1.5 flex flex-col items-center group">
                    <div className="w-10 h-10 rounded-full bg-[#181818] border border-[#303030] flex items-center justify-center text-[#F5B900] mb-2 group-hover:border-[#F5B900] group-hover:scale-110 transition-all">
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
