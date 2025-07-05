const express = require('express');
const router = express.Router();
const authRouter = require('./authRoutes');
const restaurantRouter = require('./restaurantRoutes');
const menuRouter = require('./menuRoutes');
const cartRouter = require('./cartRoutes');
const orderRouter = require('./orderRoutes');
const couponRouter = require('./couponRoutes');
const paymentRouter = require('./paymentRoutes');

// router.use('/payment', paymentRouter);

// router.use('/coupon', couponRouter);

router.use('/order', orderRouter);

router.use('/cart', cartRouter);

// router.use('/menu', menuRouter);

router.use('/restaurant', restaurantRouter);

// mount under /api/auth
router.use('/auth', authRouter);

module.exports = router;
