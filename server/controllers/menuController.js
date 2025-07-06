const Restaurant = require("../models/Restaurant");

// get menu by restaurant
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant.menu);
  } catch (err) {
    res.status(500).json({ message: "Error getting menu" });
  }
};

// add item
exports.addMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const newItem = req.body;
    restaurant.menu.push(newItem);
    await restaurant.save();
    res.status(201).json(restaurant.menu);
  } catch (err) {
    res.status(500).json({ message: "Error adding menu item" });
  }
};

// update item
exports.updateMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const item = restaurant.menu.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;
    item.description = req.body.description || item.description;
    item.available = req.body.available ?? item.available;

    await restaurant.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error updating menu item" });
  }
};

// delete item
exports.deleteMenuItem = async (req, res) => {
  try {
    console.log("Deleting item:", req.params.restaurantId, req.params.itemId);

    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) {
      console.log("No restaurant found");
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const itemIndex = restaurant.menu.findIndex(
      (i) => i._id.toString() === req.params.itemId
    );

    if (itemIndex === -1) {
      console.log("No menu item found");
      return res.status(404).json({ message: "Menu item not found" });
    }

    // remove by splice
    restaurant.menu.splice(itemIndex, 1);
    await restaurant.save();

    console.log("Deleted successfully");
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Error deleting menu item" });
  }
};


