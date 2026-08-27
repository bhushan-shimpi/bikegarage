import React from 'react';
import { EnquiryStatus } from '../../types/enquiry';
import { getStatusLabel, getStatusStyles } from '../../utils/formatters';

interface StatusBadgeProps {
  status: EnquiryStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const styles = getStatusStyles(status);
  const label = getStatusLabel(status);

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-[11px]'
      : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${styles.bg} ${styles.text} ${styles.border} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} animate-pulse`} />
      {label}
    </span>
  );
};
