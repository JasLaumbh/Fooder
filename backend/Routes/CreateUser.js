const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = "your_jwt_secret_key";

// Signup route
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        // Create the user
        try{
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            }).then(res.json({ success : true}))
        }
       
    catch (error) {
        console.log(error);
        res.json({ success: false, error: "Internal Server Error" });
    }
});

// Login route
router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        // Find the user by email
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }

        // Compare the password
        const pwdCompare = await bcrypt.compare(password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }

        // Generate JWT token
        const data = {
            user: {
                id: userData.id
            }
        };

        const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' });
        return res.json({ success: true, authToken });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
