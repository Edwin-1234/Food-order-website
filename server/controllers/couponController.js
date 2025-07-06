const Coupon = require("../models/Coupon");

// user sees active coupons
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isActive: true });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: "Error fetching coupons" });
  }
};

// admin creates coupon
exports.createCoupon = async (req, res) => {
  try {
    const { code, discountPercent, minOrderValue } = req.body;
    const exists = await Coupon.findOne({ code });
    if (exists) return res.status(400).json({ message: "Code already exists" });
    const coupon = new Coupon({
      code,
      discountPercent,
      minOrderValue,
      isActive: true
    });
    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ message: "Error creating coupon" });
  }
};

// admin updates coupon
exports.updateCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;
    const coupon = await Coupon.findByIdAndUpdate(couponId, req.body, { new: true });
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: "Error updating coupon" });
  }
};

// admin deletes coupon
exports.deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.couponId);
    res.json({ message: "Coupon deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting coupon" });
  }
};

// validate coupon at checkout
exports.validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    const coupon = await Coupon.findOne({ code, isActive: true });
    if (!coupon) return res.status(404).json({ message: "Invalid coupon" });
    if (orderAmount < coupon.minOrderValue) {
      return res.status(400).json({ message: "Order too small for this coupon" });
    }
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: "Error validating coupon" });
  }
};
