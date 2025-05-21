import React, { useState } from 'react';
import { Globe, Users, Shield, Camera, Save } from 'lucide-react';

function AboutUsPage() {
  // In a real application, this would be fetched from an API or CMS
  const [content, setContent] = useState({
    mission: "UniJobs connects university students with local jobs in their community. We believe in helping students gain real-world experience and earn income while providing valuable services to local employers.",
    vision: "Our vision is to create the most trusted platform for university students to find flexible work opportunities that complement their academic schedules and career goals.",
    team: [
      {
        name: "Alex Johnson",
        role: "Founder & CEO",
        bio: "Alex founded UniJobs after experiencing the challenges of finding flexible work during college. Computer Science graduate from CU Boulder.",
        image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=300"
      },
      {
        name: "Maya Patel",
        role: "Chief Operations Officer",
        bio: "Maya oversees the day-to-day operations of UniJobs. She has a background in Business Administration from CSU.",
        image: "https://images.pexels.com/photos/3761521/pexels-photo-3761521.jpeg?auto=compress&cs=tinysrgb&w=300"
      },
      {
        name: "David Lee",
        role: "Chief Technology Officer",
        bio: "David leads our engineering team and ensures the platform remains secure and user-friendly. Computer Engineering graduate from SDSU.",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
      }
    ]
  });
  
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  
  const handleSave = () => {
    setContent(editedContent);
    setEditing(false);
  };
  
  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const newTeam = [...editedContent.team];
        newTeam[index] = { ...newTeam[index], image: reader.result as string };
        setEditedContent({ ...editedContent, team: newTeam });
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">About UniJobs</h1>
        <p className="text-gray-600 mt-2">
          Connecting Students with Local Opportunities
        </p>
        
        {editing ? (
          <button 
            onClick={handleSave}
            className="mt-4 flex items-center mx-auto text-sm bg-blue-600 text-white py-1.5 px-4 rounded hover:bg-blue-700"
          >
            <Save size={16} className="mr-1.5" />
            Save Changes
          </button>
        ) : (
          <button 
            onClick={() => setEditing(true)}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800"
          >
            Edit Content
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe size={24} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h2>
          {editing ? (
            <textarea
              value={editedContent.mission}
              onChange={(e) => setEditedContent({ ...editedContent, mission: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          ) : (
            <p className="text-gray-600">{content.mission}</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={24} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Our Community</h2>
          <p className="text-gray-600">
            UniJobs serves students and employers in Boulder, Fort Collins, and San Diego, with plans to expand to more university communities soon.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield size={24} className="text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Our Values</h2>
          {editing ? (
            <textarea
              value={editedContent.vision}
              onChange={(e) => setEditedContent({ ...editedContent, vision: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          ) : (
            <p className="text-gray-600">{content.vision}</p>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(editing ? editedContent.team : content.team).map((member, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 relative mx-auto w-40 h-40">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-40 h-40 object-cover rounded-full mx-auto"
                />
                {editing && (
                  <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
                    <Camera size={16} className="text-gray-600" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageChange(index, e)}
                    />
                  </label>
                )}
              </div>
              
              {editing ? (
                <>
                  <input 
                    value={editedContent.team[index].name}
                    onChange={(e) => {
                      const newTeam = [...editedContent.team];
                      newTeam[index] = { ...newTeam[index], name: e.target.value };
                      setEditedContent({ ...editedContent, team: newTeam });
                    }}
                    className="text-xl font-bold text-gray-800 text-center w-full mb-1 border border-gray-300 rounded-md p-1"
                  />
                  <input 
                    value={editedContent.team[index].role}
                    onChange={(e) => {
                      const newTeam = [...editedContent.team];
                      newTeam[index] = { ...newTeam[index], role: e.target.value };
                      setEditedContent({ ...editedContent, team: newTeam });
                    }}
                    className="text-sm text-blue-600 mb-2 text-center w-full border border-gray-300 rounded-md p-1"
                  />
                  <textarea 
                    value={editedContent.team[index].bio}
                    onChange={(e) => {
                      const newTeam = [...editedContent.team];
                      newTeam[index] = { ...newTeam[index], bio: e.target.value };
                      setEditedContent({ ...editedContent, team: newTeam });
                    }}
                    className="text-gray-600 text-sm text-center w-full border border-gray-300 rounded-md p-2"
                    rows={4}
                  />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-blue-600 mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Our Growing Community</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Whether you're a student looking for flexible work or an employer needing reliable help, 
          UniJobs is building the bridge between university talent and local needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/signup/student" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Sign Up as a Student
          </a>
          <a href="/signup/employer" className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Sign Up as an Employer
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;