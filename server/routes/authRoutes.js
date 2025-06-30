const express = require('express');
const router = express.Router();
const { 
    registerUser,
    registerOwner,
    loginUser,
    getProfile,
    checkUser,
    logoutUser
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

// user registration
router.post('/register/user', registerUser);

// restaurant owner registration
router.post('/register/owner', registerOwner);

// common login
router.post('/login', loginUser);

// get own profile - needs protect
router.get('/profile', protect, getProfile);

// check user role
router.get('/checkUser', protect, checkUser);

// logout
router.get('/logout', logoutUser);

module.exports = router;
