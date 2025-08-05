import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  signOut,
  reload,
  onAuthStateChanged,
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

// Email/Password Sign-Up
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);
    console.log("Signup successful. Verification email sent.");

    await auth.signOut();
    console.log("Signed out until email is verified.");
    return {
      user: userCredential.user,
      emailSent: true,
      message: "signupsuccess"
    };
  } catch (error) {
    console.error("Signup error:", error);

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


// Email/Password Sign-In
export const signin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await reload(user);
    if (!user.emailVerified) {
      await signOut(auth);
      throw new Error("Please verify your email before logging in.");
    }
    return userCredential.user;
  }catch (error) {
    console.error("Signin error:", error);
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
        if (error.message.includes("verify your email")) {
          errorMessage = error.message;
        } else {
          errorMessage = error.message;
        }
    }
    
    throw new Error(errorMessage);
  }
};

// Google Sign-In with Popup
export const signInWithGoogle = async (mode = "signup") => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const email = user?.email || "";
  if (mode == 'signup') {
    await auth.signOut();
    return {
      result,
      email,
      message: "signupgoogle"
    }
  } else if (mode == 'login') {
    //wait ..(actual implemenation still remains to be done)
    return { user, email, message: "loginsuccess" };
  }
  // return result;
};

// Sign Out
export const logout = () => signOut(auth);

// Auth State Listener
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

//email verify
export const sendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (user) {
    await sendEmailVerification(user);
    alert("Verification email sent!");
  }
};
