import React, { useState } from 'react';
import { Bike } from 'lucide-react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-[#1C1C1C] via-[#141414] to-[#0D0D0D] flex flex-col items-center justify-center p-4 text-center select-none border border-white/5 ${className}`}
      >
        <div className="w-10 h-10 rounded-full bg-[#F5B900]/10 border border-[#F5B900]/30 flex items-center justify-center text-[#F5B900] mb-1.5 shadow-inner">
          <Bike className="w-5 h-5 stroke-[2]" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-300 line-clamp-1">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
      {/* Subtle shimmer skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-800 animate-pulse flex items-center justify-center z-10">
          <Bike className="w-6 h-6 text-neutral-600 animate-pulse" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
