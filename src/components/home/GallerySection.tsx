import React, { useState } from 'react';
import { Camera, Maximize2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

export const GallerySection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const galleryImages: GalleryItem[] = [
    { id: 'gal-1', src: '/images/Gallary/IMG_5148.JPG', alt: 'Two-wheeler periodic servicing in progress at Chaudhari Auto Pahur' },
    { id: 'gal-2', src: '/images/Gallary/IMG_5150.JPG', alt: 'Motorcycle engine repair and valve adjustments at Pahur workshop' },
    { id: 'gal-3', src: '/images/Gallary/IMG_5153.JPG', alt: 'Complete bike disassembly on service ramp at Chaudhari Auto' },
    { id: 'gal-4', src: '/images/Gallary/IMG_5154.JPG', alt: 'Motorcycle paint baking and finishing at Chaudhari Auto workshop' },
    { id: 'gal-5', src: '/images/Gallary/IMG_5156.JPG', alt: 'Hero Splendor chassis and engine overhaul in progress' },
    { id: 'gal-6', src: '/images/Gallary/SaveClip.App_763561185_17960641896175433_1354440259135450971_n.jpg', alt: 'Bajaj Pulsar 150 restoration detailing at Chaudhari Auto Pahur' },
    { id: 'gal-7', src: '/images/Gallary/SaveClip.App_763684648_17960641551175433_1288108473921684178_n.jpg', alt: 'Two-stroke Yamaha RX100 engine restoration workbench' },
    { id: 'gal-8', src: '/images/Gallary/SaveClip.App_764116120_17960641887175433_663142152934308415_n.jpg', alt: 'Motorcycle chain cleaning and lubrication service in Jamner' },
    { id: 'gal-9', src: '/images/Gallary/SaveClip.App_764676210_17960641563175433_2615807174010287203_n.jpg', alt: 'High-gloss ceramic coating applied on restored motorcycle fuel tank' },
    { id: 'gal-10', src: '/images/Gallary/SaveClip.App_764694001_17960641872175433_1259823115832174628_n.jpg', alt: 'Original factory fiber panels and visor assembly at Chaudhari Auto' },
    { id: 'gal-11', src: '/images/Gallary/SaveClip.App_764975447_17960641848175433_9031705044490108474_n.jpg', alt: 'Front fork suspension servicing and oil replacement' },
    { id: 'gal-12', src: '/images/Gallary/SaveClip.App_765619840_17960641572175433_3593156307828676883_n.jpg', alt: 'Final road test inspection of restored motorcycle at Chaudhari Auto' },
  ];

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % galleryImages.length);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#0B0B0B] text-white relative overflow-hidden" id="gallery">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[#F5B900]/30 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-widest">
              <Camera className="w-3.5 h-3.5" />
              <span>LIVE WORKSHOP MOMENTS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-sans">
              WORKSHOP &amp; RESTORATION GALLERY
            </h2>

            <p className="text-xs sm:text-sm text-[#F5B900] font-semibold mt-1">
              चौधरी ऑटो सेंटर — वर्कशॉप व रिस्टोरेशन फोटो गॅलरी
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl mx-auto">
              A glimpse into our workshop craftsmanship, engine overhauls, custom paint finishes, and completed bike restorations in Pahur.
            </p>
          </div>
        </ScrollReveal>

        {/* Gallery Grid (Mobile: 6 images by default; Desktop: 10 images by default) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {galleryImages.map((img, idx) => {
            // idx 0..5: always visible
            // idx 6..9: hidden on mobile (<sm), visible on desktop (sm+)
            // idx 10..11: hidden everywhere until expanded
            const isHiddenMobileOnly = !isExpanded && idx >= 6 && idx < 10;
            const isHiddenUntilExpanded = !isExpanded && idx >= 10;

            if (isHiddenUntilExpanded) return null;

            return (
              <div
                key={img.id}
                className={isHiddenMobileOnly ? 'hidden sm:block' : 'block'}
              >
                <ScrollReveal direction="up" delay={(idx % 5) * 60}>
                  <div
                    onClick={() => setActiveLightboxIndex(idx)}
                    className="group relative h-[170px] xs:h-[190px] sm:h-[220px] rounded-2xl overflow-hidden bg-[#141414] border border-[#242424] hover:border-[#F5B900]/60 cursor-pointer shadow-lg transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#F5B900]/15"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle Hover Maximize Icon */}
                    <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-black/70 backdrop-blur-sm border border-white/20 text-[#F5B900] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>

        {/* View All / Show Less Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1A1A1A] hover:bg-[#242424] border border-[#333] hover:border-[#F5B900] text-white hover:text-[#F5B900] font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-black/50 cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>Show Less (कमी फोटो दाखवा)</span>
                <ChevronUp className="w-4 h-4 text-[#F5B900]" />
              </>
            ) : (
              <>
                <span>View All Photos ({galleryImages.length}) • सर्व फोटो पहा</span>
                <ChevronDown className="w-4 h-4 text-[#F5B900]" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* ─── FULLSCREEN LIGHTBOX MODAL ─── */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col items-center animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with counter & close */}
            <div className="w-full flex items-center justify-between text-xs text-neutral-300 pb-3 mb-1">
              <span className="font-mono font-bold text-[#F5B900]">
                PHOTO {activeLightboxIndex + 1} OF {galleryImages.length}
              </span>
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image Box */}
            <div className="relative w-full max-h-[80vh] rounded-2xl overflow-hidden bg-black/80 flex items-center justify-center border border-white/10">
              <img
                src={galleryImages[activeLightboxIndex].src}
                alt={galleryImages[activeLightboxIndex].alt}
                className="max-h-[80vh] w-auto object-contain select-none"
              />

              {/* Prev / Next Nav Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-white/20 hover:border-[#F5B900] text-white hover:text-[#F5B900] flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-white/20 hover:border-[#F5B900] text-white hover:text-[#F5B900] flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
