import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, reload } from 'firebase/auth';
import { auth } from '../config/firebase';
import { resendVerificationEmail, logout } from '../config/firebase';

const AuthContext = createContext();

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
      <p className="text-white text-lg">Loading...</p>
    </div>
  </div>
);

// Email verification prompt component for authenticated users
const EmailVerificationPrompt = ({ user }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const handleResendEmail = async () => {
    setError('');
    setMessage('');
    setIsResending(true);
    
    try {
      const result = await resendVerificationEmail();
      setMessage(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsResending(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError('');
    setMessage('');
    
    try {
      // Reload the user data
      await reload(user);
      
      // Check if email is now verified
      if (user.emailVerified) {
        setMessage("Email verified successfully! Redirecting...");
        setTimeout(() => {
          window.location.reload(); // Force a complete reload
        }, 1000);
      } else {
        setError("Email is still not verified. Please check your inbox and click the verification link.");
      }
    } catch (err) {
      setError("Error checking verification status. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-black relative flex flex-col items-center justify-center antialiased overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto p-4">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-neutral-800/50 shadow-2xl p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-purple-600/20 p-4 rounded-full">
              <MailIcon />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 mb-4">
            Email Verification Required
          </h1>
          
          <p className="text-neutral-300 text-lg mb-2">
            Please verify your email address to continue:
          </p>
          <p className="text-purple-400 font-semibold text-lg mb-6">
            {user?.email}
          </p>
          
          <div className="bg-yellow-900/30 border border-yellow-800/40 rounded-lg p-4 mb-6">
            <p className="text-yellow-200 text-sm">
              A verification link has been sent to your email. Please check your inbox (and spam folder) 
              and click the link to verify your account. After verifying, click "I've Verified" below.
            </p>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-800/40 rounded-lg">
              <p className="text-green-200 text-sm flex items-center justify-center gap-2">
                <CheckIcon />
                {message}
              </p>
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-800/40 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold text-lg py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <RefreshIcon />
              {isRefreshing ? "Checking..." : "I've Verified - Check Now"}
            </button>

            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-lg py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend Verification Email"}
            </button>

            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="flex-1 bg-neutral-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:bg-neutral-700"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-neutral-400 text-sm">
              Having trouble? Check your spam folder or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setAuthError(null);

      try {
        if (firebaseUser) {
          // Reload user data to get latest emailVerified status
          await reload(firebaseUser);
          
          // Check if user is verified
          // Google users are automatically considered verified
          const isGoogleUser = firebaseUser.providerData.some(
            provider => provider.providerId === 'google.com'
          );
          
          const verified = isGoogleUser || firebaseUser.emailVerified;
          
          setUser(firebaseUser);
          setIsEmailVerified(verified);
        } else {
          setUser(null);
          setIsEmailVerified(false);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setAuthError(error.message);
        setUser(null);
        setIsEmailVerified(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to manually refresh verification status
  const refreshVerificationStatus = async () => {
    if (!user) return false;

    try {
      await reload(user);
      const isGoogleUser = user.providerData.some(
        provider => provider.providerId === 'google.com'
      );
      const verified = isGoogleUser || user.emailVerified;
      setIsEmailVerified(verified);
      return verified;
    } catch (error) {
      console.error('Error refreshing verification status:', error);
      return false;
    }
  };

  // Periodically check verification status when user might be verifying
  useEffect(() => {
    if (user && !isEmailVerified && !user.providerData.some(p => p.providerId === 'google.com')) {
      const interval = setInterval(async () => {
        const isNowVerified = await refreshVerificationStatus();
        if (isNowVerified) {
          clearInterval(interval);
        }
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [user, isEmailVerified]);

  const contextValue = {
    user,
    loading,
    isEmailVerified,
    authError,
    refreshVerificationStatus,
    // Helper properties
    isAuthenticated: !!user,
    needsVerification: user && !isEmailVerified && !user.providerData.some(p => p.providerId === 'google.com'),
    isGoogleUser: user?.providerData.some(provider => provider.providerId === 'google.com') || false,
  };

  // Show loading screen while checking auth state
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
export const ProtectedRoute = ({ children, requireEmailVerification = true }) => {
  const { user, isEmailVerified, needsVerification } = useAuth();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Show email verification prompt if required and not verified
  if (requireEmailVerification && needsVerification) {
    return <EmailVerificationPrompt user={user} />;
  }

  // User is authenticated and verified (or verification not required)
  return children;
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};