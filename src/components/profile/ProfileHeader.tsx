import React from 'react';

interface ProfileHeaderProps {
  title: string;
  subtitle?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  title, 
  subtitle 
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md p-6 mb-6 text-white">
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="mt-1 opacity-90">{subtitle}</p>}
    </div>
  );
};

export default ProfileHeader;