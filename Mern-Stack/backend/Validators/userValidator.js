// Import the check function from the 'express-validator' library
const { check } = require('express-validator');

// Validation middleware for inserting a new user
const insertUserValidation = [
  check('user_full_name')
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 4 }).withMessage('Full name must be at least 4 characters long'),

  check('user_username')
    .optional()
    .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),

  check('user_phone')
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\d{10,15}$/).withMessage('Invalid phone number format'),

  check('user_major')
    .notEmpty().withMessage('Major is required')
    .isIn(['Computer Science', 'Business', 'Engineering', 'Law'])
    .withMessage('Invalid major'),

  check('user_email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  check('user_password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
    .withMessage('Password must contain at least one uppercase letter and one number'),

  check('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('Invalid role'),
];

// Validation middleware for updating an existing user
const updateUserValidation = [
  check('userId')
    .notEmpty().withMessage('User ID is required')
    .isMongoId().withMessage('Invalid User ID format'),

  check('user_username')
    .optional()
    .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),

  check('user_phone')
    .optional()
    .matches(/^\d{10,15}$/).withMessage('Invalid phone number format'),

  check('user_major')
    .optional()
    .isIn(['Computer Science', 'Business', 'Engineering', 'Law'])
    .withMessage('Invalid major'),

  check('user_email')
    .optional()
    .isEmail().withMessage('Invalid Email Format'),

  check('user_password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
    .withMessage('Password must contain at least one uppercase letter and one number'),

  check('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('Invalid role'),
];

// Example to check for uniqueness in the database (for both insert and update)
const checkUniqueFields = async (req, res, next) => {
  const { userEmail, username } = req.body;

  // Here you can use your ORM or database check for uniqueness
  // E.g., using User model to check if email or username already exists:
  try {
    const userEmailExists = await User.findOne({ where: { user_email: userEmail } });
    const usernameExists = await User.findOne({ where: { user_username: username } });

    if (userEmailExists) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    if (usernameExists) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  insertUserValidation,
  updateUserValidation,
  checkUniqueFields, // Exporting the check for uniqueness
};
