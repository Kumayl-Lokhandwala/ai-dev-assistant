import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Please provide all required fields: name, email, and password.",
      });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long." });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exists.` });
    }

    // 3. Create and save the new user
    const user = await User.create({ name, email, password });

    // 4. Respond with user data and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      message: "An unexpected server error occurred during registration.",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password." });
    }

    // 2. Check for user and password correctness
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // 3. Respond with user data and token
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // Use a generic message for security
      res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ message: "An unexpected server error occurred during login." });
  }
};

export const getMe = async (req, res) => {
  // req.user is attached by the auth middleware
  res.status(200).json(req.user);
};
