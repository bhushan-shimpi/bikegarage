import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  count: number | string;
  icon: LucideIcon;
  subtext?: string;
  colorTheme?: 'yellow' | 'blue' | 'amber' | 'emerald' | 'rose';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  count,
  icon: Icon,
  subtext,
  colorTheme = 'yellow',
  onClick,
}) => {
  const themeStyles = {
    yellow: {
      border: 'hover:border-[#F5B900]',
      iconBg: 'bg-[#FFF9E6] border-[#F5B900]/40 text-[#DFA500]',
    },
    blue: {
      border: 'hover:border-sky-400',
      iconBg: 'bg-sky-50 border-sky-200 text-sky-600',
    },
    amber: {
      border: 'hover:border-amber-400',
      iconBg: 'bg-amber-50 border-amber-200 text-amber-600',
    },
    emerald: {
      border: 'hover:border-emerald-400',
      iconBg: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    },
    rose: {
      border: 'hover:border-rose-400',
      iconBg: 'bg-rose-50 border-rose-200 text-rose-600',
    },
  }[colorTheme];

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-xl bg-white border border-gray-200 ${themeStyles.border} transition-all duration-200 flex items-center justify-between shadow-xs ${
        onClick ? 'cursor-pointer hover:bg-gray-50' : ''
      }`}
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
          {label}
        </span>
        <span className="text-3xl font-black text-gray-900 tracking-tight font-sans">
          {count}
        </span>
        {subtext && (
          <span className="text-[11px] text-gray-500 block mt-1">
            {subtext}
          </span>
        )}
      </div>

      <div
        className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${themeStyles.iconBg}`}
      >
        <Icon className="w-6 h-6 stroke-[2]" />
      </div>
    </div>
  );
};
