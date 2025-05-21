import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface SkillsSectionProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
  editable?: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onSkillsChange,
  editable = false
}) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onSkillsChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Skills</h3>
      
      {editable && (
        <form onSubmit={handleAddSkill} className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add
          </button>
        </form>
      )}
      
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span
            key={skill}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
          >
            {skill}
            {editable && (
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <X size={14} />
              </button>
            )}
          </span>
        ))}
        {skills.length === 0 && (
          <p className="text-gray-500 text-sm">No skills added yet</p>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;