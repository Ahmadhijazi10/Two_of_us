import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import { FaChevronDown } from "react-icons/fa";
import "./header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [role, setRole] = useState(""); // Track the user role

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const userRole = localStorage.getItem("role");

    if (loggedIn === "true") {
      setIsLoggedIn(true);
      setRole(userRole); // Save the role in state
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole("");
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <header className="header">
        <button className="burger-icon" onClick={toggleMenu}>
          ☰
        </button>
        <Link to="/" className="header-title">
          <h1>Harvard University</h1>
        </Link>
        <nav className="header-nav">
          {!isLoggedIn && (
            <>
              <Link to="/education" className="menu-link">
                Education
              </Link>
              <Link to="/about-us" className="menu-link">
                About Us
              </Link>
              <Link to="/news&updates" className="menu-link">
                News and Updates
              </Link>
            </>
          )}
          {isLoggedIn && role === "admin" && (
            <>
              <Link to="/user-management" className="menu-link">
                User Management
              </Link>
              <Link to="/CoursesAdmin" className="menu-link">
                Courses Management
              </Link>
              <Link to="/news-management" className="menu-link">
                News Management
              </Link>  
            </>
          )}
          {isLoggedIn && role === "user" && (
            <>
              <Link to="/CoursesUser" className="menu-link">
                Courses
              </Link>
              <Link to="/Personalpage" className="menu-link">
                Personal
              </Link>
            </>
          )}
          {isLoggedIn ? (
            <span
              className="menu-link"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </span>
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
        </nav>
      </header>

      <BurgerMenu isOpen={menuOpen} onClose={toggleMenu} />
    </>
  );
};

export default Header;
