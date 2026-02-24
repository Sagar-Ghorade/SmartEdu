module.exports = (req, res, next) => {
  console.log("USER ROLE:", req.user.role);  // 👈 Add this

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  next();
};