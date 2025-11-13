// Import the check function from the 'express-validator' library
const { check, validationResult } = require('express-validator');

// Validation middleware for inserting a new news entry
const insertNewsValidation = [
  check('newsTitle')
    .notEmpty().withMessage('News title is required')
    .isLength({ min: 5 }).withMessage('News title must be at least 5 characters long'),
  
  check('newsContent')
    .notEmpty().withMessage('News content is required')
    .isLength({ min: 10 }).withMessage('News content must be at least 10 characters long'),
];

// Validation middleware for updating an existing news entry
const updateNewsValidation = [
  check('newsId')
    .notEmpty().withMessage('News Id is required')
    .isMongoId().withMessage('Invalid News Id format'),  // For Mongoose ObjectId validation

  check('newsTitle')
    .notEmpty().withMessage('News title is required')
    .isLength({ min: 5 }).withMessage('News title must be at least 5 characters long'),
  
  check('newsContent')
    .notEmpty().withMessage('News content is required')
    .isLength({ min: 10 }).withMessage('News content must be at least 10 characters long'),
];

// Middleware to check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  insertNewsValidation,
  updateNewsValidation,
  handleValidationErrors, // Exporting the error handler middleware
};
