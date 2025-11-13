// Import necessary modules
const mongoose = require('mongoose');

// Define the courses schema
const coursesSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true,
    },
    // Description of the application
    course_description: {
        type: String,
        required: true,
    },
    students: {
        type: Number,
        default: 0,
    },
}, {
    // Define collection options
    collection: 'course', // Set the collection name to "course"
    timestamps: false, // Disable createdAt and updatedAt
});

// Export the Application model

module.exports = mongoose.model('Course', coursesSchema);
