// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user
router.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
