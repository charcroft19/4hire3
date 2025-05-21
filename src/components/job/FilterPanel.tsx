import React, { useState } from 'react';
import { JobFilters } from '../../context/JobContext';
import { X, DollarSign, Search } from 'lucide-react';

interface FilterPanelProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  categories: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  onFilterChange,
  categories
}) => {
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() || '');
  const [location, setLocation] = useState(filters.location || '');
  
  const handleApplyFilters = () => {
    onFilterChange({
      ...filters,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      location: location || undefined
    });
  };
  
  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setLocation('');
    onFilterChange({});
  };
  
  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filters,
      category: category === 'All' ? undefined : category
    });
  };
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">Filters</h3>
        <button 
          onClick={handleClearFilters}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
        >
          <X size={14} className="mr-1" />
          Clear All
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-xs px-3 py-1.5 rounded-full ${
                  (category === 'All' && !filters.category) || filters.category === category
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign size={14} className="text-gray-400" />
              </div>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="block w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign size={14} className="text-gray-400" />
              </div>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="block w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="City, state, or zip"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={14} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;