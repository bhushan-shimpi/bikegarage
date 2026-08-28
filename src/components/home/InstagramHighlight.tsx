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

            {/* CTA Buttons for Workshop & Owner */}
            <ScrollReveal direction="up" delay={400}>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.instagram.com/chaudhari_auto_pahur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] hover:opacity-95 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E1306C]/25 transition-all"
                >
                  <span>@chaudhari_auto_pahur (Workshop)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href="https://www.instagram.com/_rcvlogs_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#181818] hover:bg-[#222222] border border-neutral-700 hover:border-neutral-500 text-neutral-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F5B900]" />
                  <span>@_rcvlogs_ (Owner)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: The Instagram Card & Owner's Channel */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <ScrollReveal direction="up" delay={200}>
              <div className="animate-insta-card">
                <InstagramCard
                  followersCount={1400000}
                  handle="@chaudhari_auto_pahur"
                  linkUrl="https://www.instagram.com/chaudhari_auto_pahur/"
                />
              </div>

              {/* Owner's Instagram Channel Pill */}
              <a
                href="https://www.instagram.com/_rcvlogs_/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full max-w-[280px] xs:max-w-[300px] p-3 rounded-2xl bg-[#141414] border border-[#2A2A2A] hover:border-[#E1306C]/60 transition-all flex items-center justify-between group shadow-lg text-white"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider leading-none">
                      Owner's Moto Vlogs
                    </span>
                    <span className="text-xs font-black text-white group-hover:text-[#F5B900] transition-colors">
                      @_rcvlogs_
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
