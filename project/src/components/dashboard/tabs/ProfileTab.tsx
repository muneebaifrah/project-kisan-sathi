import React, { useState } from 'react';
import { User, MapPin, Wheat, Calendar, Edit3, Camera, Trophy } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

interface ProfileCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | undefined;
  editable?: boolean;
}

const ProfileTab: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    farmSize: user?.farmSize || ''
  });

  const handleSave = () => {
    updateUser(editData);
    setIsEditing(false);
  };

  const ProfileCard: React.FC<ProfileCardProps> = ({ icon, title, value, editable = false }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-green-100 rounded-lg">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-gray-600 text-sm">{title}</p>
          {isEditing && editable ? (
            <input
              type="text"
              value={editData[title.toLowerCase().replace(' ', '') as keyof typeof editData]}
              onChange={(e) => setEditData({ 
                ...editData, 
                [title.toLowerCase().replace(' ', '') as keyof typeof editData]: e.target.value 
              })}
              className="w-full mt-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          ) : (
            <p className="text-lg font-semibold text-gray-800">{value || 'Not provided'}</p>
          )}
        </div>
      </div>
    </div>
  );

  const achievements = [
    { id: 1, title: 'Early Adopter', description: 'Joined the platform', icon: '🌱', earned: true },
    { id: 2, title: 'Weather Watcher', description: 'Checked weather 30 times', icon: '🌤️', earned: true },
    { id: 3, title: 'Market Maven', description: 'Tracked prices for 15 days', icon: '💰', earned: false },
    { id: 4, title: 'Crop Champion', description: 'Managed 3+ crop types', icon: '🏆', earned: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
            <span className="text-4xl">👤</span>
            <span>My Profile</span>
          </h1>
          <p className="text-gray-600 mt-1">Manage your account and farming information</p>
        </div>
        
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
                <button className="absolute bottom-0 right-0 w-6 h-6 bg-white text-green-500 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="opacity-90">{user?.email}</p>
                <p className="text-sm opacity-75 mt-1">
                  Farmer • Member since {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileCard
              icon={<User className="w-5 h-5 text-green-600" />}
              title="Name"
              value={user?.name}
              editable={true}
            />
            <ProfileCard
              icon={<MapPin className="w-5 h-5 text-blue-600" />}
              title="Location"
              value={user?.location}
              editable={true}
            />
            <ProfileCard
              icon={<Wheat className="w-5 h-5 text-yellow-600" />}
              title="Farm Size"
              value={user?.farmSize}
              editable={true}
            />
            <ProfileCard
              icon={<Calendar className="w-5 h-5 text-purple-600" />}
              title="Member Since"
              value="January 2024"
              editable={false}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Achievements</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className={`font-medium ${
                        achievement.earned ? 'text-green-800' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left py-3 px-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors border border-green-200">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📊</span>
                  <div>
                    <p className="font-medium text-green-800">View Analytics</p>
                    <p className="text-sm text-green-600">Farm performance insights</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left py-3 px-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📱</span>
                  <div>
                    <p className="font-medium text-blue-800">Download Data</p>
                    <p className="text-sm text-blue-600">Export your farming records</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left py-3 px-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🎯</span>
                  <div>
                    <p className="font-medium text-purple-800">Set Goals</p>
                    <p className="text-sm text-purple-600">Plan your farming targets</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center space-x-2">
              <span>🚧</span>
              <span>Premium Features</span>
            </h3>
            <p className="text-sm text-yellow-700 mb-4">
              Advanced analytics, weather predictions, and personalized farming advice coming soon.
            </p>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors opacity-50 cursor-not-allowed">
              Working on it...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;