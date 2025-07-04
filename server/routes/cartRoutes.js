const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require('../controllers/cartController');

const { protect } = require('../middlewares/authMiddleware');
const { userOnly } = require('../middlewares/roleMiddleware');

// add to cart
router.post('/', protect, userOnly, addToCart);

// get cart
router.get('/', protect, userOnly, getCart);

// update cart item
router.patch('/:itemId', protect, userOnly, updateCartItem);

// remove cart item
router.delete('/:itemId', protect, userOnly, removeCartItem);

// clear cart
router.delete('/', protect, userOnly, clearCart);

module.exports = router;
