// Import necessary modules
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    
    // First name of the user
    user_full_name: {
        type: String,
        required: true,
    },

    // Username of the user (optional)
    user_username: {
        type: String,
        required: false,
    },

    // Email address of the user
    user_email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },

    // Password of the user
    user_password: {
        type: String,
        required: true,
    },

    // Address of the user
    user_major: {
        type: String,
        enum:['Computer science','Business','Engineering','Medicine','Law'],
        required: true,
    },

    // Role of the user (user, admin)
    role: {
        type: String,
        enum: ['user', 'admin'], // Restrict values to 'user' or 'admin'
        required: false, // Optional field
    }
}, {
    collection: 'users', // Set collection name to "users"
    timestamps: false,   // Disable auto-created timestamps (createdAt, updatedAt)
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
