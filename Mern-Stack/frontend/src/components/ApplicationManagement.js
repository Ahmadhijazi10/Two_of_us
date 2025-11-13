import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ApplicationManagement.css";

const ApplicationManagement = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    user_id: '',
    application_status: '',
    application_description: ''
  });
  const [sortOption, setSortOption] = useState('newest'); // Default to "newest to oldest"

  // Fetch applications on mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/application/getapplications");
        if (response.data && Array.isArray(response.data.applications)) {
          setApplications(response.data.applications);
        } else {
          throw new Error("Expected an array of applications");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Sort applications based on the selected sort option
  useEffect(() => {
    const sortedApplications = [...applications].sort((a, b) => {
      if (sortOption === 'newest') {
        return b.application_id - a.application_id; // Descending order (newest first)
      } else {
        return a.application_id - b.application_id; // Ascending order (oldest first)
      }
    });
    setApplications(sortedApplications);
  }, [sortOption, applications]);

  // Handle Delete action
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/application/application/${id}`);
      if (response.status === 200) {
        setApplications((prev) => prev.filter((app) => app.application_id !== id));
      } else {
        console.error("Failed to delete application");
      }
    } catch (error) {
      console.error("Failed to delete application", error);
    }
  };

  // Start editing the application
  const startEdit = (application) => {
    setEditId(application.application_id);
    setEditData({
      user_id: application.user_id,
      application_status: application.application_status,
      application_description: application.application_description
    });
  };

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save action
  const handleSave = async () => {
    try {
      const updatedApplication = {
        userId: editData.user_id,
        applicationStatus: editData.application_status,
        description: editData.application_description,
      };

      console.log("Sending updated data:", updatedApplication);

      const response = await axios.put(
        `http://localhost:3001/api/application/updateapplication/${editId}`,
        updatedApplication
      );

      console.log("Response from backend:", response.data);

      if (response.data.response && response.data.response[0] === 1) {
        setApplications((prev) =>
          prev.map((app) =>
            app.application_id === editId ? { ...app, ...updatedApplication } : app
          )
        );

        setEditId(null);
        setEditData({ user_id: '', application_status: '', application_description: '' });
      } else {
        console.error("Failed to update application");
      }
    } catch (error) {
      console.error("Error while saving application:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <button
        onClick={() => navigate("/")} // Navigate back to home
        className="back-button"
      >
        Back
      </button>

      <h1>Application Management</h1>

      {/* Sort Dropdown */}
      <div className="sort-container">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="application-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>User ID</th>
              <th>Status</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.application_id}>
                {editId === application.application_id ? (
                  <>
                    <td>{application.application_id}</td>
                    <td>
                      <input
                        name="user_id"
                        value={editData.user_id}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="application_status"
                        value={editData.application_status}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="application_description"
                        value={editData.application_description}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={() => setEditId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{application.application_id}</td>
                    <td>{application.user_id}</td>
                    <td>{application.application_status}</td>
                    <td>{application.application_description}</td>
                    <td>
                      <button onClick={() => startEdit(application)}>Edit</button>
                      <button onClick={() => handleDelete(application.application_id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicationManagement;
