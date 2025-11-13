const express = require('express');

const { 
    getAllUsersController, 
    getUserByIdController, 
    insertUserController, 
    updateUserController, 
    authenticateController, 
    deleteUserController 
} = require('../controllers/userController');

const { 
    insertUserValidation, 
    updateUserValidation 
} = require('../validators/userValidator');

const router = express.Router();

// Route for user authentication
router.post('/authenticate', authenticateController);

// Route to get all users
router.get('/getusers', getAllUsersController);

// Route to get a user by ID
router.get('/userbyid/:id', getUserByIdController);

// Route to create a new user
router.post('/insertuser', insertUserValidation, insertUserController);

// Route to update an existing user
router.put('/updateuser/:id', updateUserValidation, updateUserController);

// Route to delete a user by ID
router.delete('/deleteuser/:id', deleteUserController);

module.exports = router;
