import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config';
import axios from 'axios'; // Ensure axios is installed and imported
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
            'http://localhost:5000/verify',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
            setUser(res.data.user);
            if (res.data.user) {
                console.log(res.data.user.firstName)  //user data from backend
            }else console.log('No user')
          
        } catch (err) {
          console.error('Error verifying user with backend:', err);
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
