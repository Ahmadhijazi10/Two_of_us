import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import AboutUs from "./components/AboutUs";
import Education from "./components/Education";
import BurgerMenu from "./components/BurgerMenu";
import Header from './components/header'; // Import the Header component
import Signup from "./components/SignUp";
import LoginUser from "./components/LoginUser";
import CreateApplication from "./components/CreateApplication";
import ApplicationManagement from "./components/ApplicationManagement";
import UserManagement from "./components/UserManagement";
import NewsManagement from "./components/NewsManagement";
import NewsAndUpdates from "./components/News&Updates";
import LoginAdmin from "./components/LoginAdmin";
import StatusPage from "./components/StatusPage";
import CoursesUser from "./components/CoursesUser";
import CoursesAdmin from "./components/CoursesAdmin";
import Personalpage from "./components/Personalpage";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage burger menu visibility

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle burger menu visibility

  return (
    <Router>
      <AppContent 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        setIsMenuOpen={setIsMenuOpen} 
      />
    </Router>
  );
}

function AppContent({ isMenuOpen, toggleMenu, setIsMenuOpen }) {
  const location = useLocation(); // Get the current location

  // Define paths where Header and BurgerMenu should not be displayed
  const noHeaderAndMenuPaths = ['/signup', '/loginUser', '/loginAdmin',];

  return (
    <div className="App">
      {/* Conditionally render Header and BurgerMenu */}
      {!noHeaderAndMenuPaths.includes(location.pathname) && (
        <>
          <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
      )}

      {/* Main Content Area */}
      <main className={`content ${isMenuOpen ? "menu-open" : ""}`}>
        <Routes>
          <Route path="/" element={<AboutUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/education" element={<Education />} />
          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/create-application" element={<CreateApplication />} />
          <Route path="/application-management" element={<ApplicationManagement />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/news-management" element={<NewsManagement />} />
          <Route path="/news&updates" element={<NewsAndUpdates />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/statusPage" element={<StatusPage />} />
          <Route path="/CoursesUser" element={<CoursesUser />} />
          <Route path="/CoursesAdmin" element={<CoursesAdmin />} />
          <Route path="/Personalpage" element={<Personalpage />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
