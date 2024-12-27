import React from 'react';
import { Navigate } from 'react-router-dom';
import { userInfo } from '../context/userinfo';

const PrivateRoute = ({ children }) => {
 
  return userInfo ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
