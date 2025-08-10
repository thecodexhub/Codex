import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mongodbId, setMongodbId] = useState(() => {
    return localStorage.getItem('mongodbId') || null;
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (mongodbId) {
      localStorage.setItem('mongodbId', mongodbId);
    } else {
      localStorage.removeItem('mongodbId');
    }
  }, [mongodbId]);
  return (
    <AuthContext.Provider value={{ user, loading, mongodbId, setMongodbId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);