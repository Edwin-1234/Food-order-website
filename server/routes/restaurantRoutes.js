// const express = require('express');
// const router = express.Router();

// const {
//   getAllRestaurants,
//   getRestaurantById,
//   createRestaurant,
//   updateRestaurant,
//   deleteRestaurant,
// } = require('../controllers/restaurantController');

// const { protect } = require('../middlewares/authMiddleware');  // for token check
// const { ownerOnly } = require('../middlewares/roleMiddleware'); // custom role check

// // anyone can see
// router.get('/', getAllRestaurants);
// router.get('/:id', getRestaurantById);

// // only logged-in restaurant owners can do these:
// router.post('/', protect, ownerOnly, createRestaurant);
// router.patch('/:id', protect, ownerOnly, updateRestaurant);
// router.delete('/:id', protect, ownerOnly, deleteRestaurant);

// module.exports = router;
