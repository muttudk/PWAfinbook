import React from 'react';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import LoginPage from './pages/Login.js';
import PrivateRoute from './components/PrivateRoute.js';
import Layout from './pages/home.jsx';
const App = () => {


 return (
<Router> 
  <Routes> 
  <Route path="/" element={<LoginPage/>} /> 
  <Route
        path="/home/*"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      />    
  </Routes> 
  </Router>
  );
};

export default App;
