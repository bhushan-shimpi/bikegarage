import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Wrench,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { PageBanner } from '../../components/common/PageBanner';
import { ScrollReveal } from '../../components/common/ScrollReveal';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: 'Restoration' | 'Engine' | 'Servicing' | 'Paint';
  alt: string;
  description: string;
}

export const galleryPhotosList: GalleryPhoto[] = [
  {
    id: 'gal-1',
    src: '/images/Gallary/IMG_5148.JPG',
    title: 'Two-Wheeler Periodic Servicing Ramp',
    category: 'Servicing',
    alt: 'Two-wheeler periodic servicing in progress at Chaudhari Auto Pahur',
    description: 'Complete general motorcycle servicing, oil change, brake calibration, and 24-point safety check.',
  },
  {
    id: 'gal-2',
    src: '/images/Gallary/IMG_5150.JPG',
    title: 'Motorcycle Engine Repair & Valve Assembly',
    category: 'Engine',
    alt: 'Motorcycle engine repair and valve adjustments at Pahur workshop',
    description: 'Precision cylinder head overhaul, valve grinding, tappet adjustments, and new piston fitting.',
  },
  {
    id: 'gal-3',
    src: '/images/Gallary/IMG_5153.JPG',
    title: 'Complete Bike Disassembly & Chassis Check',
    category: 'Restoration',
    alt: 'Complete bike disassembly on service ramp at Chaudhari Auto',
    description: 'Stripping down chassis for anti-rust treatment, alignment verification, and factory restoration.',
  },
  {
    id: 'gal-4',
    src: '/images/Gallary/IMG_5154.JPG',
    title: 'Bhatti / Oven Paint Baking & PU Coating',
    category: 'Paint',
    alt: 'Motorcycle paint baking and finishing at Chaudhari Auto workshop',
    description: '2K PU polyurethane paint booth finishing with heat curing for scratch-resistant showroom gloss.',
  },
  {
    id: 'gal-5',
    src: '/images/Gallary/IMG_5156.JPG',
    title: 'Hero Splendor Engine & Transmission Overhaul',
    category: 'Engine',
    alt: 'Hero Splendor chassis and engine overhaul in progress',
    description: 'Complete transmission gear inspection, crank bearing replacement, and genuine OEM clutch plate rebuild.',
  },
  {
    id: 'gal-6',
    src: '/images/Gallary/SaveClip.App_763561185_17960641896175433_1354440259135450971_n.jpg',
    title: 'Bajaj Pulsar 150 Full Restoration Detailing',
    category: 'Restoration',
    alt: 'Bajaj Pulsar 150 restoration detailing at Chaudhari Auto Pahur',
    description: 'Full bike restoration with original fiber kit, factory tank graphics, wiring overhaul, and buffing.',
  },
  {
    id: 'gal-7',
    src: '/images/Gallary/SaveClip.App_763684648_17960641551175433_1288108473921684178_n.jpg',
    title: '2-Stroke Yamaha RX100 Engine Rebuild',
    category: 'Engine',
    alt: 'Two-stroke Yamaha RX100 engine restoration workbench',
    description: 'Classic 2-stroke engine restoration with Japanese standard crank re-centering and reed valve tuning.',
  },
  {
    id: 'gal-8',
    src: '/images/Gallary/SaveClip.App_764116120_17960641887175433_663142152934308415_n.jpg',
    title: 'Drive Chain Cleaning & High-Tack Lubrication',
    category: 'Servicing',
    alt: 'Motorcycle chain cleaning and lubrication service in Jamner',
    description: 'Degreasing with high-pressure cleaner, slack adjustment, and O-ring chain lubricant coating.',
  },
  {
    id: 'gal-9',
    src: '/images/Gallary/SaveClip.App_764676210_17960641563175433_2615807174010287203_n.jpg',
    title: 'High-Gloss Ceramic Coating on Restored Tank',
    category: 'Paint',
    alt: 'High-gloss ceramic coating applied on restored motorcycle fuel tank',
    description: 'Hydrophobic 9H ceramic coating protection applied over freshly restored oven paint.',
  },
  {
    id: 'gal-10',
    src: '/images/Gallary/SaveClip.App_764694001_17960641872175433_1259823115832174628_n.jpg',
    title: 'Original OEM Fiber Kit & Visor Assembly',
    category: 'Restoration',
    alt: 'Original factory fiber panels and visor assembly at Chaudhari Auto',
    description: 'Brand new OEM visor, side panels, tail cowl, and mudguard fittings with zero vibration mounting.',
  },
  {
    id: 'gal-11',
    src: '/images/Gallary/SaveClip.App_764975447_17960641848175433_9031705044490108474_n.jpg',
    title: 'Front Fork Suspension & Seal Replacement',
    category: 'Servicing',
    alt: 'Front fork suspension servicing and oil replacement',
    description: 'Telescopic fork disassembly, hydraulic fork oil grading, and genuine oil seal replacement.',
  },
  {
    id: 'gal-12',
    src: '/images/Gallary/SaveClip.App_765619840_17960641572175433_3593156307828676883_n.jpg',
    title: 'Showroom Delivery & Final Road Test',
    category: 'Restoration',
    alt: 'Final road test inspection of restored motorcycle at Chaudhari Auto',
    description: 'Multi-point dynamic road test, electrical check, emissions inspection, and clean delivery handover.',
  },
];

const CATEGORIES = ['All', 'Restoration', 'Engine', 'Servicing', 'Paint'] as const;

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = galleryPhotosList.filter(
    (photo) => activeCategory === 'All' || photo.category === activeCategory
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
        );
      }
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredPhotos.length]);

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Workshop & Bike Restoration Gallery - Chaudhari Auto Pahur',
    description:
      'Real photos of motorcycle servicing, engine repairs, 2-stroke restoration, and paint baking at Chaudhari Auto in Pahur, Jamner, Jalgaon.',
    url: 'https://www.chaudhariauto.com/gallery',
    image: galleryPhotosList.map((p) => 'https://www.chaudhariauto.com' + p.src),
  };

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col justify-between">
      <SEO
        title="Workshop & Bike Restoration Photos | Chaudhari Auto Pahur"
        description="View real workshop photos of motorcycle servicing, 2-stroke engine rebuilds, oven painting, and bike restorations at Chaudhari Auto in Pahur, Maharashtra."
        canonicalPath="/gallery"
        jsonLd={gallerySchema}
      />

      <div>
        <PageBanner
          title="WORKSHOP & RESTORATION GALLERY"
          breadcrumb="Gallery"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          {/* Top Intro & Category Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-[#222]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-2.5 rounded-full border border-[#F5B900]/30 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-widest">
                <Camera className="w-3.5 h-3.5" />
                <span>REAL CRAFTSMANSHIP</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white font-sans">
                EXPLORE OUR WORKSHOP PHOTOS
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                Click any photo to view in high resolution with full restoration details and workshop notes.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveLightboxIndex(null);
                    setActiveCategory(cat);
                  }}
                  className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all border cursor-pointer active:scale-95 ${
                    activeCategory === cat
                      ? 'bg-[#F5B900] text-black border-[#F5B900] shadow-md shadow-[#F5B900]/20'
                      : 'bg-[#181818] text-neutral-300 border-[#2A2A2A] hover:border-[#F5B900]/50 hover:text-white'
                  }`}
                >
                  {cat === 'All' ? 'All Photos (सर्व)' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Counter */}
          <div className="text-xs text-neutral-500 py-4 flex items-center justify-between">
            <span>
              Showing <strong className="text-[#F5B900]">{filteredPhotos.length}</strong> photos
            </span>
            <span className="hidden sm:inline">Chaudhari Auto Centre • Pahur Workshop</span>
          </div>

          {/* Photos Grid - Images Only */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {filteredPhotos.map((photo, idx) => (
              <ScrollReveal key={photo.id} direction="up" delay={(idx % 4) * 50}>
                <div
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#141414] border border-[#242424] hover:border-[#F5B900]/80 cursor-pointer shadow-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#F5B900]/20"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Subtle Maximize Icon on Hover */}
                  <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-black/75 backdrop-blur-sm border border-white/20 text-[#F5B900] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom Booking CTA Banner */}
          <div className="mt-16 bg-gradient-to-r from-[#181818] via-[#1E1E1E] to-[#181818] border border-[#2B2B2B] rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5B900]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <span className="text-xs font-black uppercase tracking-widest text-[#F5B900] flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>WANT SIMILAR EXPERT CARE FOR YOUR MOTORCYCLE?</span>
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white tracking-tight font-sans">
                BOOK BIKE SERVICE OR RESTORATION IN PAHUR
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                Contact our technician desk for instant estimates, parts replacement quotes, and fast pickup in Pahur, Jamner, and Jalgaon.
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
                  className="px-6 py-3 rounded-xl bg-[#252525] hover:bg-[#333] border border-[#444] text-white font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4 text-[#F5B900]" />
                  <span>Start Restoration Job</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && filteredPhotos[activeLightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col items-center animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with counter & close */}
            <div className="w-full flex items-center justify-between text-xs text-neutral-300 pb-3 mb-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#F5B900]">
                  PHOTO {activeLightboxIndex + 1} OF {filteredPhotos.length}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-semibold text-[10px] uppercase">
                  {filteredPhotos[activeLightboxIndex].category}
                </span>
              </div>
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image Box */}
            <div className="relative w-full max-h-[75vh] rounded-2xl overflow-hidden bg-black/80 flex items-center justify-center border border-white/10 shadow-2xl">
              <img
                src={filteredPhotos[activeLightboxIndex].src}
                alt={filteredPhotos[activeLightboxIndex].alt}
                className="max-h-[75vh] w-auto object-contain select-none"
              />

              {/* Prev / Next Nav Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/75 border border-white/20 hover:border-[#F5B900] text-white hover:text-[#F5B900] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/75 border border-white/20 hover:border-[#F5B900] text-white hover:text-[#F5B900] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption & Action Links */}
            <div className="w-full mt-3 px-3 py-2.5 rounded-xl bg-[#141414] border border-[#222] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-white text-sm">
                  {filteredPhotos[activeLightboxIndex].title}
                </h4>
                <p className="text-neutral-400 text-xs mt-0.5">
                  {filteredPhotos[activeLightboxIndex].description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to="/inquiry"
                  className="px-3.5 py-1.5 rounded-lg bg-[#F5B900] hover:bg-[#E5AC00] text-black font-bold text-xs transition-colors"
                >
                  Enquire for this Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
