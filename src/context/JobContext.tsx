import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
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
  applicants: string[]; // Array of student IDs
}

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'date' | 'applicants'>) => void;
  applyToJob: (jobId: string, studentId: string) => void;
  getJobsForEmployer: (employerId: string) => Job[];
  getAppliedJobs: (studentId: string) => Job[];
  filterJobs: (filters: JobFilters) => Job[];
}

export interface JobFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  query?: string;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

// Sample categories for job filtering
export const jobCategories = [
  'Yard Work',
  'Moving & Furniture',
  'Cleaning',
  'Tech Help',
  'Tutoring',
  'Pet Care',
  'Errands',
  'Other'
];

// Initial mock data
const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Yard Work',
    description: 'Front yard cleanup needed, including raking leaves and trimming bushes.',
    price: '$75',
    location: {
      lat: 40.0150,
      lng: -105.2705,
      address: '123 College St, Boulder, CO'
    },
    category: 'Yard Work',
    employerId: 'employer-1',
    employerName: 'John Smith',
    date: new Date('2025-03-15'),
    applicants: []
  },
  {
    id: '2',
    title: 'Help Move Furniture',
    description: 'Assist moving heavy items from garage to truck, then to new apartment.',
    price: '$150',
    location: {
      lat: 40.5734,
      lng: -105.0865,
      address: '456 University Ave, Fort Collins, CO'
    },
    category: 'Moving & Furniture',
    employerId: 'employer-2',
    employerName: 'Emily Jones',
    date: new Date('2025-03-20'),
    applicants: []
  },
  {
    id: '3',
    title: 'Computer Setup & Troubleshooting',
    description: 'Help setting up new laptop and transferring files from old computer.',
    price: '$60',
    location: {
      lat: 32.7157,
      lng: -117.1611,
      address: '789 Campus Way, San Diego, CA'
    },
    category: 'Tech Help',
    employerId: 'employer-1',
    employerName: 'John Smith',
    date: new Date('2025-03-18'),
    applicants: []
  }
];

// Provider Component
export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      const parsedJobs = JSON.parse(storedJobs);
      // Convert string dates back to Date objects
      const jobsWithDates = parsedJobs.map((job: any) => ({
        ...job,
        date: new Date(job.date)
      }));
      setJobs(jobsWithDates);
    } else {
      setJobs(initialJobs);
    }
  }, []);

  // Save to localStorage when jobs change
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job: Omit<Job, 'id' | 'date' | 'applicants'>) => {
    const newJob: Job = {
      ...job,
      id: `job-${Date.now()}`,
      date: new Date(),
      applicants: []
    };
    setJobs([...jobs, newJob]);
  };

  const applyToJob = (jobId: string, studentId: string) => {
    setJobs(
      jobs.map(job => 
        job.id === jobId && !job.applicants.includes(studentId)
          ? { ...job, applicants: [...job.applicants, studentId] }
          : job
      )
    );
  };

  const getJobsForEmployer = (employerId: string) => {
    return jobs.filter(job => job.employerId === employerId);
  };

  const getAppliedJobs = (studentId: string) => {
    return jobs.filter(job => job.applicants.includes(studentId));
  };

  const filterJobs = (filters: JobFilters) => {
    return jobs.filter(job => {
      // Filter by category if provided
      if (filters.category && filters.category !== 'All' && job.category !== filters.category) {
        return false;
      }
      
      // Filter by price range if provided
      if (filters.minPrice) {
        const jobPrice = parseFloat(job.price.replace(/[^0-9.]/g, ''));
        if (jobPrice < filters.minPrice) return false;
      }
      
      if (filters.maxPrice) {
        const jobPrice = parseFloat(job.price.replace(/[^0-9.]/g, ''));
        if (jobPrice > filters.maxPrice) return false;
      }
      
      // Filter by location (simple substring match for now)
      if (filters.location && !job.location.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Filter by search query (title or description)
      if (filters.query) {
        const query = filters.query.toLowerCase();
        return job.title.toLowerCase().includes(query) || 
               job.description.toLowerCase().includes(query);
      }
      
      return true;
    });
  };

  return (
    <JobContext.Provider value={{ 
      jobs, 
      addJob, 
      applyToJob, 
      getJobsForEmployer,
      getAppliedJobs,
      filterJobs
    }}>
      {children}
    </JobContext.Provider>
  );
};

// Custom hook for using the job context
export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};