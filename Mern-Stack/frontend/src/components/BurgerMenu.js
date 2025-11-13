import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import "./BurgerMenu.css";

const BurgerMenu = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const userRole = localStorage.getItem("role");

    if (loggedIn === "true") {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole("");
    window.location.href = "/";
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className={`menu-container ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      {!isLoggedIn && (
        <>
          <div className="menu-item">
            <Link to="/education" className="menu-link">
              Education
            </Link>
          </div>
          <div className="menu-item">
            <Link to="/about-us" className="menu-link">
              About Us
            </Link>
          </div>
          <div className="menu-item">
            <Link to="/news&updates" className="menu-link">
              News and Updates
            </Link>
          </div>
        </>
      )}
      {isLoggedIn && role === "admin" && (
        <>
          <div className="menu-item">
            <Link to="/user-management" className="menu-link">
              User Management
            </Link>
          </div>
          <div className="menu-item">
            <Link to="/CoursesAdmin" className="menu-link">
              Course Management
            </Link>
          </div>
          <div className="menu-item">
            <Link to="/news-management" className="menu-link">
              News Management
            </Link>
          </div>
        </>
      )}
      {isLoggedIn && role === "user" && (
        <>
          <div className="menu-item">
            <Link to="/CoursesUser" className="menu-link">
              Courses
            </Link>
          </div>
          <div className="menu-item">
            <Link to="/Personalpage" className="menu-link">
              Personal
            </Link>
          </div>
        </>
      )}
      {isLoggedIn ? (
        <div className="menu-item">
          <span
            className="menu-link"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        </div>
      ) : (
        <div className={`login-dropdown ${dropdownOpen ? "active" : ""}`}>
          <button className="login-button" onClick={toggleDropdown}>
            Login <FaChevronDown className="login-icon" />
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <Link to="/signup" className="dropdown-item">
                Sign up
              </Link>
              <Link to="/loginUser" className="dropdown-item">
                Login as User
              </Link>
              <Link to="/loginAdmin" className="dropdown-item">
                Login as Admin
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
