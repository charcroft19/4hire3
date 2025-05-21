import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useJobs } from './JobContext';

interface AnalyticsContextType {
  earnings: number;
  jobSuccessRate: number;
  averageResponseTime: number;
  popularCategories: { category: string; count: number }[];
  getAnalytics: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { jobs } = useJobs();
  const [analytics, setAnalytics] = useState({
    earnings: 0,
    jobSuccessRate: 0,
    averageResponseTime: 0,
    popularCategories: []
  });

  const calculateAnalytics = () => {
    if (!user) return;

    const totalEarnings = jobs
      .filter(job => job.status === 'completed')
      .reduce((sum, job) => sum + parseFloat(job.price.replace(/[^0-9.-]+/g, '')), 0);

    const completedJobs = jobs.filter(job => job.status === 'completed').length;
    const totalJobs = jobs.length;
    const successRate = totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0;

    const avgResponseTime = Math.random() * 60;

    const categoryCount = jobs.reduce((acc, job) => {
      acc[job.category] = (acc[job.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const popularCategories = Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    setAnalytics({
      earnings: totalEarnings,
      jobSuccessRate: successRate,
      averageResponseTime: avgResponseTime,
      popularCategories
    });
  };

  useEffect(() => {
    calculateAnalytics();
  }, [user, jobs]);

  return (
    <AnalyticsContext.Provider value={{
      ...analytics,
      getAnalytics: calculateAnalytics
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};