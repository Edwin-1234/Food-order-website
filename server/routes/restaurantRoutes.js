const express = require('express');
const router = express.Router();
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurantController');

const { protect } = require('../middlewares/authMiddleware');
const { ownerOnly } = require('../middlewares/roleMiddleware');

// create restaurant (owner only)
router.post('/', protect, ownerOnly, createRestaurant);

// get all restaurants (public)
router.get('/', getAllRestaurants);

// get restaurant by id (public)
router.get('/:id', getRestaurantById);

// update restaurant (owner only)
router.patch('/:id', protect, ownerOnly, updateRestaurant);

// delete restaurant (owner only)
router.delete('/:id', protect, ownerOnly, deleteRestaurant);

module.exports = router;
