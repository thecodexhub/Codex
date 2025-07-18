import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthWrapper = (Component) => {
  return function ProtectedComponent(props) {
    const isAuthenticated = localStorage.getItem('Auth') === 'true';

    return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />;
  };
};

export default AuthWrapper;
