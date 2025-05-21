import React from 'react';
import { UserCircle } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 'md',
  className = '' 
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8';
      case 'md': return 'w-12 h-12';
      case 'lg': return 'w-16 h-16';
      case 'xl': return 'w-24 h-24';
      default: return 'w-12 h-12';
    }
  };
  
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 16;
      case 'md': return 24;
      case 'lg': return 32;
      case 'xl': return 48;
      default: return 24;
    }
  };
  
  const sizeClass = getSizeClass();
  const iconSize = getIconSize();
  
  if (!src) {
    return (
      <div className={`${sizeClass} rounded-full bg-gray-200 flex items-center justify-center ${className}`}>
        <UserCircle size={iconSize} className="text-gray-500" />
      </div>
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`${sizeClass} rounded-full object-cover ${className}`} 
    />
  );
};

export default Avatar;