import React, { useState } from 'react';
import { CreditCard, ChevronRight } from 'lucide-react';

const PaymentSetup: React.FC = () => {
  const [step, setStep] = useState(1);
  
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Setup</h2>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            1
          </div>
          <div className={`ml-4 flex-1 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
          </div>
          <div className={`ml-4 flex-1 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            3
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Connect Stripe</span>
          <span>Verify Account</span>
          <span>Start Accepting Payments</span>
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <CreditCard size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Stripe Integration</h3>
            <p className="text-gray-600 mb-4">
              Connect your Stripe account to securely process payments from students for completed jobs.
              Stripe handles all payment processing and security compliance.
            </p>
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <span className="mr-2">Service fee:</span>
              <span className="font-semibold">3.9% + $0.30 per transaction</span>
            </div>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center opacity-60 cursor-not-allowed" disabled>
              <span>Connect with Stripe</span>
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Preview</h3>
        <div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Job: Yard Work</span>
            <span className="text-green-600 font-bold">$75.00</span>
          </div>
          <div className="text-sm text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span>Platform Fee (3.9%)</span>
              <span>-$2.93</span>
            </div>
            <div className="flex justify-between">
              <span>Transaction Fee</span>
              <span>-$0.30</span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-medium">
              <span>You'll Receive</span>
              <span>$71.77</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 italic">
          Note: This is a preview of how payments will work once you connect your Stripe account.
          No actual payments can be processed until setup is complete.
        </p>
      </div>
    </div>
  );
};

export default PaymentSetup;