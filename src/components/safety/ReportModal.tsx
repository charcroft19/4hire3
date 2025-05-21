import React, { useState } from 'react';
import { useSafety } from '../../context/SafetyContext';
import { AlertTriangle } from 'lucide-react';

interface ReportModalProps {
  userId: string;
  userName: string;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ userId, userName, onClose }) => {
  const { reportUser } = useSafety();
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reportUser(userId, reason);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <AlertTriangle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Report Submitted</h3>
            <p className="mt-2 text-sm text-gray-500">
              Thank you for your report. We will review it and take appropriate action.
            </p>
            <div className="mt-4">
              <button
                onClick={onClose}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Report {userName}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for reporting
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
              placeholder="Please provide details about why you are reporting this user..."
            />
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;