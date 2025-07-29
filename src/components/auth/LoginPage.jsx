import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Aurora from "../utils/Background"
import { signin, signInWithGoogle } from "../../config/firebase"
import { BASE_URL, USER_VERIFY, ADD_USERSTORY } from "../../config";
import axios from "axios";
import UserOnboarding from "./onboarding/UserOnboarding"; // Import the onboarding component

// Attention Icon Component
const AttentionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-violet-300"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
)

// Google Icon Component
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
)

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigninLoading, setIsSigninLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
  // New state for onboarding
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const navigate = useNavigate();

  // Helper functions to map form data to API format
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

  const handleOnboardingComplete = async (onboardingData) => {
    try {
      // Get fresh token
      const token = await userData.firebaseUser.getIdToken();
      
      // Prepare patch data
      const patchData = {
        uid: userData.firebaseUser.uid,
        firstName: onboardingData.firstName,
        lastName: onboardingData.lastName,
        department: mapDepartment(onboardingData.department),
        year: onboardingData.year,
        codingSoFar: mapCodingExperience(onboardingData.codingExperience)
      };

      console.log("Patching user data:", patchData);
      console.log("User ID:", userData._id);

      // Make PATCH request to update user story
      const response = await axios.patch(
        `${BASE_URL}/api/userStory/${userData._id}`,
        patchData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Patch response:", response.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating user details:", err);
      console.error("Error response:", err.response?.data);
      setError("Failed to save user details. Please try again.");
      setShowOnboarding(false);
    }
  };

  const verifyTokenWithBackend = async (firebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();

      const res = await axios.post(
        BASE_URL + USER_VERIFY,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data?.user;
    } catch (err) {
      console.error("Backend verification error:", err);
      throw err;
    }
  };

  const addUserStory = async (firebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();
      
      const response = await axios.post(
        BASE_URL + ADD_USERSTORY,
        {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Add user story response:", response.data);
      return response.data;
    } catch (err) {
      console.error("Add user story error:", err);
      throw err;
    }
  };

  const handleAuthSuccess = async (firebaseUser) => {
    try {
      // Verify user with backend
      const verificationResult = await verifyTokenWithBackend(firebaseUser);

      if (!verificationResult) {
        throw new Error("Failed to verify user with backend.");
      }

      // Add user story - this will tell us if user is new
      const userStoryResponse = await addUserStory(firebaseUser);

      // Check if user is new
      if (userStoryResponse?.success && userStoryResponse?.isNewUser) {
        // Store user data for onboarding including the MongoDB _id
        setUserData({
          _id: userStoryResponse._id, // This is the MongoDB ID we need for PATCH
          firebaseUser: firebaseUser,
          ...userStoryResponse
        });

        setShowOnboarding(true);
      } else {
        // Navigate directly to dashboard for existing users
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Auth success handler error:", err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsSigninLoading(true);
    setError("");
    setMessage("");

    try {
      const userCredential = await signin(email, password);
      await handleAuthSuccess(userCredential.user);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsSigninLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setIsGoogleLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await signInWithGoogle('login');
      await handleAuthSuccess(result.user);
    } catch (err) {
      console.error("Google signin error:", err);
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleCreateAccount = () => navigate("/signup");

  // Show onboarding if user is new
  if (showOnboarding) {
    return <UserOnboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Aurora />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto p-4">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-neutral-800/50 shadow-2xl p-8">
          <h1 className="text-5xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-300 text-center text-lg mb-8">
            Enter your credentials to access your account
          </p>

          {message && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-800/40 rounded-lg">
              <p className="text-green-200 text-sm">{message}</p>
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-800/40 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-white text-base font-medium mb-2 block">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full bg-neutral-800/70 border border-neutral-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-white text-base font-medium mb-2 block">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full bg-neutral-800/70 border border-neutral-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Email/Password Sign In Button */}
            <button
              type="submit"
              disabled={isSigninLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-lg py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isSigninLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-neutral-400">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignin}
              disabled={isGoogleLoading}
              className="w-full bg-white text-gray-900 font-semibold text-lg py-3 rounded-lg transition-all duration-300 hover:bg-gray-100 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <GoogleIcon />
              {isGoogleLoading ? "Signing in..." : "Sign in with Google"}
            </button>

            <div className="text-center">
              <p className="text-neutral-400 text-sm">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  onClick={handleCreateAccount}
                >
                  Create account here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}