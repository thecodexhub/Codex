import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';


const AuthWrapper = (Component) => {
  return function ProtectedComponent(props) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, []);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />;
  };
};

export default AuthWrapper;
