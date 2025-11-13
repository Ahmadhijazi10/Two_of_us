const bcrypt = require('bcrypt');

const User = require('../Model/User');
// Import user-related functions from the userService module
    const { createUser, getAllUsers, getUserById, updateUser, deleteUser, authenticateUser } = require("../Services/userService");

    /**
     * Controller function to authenticate a user.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    const authenticateController = async (req, res) => {
        const { user_username, user_password } = req.body;
    
        // Check for missing data
        if (!user_username || !user_password) {
            return res.status(401).json({ message: "Missing data" });
        }
    
        try {
            // Authenticate the user
            const result = await authenticateUser(user_username, user_password);
    
            // Handle authentication result
            if (!result.user) {
                return res.status(401).json({ message: "Wrong user/pass" });
            }
    
            // Send response with user data (you can remove sensitive data like password from the response if needed)
            res.status(200).json({ message: "Authenticated", user: result.user });
        } catch (error) {
            res.status(500).json({ error: error.message }); // Return an error if something went wrong
        }
    };
    
    /**
     * Controller function to get all users.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    const getAllUsersController = async (req, res) => {
        try {
            // Get all users
            const users = await getAllUsers();
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    };
    
    /**
     * Controller function to insert a new user.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
const insertUserController = async (req, res) => {
    const { user_full_name, user_username, user_phone, user_password, user_email, user_major, role } = req.body;


    try {
        // Check if the email is already in use
        const existingUser = await User.findOne({ user_email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        // Create a new user document
        const newUser = new User({
            
            user_full_name,
            user_username,
            user_email,
            user_phone,
            user_password, 
            user_major,
            role
        });

        // Save user to database
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
};
    
    /**
     * Controller function to get a user by ID.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    const getUserByIdController = async (req, res) => {
        const { id } = req.params;
    
        try {
            // Get a user by ID
            const response = await getUserById(id);
            res.status(201).json({ response });
        } catch (error) {
            res.status(500).json({ error: error?.message });
        }
    };
    
    /**
     * Controller function to update a user.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */

    const updateUserController = async (req, res) => {
        const { id } = req.params;
        const { user_full_name, user_username, user_password, user_email, user_major, user_phone } = req.body;
    
        try {
            const existingUser = await User.findById(id);
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const updateData = {};
            if (user_full_name) updateData.user_full_name = user_full_name;
            if (user_phone) updateData.user_phone = user_phone;
            if (user_username) updateData.user_username = user_username;
            if (user_password) updateData.user_password = user_password;  // Ensure hashing if necessary
            if (user_email) updateData.user_email = user_email;
            if (user_major) updateData.user_major = user_major;
    
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({ message: "No changes provided" });
            }
    
            const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    
            res.status(200).json({ response: [updatedUser] });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    
    /**
     * Controller function to delete a user.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    const deleteUserController = async (req, res) => {
        const { id } = req.params;
    
        try {
            const result = await User.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.status(200).json({ response: [{ message: "User deleted successfully" }] });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Export the controller functions for use in other parts of the application
    module.exports = {
        getAllUsersController,
        getUserByIdController,
        insertUserController,
        updateUserController,
        authenticateController,
        deleteUserController
    };