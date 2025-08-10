import React, { useEffect, useState } from 'react';
import { User, Mail, MapPin, Calendar, Edit3, Save, X, Github, ExternalLink, Trophy, Target, Globe } from 'lucide-react';
import { BASE_URL, USERPROFILE } from '../../config';
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { user, mongodbId } = useAuth();
    const [profile, setProfile] = useState(null);
    const [editProfile, setEditProfile] = useState(profile);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !mongodbId) return;

        const fetchUserProfile = async () => {
            try {
                const token = await user.getIdToken();
                const res = await axios.get(`${BASE_URL}${USERPROFILE}/${mongodbId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.data.success && res.data.data) {
                    const profileData = {
                        firstName: res.data.data.name.firstName || '',
                        lastName: res.data.data.name.lastName || '',
                        email: res.data.data.email || user.email || '',
                        department: res.data.data.department || '',
                        year: res.data.data.year || '',
                        joinDate: new Date(user.metadata.creationTime).toLocaleDateString(),
                        location: 'KKWIEER, Nashik',
                        bio: 'Hey there!',
                        githubUrl: 'https://github.com/sobiya-22',
                        profilePicture: user.photoURL,
                        currentStreak: 22,
                        dailyProblemsSolved: 5,
                    };

                    setProfile(profileData);
                    setEditProfile(profileData);
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [user, mongodbId]);

    const handleSave = async () => {
        try {
            if (!user || !mongodbId) return;

            const token = await user.getIdToken();

            const payload = {
                firstName: editProfile.firstName,
                lastName: editProfile.lastName,
                department: editProfile.department,
                year: editProfile.year
            };

            await axios.patch(
                `${BASE_URL}${USERPROFILE}/${mongodbId}`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setProfile(editProfile);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleCancel = () => {
        setEditProfile(profile);
        setIsEditing(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!profile) return null;

    const getFullName = (firstName, lastName) => {
        return `${firstName} ${lastName}`.trim();
    };

    return (
        <div className="min-h-screen bg-gray-950 pt-6 w-full max-w-7xl mx-auto px-4 sm:px-6">
            {/* Profile Header */}
            <div className="bg-gray-900 shadow-xl overflow-hidden border-b border-gray-800 rounded-2xl">
                <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Avatar + Name */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
                            <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-white/15 backdrop-blur-sm rounded-full border-2 border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
                                {profile.profilePicture ? (
                                    <img src={profile.profilePicture} alt={`${profile.firstName} ${profile.lastName}`} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white/90" />
                                )}
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                {!isEditing ? (
                                    <>
                                        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1">{getFullName(profile.firstName, profile.lastName)}</h1>
                                        <p className="text-sm sm:text-lg text-white/80 font-medium">{profile.department} - {profile.year}</p>
                                    </>
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            value={editProfile.firstName}
                                            onChange={(e) => setEditProfile({ ...editProfile, firstName: e.target.value })}
                                            className="w-full sm:flex-1 text-base sm:text-lg font-semibold text-white bg-white/15 border border-white/30 rounded-lg px-3 py-2 outline-none focus:border-gray-300"
                                            placeholder="First Name"
                                        />
                                        <input
                                            type="text"
                                            value={editProfile.lastName}
                                            onChange={(e) => setEditProfile({ ...editProfile, lastName: e.target.value })}
                                            className="w-full sm:flex-1 text-base sm:text-lg font-semibold text-white bg-white/15 border border-white/30 rounded-lg px-3 py-2 outline-none focus:border-gray-300"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Edit Button */}
                        <div className="flex justify-center sm:justify-end gap-2">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20 text-sm md:text-base"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    <span className="hidden md:inline">Edit Profile</span>
                                </button>
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contact & About */}
                <div className="px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Contact Info */}
                            <div className="lg:col-span-2">
                                <h3 className="font-semibold text-white text-xl mb-3">User Profile</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-300 break-all">{profile.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-300">{profile.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-300">Joined {profile.joinDate}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Github className="w-5 h-5 text-gray-400" />
                                        {!isEditing ? (
                                            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center space-x-1 break-all">
                                                <span>GitHub Profile</span>
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        ) : (
                                            <input
                                                type="url"
                                                value={editProfile.githubUrl}
                                                onChange={(e) => setEditProfile({ ...editProfile, githubUrl: e.target.value })}
                                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 outline-none text-sm sm:text-base"
                                                placeholder="Enter GitHub URL"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* About */}
                            <div>
                                <h3 className="font-semibold text-white mb-2 text-xl">About</h3>
                                {!isEditing ? (
                                    <p className="text-gray-300">{profile.bio}</p>
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

            {/* Stats */}
            <div className="py-6">
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

                    <div className="bg-gray-900 rounded-xl shadow-xl px-6 py-4 border border-gray-800 hover:border-purple-500/50 transition-colors">
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
    );
};

export default ProfilePage;
