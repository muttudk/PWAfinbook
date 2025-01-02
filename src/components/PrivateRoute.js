import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userinfo'));
  return userInfo ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
