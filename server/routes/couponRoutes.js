// const express = require('express');
// const router = express.Router();
// const { 
//     getCoupons,
//     createCoupon,
//     updateCoupon,
//     deleteCoupon,
//     validateCoupon
// } = require('../controllers/couponController');

// const { protect } = require('../middlewares/authMiddleware');
// const { adminOnly } = require('../middlewares/roleMiddleware');

// // get all active coupons for user to see
// router.get('/', protect, getCoupons);

// // validate a coupon code during checkout
// router.post('/validate', protect, validateCoupon);

// // admin create coupon
// router.post('/', protect, adminOnly, createCoupon);

// // admin update coupon
// router.patch('/:couponId', protect, adminOnly, updateCoupon);

// // admin delete coupon
// router.delete('/:couponId', protect, adminOnly, deleteCoupon);

// module.exports = router;
