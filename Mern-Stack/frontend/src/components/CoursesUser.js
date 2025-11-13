import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CoursesUser.css";

const MAX_ENROLLMENT = 3; // Maximum number of courses a user can enroll in

const CoursesUser = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/courses")
      .then(response => setCourses(response.data))
      .catch(error => console.error("Error fetching courses:", error));
  }, []);

  const addCourse = (id) => {
    if (enrolledCourses.length >= MAX_ENROLLMENT) {
      alert("You can only enroll in up to 5 courses.");
      return;
    }

    axios.put(`http://localhost:3001/api/courses/enroll/${id}`)
      .then(response => {
        setCourses(courses.map(course => 
          course._id === id ? { ...course, students: response.data.students } : course
        ));
        setEnrolledCourses([...enrolledCourses, id]); // Add the course to the enrolled list
      })
      .catch(error => console.error("Error enrolling in course:", error));
  };

  const dropCourse = (id) => {
    axios.put(`http://localhost:3001/api/courses/drop/${id}`)
      .then(response => {
        setCourses(courses.map(course => 
          course._id === id ? { ...course, students: response.data.students } : course
        ));
        setEnrolledCourses(enrolledCourses.filter(courseId => courseId !== id)); // Remove the course from the enrolled list
      })
      .catch(error => console.error("Error dropping course:", error));
  };

  const filteredCourses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="courses-container">
      <h1 className="title">Courses</h1>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="courses-list">
        {filteredCourses.map((course) => (
          <div key={course._id} className="course-box">
            <h2>{course.course_name}</h2>
            <p>{course.course_description}</p>
            <p className="students-count">Students: {course.students}</p>
            <div>
              <button 
                onClick={() => addCourse(course._id)} 
                className="add-btn"
                disabled={enrolledCourses.includes(course._id) || enrolledCourses.length >= MAX_ENROLLMENT} // Disable if already enrolled or limit reached
              >
                Enroll
              </button>
              <button 
                onClick={() => dropCourse(course._id)} 
                className="drop-btn"
              >
                Drop
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")} className="back-btn">Back</button>
    </div>
  );
};

export default CoursesUser;
