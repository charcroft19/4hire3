import React from 'react';

interface UniversityLogoProps {
  domain: string;
  size?: 'sm' | 'md' | 'lg';
}

const UniversityLogo: React.FC<UniversityLogoProps> = ({ domain, size = 'sm' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-5 h-5';
      case 'md': return 'w-7 h-7';
      case 'lg': return 'w-10 h-10';
      default: return 'w-5 h-5';
    }
  };
  
  const getLogoUrl = () => {
    switch (domain) {
      case 'colorado.edu':
        return 'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/University_of_Colorado_Buffaloes_wordmark.svg/200px-University_of_Colorado_Buffaloes_wordmark.svg.png';
      case 'colostate.edu':
        return 'https://brand.colostate.edu/wp-content/uploads/sites/47/2019/01/CSU-Ram-357.png';
      case 'sdsu.edu':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/San_Diego_State_Aztecs_logo.svg/200px-San_Diego_State_Aztecs_logo.svg.png';
      default:
        return 'https://via.placeholder.com/50?text=Uni';
    }
  };
  
  const sizeClass = getSizeClass();
  const logoUrl = getLogoUrl();
  
  return (
    <img 
      src={logoUrl} 
      alt={`${domain} logo`} 
      className={`${sizeClass} rounded-full object-contain`} 
    />
  );
};

export default UniversityLogo;