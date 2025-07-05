const Order = require("../models/Order");
const Cart = require("../models/Cart");

// place an order from cart
exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const { deliveryAddress, paymentMethod } = req.body;

    const totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountApplied = 0; // can add coupon logic later
    const finalAmount = totalAmount - discountApplied;

    const newOrder = new Order({
      userId: req.user.id,
      restaurantId: cart.restaurantId,
      items: cart.items,
      totalAmount,
      discountApplied,
      finalAmount,
      deliveryAddress,
      paymentMethod,
      isPaid: paymentMethod !== "COD",
      status: "confirmed",
      createdAt: new Date(),
    });

    const savedOrder = await newOrder.save();

    // clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error placing order" });
  }
};

// get my orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// get order by id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order" });
  }
};

// cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    order.status = "cancelled";
    await order.save();
    res.json({ message: "Order cancelled", order });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling order" });
  }
};

// get orders for owner restaurant
exports.getRestaurantOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("restaurantId");
    const filtered = orders.filter(order =>
      order.restaurantId?.ownerId?.toString() === req.user.id
    );
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Error fetching restaurant orders" });
  }
};

// get all orders for admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all orders" });
  }
};
