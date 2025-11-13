const express = require('express');
const router = express.Router();
const Course = require('../Model/Courses');

// Test route
router.get("/test", (req, res) => {
  res.send("Test route works!");
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
});

// Add a new course
router.post("/add", async (req, res) => {

console.log("Request body:", req.body);  // Log the entire request body for debugging
  const { course_name, course_description } = req.body;
  if (!course_name || !course_description) {
    return res.status(400).json({ message: "Course name and description are required" });
  }
  try {
    const newCourse = new Course({ course_name, course_description });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error adding course" });
  }
});

// Edit a course
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { course_description } = req.body;  // Field to update
  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, { course_description }, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course" });
  }
});

// Delete a course
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course" });
  }
});

// Enroll in a course
router.put("/enroll/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (course) {
      course.students += 1;
      await course.save();
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error enrolling in course" });
  }
});

// Drop from a course
router.put("/drop/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (course && course.students > 0) {
      course.students -= 1;
      await course.save();
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found or no students enrolled" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error dropping course" });
  }
});

module.exports = router;
