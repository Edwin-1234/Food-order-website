exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only" });
  next();
};

exports.ownerOnly = (req, res, next) => {
  if (req.user.role !== "restaurant_owner")
    return res.status(403).json({ message: "Restaurant owner only" });
  next();
};
