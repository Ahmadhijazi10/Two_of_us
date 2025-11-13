// Import the express module
const express = require('express');
// Import news-related controller functions from the newsController module
const { 
    getAllNewsController,
    getNewsByIdController,
    insertNewsController,
    updateNewsController,
    deleteNewsController,
} = require('../Controllers/newsController');

// Import news-related validation middleware from the newsValidator module
const { 
    insertNewsValidation,
    updateNewsValidation
} = require('../Validators/newsValidator');

// Create an instance of the express Router
const router = express.Router();

// Define routes with associated controller functions and validation middleware
router.get('/getnews', getAllNewsController); // Route to get all news entries
router.get('/newsbyid/:id', getNewsByIdController); // Route to get a specific news entry by ID
router.post('/createnews', insertNewsValidation, insertNewsController); // Route to create a new news entry
router.put('/updatenews/:id', updateNewsValidation, updateNewsController); // Route to update an existing news entry
router.delete('/news/:id', deleteNewsController); // Route to delete a specific news entry by ID

module.exports = router;
