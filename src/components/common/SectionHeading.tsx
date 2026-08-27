import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  marathiSubtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  marathiSubtitle,
  align = 'center',
  className = '',
}) => {
  const alignmentClass =
    align === 'center'
      ? 'text-center items-center mx-auto'
      : align === 'right'
      ? 'text-right items-end ml-auto'
      : 'text-left items-start';

  return (
    <div className={`flex flex-col max-w-3xl mb-12 ${alignmentClass} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded border border-[#F5B900]/30 bg-[#F5B900]/10 text-[#F5B900] text-xs font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5B900]" />
          {badge}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
        {title}
      </h2>

      <div className="w-16 h-1 bg-[#F5B900] mt-4 mb-4 rounded-full" />

      {subtitle && (
        <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}

      {marathiSubtitle && (
        <p className="text-sm sm:text-base text-neutral-400 mt-1 font-medium">
          {marathiSubtitle}
        </p>
      )}
    </div>
  );
};
