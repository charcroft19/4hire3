import React from 'react';
import { MapPin, DollarSign, Calendar, User } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  description: string;
  price: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  category: string;
  image?: string;
  employerId: string;
  employerName?: string;
  date: Date;
  applicants: string[];
}

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
  isApplied: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply, isApplied }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {job.image && (
        <div className="h-40 overflow-hidden">
          <img 
            src={job.image} 
            alt={job.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {job.category}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(job.date)}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 mb-2">{job.title}</h3>
        
        <p className="text-gray-600 text-sm mb-4">
          {truncateText(job.description, 100)}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={14} className="mr-1" />
            <span>{truncateText(job.location.address, 30)}</span>
          </div>
          
          {job.employerName && (
            <div className="flex items-center text-sm text-gray-500">
              <User size={14} className="mr-1" />
              <span>Posted by {job.employerName}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="font-bold text-blue-600 flex items-center">
            <DollarSign size={16} className="mr-0.5" />
            <span>{job.price}</span>
          </div>
          
          <button
            onClick={() => onApply(job.id)}
            disabled={isApplied}
            className={`py-1.5 px-4 rounded text-sm font-medium ${
              isApplied
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isApplied ? 'Applied' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;