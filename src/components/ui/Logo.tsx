import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showText?: boolean;
  height?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark', height = 'h-12' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="Marne Transdem" 
        className={`${height} w-auto object-contain transition-transform hover:scale-105 duration-300 ${
          variant === 'light' ? 'brightness-0 invert' : ''
        }`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
