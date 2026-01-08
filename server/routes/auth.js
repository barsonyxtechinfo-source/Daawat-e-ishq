const express = require('express');
const { 
  registerUser, 
  loginUser, 
  getCurrentUser, 
  registerAdmin,
  updateProfile,
  googleAuth,
  facebookAuth
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add error handling middleware
const errorHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error('Route error:', error);
      res.status(500).json({ 
        error: error.message || 'Internal server error' 
      });
    }
  };
};

router.post('/register', errorHandler(registerUser));
router.post('/login', errorHandler(loginUser));
router.post('/google', errorHandler(googleAuth));
router.post('/facebook', errorHandler(facebookAuth));
router.get('/me', authMiddleware, errorHandler(getCurrentUser));
router.post('/register-admin', authMiddleware, errorHandler(registerAdmin));
router.put('/update-profile', authMiddleware, errorHandler(updateProfile));

module.exports = router;
