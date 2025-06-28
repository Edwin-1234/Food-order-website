// const express = require('express');
// const router = express.Router();
// const { 
//     createPayment,
//     getUserPayments,
//     getAllPayments,
//     getOwnerPayments
// } = require('../controllers/paymentController');

// const { protect } = require('../middlewares/authMiddleware');
// const { adminOnly, ownerOnly } = require('../middlewares/roleMiddleware');

// // user creates a payment
// router.post('/', protect, createPayment);

// // user sees their payment history
// router.get('/my', protect, getUserPayments);

// // admin sees all payments
// router.get('/all', protect, adminOnly, getAllPayments);

// // restaurant owner sees payments related to their orders
// router.get('/owner', protect, ownerOnly, getOwnerPayments);

// module.exports = router;
