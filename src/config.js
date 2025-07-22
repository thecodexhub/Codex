// firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

//Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDEDYvwz_gq4Cfx_IYuFOW9_Q5MzFEpIcE",
  authDomain: "codex-users.firebaseapp.com",
  projectId: "codex-users",
  storageBucket: "codex-users.firebasestorage.app",
  messagingSenderId: "540268752103",
  appId: "1:540268752103:web:c8b141024401a26bed0642"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//Sign up with email/password
export const signup = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//Sign in with email/password
export const signin = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

//Google Sign-In
export const signinWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // const user = result.user;

    const additionalInfo = result._tokenResponse || {};
    const isNewUser = additionalInfo.isNewUser;

    if (isNewUser) {
      throw new Error("No account exists. Please sign up first.");
    }

    return result;
  } catch (error) {
    throw error;
  }
};

//Sign out
export const logout = async () => {
  return signOut(auth);
};

//Auth State Listener
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
