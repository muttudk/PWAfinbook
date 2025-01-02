import React, { useState } from 'react';
import './Login.css'; // Optional: Add your styles here
import fetchWithAuth from '../api/AuthUtil'; // Import the abstracted fetch function
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = { email, pwd:password };
    const apilogin = "https://finbook.softsolin.com/apinew/login.php"; // Replace with your API endpoint

    try {
      const result = await fetchWithAuth(apilogin, data);
      if (result.status === "succuss") {
        localStorage.setItem('userinfo', JSON.stringify(result.loginfo));
        navigate('/home');
        
        //alert(`${result.message}`);
        // Redirect or further actions
      } else {
        alert(`${result.message}`);
        //navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 >FinBook</h1>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="additional-links">
          <a href="/forgot-password">Forgot Password?</a>
          {/* <a href="/register">Sign Up</a> */}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
