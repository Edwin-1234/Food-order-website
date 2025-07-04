const Restaurant = require("../models/Restaurant");

// create a new restaurant (owner only)
exports.createRestaurant = async (req, res) => {
  try {
    const { name, image, location, menu } = req.body;

    const newRestaurant = new Restaurant({
      name,
      image,
      location,
      menu,
      ownerId: req.user.id, // the owner adding this restaurant
    });

    const saved = await newRestaurant.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating restaurant" });
  }
};

// get all restaurants (public)
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Error fetching restaurants" });
  }
};

// get restaurant by id (public)
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

// update restaurant (owner only)
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Not found" });

    // only the owner who created it can update
    if (restaurant.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    restaurant.name = req.body.name || restaurant.name;
    restaurant.image = req.body.image || restaurant.image;
    restaurant.location = req.body.location || restaurant.location;
    restaurant.menu = req.body.menu || restaurant.menu;

    const updated = await restaurant.save();
    res.json(updated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating restaurant" });
  }
};

// delete restaurant (owner only)
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Not found" });

    if (restaurant.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await restaurant.deleteOne();
    res.json({ message: "Restaurant deleted" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting restaurant" });
  }
};
