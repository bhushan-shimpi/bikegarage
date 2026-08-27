import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  asAnchor = false,
  href,
  target,
  rel,
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0B0B] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] rounded-md';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs tracking-wide uppercase',
    md: 'px-5 py-2.5 text-sm tracking-wide',
    lg: 'px-7 py-3.5 text-base tracking-wide uppercase font-bold',
  };

  const variantClasses = {
    primary:
      'bg-[#F5B900] text-black hover:bg-[#DFA500] focus:ring-[#F5B900] shadow-yellow-sm hover:shadow-yellow-glow',
    secondary:
      'bg-[#1C1C1C] text-white hover:bg-[#262626] border border-[#333333] focus:ring-neutral-400',
    outline:
      'bg-transparent text-[#F5B900] border border-[#F5B900] hover:bg-[#F5B900] hover:text-black focus:ring-[#F5B900]',
    ghost:
      'bg-transparent text-neutral-300 hover:text-white hover:bg-white/5 focus:ring-neutral-500',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  if (asAnchor && href) {
    return (
      <a href={href} className={combinedClasses} target={target} rel={rel}>
        {leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
    </button>
  );
};
