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
export const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// Email/Password Sign-In
export const signin = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Google Sign-In with Popup
export const signInWithGoogle = async (mode = "signup") => {
  const result = await signInWithPopup(auth, provider);
  // const isNewUser = !!getAdditionalUserInfo(result)?.isNewUser;

  // if (mode === "signup" && !isNewUser) {
  //   await signOut(auth);
  //   throw new Error("Account already exists. Please log in.");
  // }
  // if (mode === "login" && isNewUser) {
  //   await signOut(auth);
  //   throw new Error("Please create a new account.");
  // }
  return result;
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
