const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'thisismysecret';

// Create a user using: POST "/api/auth/". Doesn't require Auth
router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
],
 async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exists already

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ error: 'Sorry a user with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    
    // Create a new user
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    })
    const data ={
        user:{
            id:user.id
        }
    }
    const authToken= jwt.sign(data,JWT_SECRET);
  
    
     res.json({
        user,
        authToken
     })//user is the response
    //   .catch(err => {
    //       console.log(err);
    //       res.json({ error: 'Please enter a unique entry', message: err.message });
    //   });
});

module.exports = router;
