const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';


router.post('/signup', async (req, res) => {
  const { name, department, profession, email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({
      name,
      department,
      profession,
      email,
      password: hashedPassword,
    });

    
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Enter correct password' });
    }

    
    const token = jwt.sign(
      { userId: user._id, userName: user.name, department: user.department },
      JWT_SECRET,
      { expiresIn: '1h' }
  );

    
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/profile', async (req, res) => {
  
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    
    const decoded = jwt.verify(token, JWT_SECRET);

    
    const user = await User.findById(decoded.userId).select('name department profession email');
    if (!user) return res.status(404).json({ message: 'User not found' });

    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
