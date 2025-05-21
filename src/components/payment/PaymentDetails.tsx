import React, { useState } from 'react';
import { CreditCard, DollarSign, Shield } from 'lucide-react';

interface PaymentDetailsProps {
  jobId: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  onPaymentSubmit: (jobId: string, paymentMethod: string) => Promise<void>;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  jobId,
  amount,
  status,
  onPaymentSubmit
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handlePaymentSubmit = async () => {
    if (!selectedMethod) return;
    
    setLoading(true);
    try {
      await onPaymentSubmit(jobId, selectedMethod);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
        <div className="flex items-center text-green-600">
          <Shield size={20} className="mr-1" />
          <span className="text-sm">Secure Payment</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Amount Due</span>
          <div className="flex items-center text-xl font-bold text-gray-900">
            <DollarSign size={20} className="mr-1" />
            {amount.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <label className="block">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="payment"
              value="credit_card"
              checked={selectedMethod === 'credit_card'}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="mr-2"
            />
            <CreditCard size={20} className="mr-2 text-gray-500" />
            <span>Credit Card</span>
          </div>
          {selectedMethod === 'credit_card' && (
            <div className="ml-6 space-y-3">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}
        </label>

        <label className="block">
          <div className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="bank_transfer"
              checked={selectedMethod === 'bank_transfer'}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="mr-2"
            />
            <DollarSign size={20} className="mr-2 text-gray-500" />
            <span>Bank Transfer</span>
          </div>
        </label>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={handlePaymentSubmit}
          disabled={!selectedMethod || loading || status !== 'pending'}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            !selectedMethod || loading || status !== 'pending'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
        
        <p className="mt-4 text-sm text-gray-500 text-center">
          Your payment is secured by industry-standard encryption
        </p>
      </div>
    </div>
  );
};

export default PaymentDetails;