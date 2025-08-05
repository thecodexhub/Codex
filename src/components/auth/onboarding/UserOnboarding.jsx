import React, { useState } from 'react';
import { CheckCircle, User, GraduationCap, Calendar, Code, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { useNavigate } from 'react-router-dom';

const UserOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user, mongodbId } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    year: '',
    codingExperience: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;

  const departmentOptions = [
    { value: 'comp', label: 'Computer Engineering' },
    { value: 'csd', label: 'Computer Science & Design' },
    { value: 'it', label: 'Information Technology' },
    { value: 'entc', label: 'Electronics & Telecommunication' },
    { value: 'aids', label: 'Artificial Intelligence & Data Science' }
  ];

  const yearOptions = [
    { value: 'FY', label: 'First Year (FY)' },
    { value: 'SY', label: 'Second Year (SY)' },
    { value: 'TY', label: 'Third Year (TY)' },
    { value: 'BE', label: 'Final Year (BE)' }
  ];

  const codingOptions = [
    "I've built projects and solved complex problems",
    "I've worked on some projects and basic DSA",
    "I know the basics and syntax of programming",
    "I'm just starting my coding journey",
    "I have no coding experience yet"
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 0:
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        break;
      case 1:
        if (!formData.department) {
          newErrors.department = 'Please select your department';
        }
        break;
      case 2:
        if (!formData.year) {
          newErrors.year = 'Please select your current year';
        }
        break;
      case 3:
        if (!formData.codingExperience) {
          newErrors.codingExperience = 'Please select your coding experience level';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const mapCodingExperience = (experience) => {
    const mappings = {
      "I've built projects and solved complex problems": "EXPERT",
      "I've worked on some projects and basic DSA": "INTERMEDIATE",
      "I know the basics and syntax of programming": "BEGINNER",
      "I'm just starting my coding journey": "STARTED",
      "I have no coding experience yet": "COMPLETELY_NEW"
    };
    return mappings[experience] || "COMPLETELY_NEW";
  };

  const mapDepartment = (dept) => {
    const mappings = {
      "comp": "COMPUTER",
      "csd": "COMPUTER_SCIENCE_DESIGN",
      "it": "INFORMATION_TECHNOLOGY",
      "entc": "ELECTRONICS_TELECOM",
      "aids": "AI_DATA_SCIENCE"
    };
    return mappings[dept] || "COMPUTER";
  };
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);

    try {
      console.log("MongoDB User ID:", mongodbId);
      console.log("Firebase User ID:", user.uid);
      if (!mongodbId || !user.uid) {
        alert('No ID found! Please Login')
        navigate('/login');
      }
      const token = await user.getIdToken?.();
      if (!token) throw new Error("Failed to get token.");

      const patchData = {
        uid: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        department: mapDepartment(formData.department),
        year: formData.year,
        codingSoFar: mapCodingExperience(formData.codingExperience)
      };

      const response = await axios.patch(
        `${BASE_URL}/api/userStory/${mongodbId}`,
        patchData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("User story patched:", response.data);

      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setIsSubmitted(false);
    }
  };

  const getStepIcon = (step) => {
    const icons = [User, GraduationCap, Calendar, Code];
    const Icon = icons[step];
    return <Icon className="w-6 h-6" />;
  };

  const getStepTitle = (step) => {
    const titles = [
      "What do we call you?",
      "Which department are you from?",
      "What year are you currently in?",
      "How much coding have you done so far?"
    ];
    return titles[step];
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Team!</h2>
          <p className="text-gray-300 text-lg">
            Thanks for joining us, <span className="text-purple-400 font-semibold">{formData.firstName} {formData.lastName}</span>!
            We're setting up your personalized experience.
          </p>
          <div className="mt-8">
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-400 text-sm mt-2">Preparing your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header with Progress */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-2">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">CODEX</span>
            </h1>
            <p className='text-white text-xl sm:text-2xl font-bold mt-5 mb-5'>Let's get to know you better!</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            ></div>
            <p className="text-gray-400 text-center mt-2">Step {currentStep + 1} of {totalSteps}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              {getStepIcon(currentStep)}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{getStepTitle(currentStep)}</h2>
          </div>

          <div className="space-y-6">
            {/* Step 0: Name */}
            {currentStep === 0 && (
              <div className="space-y-6 max-w-lg mx-auto">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="First Name"
                      className="w-full bg-gray-900 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-xl py-4 px-6 rounded-xl"
                      autoFocus
                    />
                    {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Last Name"
                      className="w-full bg-gray-900 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-xl py-4 px-6 rounded-xl"
                    />
                    {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Department */}
            {currentStep === 1 && (
              <div className="space-y-4 max-w-2xl mx-auto">
                {departmentOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleInputChange('department', option.value)}
                    className={`w-full p-4 rounded-xl text-left text-base font-medium transition-all duration-200 hover:scale-[1.02] ${formData.department === option.value
                        ? 'bg-gray-800 text-white border-2 border-purple-500 shadow-lg shadow-purple-500/20'
                        : 'bg-gray-900 text-gray-300 hover:text-white border-2 border-gray-700 hover:border-gray-600'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
                {errors.department && <p className="text-red-400 text-center text-lg mt-6">{errors.department}</p>}
              </div>
            )}

            {/* Step 2: Year */}
            {currentStep === 2 && (
              <div className="space-y-4 max-w-xl mx-auto">
                {yearOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleInputChange('year', option.value)}
                    className={`w-full p-4 rounded-xl text-left text-base font-medium transition-all duration-200 hover:scale-[1.02] ${formData.year === option.value
                        ? 'bg-gray-800 text-white border-2 border-purple-500 shadow-lg shadow-purple-500/20'
                        : 'bg-gray-900 text-gray-300 hover:text-white border-2 border-gray-700 hover:border-gray-600'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
                {errors.year && <p className="text-red-400 text-center text-lg mt-6">{errors.year}</p>}
              </div>
            )}

            {/* Step 3: Coding Experience */}
            {currentStep === 3 && (
              <div className="space-y-4 max-w-2xl mx-auto">
                {codingOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleInputChange('codingExperience', option)}
                    className={`w-full p-4 rounded-xl text-left text-base font-medium transition-all duration-200 hover:scale-[1.02] ${formData.codingExperience === option
                        ? 'bg-gray-800 text-white border-2 border-purple-500 shadow-lg shadow-purple-500/20'
                        : 'bg-gray-900 text-gray-300 hover:text-white border-2 border-gray-700 hover:border-gray-600'
                      }`}
                  >
                    {option}
                  </button>
                ))}
                {errors.codingExperience && <p className="text-red-400 text-center text-lg mt-6">{errors.codingExperience}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 text-gray-400 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          {currentStep < totalSteps - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Setting up...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Complete Setup
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;