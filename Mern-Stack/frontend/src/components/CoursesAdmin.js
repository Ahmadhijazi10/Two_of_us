import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CoursesAdmin.css";

const CoursesAdmin = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseInfo, setNewCourseInfo] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/courses")
      .then(response => setCourses(response.data))
      .catch(error => console.error("Error fetching courses:", error));
  }, []);

  const handleAddNewCourse = () => {
    if (newCourseName.trim() !== "" && newCourseInfo.trim() !== "") {
      const newCourse = { course_name: newCourseName, course_description: newCourseInfo, students: 0 };

      axios.post("http://localhost:3001/api/courses/add", newCourse)
        .then(response => {
          setCourses([...courses, response.data]);
          setNewCourseName("");
          setNewCourseInfo("");
        })
        .catch(error => console.error("Error adding course:", error));
    }
  };

  const editCourse = (id) => {
    const updatedInfo = prompt("Enter new course description:");
    if (updatedInfo) {
      axios.put(`http://localhost:3001/api/courses/edit/${id}`, { course_description: updatedInfo })
        .then(response => {
          setCourses(courses.map(course => course._id === id ? { ...course, course_description: updatedInfo } : course));
        })
        .catch(error => console.error("Error updating course:", error));
    }
  };

  const deleteCourse = (id) => {
    axios.delete(`http://localhost:3001/api/courses/delete/${id}`)
      .then(() => {
        setCourses(courses.filter(course => course._id !== id));
      })
      .catch(error => console.error("Error deleting course:", error));
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
      <div className="add-course-container">
        <input
          type="text"
          placeholder="Course Name"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
          className="course-input"
        />
        <input
          type="text"
          placeholder="Course Description"
          value={newCourseInfo}
          onChange={(e) => setNewCourseInfo(e.target.value)}
          className="course-input"
        />
      </div>
      <button onClick={handleAddNewCourse} className="submit-btn">Add Course</button>
      <div className="courses-list">
        {filteredCourses.map((course) => (
          <div key={course._id} className="course-box">
            <h2>{course.course_name}</h2>
            <p>{course.course_description}</p>
            <p className="students-count">Students: {course.students}</p>
            <div>
              <button onClick={() => editCourse(course._id)} className="edit-btn">Edit</button>
              <button onClick={() => deleteCourse(course._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")} className="back-btn">Back</button>
    </div>
  );
};

export default CoursesAdmin;
