// Import the express module
const express = require('express');

// Import application-related controller functions from the applicationController module
const { 
    getAllApplicationsController,
    getApplicationByIdController,
    insertApplicationController,
    updateApplicationController,
    deleteApplicationController,
    getApplicationStatusController, // New import
} = require('../Controllers/applicationController');

// Import application-related validation middleware from the applicationValidator module
const { 
    insertApplicationValidation,
    updateApplicationValidation,
} = require('../Validators/applicationValidator');

// Create an instance of the express Router
const router = express.Router();

// Define routes with associated controller functions and validation middleware
router.get('/getapplications', getAllApplicationsController);
router.get('/applicationbyid/:id', getApplicationByIdController);
router.post('/createapplication', insertApplicationValidation, insertApplicationController);
router.put('/updateapplication/:id', updateApplicationValidation, updateApplicationController);
router.delete('/application/:id', deleteApplicationController);
// Assuming this is the correct path and controller is set properly
router.get('/applicationstatus/:userId', getApplicationStatusController);

module.exports = router;
