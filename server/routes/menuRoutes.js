// const express = require('express');
// const router = express.Router();
// const { 
//     getMenuByRestaurant,
//     addMenuItem,
//     updateMenuItem,
//     deleteMenuItem 
// } = require('../controllers/menuController');

// const { protect } = require('../middlewares/authMiddleware');
// const { ownerOnly } = require('../middlewares/roleMiddleware');

// // anyone can view a restaurant’s menu
// router.get('/:restaurantId', getMenuByRestaurant);

// // restaurant owner can manage
// router.post('/:restaurantId', protect, ownerOnly, addMenuItem);
// router.patch('/:restaurantId/:itemId', protect, ownerOnly, updateMenuItem);
// router.delete('/:restaurantId/:itemId', protect, ownerOnly, deleteMenuItem);

// module.exports = router;
