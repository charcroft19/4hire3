import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useReviews } from '../../context/ReviewContext';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ReviewList from '../../components/review/ReviewList';
import Avatar from '../../components/common/Avatar';
import ReferencesSection from '../../components/profile/ReferencesSection';
import SkillsSection from '../../components/profile/SkillsSection';
import PortfolioSection from '../../components/profile/PortfolioSection';
import AvailabilityCalendar from '../../components/profile/AvailabilityCalendar';
import { Save, Camera } from 'lucide-react';

function ProfileStudent() {
  const { user, updateUserProfile } = useAuth();
  const { getUserReviews, getUserAverageRating } = useReviews();
  
  const [bio, setBio] = useState(user?.bio || '');
  const [editing, setEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [skills, setSkills] = useState<string[]>([]);
  const [references, setReferences] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [availability, setAvailability] = useState([]);
  
  const reviews = user ? getUserReviews(user.id) : [];
  const rating = user ? getUserAverageRating(user.id) : 0;
  
  const handleSave = () => {
    updateUserProfile({
      bio,
      avatar,
      skills,
      references,
      portfolio,
      availability
    });
    setEditing(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  if (!user) return <div>Loading...</div>;
  
  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader 
        title="Student Profile" 
        subtitle="Manage your profile information and view your reviews"
      />
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar 
                      src={avatar} 
                      alt={user.username || ''} 
                      size="xl" 
                      className={editing ? 'cursor-pointer opacity-75' : ''}
                    />
                    {editing && (
                      <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center cursor-pointer">
                        <div className="bg-black bg-opacity-30 rounded-full w-full h-full flex items-center justify-center">
                          <Camera size={24} className="text-white" />
                        </div>
                        <input 
                          id="avatar-upload" 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                  
                  <h2 className="text-lg font-bold mt-4">{user.username}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  
                  {user.university && (
                    <div className="flex items-center mt-2">
                      <span className="text-sm bg-blue-50 text-blue-700 py-1 px-3 rounded-full flex items-center">
                        <img 
                          src={`https://via.placeholder.com/20?text=${user.university.charAt(0)}`} 
                          alt={user.university} 
                          className="w-4 h-4 mr-1 rounded-full"
                        />
                        Verified {user.university.split('.')[0].toUpperCase()} Student
                      </span>
                    </div>
                  )}
                  
                  {rating > 0 && (
                    <div className="flex items-center mt-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)} ({reviews.length} reviews)</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">About Me</h3>
                  {!editing ? (
                    <button 
                      onClick={() => setEditing(true)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button 
                      onClick={handleSave}
                      className="flex items-center text-sm bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                    >
                      <Save size={14} className="mr-1" />
                      Save
                    </button>
                  )}
                </div>
                
                {editing ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Write something about yourself..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                  />
                ) : (
                  <p className="text-gray-700">
                    {bio || 'No bio yet. Click "Edit Profile" to add information about yourself.'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <SkillsSection
            skills={skills}
            onSkillsChange={setSkills}
            editable={editing}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <ReferencesSection
            references={references}
            onReferencesChange={setReferences}
            editable={editing}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <PortfolioSection
            items={portfolio}
            onItemsChange={setPortfolio}
            editable={editing}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <AvailabilityCalendar
            availability={availability}
            onAvailabilityChange={setAvailability}
            editable={editing}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Reviews</h3>
          {reviews.length > 0 ? (
            <ReviewList reviews={reviews} />
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No reviews yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileStudent;