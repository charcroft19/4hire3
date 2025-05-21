import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
}

interface JobProgressProps {
  jobId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  progress: number;
  milestones: Milestone[];
  onMilestoneComplete: (jobId: string, milestoneId: string) => void;
}

const JobProgress: React.FC<JobProgressProps> = ({
  jobId,
  status,
  progress,
  milestones,
  onMilestoneComplete
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'in_progress':
        return <Clock className="text-blue-600" size={20} />;
      case 'cancelled':
        return <AlertTriangle className="text-red-600" size={20} />;
      default:
        return <Clock className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`font-medium ${getStatusColor()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          Overall Progress: {progress}%
        </span>
      </div>

      <div className="relative">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
          />
        </div>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className={`border ${
              milestone.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
            } rounded-lg p-4`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm font-medium text-gray-700 mr-2">
                    {index + 1}
                  </span>
                  <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                </div>
                <p className="mt-1 text-sm text-gray-500">{milestone.description}</p>
                <p className="mt-2 text-xs text-gray-500">
                  Due: {new Date(milestone.dueDate).toLocaleDateString()}
                </p>
              </div>
              
              {!milestone.completed && status === 'in_progress' && (
                <button
                  onClick={() => onMilestoneComplete(jobId, milestone.id)}
                  className="px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Complete
                </button>
              )}
              
              {milestone.completed && (
                <CheckCircle className="text-green-600" size={20} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobProgress;