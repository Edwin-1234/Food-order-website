const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, address, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      address,
      role: role || "user",
      password: hashed,
    });

    const savedUser = await user.save();

    // remove password before sending back
    const userData = savedUser.toObject();
    delete userData.password;

    // create token
    const token = generateToken(savedUser._id, savedUser.role);

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      message: "Registration successful",
      user: userData,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in registration" });
  }
};

// login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No user found with this email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Password incorrect" });

    // generate token
    const token = generateToken(user._id, user.role);

    // remove password
    const userData = user.toObject();
    delete userData.password;

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: userData,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login error" });
  }
};

// get profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error loading profile" });
  }
};

// logout
exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// check user role
exports.checkUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Error checking user" });
  }
};
