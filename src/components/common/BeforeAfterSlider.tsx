import React, { useState, useRef, useCallback } from 'react';
import { Columns, SplitSquareVertical } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  bikeName?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE (Original Condition)',
  afterLabel = 'AFTER (Fully Restored)',
  bikeName = '1996 Yamaha RX100 Classic',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSideBySide, setIsSideBySide] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Controls Bar */}
      <div className="w-full flex items-center justify-between mb-3 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F5B900]" />
          <span className="font-semibold text-white">{bikeName}</span>
        </div>
        <button
          onClick={() => setIsSideBySide(!isSideBySide)}
          className="flex items-center gap-1.5 px-3 py-1 bg-[#1C1C1C] hover:bg-[#262626] text-neutral-300 hover:text-white rounded border border-[#333333] transition-colors"
          title="Toggle view mode"
        >
          {isSideBySide ? (
            <>
              <SplitSquareVertical className="w-3.5 h-3.5 text-[#F5B900]" />
              <span>Interactive Slider View</span>
            </>
          ) : (
            <>
              <Columns className="w-3.5 h-3.5 text-[#F5B900]" />
              <span>Side-by-Side View</span>
            </>
          )}
        </button>
      </div>

      {isSideBySide ? (
        /* Side by Side Mode */
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group overflow-hidden rounded-xl border border-[#262626] bg-[#151515]">
            <img
              src={beforeImage}
              alt="Before restoration"
              className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-rose-400 border border-rose-500/30">
              {beforeLabel}
            </div>
            <div className="p-3 bg-[#151515] border-t border-[#262626] text-xs text-neutral-400">
              Rusted frame, seized bore, worn electricals & paint loss.
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-xl border border-[#F5B900]/40 bg-[#151515] shadow-yellow-sm">
            <img
              src={afterImage}
              alt="After restoration"
              className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-[#F5B900] px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-black shadow-md">
              {afterLabel}
            </div>
            <div className="p-3 bg-[#151515] border-t border-[#262626] text-xs text-[#F5B900]">
              Mirror chrome, 2K Candy paint, rebuilt engine & authentic OEM rebuild.
            </div>
          </div>
        </div>
      ) : (
        /* Interactive Slider Mode */
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-80 sm:h-[450px] md:h-[500px] overflow-hidden rounded-xl border-2 border-[#262626] bg-[#111111] cursor-ew-resize select-none shadow-2xl"
        >
          {/* After Image (Full background) */}
          <img
            src={afterImage}
            alt="After restoration"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-[#F5B900] text-black text-xs font-bold px-3 py-1.5 rounded shadow-lg uppercase tracking-wider">
            {afterLabel}
          </div>

          {/* Before Image (Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImage}
              alt="Before restoration"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              }}
            />
            <div className="absolute top-4 left-4 bg-black/85 text-rose-400 border border-rose-500/30 text-xs font-bold px-3 py-1.5 rounded shadow-lg uppercase tracking-wider">
              {beforeLabel}
            </div>
          </div>

          {/* Divider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#F5B900] shadow-[0_0_15px_rgba(245,185,0,0.8)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#F5B900] text-black flex items-center justify-center shadow-xl border-2 border-black font-bold text-xs pointer-events-auto">
              ◀ ▶
            </div>
          </div>

          {/* Helper Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur px-4 py-1 rounded-full text-[11px] text-neutral-300 pointer-events-none border border-white/10">
            Drag slider left or right to compare
          </div>
        </div>
      )}
    </div>
  );
};
