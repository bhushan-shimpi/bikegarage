import React from 'react';
import { ExternalLink, Sparkles, Film, Volume2, Wrench, Heart } from 'lucide-react';
import { InstagramCard } from '../common/InstagramCard';
import { ScrollReveal } from '../common/ScrollReveal';

export const InstagramHighlight: React.FC = () => {
  const highlights = [
    {
      icon: Film,
      title: 'Restoration Reels & Shorts',
      desc: 'Watch barn-find Yamaha RX100 & Bullet 350 bikes reborn from frame to showroom shine.',
    },
    {
      icon: Volume2,
      title: 'Iconic Exhaust Sound Clips',
      desc: 'Pure crisp 2-stroke ring-a-ding and legendary Royal Enfield heavy thumps in 4K.',
    },
    {
      icon: Wrench,
      title: 'Pro Workshop Maintenance Tips',
      desc: 'Weekly DIY tips on spark plugs, chain lubrication, brake bleeding, and tyre care.',
    },
    {
      icon: Heart,
      title: '1.4M+ Community Views',
      desc: 'Join riders across Maharashtra celebrating authentic garage passion and craftsmanship.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#080808] border-t border-[#1C1C1C] relative overflow-hidden">
      {/* Ambient background glow matching Instagram colors */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#E1306C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#3754DB]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Context & Feature highlights */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#E1306C]/20 to-[#F77737]/20 border border-[#E1306C]/30 text-[#F77737] text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#E1306C] animate-pulse" />
                <span>OFFICIAL INSTAGRAM COMMUNITY</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-sans mt-2">
                FOLLOW OUR WORKSHOP ON{' '}
                <span className="bg-gradient-to-r from-[#FD1D1D] via-[#E1306C] to-[#833AB4] bg-clip-text text-transparent">
                  INSTAGRAM
                </span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FCAF45] rounded-full mt-3" />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Stay connected with Pahur’s favorite bike garage! We share raw time-lapses of engine builds, 2K mirror-gloss paint transformations, dyno tuning clips, and daily customer deliveries.
              </p>
            </ScrollReveal>

            {/* 4 Feature Highlights Grid */}
            <ScrollReveal direction="up" delay={300}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {highlights.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-[#121212] border border-[#222222] hover:border-[#E1306C]/40 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E1306C]/20 to-[#3754DB]/20 text-[#E1306C] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-neutral-200 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* CTA Button */}
            <ScrollReveal direction="up" delay={400}>
              <div className="pt-2">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] hover:opacity-95 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E1306C]/25 transition-all"
                >
                  <span>Connect With Us on Instagram</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: The Instagram Card from User Upload */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal direction="up" delay={200}>
              <div className="animate-insta-card">
                <InstagramCard
                  followersCount={1400000}
                  handle="@chaudhariautocentre"
                  linkUrl="https://instagram.com/"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
