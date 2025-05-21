import React from 'react';
import { useAnalytics } from '../../context/Analytics';
import { Line, Bar } from 'react-chartjs-2';
import { DollarSign, TrendingUp, Clock, Award } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  const { earnings, jobSuccessRate, averageResponseTime, popularCategories } = useAnalytics();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold">${earnings.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold">{jobSuccessRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Avg Response Time</p>
              <p className="text-2xl font-bold">{averageResponseTime.toFixed(0)}m</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Top Category</p>
              <p className="text-2xl font-bold">
                {popularCategories[0]?.category || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Earnings Over Time</h3>
          <Line
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                label: 'Earnings',
                data: [0, earnings * 0.2, earnings * 0.4, earnings * 0.6, earnings * 0.8, earnings],
                borderColor: 'rgb(59, 130, 246)',
                tension: 0.4
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Popular Categories</h3>
          <Bar
            data={{
              labels: popularCategories.map(cat => cat.category),
              datasets: [{
                label: 'Jobs',
                data: popularCategories.map(cat => cat.count),
                backgroundColor: 'rgb(59, 130, 246)'
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;