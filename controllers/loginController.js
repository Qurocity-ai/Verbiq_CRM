const recruitermodel = require("../models/recruitermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await recruitermodel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const recruiterLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const recruiter = await recruitermodel.findOne({ email });
    if (!recruiter) {
      return res.status(401).json({ message: "Invalid email " });
    }

    // Only allow users with role 'recruiter' to log in here
    if (recruiter.role !== "recruiter") {
      return res
        .status(403)
        .json({ message: "Access denied: Not a recruiter" });
    }

    if (password !== recruiter.password) {
      return res.status(401).json({ message: "Invalid  password" });
    }

    const payload = {
      id: recruiter._id,
      email: recruiter.email,
      role: recruiter.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Recruiter login successful",
      token,
      user: {
        id: recruiter._id,
        email: recruiter.email,
        role: recruiter.role,
        first_name: recruiter.first_name,
        last_name: recruiter.last_name,
      },
    });
  } catch (error) {
    console.error("Recruiter login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginController, recruiterLoginController };
