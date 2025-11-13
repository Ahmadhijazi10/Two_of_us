import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../components/LoginAdmin.css"; 

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_username: '',
    user_password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  // Handle form submit
const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make POST request to authenticate the admin
      const response = await axios.post('http://localhost:3001/api/users/authenticate', {
        user_username: formData.user_username,
        user_password: formData.user_password
      });
  
      // Check if authentication was successful and if the user is an admin
      if (response.data.message === 'Authenticated' && response.data.user.role === 'admin') {
        // Set loggedIn to true when authentication is successful
        localStorage.setItem("loggedIn", "true");  // Add this line
        localStorage.setItem("user_id", response.data.user.user_id);
        localStorage.setItem("role", response.data.user.role);
        navigate('/'); // Redirect to the admin dashboard page
      } else {
        setErrorMessage('Invalid username, password, or you are not an admin');
      }
    } catch (error) {
      setErrorMessage('Error occurred during login');
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container-loginadmin">
      <div className="left-section">
        <img src="harvard-photo1.jpeg" alt="Admin Login Illustration" className="full-width-image" />
      </div>
      <div className="right-section">
        <h2 className="title">Admin Login</h2>
        <p className="subtitle">Please enter your credentials to log in</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="user_username"
            placeholder="Username"
            value={formData.user_username}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="password"
            name="user_password"
            placeholder="Password"
            value={formData.user_password}
            onChange={handleChange}
            required
            className="input"
          />
          <button type="submit" className="button">Login</button>
        </form>
        <div className="link-container">
          <button onClick={() => navigate(-1)} className="button">Back</button>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
