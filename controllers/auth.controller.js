// controllers/auth.controller.js
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AppError } = require("../middleware/errorHandler");

exports.register = async (req, res) => {
  // req.body has already been validated by registerSchema -
  // it only ever contains { email, password } now, never "role".
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword
    // role defaults to "user" from the schema
  });

  res.status(201).json({
    message: "User registered",
    user: { id: user._id, email: user.email, role: user.role }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: { id: user._id, email: user.email, role: user.role }
  });
};

// GET /api/auth/profile - protected by auth.middleware.
// Used by the "Profile" button/modal in the navbar.
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    throw new AppError(404, "User not found");
  }
  res.json({ user });
};
