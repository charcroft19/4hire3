import React, { useState } from 'react';
import { useSafety } from '../../context/SafetyContext';
import { Plus, Trash2 } from 'lucide-react';

const EmergencyContacts: React.FC = () => {
  const { emergencyContacts, addEmergencyContact, removeEmergencyContact } = useSafety();
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmergencyContact({
      id: crypto.randomUUID(),
      ...newContact
    });
    setNewContact({ name: '', phone: '', relationship: '' });
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Emergency Contacts</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} className="mr-1" />
          Add Contact
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
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
                value={newContact.relationship}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
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
              Save Contact
            </button>
          </div>
        </form>
      )}

      {emergencyContacts.length > 0 ? (
        <div className="space-y-4">
          {emergencyContacts.map(contact => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div>
                <h3 className="font-medium text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.phone}</p>
                <p className="text-sm text-gray-500">{contact.relationship}</p>
              </div>
              <button
                onClick={() => removeEmergencyContact(contact.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">
          No emergency contacts added yet
        </p>
      )}
    </div>
  );
};

export default EmergencyContacts;