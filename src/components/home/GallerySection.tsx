import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { galleryData, GalleryItem } from '../../data/galleryData';
import { Modal } from '../common/Modal';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'restoration' | 'servicing' | 'painting' | 'detailing'>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    { key: 'all', label: 'All Work' },
    { key: 'restoration', label: 'Restoration' },
    { key: 'servicing', label: 'Servicing' },
    { key: 'painting', label: 'Painting' },
    { key: 'detailing', label: 'Detailing' },
  ] as const;

  const filteredItems = activeFilter === 'all'
    ? galleryData
    : galleryData.filter((item) => item.category === activeFilter);

  return (
    <section className="py-20 bg-[#0B0B0B]" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Visual Proof"
          title="BEFORE & AFTER GALLERY"
          subtitle="Explore the dramatic transformations achieved by our technicians and painters"
          marathiSubtitle="कामाचा दर्जा स्वतः डोळ्यांनी पहा"
          align="center"
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeFilter === cat.key
                  ? 'bg-[#F5B900] text-black shadow-yellow-sm'
                  : 'bg-[#181818] text-neutral-400 hover:text-white border border-[#2B2B2B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative h-64 sm:h-72 rounded-xl overflow-hidden cursor-pointer border border-[#262626] bg-[#151515] hover:border-[#F5B900] transition-all duration-300 shadow-md"
            >
              <img
                src={item.afterImage}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded bg-[#F5B900] text-black">
                  {item.category}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-black/70 text-neutral-300 backdrop-blur border border-white/10">
                  Before / After
                </span>
              </div>

              {/* Expand Icon Hint */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-[#F5B900]" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h4 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#F5B900] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-1">
                  {item.description}
                </p>
                <div className="mt-2 text-[11px] font-semibold text-[#F5B900] uppercase tracking-wider flex items-center gap-1">
                  <span>Click to view comparison slider</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Comparison Modal */}
      {activeItem && (
        <Modal
          isOpen={Boolean(activeItem)}
          onClose={() => setActiveItem(null)}
          title={`${activeItem.title} (${activeItem.bikeName})`}
          maxWidth="4xl"
        >
          <div className="space-y-6">
            <BeforeAfterSlider
              beforeImage={activeItem.beforeImage}
              afterImage={activeItem.afterImage}
              bikeName={activeItem.bikeName}
            />

            <div className="p-4 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#F5B900] uppercase tracking-wider block">
                  Transformation Summary
                </span>
                <p className="text-sm text-neutral-300 mt-1">
                  {activeItem.description}
                </p>
              </div>

              <a
                href={`/inquiry?service=Bike%20Restoration&notes=Inquiring%20about%20gallery%20project:%20${encodeURIComponent(activeItem.title)}`}
                className="shrink-0 px-4 py-2 rounded-lg bg-[#F5B900] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#DFA500] transition-colors"
              >
                Inquire This Look
              </a>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
