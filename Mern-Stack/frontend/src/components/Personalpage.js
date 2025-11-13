import React, { useState } from "react";
import "./Personalpage.css";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    Title: "Mr/Ms",
    FirstName: "Ahmad",
    LastName: "Hijazi",
    DateOfBirth: "1/30/2002",
    Country: "Lebanon",
    Address: "Besten Kbeer, Next to Iman High School",
    City: "Saida",
    Email: "HijaziAM181@harvard.com",
    MobilePhone: "76-882728",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Personal Profile</h2>
      <div className="profile-details">
        {Object.keys(userData).map((key) => (
          <div key={key} className="profile-row">
            <span className="profile-label">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
            {isEditing ? (
              <input
                type="text"
                name={key}
                value={userData[key]}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-value">{userData[key]}</span>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="profile-button"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default UserProfile;
