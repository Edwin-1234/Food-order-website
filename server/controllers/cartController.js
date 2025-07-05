const Cart = require("../models/Cart");
const Restaurant = require("../models/Restaurant");

// add an item to cart
exports.addToCart = async (req, res) => {
  try {
    const { restaurantId, itemId, quantity } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const item = restaurant.menu.find((i) => i._id.toString() === itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      // create new cart
      cart = new Cart({
        userId: req.user.id,
        restaurantId,
        items: [],
      });
    } else if (cart.restaurantId.toString() !== restaurantId) {
      // different restaurant, reset cart
      cart.items = [];
      cart.restaurantId = restaurantId;
    }

    // check if item already exists
    const existingItem = cart.items.find((i) => i.itemId === itemId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        itemId,
        name: item.name,
        price: item.price,
        quantity,
      });
    }

    cart.updatedAt = new Date();
    await cart.save();
    res.status(200).json(cart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// get the user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// update item quantity in cart
exports.updateCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.itemId.toString() === req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = req.body.quantity;
    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: "Error updating cart item" });
  }
};

// remove an item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.itemId.toString() !== req.params.itemId);
    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: "Error removing cart item" });
  }
};

// clear the entire cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.updatedAt = new Date();
    await cart.save();
    res.json({ message: "Cart cleared" });

  } catch (err) {
    res.status(500).json({ message: "Error clearing cart" });
  }
};
