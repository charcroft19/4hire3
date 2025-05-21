import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface Review {
  id: string;
  userId: string; // ID of the user being reviewed
  reviewerId: string; // ID of the user leaving the review
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getUserReviews: (userId: string) => Review[];
  getUserAverageRating: (userId: string) => number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

// Initial mock data
const initialReviews: Review[] = [
  {
    id: '1',
    userId: 'student-1',
    reviewerId: 'employer-1',
    reviewerName: 'John Smith',
    rating: 5,
    comment: 'Great worker, arrived on time and did an excellent job.',
    date: new Date('2025-02-15')
  },
  {
    id: '2',
    userId: 'employer-1',
    reviewerId: 'student-1',
    reviewerName: 'Alex Johnson',
    rating: 4,
    comment: 'Fair pay and clear instructions. Would work for them again.',
    date: new Date('2025-02-16')
  }
];

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      const parsedReviews = JSON.parse(storedReviews);
      const reviewsWithDates = parsedReviews.map((review: any) => ({
        ...review,
        date: new Date(review.date)
      }));
      setReviews(reviewsWithDates);
    } else {
      setReviews(initialReviews);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      date: new Date()
    };
    setReviews([...reviews, newReview]);
  };

  const getUserReviews = (userId: string) => {
    return reviews.filter(review => review.userId === userId);
  };

  const getUserAverageRating = (userId: string) => {
    const userReviews = getUserReviews(userId);
    if (userReviews.length === 0) return 0;
    
    const sum = userReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / userReviews.length;
  };

  return (
    <ReviewContext.Provider value={{ 
      reviews, 
      addReview, 
      getUserReviews,
      getUserAverageRating
    }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};