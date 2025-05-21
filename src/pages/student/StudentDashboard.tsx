import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs, JobFilters, jobCategories } from '../../context/JobContext';
import JobMap from '../../components/job/JobMap';
import JobCard from '../../components/job/JobCard';
import FilterPanel from '../../components/job/FilterPanel';
import { Search, MapPin, DollarSign, Filter } from 'lucide-react';

function StudentDashboard() {
  const { user } = useAuth();
  const { jobs, applyToJob, filterJobs } = useJobs();
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleApply = (jobId: string) => {
    if (user) {
      applyToJob(jobId, user.id);
    }
  };

  const handleSearch = () => {
    setFilters({ ...filters, query: searchQuery });
  };

  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const filteredJobs = filterJobs(filters);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="w-full md:w-8/12 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Available Jobs</h1>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowMap(!showMap)}
                  className={`flex items-center px-3 py-2 rounded-md border ${showMap ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-600'}`}
                >
                  <MapPin size={18} className="mr-1" />
                  <span>Map</span>
                </button>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center px-3 py-2 rounded-md border ${showFilters ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-600'}`}
                >
                  <Filter size={18} className="mr-1" />
                  <span>Filters</span>
                </button>
              </div>
            </div>
            
            {showFilters && (
              <FilterPanel 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                categories={['All', ...jobCategories]} 
              />
            )}
            
            {showMap ? (
              <div className="h-96 mb-6 rounded-lg overflow-hidden border border-gray-300">
                <JobMap jobs={filteredJobs} />
              </div>
            ) : null}
            
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onApply={handleApply} 
                    isApplied={user ? job.applicants.includes(user.id) : false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No jobs found matching your criteria.</p>
                <button 
                  onClick={() => setFilters({})}
                  className="mt-2 text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-4/12 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">My Applications</h2>
            </div>
            
            {user && jobs.filter(job => job.applicants.includes(user.id)).length > 0 ? (
              <div className="space-y-4">
                {jobs
                  .filter(job => user && job.applicants.includes(user.id))
                  .map(job => (
                    <div key={job.id} className="border border-gray-200 rounded-md p-3 hover:bg-gray-50">
                      <h3 className="font-medium text-gray-800">{job.title}</h3>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <DollarSign size={14} />
                        <span>{job.price}</span>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm text-gray-500">Applied</span>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Pending
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">You haven't applied to any jobs yet.</p>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Methods</h2>
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-800">Stripe Integration</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Coming Soon</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Easily get paid for completed jobs through our secure payment system.
              </p>
              <button 
                className="w-full py-2 bg-blue-600 text-white rounded-md opacity-60 cursor-not-allowed"
                disabled
              >
                Connect Stripe Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;