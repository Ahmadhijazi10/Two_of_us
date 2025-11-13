// Import necessary modules
const mongoose = require('mongoose');

// Define the Application schema
const applicationSchema = new mongoose.Schema({
    // User ID associated with the application
    user_id: {
        type: mongoose.Schema.Types.ObjectId, //  Correctly referencing User._id
        ref: 'User',
        required: true,
    },
    // Application ID (MongoDB automatically provides a unique _id)
    application_id: {
        type: Number, // Optional if you need an auto-increment-like field
        required: false,
    },
    // Status of the application (pending, approved, rejected)
    application_status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending', // Default status
    },
    // Description of the application
    application_description: {
        type: String,
        required: true,
    },
}, {
    // Define collection options
    collection: 'application', // Set the collection name to "application"
    timestamps: false, // Disable createdAt and updatedAt
});

// Export the Application model

module.exports = mongoose.model('Application', applicationSchema);
