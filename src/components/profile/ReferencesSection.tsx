import React, { useState } from 'react';
import { Plus, X, Star } from 'lucide-react';
import Avatar from '../common/Avatar';

interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
  avatar?: string;
  verified: boolean;
}

interface ReferencesSectionProps {
  references: Reference[];
  onReferencesChange: (references: Reference[]) => void;
  editable?: boolean;
}

const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  references,
  onReferencesChange,
  editable = false
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newReference, setNewReference] = useState<Omit<Reference, 'id' | 'verified'>>({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    relationship: '',
    avatar: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReferencesChange([
      ...references,
      { ...newReference, id: crypto.randomUUID(), verified: false }
    ]);
    setNewReference({
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      relationship: '',
      avatar: ''
    });
    setShowForm(false);
  };

  const handleRemove = (id: string) => {
    onReferencesChange(references.filter(ref => ref.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Professional References</h3>
        {editable && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus size={16} className="mr-1" />
            Add Reference
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={newReference.name}
                onChange={(e) => setNewReference({ ...newReference, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={newReference.title}
                onChange={(e) => setNewReference({ ...newReference, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={newReference.company}
                onChange={(e) => setNewReference({ ...newReference, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={newReference.email}
                onChange={(e) => setNewReference({ ...newReference, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={newReference.phone}
                onChange={(e) => setNewReference({ ...newReference, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship
              </label>
              <input
                type="text"
                value={newReference.relationship}
                onChange={(e) => setNewReference({ ...newReference, relationship: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., Former Supervisor"
                required
              />
            </div>
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
              Add Reference
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {references.map(reference => (
          <div key={reference.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Avatar
                  src={reference.avatar}
                  alt={reference.name}
                  size="md"
                />
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">{reference.name}</h4>
                  <p className="text-sm text-gray-500">{reference.title}</p>
                  <p className="text-sm text-gray-500">{reference.company}</p>
                </div>
              </div>
              {editable && (
                <button
                  onClick={() => handleRemove(reference.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>
                <strong>Relationship:</strong> {reference.relationship}
              </p>
              <p>
                <strong>Email:</strong> {reference.email}
              </p>
              <p>
                <strong>Phone:</strong> {reference.phone}
              </p>
            </div>
            
            {reference.verified && (
              <div className="mt-4 flex items-center text-green-600">
                <Star size={16} className="mr-1" />
                <span className="text-sm font-medium">Verified Reference</span>
              </div>
            )}
          </div>
        ))}
        
        {references.length === 0 && (
          <p className="text-gray-500 text-sm col-span-2">
            No references added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default ReferencesSection;