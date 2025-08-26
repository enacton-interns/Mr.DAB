const bcrypt = require("bcryptjs");
const User = require("../models/User");

// REGISTER controller
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }
    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    // Create new user
    const user = await User.create({ username, password: hashed });
    // Regenerate session for security
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ message: "Session regeneration failed" });
      }
      // Store user ID in session
      req.session.userId = user._id;
      res.status(201).json({ message: "Registered and logged in" });
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// LOGIN controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Regenerate session to prevent session fixation
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ message: "Session regeneration failed" });
      }
      // Store user ID in session
      req.session.userId = user._id;
      res.json({ message: "Logged in successfully" });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// LOGOUT controller
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    // Clear session cookie
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
};
