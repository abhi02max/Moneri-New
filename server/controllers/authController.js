const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// LOGIN LOGIC
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// REGISTRATION LOGIC
exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
      const adminExists = await Admin.findOne({ username });
      if (adminExists) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
      const admin = await Admin.create({ username, password });
      if (admin) {
        res.status(201).json({
          _id: admin._id,
          username: admin.username,
          token: generateToken(admin._id),
        });
      } else {
        res.status(400).json({ message: 'Invalid admin data' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
};