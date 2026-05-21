import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showText?: boolean;
  height?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant, height = 'h-12' }) => {
  const { theme } = useTheme();
  
  // Determine which logo version to use
  // The user wants logo-clair.webp in light mode and logo-sombre.webp in dark mode
  let logoSrc = theme === 'dark' ? '/images/logo-sombre.webp' : '/images/logo-clair.webp';
  
  // Manual overrides if variant is explicitly provided
  if (variant === 'dark') {
    logoSrc = '/images/logo-sombre.webp';
  } else if (variant === 'light') {
    logoSrc = '/images/logo-clair.webp';
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoSrc} 
        alt="Marne Transdem" 
        width="295"
        height="98"
        fetchPriority="high"
        loading="eager"
        className={`${height} w-auto object-contain transition-transform hover:scale-105 duration-300`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
