// const express = require('express');
// const router = express.Router();
// const { 
//     placeOrder,
//     getUserOrders,
//     getAllOrders,
//     getOwnerOrders,
//     updateOrderStatus
// } = require('../controllers/orderController');

// const { protect } = require('../middlewares/authMiddleware');
// const { ownerOnly, adminOnly } = require('../middlewares/roleMiddleware');

// // place new order (user)
// router.post('/', protect, placeOrder);

// // get user’s own orders
// router.get('/my', protect, getUserOrders);

// // admin can get all orders
// router.get('/all', protect, adminOnly, getAllOrders);

// // restaurant owner sees their orders
// router.get('/owner', protect, ownerOnly, getOwnerOrders);

// // update order status (e.g., confirmed/cancelled)
// router.patch('/:orderId', protect, ownerOnly, updateOrderStatus);

// module.exports = router;
