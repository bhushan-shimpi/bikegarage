import React, { useRef, useState } from 'react';
import { Trophy, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

interface AwardItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  year?: string;
  category: string;
}

export const OwnerAchievementSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeLightbox, setActiveLightbox] = useState<AwardItem | null>(null);

  const awards: AwardItem[] = [
    {
      id: 'award-1',
      image: '/images/award/IMG_5321.JPG',
      title: 'State Two-Wheeler Excellence Award',
      subtitle: 'Honored for outstanding bike service & customer satisfaction',
      year: '2024',
      category: 'Excellence Certificate',
    },
    {
      id: 'award-2',
      image: '/images/award/IMG_5325.JPG',
      title: 'Automotive Industry Achievement Memento',
      subtitle: 'Presented to Chaudhari Auto Centre for technical mastery',
      year: '2023',
      category: 'Industry Memento',
    },
    {
      id: 'award-3',
      image: '/images/award/IMG_5360.JPG',
      title: 'Pahur Business Leadership Trophy',
      subtitle: 'Recognizing Rohit Chaudhari for entrepreneurship & youth inspiration',
      year: '2024',
      category: 'Leadership Trophy',
    },
    {
      id: 'award-4',
      image: '/images/award/IMG_3280.PNG',
      title: 'Regional Moto & Craftsmanship Honor',
      subtitle: 'Distinguished recognition for 2-stroke restoration & bhatti paint',
      year: '2023',
      category: 'Regional Honor',
    },
    {
      id: 'award-5',
      image: '/images/award/627154139_17932970019175433_28961039933298495_n.jpg',
      title: '30 Years of Community Trust & Dedication',
      subtitle: 'Celebrated by local leaders and riders across Khandesh',
      year: 'EST. 1994',
      category: 'Lifetime Trust',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#0A0A0A] border-y border-[#1C1C1C] relative overflow-hidden" id="achievements">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[#F5B900]/30 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-widest">
                <Trophy className="w-3.5 h-3.5" />
                <span>HONORS &amp; RECOGNITION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-sans">
                OWNER / BUSINESS ACHIEVEMENT
              </h2>
              <p className="text-xs sm:text-sm text-[#F5B900] font-semibold mt-1">
                सन्मान आणि गौरव — चौधरी ऑटो सेंटरची ३० वर्षांची अखंड गुणवत्ता व ग्राहकांचा अतूट विश्वास
              </p>
            </div>

            {/* Desktop Carousel Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2 self-start md:self-end">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-[#181818] border border-[#2B2B2B] hover:border-[#F5B900] text-white hover:text-[#F5B900] flex items-center justify-center transition-all active:scale-95 shadow-md"
                aria-label="Previous Award"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-[#181818] border border-[#2B2B2B] hover:border-[#F5B900] text-white hover:text-[#F5B900] flex items-center justify-center transition-all active:scale-95 shadow-md"
                aria-label="Next Award"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Scrollable Award Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-6 snap-x snap-mandatory pb-4 pt-1"
        >
          {awards.map((award, idx) => (
            <div
              key={award.id}
              onClick={() => setActiveLightbox(award)}
              className="w-[280px] xs:w-[310px] sm:w-[340px] shrink-0 snap-start rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#F5B900]/70 p-3.5 sm:p-4 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#F5B900]/10 cursor-pointer group flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative w-full h-[220px] xs:h-[240px] sm:h-[260px] rounded-xl overflow-hidden bg-black/60 border border-white/5 mb-3.5 flex items-center justify-center">
                <img
                  src={award.image}
                  alt={award.title}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />



                {/* Expand Overlay Icon */}
                <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-[#F5B900]" />
                </div>
              </div>

              {/* Card Meta & Title */}
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  <span>Recognition #{idx + 1}</span>
                  {award.year && (
                    <span className="px-2 py-0.5 rounded bg-[#F5B900]/15 text-[#F5B900] font-black">
                      {award.year}
                    </span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#F5B900] transition-colors leading-snug line-clamp-2">
                  {award.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                  {award.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden flex items-center justify-center gap-2 mt-4 text-[11px] text-neutral-400 font-medium">
          <ChevronLeft className="w-3.5 h-3.5 animate-pulse" />
          <span>Swipe to explore all awards</span>
          <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
        </div>

      </div>

      {/* ─── LIGHTBOX MODAL ─── */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#141414] border border-[#333] rounded-3xl p-4 sm:p-6 shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white hover:text-[#F5B900] flex items-center justify-center transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-res Image */}
            <div className="w-full max-h-[70vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center mb-4">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10 pt-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F5B900] block">
                  {activeLightbox.category} {activeLightbox.year ? `• ${activeLightbox.year}` : ''}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {activeLightbox.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {activeLightbox.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
