import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs, jobCategories } from '../../context/JobContext';
import JobMap from './JobMap';
import { Upload, MapPin } from 'lucide-react';

const PostJobForm: React.FC = () => {
  const { user } = useAuth();
  const { addJob } = useJobs();
  
  const [job, setJob] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: jobCategories[0],
    location: {
      lat: 40.0150,
      lng: -105.2705,
      address: '123 College St, Boulder, CO'
    }
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };
  
  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setJob({ ...job, location });
    setShowMap(false);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setJob({ ...job, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!job.title || !job.description || !job.price || !job.category) {
      setError('Please fill out all required fields');
      return;
    }
    
    try {
      if (user) {
        addJob({
          ...job,
          employerId: user.id,
          employerName: user.username
        });
        
        // Reset form
        setJob({
          title: '',
          description: '',
          price: '',
          image: '',
          category: jobCategories[0],
          location: {
            lat: 40.0150,
            lng: -105.2705,
            address: '123 College St, Boulder, CO'
          }
        });
        setImagePreview(null);
        setError('');
        setSuccess('Job posted successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }
    } catch (err) {
      setError('Failed to post job. Please try again.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
          {success}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={job.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Yard Work, Moving Help, etc."
            required
          />
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Budget <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
            <input
              type="text"
              id="price"
              name="price"
              value={job.price}
              onChange={handleInputChange}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="50"
              required
            />
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Job Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={job.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the job in detail..."
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={job.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {jobCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="location"
              name="location"
              value={job.location.address}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Job location"
              readOnly
            />
            <MapPin size={18} className="absolute left-3 top-2.5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="absolute right-2 top-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              {showMap ? 'Hide Map' : 'Set Location'}
            </button>
          </div>
        </div>
      </div>
      
      {showMap && (
        <div className="h-64 border border-gray-300 rounded-md overflow-hidden">
          <JobMap 
            jobs={[]} 
            selectable={true} 
            onLocationSelect={handleLocationSelect} 
          />
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Image (Optional)
        </label>
        <div className="mt-1 flex items-center">
          <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            <Upload size={16} className="mr-2" />
            <span>Upload Image</span>
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
          </label>
          {imagePreview && (
            <div className="ml-4">
              <img
                src={imagePreview}
                alt="Job preview"
                className="h-16 w-16 object-cover rounded"
              />
            </div>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Upload an image related to the job (max 5MB)
        </p>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Post Job
        </button>
      </div>
    </form>
  );
};

export default PostJobForm;