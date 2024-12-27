import React from 'react';
import { Navigate } from 'react-router-dom';
import { userInfo } from '../context/userinfo';

const PrivateRoute = ({ children }) => {
 // const userInfo = JSON.parse(localStorage.getItem('userinfo')); // Check user login status
  return userInfo ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
