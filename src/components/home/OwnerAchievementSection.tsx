import React, { useRef, useState } from 'react';
import { Trophy, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

interface AwardItem {
  id: string;
  image: string;
  title: string;
}

export const OwnerAchievementSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeLightbox, setActiveLightbox] = useState<AwardItem | null>(null);

  const awards: AwardItem[] = [
    {
      id: 'award-1',
      image: '/images/award/627154139_17932970019175433_28961039933298495_n.jpg',
      title: 'State Two-Wheeler Excellence Award',
    },
    {
      id: 'award-2',
      image: '/images/award/IMG_3280.PNG',
      title: 'Automotive Industry Achievement Memento',
    },
    {
      id: 'award-3',
      image: '/images/award/IMG_5321.JPG',
      title: 'Pahur Business Leadership Trophy',
    },
    {
      id: 'award-4',
      image: '/images/award/IMG_5325.JPG',
      title: 'Master Technician & Craftsmanship Certificate',
    },
    {
      id: 'award-5',
      image: '/images/award/IMG_5360.JPG',
      title: 'Decade of Trusted Customer Service Medal',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#0E0E0E] text-white relative overflow-hidden" id="achievements">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[#F5B900]/30 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-widest">
                <Trophy className="w-3.5 h-3.5" />
                <span>RECOGNITION &amp; MILESTONES</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-sans">
                OWNER / BUSINESS ACHIEVEMENT
              </h2>

              <p className="text-xs sm:text-sm text-[#F5B900] font-semibold mt-1">
                ३०+ वर्षांची सेवा, सन्मान व व्यावसायिक यश — चौधरी ऑटो सेंटर, पहूर
              </p>
            </div>

            {/* Desktop Carousel Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2 self-start md:self-end">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-[#181818] border border-[#2B2B2B] hover:border-[#F5B900] text-white hover:text-[#F5B900] flex items-center justify-center transition-all active:scale-95 shadow-md cursor-pointer"
                aria-label="Previous Award"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-[#181818] border border-[#2B2B2B] hover:border-[#F5B900] text-white hover:text-[#F5B900] flex items-center justify-center transition-all active:scale-95 shadow-md cursor-pointer"
                aria-label="Next Award"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Scrollable Award Cards Container (Pure Image Frames - NO text) */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-6 snap-x snap-mandatory pb-4 pt-1"
        >
          {awards.map((award) => (
            <div
              key={award.id}
              onClick={() => setActiveLightbox(award)}
              className="w-[230px] xs:w-[260px] sm:w-[300px] shrink-0 snap-start rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#F5B900]/70 p-2 sm:p-2.5 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#F5B900]/15 cursor-pointer group select-none"
            >
              {/* Pure Image Frame */}
              <div className="relative w-full h-[240px] xs:h-[270px] sm:h-[310px] rounded-xl overflow-hidden bg-black/60 border border-white/5 flex items-center justify-center">
                <img
                  src={award.image}
                  alt={award.title}
                  loading="lazy"
                  className="w-full h-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Expand Overlay Icon */}
                <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-[#F5B900] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
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
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#141414] border border-[#333] rounded-3xl p-3 sm:p-5 shadow-2xl animate-fade-in-up flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white hover:text-[#F5B900] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-res Image */}
            <div className="w-full max-h-[80vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="max-h-[80vh] w-auto object-contain select-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
