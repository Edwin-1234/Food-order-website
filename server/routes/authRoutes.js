const express = require('express');
const router = express.Router();
const { 
    registerUser,
    loginUser,
    getProfile,checkUser,
    logoutUser
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

// normal users + restaurant owners register
router.post('/register', registerUser);

// common login
router.post('/login', loginUser);

// get own profile - needs protect
router.get('/profile', protect, getProfile);

router.get('/checkUser', protect, checkUser);

// logout
router.get('/logout', logoutUser);

module.exports = router;
