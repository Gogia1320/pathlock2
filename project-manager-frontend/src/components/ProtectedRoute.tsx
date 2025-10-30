import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken, isTokenExpired } from '../utils/auth';

const ProtectedRoute: React.FC = () => {
  const token = getToken();
  const tokenIsExpired = isTokenExpired();

  if (!token || tokenIsExpired) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
