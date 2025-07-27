import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();

          // send token to backend
          const res = await axios.post(
            'https://codex-test-server.onrender.com/api/auth/verify',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.data?.user) {
            setUser(res.data.user);
          } else {
            setUser(null);
          }

        } catch (err) {
          console.error(
            'Error verifying user with backend:',
            err.response?.status,
            err.response?.data || err.message
          );
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
