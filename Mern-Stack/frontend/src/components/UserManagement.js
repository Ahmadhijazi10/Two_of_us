import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserManagement.css";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: "user_id", direction: "ascending" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/api/users/getusers");
        if (Array.isArray(data.users)) setUsers(data.users);
        else throw new Error("Invalid data format");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:3001/api/users/deleteuser/${id}`);
        setUsers((prev) => prev.filter((user) => user._id !== id)); // Fix filter condition
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

const startEdit = (user) => {
  setEditId(user._id); 
  setEditData({
    user_full_name: user.user_full_name,
    major: user.major,
    user_username: user.user_username,
    user_email: user.user_email
  });
};


  const handleChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/users/updateuser/${editId}`, editData);
  
      if (response.status === 200) {
        setUsers((prev) =>
          prev.map((user) => (user._id === editId ? { ...user, ...editData } : user))
        );
        setEditId(null); 
        setEditData({});
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };
  

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "ascending" ? "descending" : "ascending",
    }));

    setUsers((prev) =>
      [...prev].sort((a, b) => {
        if (a[key] < b[key]) return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      })
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="userMana">
      <h1>User Management</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              {["user_id", "user_full_name", "major", "user_username", "user_email", "role"].map((key) => (
                <th key={key} onClick={() => handleSort(key)}>
                  {key.replace("user_", "").replace("_", " ").toUpperCase()}
                  {sortConfig.key === key ? (sortConfig.direction === "ascending" ? " ↑" : " ↓") : ""}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                {editId === user._id ? (
  <>
    <td>{user._id}</td>
    <td>
      <input name="user_full_name" value={editData.user_full_name || ""} onChange={handleChange} />
    </td>
    <td>
      <input name="major" value={editData.major || ""} onChange={handleChange} />
    </td>
    <td>
      <input name="user_username" value={editData.user_username || ""} onChange={handleChange} />
    </td>
    <td>
      <input name="user_email" value={editData.user_email || ""} onChange={handleChange} />
    </td>
    <td>{user.role}</td>
    <td>
      <button onClick={handleSave} className="save">Save</button>
      <button onClick={() => setEditId(null)} className="cancel">Cancel</button>
    </td>
  </>
) : (
  <>
    <td>{user._id}</td>
    <td>{user.user_full_name}</td>
    <td>{user.major}</td>
    <td>{user.user_username}</td>
    <td>{user.user_email}</td>
    <td>{user.role}</td>
    <td>
      <button onClick={() => startEdit(user)} className="edit">Edit</button>
      <button onClick={() => handleDelete(user._id)} className="delete">Delete</button>
    </td>
  </>
)}

              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => navigate("/")} className="back-btn">Back</button>
    </div>
  );
};

export default UserManagement;
