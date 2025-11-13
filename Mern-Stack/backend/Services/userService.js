const User = require("../Model/User");
const mongoose = require("mongoose");
/**
 * @function createUser
 * @async
 * @description Creates a new user.
 * @param {string} fullName - The first name of the user.
 * @param {string} phone - The first name of the user.
 * @param {string} major - The last name of the user.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @param {string} email - The email address of the user.
 * @returns {Promise<object>} A promise that resolves to the created user in JSON format.
 * @throws {Error} If there is an error creating the user.
 */
const createUser = async (fullName,phone, major, username, password, email) => {
    try {
        const newUser = new User({
            full_name: fullname,
            major: major,
            username: username,
            password: password,
            email: email,
            phone: phone,
            role: 'user', // You can modify the role as needed
        });

        const savedUser = await newUser.save(); // Save the user in MongoDB
        return savedUser.toObject(); // Convert the Mongoose document to plain JavaScript object
    } catch (error) {
        console.error('Error creating user', error);
        throw error;
    }
};

/**
 * @function getAllUsers
 * @async
 * @description Retrieves all users.
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 * @throws {Error} If there is an error retrieving users.
 */
const getAllUsers = async () => {
    try {
        const users = await User.find(); // Use Mongoose's find method to get all users
        return users.map(user => user.toObject()); // Convert all Mongoose documents to plain objects
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
};

/**
 * @function getUserById
 * @async
 * @description Retrieves a user by ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<object|string>} A promise that resolves to the user object or "user not found".
 * @throws {Error} If there is an error retrieving the user.
 */
const getUserById = async (id) => {
    try {
        const user = await User.findById(new mongoose.Types.ObjectId(id));// Use Mongoose's findById method to get the user by ID
        return user ? user.toObject() : "user not found"; // Return user if found, otherwise return a not found message
    } catch (error) {
        console.error('Error fetching user by ID', error);
        throw error;
    }
};

/**
 * @function updateUser
 * @async
 * @description Updates a user by ID.
 * @param {string} id - The ID of the user to update.
 * @param {string} firstName - The updated first name of the user.
 * @param {string} major - The updated last name of the user.
 * @param {string} phone - The updated last name of the user.
 * @param {string} username - The updated username of the user.
 * @param {string} password - The updated password of the user.
 * @param {string} email - The updated email address of the user.
 * @returns {Promise<object>} A promise that resolves to the updated user object.
 * @throws {Error} If there is an error updating the user.
 */
const updateUser = async (id, fullName, major, username, password, email,phone) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            new mongoose.Types.ObjectId(id), // Ensure it's an ObjectId
            {
                full_name: fullName,
                major: major,
                phone: phone,
                username: username,
                password: password,
                email: email,
            },
            { new: true }
        );
        
        return updatedUser ? updatedUser.toObject() : "User not found"; // Return updated user if found
    } catch (error) {
        console.error('Error updating user', error);
        throw error;
    }
};

/**
 * @function deleteUser
 * @async
 * @description Deletes a user by ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<object|string>} A promise that resolves to the deleted user object or "user not found".
 * @throws {Error} If there is an error deleting the user.
 */
const deleteUser = async (id) => {
    try {
        const user = await User.findById(id); // Use Mongoose's findById method to find the user by ID
        if (user) {
            await user.remove(); // Use Mongoose's remove method to delete the user
            return user.toObject(); // Return the deleted user object
        }
        return "User not found"; // Return a not found message if the user doesn't exist
    } catch (error) {
        console.error('Error deleting user', error);
        throw error;
    }
};

/**
 * @function authenticateUser
 * @async
 * @description Authenticates a user by username and password.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} A promise that resolves to an object with authentication status and user information.
 * @throws {Error} If there is an error during authentication.
 */
const authenticateUser = async (username, password) => {
    let response = {
        message: "not authenticated",
        user: null,
    };

    try {
        // Find user by username in MongoDB
        const user = await User.findOne({ user_username: username }); // MongoDB equivalent of Sequelize's findOne
        if (user && user.user_password === password) { // Compare passwords
            response.message = "authenticated";
            response.user = user; // Store the user data if authenticated
        }
    } catch (error) {
        console.error('Error during authentication', error);
        throw error; // Handle errors appropriately
    }

    return response; // Return the result
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    authenticateUser,
};
