import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import PostJobForm from '../../components/job/PostJobForm';
import JobManagement from '../../components/job/JobManagement';
import PaymentSetup from '../../components/payment/PaymentSetup';
import JobProgress from '../../components/job/JobProgress';
import PaymentDetails from '../../components/payment/PaymentDetails';
import { Briefcase, Users, CreditCard, Plus, Minus } from 'lucide-react';

function EmployerDashboard() {
  const { user } = useAuth();
  const { getJobsForEmployer } = useJobs();
  const [activeTab, setActiveTab] = useState('post');
  const [showPostForm, setShowPostForm] = useState(true);

  const employerJobs = user ? getJobsForEmployer(user.id) : [];
  const applicantsCount = employerJobs.reduce(
    (count, job) => count + job.applicants.length, 
    0
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'post') {
      setShowPostForm(true);
    }
  };

  const handleMilestoneComplete = (jobId: string, milestoneId: string) => {
    // Implementation for milestone completion
    console.log('Milestone completed:', jobId, milestoneId);
  };

  const handlePaymentSubmit = async (jobId: string, paymentMethod: string) => {
    // Implementation for payment processing
    console.log('Processing payment:', jobId, paymentMethod);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Briefcase size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Jobs</p>
            <p className="text-2xl font-bold">{employerJobs.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Users size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Applicants</p>
            <p className="text-2xl font-bold">{applicantsCount}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <CreditCard size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment Status</p>
            <p className="text-lg font-medium text-gray-400">Not Connected</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => handleTabChange('post')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'post'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Post a Job
            </button>
            <button
              onClick={() => handleTabChange('manage')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'manage'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Manage Jobs
            </button>
            <button
              onClick={() => handleTabChange('progress')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'progress'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Job Progress
            </button>
            <button
              onClick={() => handleTabChange('payment')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'payment'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payment Setup
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'post' && (
            <div>
              {showPostForm ? (
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Post a New Job</h2>
                  <button 
                    onClick={() => setShowPostForm(false)}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                  >
                    <Minus size={16} className="mr-1" />
                    <span>Hide Form</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowPostForm(true)}
                  className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                >
                  <Plus size={16} className="mr-1" />
                  <span>Show Job Form</span>
                </button>
              )}
              
              {showPostForm && <PostJobForm />}
            </div>
          )}
          
          {activeTab === 'manage' && (
            <JobManagement jobs={employerJobs} />
          )}
          
          {activeTab === 'progress' && employerJobs.map(job => (
            <div key={job.id} className="mb-6 last:mb-0">
              <h3 className="text-lg font-bold text-gray-800 mb-4">{job.title}</h3>
              <JobProgress
                jobId={job.id}
                status={job.status || 'pending'}
                progress={75} // This would come from job data
                milestones={[
                  {
                    id: '1',
                    title: 'Job Started',
                    description: 'Initial consultation and requirements gathering',
                    completed: true,
                    dueDate: new Date()
                  },
                  {
                    id: '2',
                    title: 'In Progress',
                    description: 'Work being performed',
                    completed: false,
                    dueDate: new Date()
                  }
                ]}
                onMilestoneComplete={handleMilestoneComplete}
              />
            </div>
          ))}
          
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <PaymentSetup />
              {employerJobs.map(job => (
                <PaymentDetails
                  key={job.id}
                  jobId={job.id}
                  amount={parseFloat(job.price.replace(/[^0-9.-]+/g, ''))}
                  status="pending"
                  onPaymentSubmit={handlePaymentSubmit}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployerDashboard;