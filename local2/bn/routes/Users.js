const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res, next) => {
    try {
      const { name, username, password } = req.body;
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const newUser = new User({ name, username, password });
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      // Forward error to Express error handler
      next(error);
    }
  });

module.exports = router;
