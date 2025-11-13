import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_full_name: "",
    user_username: "",
    phone: "",
    user_email: "",
    major: "",
    user_password: "",
    role: "user" // Assuming user is the default role
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { ...formData };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/insertuser",
        userData
      );
      console.log(response.data);
      setFormData({
        user_full_name: "",
        user_username: "",
        phone: "",
        user_email: "",
        major: "",
        user_password: "",
        role: "user", // Reset role to default
      });
      setErrorMessage("");
      alert("User created successfully!");
      navigate("/loginUser");
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        error.response && error.response.data ? error.response.data.error : "An error occurred"
      );
    }
  };

  return (
    <div className="container-Signup">
      <div className="left-section">
        <img
          className="full-width-image"
          src="harvard-photo1.jpeg"
          alt="Illustration"
        />
      </div>

      <div className="right-section">
        <h2 className="title">Sign up</h2>
        <p className="subtitle">
          Hey, enter your details to create your account
        </p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            name="user_full_name"
            placeholder="Your Full Name"
            value={formData.user_full_name}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="text"
            name="user_username"
            placeholder="Your username"
            value={formData.user_username}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="phone"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="email"
            name="user_email"
            placeholder="Email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
          <select
            className="input"
            name="user_major"
            value={formData.user_major}
            onChange={handleChange}
            required
          >
            <option value="">Select Your Major</option>
            <option value="Computer science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Medicine">Medicine</option>
            <option value="Law">Law</option>
          </select>
          <input
            className="input"
            type="password"
            name="user_password"
            placeholder="Password"
            value={formData.user_password}
            onChange={handleChange}
            required
          />
          <button className="button" type="submit">
            Sign Up
          </button>
        </form>
        <div className="link-container">
          <p className="register-link" onClick={() => navigate('/loginUser')}>Login</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;



// import React, { useState } from "react";
// import "./Personalpage.css";

// const UserProfile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     Title: "Mr.",
//     FirstName: "Ahmad",
//     LastName: "Hijazi",
//     DateOfBirth: "1/30/2002",
//     Country: "Lebanon",
//     Address: "Besten Kbeer, Next to Iman High School",
//     City: "Saida",
//     Email: "HijaziAM181@students.rhu.edu.lb",
//     MobilePhone: "76-882728",
//   });

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="profile-container">
//       <h2 className="profile-title">Personal Profile</h2>
//       <div className="profile-details">
//         {Object.keys(userData).map((key) => (
//           <div key={key} className="profile-row">
//             <span className="profile-label">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name={key}
//                 value={userData[key]}
//                 onChange={handleChange}
//                 className="profile-input"
//               />
//             ) : (
//               <span className="profile-value">{userData[key]}</span>
//             )}
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={() => setIsEditing(!isEditing)}
//         className="profile-button"
//       >
//         {isEditing ? "Save" : "Edit"}
//       </button>
//     </div>
//   );
// };

// export default UserProfile;