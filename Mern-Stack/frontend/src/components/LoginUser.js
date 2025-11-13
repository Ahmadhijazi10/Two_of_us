import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginUser.css'; 

const LoginUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_username: '',
    user_password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/api/users/authenticate', {
        user_username: formData.user_username,
        user_password: formData.user_password
      });
  
      if (response.data.message === 'Authenticated' && response.data.user.role === 'user') {
        // Set loggedIn to true when authentication is successful
        localStorage.setItem("loggedIn", "true");  // Add this line
        localStorage.setItem("user_id", response.data.user.user_id);
        localStorage.setItem("role", response.data.user.role);
        navigate('/'); // Redirect to the admin dashboard page
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setErrorMessage('Error occurred during login');
    }
  };

  return (
    <div className="container-login">
      <div className="left-section">
        <img className="full-width-image" src="harvard-photo1.jpeg" alt="Login Illustration" />
      </div>

      <div className="right-section">
        <h2 className="title">Login</h2>
        <p className="subtitle">Please enter your credentials to log in</p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            name="user_username"
            placeholder="Username"
            value={formData.user_username}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="password"
            name="user_password"
            placeholder="Password"
            value={formData.user_password}
            onChange={handleChange}
            required
          />
          <button className="button" type="submit">Login</button>
        </form>

        <div className="link-container">
          <p className="register-link" onClick={() => navigate('/signup')}>Create an Account</p>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
