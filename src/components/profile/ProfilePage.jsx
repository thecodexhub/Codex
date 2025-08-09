import React, { useState } from 'react';
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Github,
  ExternalLink,
  Trophy,
  Target,
  Globe,
} from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sobiya Shaikh',
    email: 'sobiyashaikh22@email.com',
    location: 'KKWIEER, Nashik',
    bio: 'Passionate about building stuff and creating amazing web experiences. Always learning new technologies and improving my skills in modern web development.',
    joinDate: 'August 2025',
    githubUrl: 'https://github.com/sobiya-22',
    experienceLevel: 'Computer Engineering Student',
    currentStreak: 22,
    dailyProblemsSolved: 5,
    selectedSpecialization: 'web-dev'
  });

  const [editProfile, setEditProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-6">
      <div className="w-full max-w-7xl mx-auto">

        {/* Profile Header Card - Full Width */}
        <div className="bg-gray-900 shadow-xl overflow-hidden border-b border-gray-800 rounded-2xl mx-6 xl:mx-0">
          {/* Purple Header Section */}
          <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white mx-4 sm:mx-0">
            <div className="relative ">

              {/* Profile Avatar, Name & Edit Button in the Same Row */}
              <div className="flex flex-row justify-between">

                {/* Avatar & Name */}
                <div className="flex flex-row items-center space-x-2 sm:space-x-6">
                  <div className="w-30 h-30 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-white/15 backdrop-blur-sm rounded-full border-2 border-white/20 shadow-2xl flex items-center justify-center text-white/90 p-4">
                    <User className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white/90" />
                  </div>
                  <div className="text-center sm:text-left flex-1 min-w-0">
                    {!isEditing ? (
                      <>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 break-words">
                          {profile.name}
                        </h1>
                        <p className="text-base sm:text-xl text-white/80 font-medium">
                          {profile.experienceLevel}
                        </p>
                      </>
                    ) : (
                      <div className="space-y-3 w-full flex flex-col">
                        <input
                          type="text"
                          value={editProfile.name}
                          onChange={(e) =>
                            setEditProfile({ ...editProfile, name: e.target.value })
                          }
                          className="w-fit text-2xl sm:text-3xl font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 outline-none focus:border-gray-300"
                          placeholder="Enter your name"
                        />
                        <select
                          value={editProfile.experienceLevel}
                          onChange={(e) =>
                            setEditProfile({
                              ...editProfile,
                              experienceLevel: e.target.value,
                            })
                          }
                          className="w-full sm:w-auto text-sm sm:text-lg text-white bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2"
                        >
                          <option value="Computer Engineering Student" className="text-gray-900">
                            Computer Engineering Student
                          </option>
                          <option value="CSD Student" className="text-gray-900">CSD Student</option>
                          <option value="IT Student" className="text-gray-900">IT Student</option>
                          <option value="Robotics Student" className="text-gray-900">Robotics Student</option>
                          <option value="ENTC Student" className="text-gray-900">ENTC Student</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                <div className="mt-4 sm:mt-0">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20 text-sm md:text-base"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span className="hidden md:inline">Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20 text-sm md:text-base"
                      >
                        <Save className="w-4 h-4" />
                        <span className="hidden lg:inline">Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20 text-sm md:text-base"
                      >
                        <X className="w-4 h-4" />
                        <span className="hidden lg:inline">Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>


          {/* Content Section */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 relative">
            {/* Contact Information */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact Details */}
                <div className="lg:col-span-2">
                  <h3 className="font-semibold text-white text-xl mb-3">User Profile</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      {!isEditing ? (
                        <span className="text-gray-300 break-all">{profile.email}</span>
                      ) : (
                        <input
                          type="email"
                          value={editProfile.email}
                          onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 outline-none text-sm sm:text-base"
                          placeholder="Enter email"
                        />
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      {!isEditing ? (
                        <span className="text-gray-300">{profile.location}</span>
                      ) : (
                        <input
                          type="text"
                          value={editProfile.location}
                          onChange={(e) => setEditProfile({ ...editProfile, location: e.target.value })}
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 outline-none text-sm sm:text-base"
                          placeholder="Enter location"
                        />
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-300">Joined {profile.joinDate}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Github className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      {!isEditing ? (
                        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center space-x-1 break-all">
                          <span>GitHub Profile</span>
                          <ExternalLink className="w-4 h-4 flex-shrink-0" />
                        </a>
                      ) : (
                        <input
                          type="url"
                          value={editProfile.githubUrl}
                          onChange={(e) => setEditProfile({ ...editProfile, githubUrl: e.target.value })}
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 outline-none text-sm sm:text-base"
                          placeholder="Enter GitHub URL"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="lg:col-span-1">
                  <h3 className="font-semibold text-white mb-2 text-xl">About</h3>
                  {!isEditing ? (
                    <p className="text-gray-300 leading-relaxed text-base sm:text-lg">{profile.bio}</p>
                  ) : (
                    <textarea
                      value={editProfile.bio}
                      onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                      rows={4}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 resize-none text-white focus:border-purple-500 outline-none text-sm sm:text-base"
                      placeholder="Tell us about yourself..."
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Full Width */}
        <div className="px-4 sm:px-4 sm:py-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Performance Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-xl shadow-xl px-6 py-4 border border-gray-800 hover:border-orange-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base md:text-lg text-gray-400 font-medium mb-1">Current Streak</p>
                  <p className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">22</p>
                  <p className="text-xs md:text-sm text-gray-500">days</p>
                </div>
                <div className="bg-orange-500/20 p-3 rounded-full">
                  <Target className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl shadow-xl px-6 py-4 border border-gray-800 hover:border-green-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base md:text-lg text-gray-400 font-medium mb-1">Problems Solved</p>
                  <p className="text-2xl md:text-3xl font-bold text-green-400 mb-1">75</p>
                  <p className="text-xs md:text-sm text-gray-500">this month</p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-full">
                  <Trophy className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl shadow-xl px-6 py-4 border border-gray-800 hover:border-purple-500/50 transition-colors sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base md:text-lg text-gray-400 font-medium mb-1">Specialization</p>
                  <p className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">89%</p>
                  <p className="text-xs md:text-sm text-gray-500">completed</p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <Globe className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;