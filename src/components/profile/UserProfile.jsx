import React, { useEffect, useState } from 'react';
import { User, Camera, Mail, MapPin, Calendar, Edit3, Save, X, Github, ExternalLink, Trophy, Target, Globe, ArrowLeft } from 'lucide-react';
import { BASE_URL, CLOUDINARY_URL, USERPROFILE } from '../../config';
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';
// import {uploadImageToCloudinary} from '../../utils/cloudinary';
const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { user, mongodbId } = useAuth();
    const [profile, setProfile] = useState(null);
    const [editProfile, setEditProfile] = useState(profile);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        console.log("User:", user);
        console.log("MongoDB ID:", mongodbId);
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
                const data = res.data;

                // const profilePictureUrl = data.data.profilePic||"";
                const options = { year: 'numeric', month: 'long' };
                if (res.data.success && res.data.data) {
                    const profileData = {
                        firstName: res.data.data.name.firstName || '',
                        lastName: res.data.data.name.lastName || '',
                        email: res.data.data.email || user.email || '',
                        department: res.data.data.department || '',
                        year: res.data.data.year || '',
                        joinDate: new Date(user.metadata.creationTime).toLocaleDateString('en-US', options),
                        location: 'KKWIEER, Nashik',
                        bio: res.data.data.aboutUser || '--',
                        githubUrl: res.data.data.githubUrl || '-',
                        profilePicture: res.data.data.profilePic|| '',
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


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        formData.append("upload_preset", "image_upload");
        formData.append("cloud_name", "drkhfntxp");

        try {
            const res = await fetch(
                `${CLOUDINARY_URL}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();
            if (data.secure_url) {
                setImageUrl(data.secure_url); 
                setEditProfile((prev) => ({
                    ...prev,
                    profilePicture: data.secure_url, 
                    profilePicId: data.public_id,
                }));
            }
        } catch (err) {
            console.error("Error uploading image:", err);
        } finally {
            setUploading(false);
        }
    };
    const handleSave = async () => {
        try {
            if (!user || !mongodbId) return;
            const token = await user.getIdToken();

            const payload = {
                firstName: editProfile.firstName,
                lastName: editProfile.lastName,
                department: editProfile.department,
                year: editProfile.year,
                aboutUser: editProfile.bio,
                githubUrl: editProfile.githubUrl,
                profilePic: editProfile.profilePicture || profile.profilePicture || "",
            };

            await axios.patch(`${BASE_URL}${USERPROFILE}/${mongodbId}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

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

    const handleGoBack = () => {
        window.history.back();
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
        <div className="min-h-screen bg-gray-950 pt-6 w-full max-w-7xl mx-auto">
            <div className="mx-6 xl:mx-0 mb-4">
                <button
                    onClick={handleGoBack}
                    className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 border border-gray-700 hover:border-gray-600"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>
            </div>

            <div className="bg-gray-900 shadow-xl overflow-hidden border-b border-gray-800 rounded-2xl mx-6 xl:mx-0">
                <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white mx-4 sm:mx-0">
                    <div className="relative ">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row items-center space-x-2 sm:space-x-6">
                                <div className="w-30 h-30 sm:w-36 sm:h-36 md:w-40 md:h-40 relative">
                                    <div className="w-full h-full bg-white/15 backdrop-blur-sm rounded-full border-2 border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
                                        {(isEditing ? editProfile?.profilePicture : profile?.profilePicture) ? (
                                            <img
                                                src={isEditing ? editProfile.profilePicture : profile.profilePicture}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white/90" />
                                        )}
                                    </div>

                                    {isEditing && (
                                        <label className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full cursor-pointer shadow-lg">
                                            <Camera className="w-5 h-5" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                                disabled={uploading}
                                            />
                                        </label>
                                    )}

                                    {uploading && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                </div>

                                <div className="text-center sm:text-left flex-1 min-w-0">
                                    {!isEditing ? (
                                        <>
                                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 break-words">
                                                {getFullName(profile.firstName, profile.lastName)}
                                            </h1>
                                            <p className="text-base sm:text-xl text-white/80 font-medium">
                                                {profile.department} - {profile.year}
                                            </p>
                                        </>
                                    ) : (
                                        <div className="space-y-3 w-full flex flex-col">
                                            <div className="flex space-x-2 w-full">
                                                <input
                                                    type="text"
                                                    value={editProfile.firstName}
                                                    onChange={(e) =>
                                                        setEditProfile({ ...editProfile, firstName: e.target.value })
                                                    }
                                                    className="flex-1 text-lg sm:text-2xl font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 outline-none focus:border-gray-300"
                                                    placeholder="First Name"
                                                />
                                                <input
                                                    type="text"
                                                    value={editProfile.lastName}
                                                    onChange={(e) =>
                                                        setEditProfile({ ...editProfile, lastName: e.target.value })
                                                    }
                                                    className="flex-1 text-lg sm:text-2xl font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 outline-none focus:border-gray-300"
                                                    placeholder="Last Name"
                                                />
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <select
                                                    value={editProfile.department}
                                                    onChange={(e) =>
                                                        setEditProfile({
                                                            ...editProfile,
                                                            department: e.target.value,
                                                        })
                                                    }
                                                    className="w-full sm:flex-1 flex-1 text-sm sm:text-lg text-white bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2"
                                                >
                                                    <option value="COMPUTER" className="text-gray-900">
                                                        Computer Engineering
                                                    </option>
                                                    <option value="CSD" className="text-gray-900">CSD</option>
                                                    <option value="IT" className="text-gray-900">IT</option>
                                                    <option value="ROBOSTICS" className="text-gray-900">Robotics</option>
                                                    <option value="ENTC" className="text-gray-900">ENTC</option>
                                                </select>
                                                <select
                                                    value={editProfile.year}
                                                    onChange={(e) =>
                                                        setEditProfile({
                                                            ...editProfile,
                                                            year: e.target.value,
                                                        })
                                                    }
                                                    className="w-full sm:flex-1 flex-1 text-sm sm:text-lg text-white bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2"
                                                >
                                                    <option value="FY" className="text-gray-900">First Year</option>
                                                    <option value="SY" className="text-gray-900">Second Year</option>
                                                    <option value="TY" className="text-gray-900">Third Year</option>
                                                    <option value="LY" className="text-gray-900">Last Year</option>
                                                </select>
                                            </div>
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
                                        <span className="text-gray-300 break-all">{profile.email}</span>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <span className="text-gray-300">{profile.location}</span>
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
                                <p className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">0</p>
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
                                <p className="text-2xl md:text-3xl font-bold text-green-400 mb-1">0</p>
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
                                <p className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">0%</p>
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