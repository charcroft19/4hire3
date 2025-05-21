import React from 'react';
import Avatar from '../common/Avatar';

interface Review {
  id: string;
  rating: number;
  comment: string;
  date: Date;
  from?: { 
    id: string; 
    name: string; 
    avatar?: string 
  };
  reviewerName?: string;
  reviewerAvatar?: string;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-4">
      {reviews.map(review => {
        // Handle both review structures
        const reviewerName = review.from?.name || review.reviewerName || 'Anonymous';
        const reviewerAvatar = review.from?.avatar || review.reviewerAvatar;
        
        return (
          <div key={review.id} className="border border-gray-200 rounded-md p-4">
            <div className="flex items-start">
              <Avatar 
                src={reviewerAvatar} 
                alt={reviewerName} 
                size="sm" 
                className="mr-3 mt-1"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-gray-800">{reviewerName}</h4>
                  <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;