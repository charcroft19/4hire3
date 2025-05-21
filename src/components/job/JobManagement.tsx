import React, { useState } from 'react';
import Avatar from '../common/Avatar';
import { Trash2, Edit, User } from 'lucide-react';

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

interface JobManagementProps {
  jobs: Job[];
}

const JobManagement: React.FC<JobManagementProps> = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Mock applicants data for display purposes
  const mockApplicants = [
    { id: 'app1', name: 'Alex Johnson', university: 'colorado.edu', rating: 4.5, avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 'app2', name: 'Sarah Williams', university: 'sdsu.edu', rating: 4.8, avatar: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 'app3', name: 'Mike Thompson', university: 'colostate.edu', rating: 4.2, avatar: '' }
  ];
  
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Manage Your Jobs</h2>
      
      {jobs.length > 0 ? (
        <div className="space-y-4">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Job Title</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Posted</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Applicants</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className="hover:text-blue-600"
                      >
                        {job.title}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(job.date)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-blue-600">{job.price}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {job.applicants.length > 0 ? (
                        <span className="flex items-center">
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {job.applicants.length}
                          </span>
                          {job.applicants.length > 0 && (
                            <button 
                              className="ml-2 text-blue-600 hover:text-blue-800 text-xs underline"
                              onClick={() => setSelectedJob(job)}
                            >
                              View
                            </button>
                          )}
                        </span>
                      ) : (
                        <span className="text-gray-400">No applicants</span>
                      )}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex space-x-2 justify-end">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {selectedJob && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800">{selectedJob.title}</h3>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="mt-4 space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Job Details</h4>
                  <p className="text-gray-700">{selectedJob.description}</p>
                  <div className="mt-3 text-sm text-gray-500">
                    <div>Category: {selectedJob.category}</div>
                    <div>Price: {selectedJob.price}</div>
                    <div>Location: {selectedJob.location.address}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Applicants ({selectedJob.applicants.length})
                  </h4>
                  
                  {selectedJob.applicants.length > 0 ? (
                    <div className="space-y-3">
                      {mockApplicants.map(applicant => (
                        <div key={applicant.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <Avatar 
                              src={applicant.avatar} 
                              alt={applicant.name} 
                              size="sm" 
                            />
                            <div className="ml-3">
                              <div className="font-medium text-gray-800">{applicant.name}</div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <div className="flex items-center mr-2">
                                  {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-3 h-3 ${i < Math.round(applicant.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span>{applicant.university.split('.')[0].toUpperCase()} Student</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                              Hire
                            </button>
                            <button className="px-3 py-1 text-xs bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                              Message
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <User size={24} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">No applicants yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">You haven't posted any jobs yet.</p>
          <button 
            onClick={() => {}} // This would typically navigate to job posting form
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Post Your First Job
          </button>
        </div>
      )}
    </div>
  );
};

export default JobManagement;