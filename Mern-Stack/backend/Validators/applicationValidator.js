// Import the check function from the 'express-validator' library
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Validation middleware for inserting a new application
const insertApplicationValidation = [
  check('userId')
    .notEmpty().withMessage('User Id is required')
    .isMongoId().withMessage('User Id must be a valid ObjectId'), // Checking if it's a valid MongoDB ObjectId
  check('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'), // Adding a minimum length validation
];

// Validation middleware for updating an existing application
const updateApplicationValidation = [
  check('id')
    .notEmpty().withMessage('Application Id is required')
    .isMongoId().withMessage('Application Id must be a valid ObjectId'), // Validating the ID as MongoDB ObjectId
  check('userId')
    .notEmpty().withMessage('User Id is required')
    .isMongoId().withMessage('User Id must be a valid ObjectId'),
  check('applicationStatus')
    .notEmpty().withMessage('Application Status is required')
    .isIn(['pending', 'approved', 'rejected']).withMessage('Application Status must be one of: pending, approved, rejected'), // Validating specific status values
  check('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'), // Adding a minimum length validation
];

// Helper function to check validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  insertApplicationValidation,
  updateApplicationValidation,
  validateRequest, // Exporting the validation check function
};
