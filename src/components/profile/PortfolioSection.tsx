import React, { useState } from 'react';
import { Plus, X, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
}

interface PortfolioSectionProps {
  items: PortfolioItem[];
  onItemsChange: (items: PortfolioItem[]) => void;
  editable?: boolean;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  items,
  onItemsChange,
  editable = false
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState<Omit<PortfolioItem, 'id'>>({
    title: '',
    description: '',
    image: '',
    link: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onItemsChange([...items, { ...newItem, id: crypto.randomUUID() }]);
    setNewItem({ title: '', description: '', image: '', link: '' });
    setShowForm(false);
  };

  const handleRemove = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Portfolio</h3>
        {editable && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus size={16} className="mr-1" />
            Add Project
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={newItem.image}
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="https://..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Link
            </label>
            <input
              type="url"
              value={newItem.link}
              onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="https://..."
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Project
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <ImageIcon size={48} className="text-gray-400" />
              </div>
            )}
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                {editable && (
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  View Project
                  <ExternalLink size={14} className="ml-1" />
                </a>
              )}
            </div>
          </div>
        ))}
        
        {items.length === 0 && (
          <p className="text-gray-500 text-sm col-span-2">
            No portfolio items added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default PortfolioSection;