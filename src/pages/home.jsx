import React, { useState } from 'react';
import {  Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Accounts from '../components/Accounts';
import Collection from '../components/Collection';
import Settings from '../components/Settings';
import Reports from '../components/Reports';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Layout.css';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Customers from '../components/Customers';
import AccountList from '../components/AccountList';
import LedgerAccount from '../components/AccountLedger';
import { Button } from 'react-bootstrap';


const Home = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userinfo'));
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/'); // Replace '/login' with your actual login page path
      };

  return (
    <div className={`app ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
      <header className="header">
        <button className="hamburger " onClick={toggleSidebar}>
          <i className="fas fa-bars px-3"></i>
          FinBook</button>
        <div className="app-title"><i className="fas fa-landmark px-2"></i>{userInfo?.shop_name || "Shop Name"}</div>
      </header>
      <aside className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
      <nav className="nav flex-column"> 
        <NavLink to="/home/dashboard" className="nav-link"  activeclass="active"><i className="fas fa-chart-line px-3 "></i>Dashboard</NavLink> 
        <NavLink to="/home/customers" className="nav-link"  activeclass="active"><i className="fas fa-users px-3"></i> Customers</NavLink> 
        {/* <NavLink to="/home/accounts" className="nav-link"  activeclass="active"><i className="fas fa-money-check px-3"></i> Accounts</NavLink>  */}
        <NavLink to="/home/collection" className="nav-link" activeclass="active"><i className="fas fa-coins px-3"></i> Account's</NavLink> 
        {/* <NavLink to="/home/settings" className="nav-link"  activeclass="active"><i className="fas fa-cog px-3"></i> Settings</NavLink> 
        <NavLink to="/home/reports" className="nav-link"  activeclass="active"><i className="fas fa-file-contract px-3"></i> Reports</NavLink>  */}
        <button onClick={handleLogout} className="logout-button"><i className="fas fa-sign-out-alt"></i> Logout</button> 
        </nav>
      </aside>
      <nav className="bottom-navbar">
              <NavLink to="/home/dashboard" className="nav-link">
                <i className="fas fa-chart-line"></i>
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/home/customers" className="nav-link">
                <i className="fas fa-users"></i>
                <span>Customers</span>
              </NavLink>
              {/* <NavLink to="/home/accounts" className="nav-link">
                <i className="fas fa-money-check"></i>
                <span>Accounts</span>
              </NavLink> */}
              <NavLink to="/home/collection" className="nav-link">
                <i className="fas fa-cog"></i>
                <span>Collections</span>
              </NavLink>
              <Button onClick={handleLogout} className="nav-link">
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </Button>
            </nav>
      <main className="main">
        <Routes>
          <Route path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          <Route path="accounts" element={
            <PrivateRoute>
              <Accounts />
            </PrivateRoute>} />
            <Route path="customers" element={
            <PrivateRoute>
              <Customers/>
            </PrivateRoute>} />
          <Route path="collection" element={
            <PrivateRoute>
              <Collection />
            </PrivateRoute>} />
          <Route path="settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>} />
            <Route path="customers/:customerId" element={
            <PrivateRoute>
             <AccountList />
            </PrivateRoute>} />
            <Route path="ledger/:accountId" element={
            <PrivateRoute>
             <LedgerAccount />
            </PrivateRoute>} />
            
             <Route path="reports" element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>

      </main>
    </div>
  );
};

export default Home;
