const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose");

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token failed", error: error.message });
  }
};

// Middleware for Admin-only access
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};

module.exports = { protect, adminOnly }



const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    dueDate: { type: Date, required: true },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachments: [{ type: String }],
    todoChecklist: [{ text: String, completed: Boolean }],
    progress: { type: Number, default: 0 }
  },
  { timestamps: true }
);
