import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  updateProfile,
  reload,
  sendPasswordResetEmail,
} from "firebase/auth";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDEDYvwz_gq4Cfx_IYuFOW9_Q5MzFEpIcE",
  authDomain: "codex-users.firebaseapp.com",
  projectId: "codex-users",
  storageBucket: "codex-users.firebasestorage.app",
  messagingSenderId: "540268752103",
  appId: "1:540268752103:web:c8b141024401a26bed0642"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// Email/Password Sign-Up with Email Verification
export const signup = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with display name
    await updateProfile(user, {
      displayName: displayName,
    });

    // Send email verification
    await sendEmailVerification(user, {
      url: `${window.location.origin}/login?emailVerified=true`, // Redirect URL after verification
      handleCodeInApp: false,
    });

    // Sign out user until they verify their email
    await signOut(auth);
    
    return {
      user: userCredential.user,
      emailSent: true,
      message: "Account created successfully! Please verify your email before logging in."
    };
  } catch (error) {
    console.error("Signup error:", error);
    
    // Handle specific Firebase errors
    let errorMessage = "An error occurred during signup.";
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = "This email is already registered. Please use a different email or try logging in.";
        break;
      case 'auth/weak-password':
        errorMessage = "Password should be at least 6 characters long.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Please enter a valid email address.";
        break;
      default:
        errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};

// Email/Password Sign-In with Email Verification Check
export const signin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Refresh user data to get latest emailVerified status
    await reload(user);

    // Check if email is verified (skip for Google users)
    const isGoogleUser = user.providerData.some(
      provider => provider.providerId === 'google.com'
    );

    if (!isGoogleUser && !user.emailVerified) {
      await signOut(auth);
      throw new Error("Please verify your email before logging in. Check your inbox for the verification link.");
    }

    return userCredential;
  } catch (error) {
    console.error("Signin error:", error);
    
    // Handle specific Firebase errors
    let errorMessage = "Login failed.";
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = "No account found with this email. Please create an account first.";
        break;
      case 'auth/invalid-credential':
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password. Please try again.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Please enter a valid email address.";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many failed attempts. Please try again later.";
        break;
      case 'auth/user-disabled':
        errorMessage = "This account has been disabled. Please contact support.";
        break;
      default:
        // If it's our custom verification error, keep the original message
        if (error.message.includes("verify your email")) {
          errorMessage = error.message;
        } else {
          errorMessage = error.message;
        }
    }
    
    throw new Error(errorMessage);
  }
};

// Google Sign-In (Google accounts are automatically verified)
export const signInWithGoogle = async (mode = "signup") => {
  try {
    const result = await signInWithPopup(auth, provider);
    // Google accounts don't need email verification
    return result;
  } catch (error) {
    console.error("Google signin error:", error);
    
    let errorMessage = "Google sign-in failed.";
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        errorMessage = "Sign-in cancelled. Please try again.";
        break;
      case 'auth/popup-blocked':
        errorMessage = "Popup was blocked. Please allow popups and try again.";
        break;
      case 'auth/cancelled-popup-request':
        errorMessage = "Sign-in cancelled. Please try again.";
        break;
      case 'auth/account-exists-with-different-credential':
        errorMessage = "An account already exists with this email using a different sign-in method.";
        break;
      default:
        errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};

// Resend Email Verification - Updated to work for signed out users
export const resendVerificationEmail = async (email) => {
  try {
    // If there's a current user, use them
    if (auth.currentUser) {
      const user = auth.currentUser;
      
      if (user.emailVerified) {
        throw new Error("Email is already verified.");
      }

      // Check if user is Google user
      const isGoogleUser = user.providerData.some(
        provider => provider.providerId === 'google.com'
      );

      if (isGoogleUser) {
        throw new Error("Google accounts don't need email verification.");
      }

      await sendEmailVerification(user, {
        url: `${window.location.origin}/login?emailVerified=true`,
        handleCodeInApp: false,
      });

      return "Verification email sent successfully. Please check your inbox and spam folder.";
    } else {
      // For signed out users, we can't resend verification directly
      // They need to try signing up again or use password reset
      throw new Error("Please try creating your account again to receive a new verification email, or contact support for assistance.");
    }
  } catch (error) {
    console.error("Resend verification error:", error);
    throw new Error(error.message || "Failed to send verification email.");
  }
};

// Send Password Reset Email
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "Password reset email sent successfully. Please check your inbox.";
  } catch (error) {
    console.error("Password reset error:", error);
    
    let errorMessage = "Failed to send password reset email.";
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = "No account found with this email address.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Please enter a valid email address.";
        break;
      default:
        errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};

// Check Email Verification Status
export const checkEmailVerification = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is currently signed in.");
    }

    // Reload user data to get latest verification status
    await reload(user);
    
    // Google users are automatically considered verified
    const isGoogleUser = user.providerData.some(
      provider => provider.providerId === 'google.com'
    );

    return isGoogleUser || user.emailVerified;
  } catch (error) {
    console.error("Check verification error:", error);
    return false;
  }
};

// Sign Out
export const logout = () => signOut(auth);

// Auth State Listener
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// Deprecated - use resendVerificationEmail instead
export const sendVerificationEmail = async () => {
  console.warn("sendVerificationEmail is deprecated. Use resendVerificationEmail instead.");
  return resendVerificationEmail();
};