const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getRestaurantOrders,
  getAllOrders
} = require('../controllers/orderController');

const { protect } = require('../middlewares/authMiddleware');
const { userOnly, ownerOnly, adminOnly } = require('../middlewares/roleMiddleware');

// user routes
router.post('/', protect, userOnly, placeOrder);
router.get('/', protect, userOnly, getMyOrders);
router.get('/:id', protect, userOnly, getOrderById);
router.patch('/:id/cancel', protect, userOnly, cancelOrder);

// owner route
router.get('/restaurant/all', protect, ownerOnly, getRestaurantOrders);

// admin route
router.get('/admin/all', protect, adminOnly, getAllOrders);

module.exports = router;
