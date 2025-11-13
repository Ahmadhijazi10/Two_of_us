import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StatusPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user_id, status: initialStatus } = location.state || {}; // Destructure user_id and status

  const [username, setUsername] = useState('');
  const [status, setStatus] = useState(initialStatus || ''); // Default to passed status or empty
  const [isLoading, setIsLoading] = useState(true); // Loading state to handle async fetching
  const [congratulationsMessage, setCongratulationsMessage] = useState('');

  useEffect(() => {
    if (user_id) {
      // Fetch username based on user_id
      fetchUsername(user_id);
      // Fetch application status if status is not passed
      if (!initialStatus) {
        fetchStatus(user_id);
      } else if (initialStatus === 'approved') {
        setCongratulationsMessage("CONGRATULATIONS! <3 Your status is approved.");
      }
    } else {
      navigate('/'); // Redirect to login if no user_id
    }
  }, [user_id, initialStatus, navigate]);

  const fetchUsername = async (user_id) => {
    try {
      const userResponse = await axios.get(`http://localhost:3001/api/users/${user_id}`);
      if (userResponse.data && userResponse.data.username) {
        setUsername(userResponse.data.username); // Set the username
      } else {
        console.log("Username not found");
        setUsername("Guest"); // Set to Guest if not found
      }
    } catch (error) {
      console.error('Error fetching username:', error);
      setUsername("Guest"); // Fallback to "Guest" in case of error
    } finally {
      setIsLoading(false); // Stop loading once data is fetched
    }
  };

  const fetchStatus = async (user_id) => {
    try {
      const appResponse = await axios.get(`http://localhost:3001/api/application/applicationstatus/${user_id}`);
      if (appResponse.data && appResponse.data.status) {
        const fetchedStatus = appResponse.data.status;
        setStatus(fetchedStatus);  // Set the application status
        if (fetchedStatus === 'approved') {
          setCongratulationsMessage("CONGRATULATIONS! <3 Your status is approved.");
        } else {
          setCongratulationsMessage(''); // Reset the message if the status is not "approved"
        }
      } else {
        setStatus('No application found');
      }
    } catch (error) {
      console.error('Error fetching application status:', error);
      setStatus('Error fetching your application status');
    } finally {
      setIsLoading(false); // Stop loading once status is fetched
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p> // Display loading until data is available
      ) : (
        <>
          <h1>Welcome {username}</h1>
          {congratulationsMessage && <p>{congratulationsMessage}</p>}
          {/* Only show the status message if it's not approved */}
          {status && status !== 'approved' && <p>Your application status is: {status}</p>}
        </>
      )}
    </div>
  );
};

export default StatusPage;
