import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';

const AuthWrapper = (Component) => {
  return function ProtectedComponent(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />;
  };
};

export default AuthWrapper;
