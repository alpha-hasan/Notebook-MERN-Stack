const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fetchuser = require('../middlewares/fetchuser');

// Authentication Routes



// 1# Route: Signup


router.post('/signup', [

    // Validation: Name, Email & Password

    body('name', 'Please enter atleast 3 characters.').isLength({ min: 3 }),
    body('password', 'Please enter atleast 6 characters.').isLength({ min: 6 }),
    body('email', 'Please enter a valid email address.').isEmail()

], async (req, res) => {

    // Throws an error if validation fails

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        // Validation: Throws an error if an account with same email exists

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'Account Already Exists!' });
        }

        // Encryption: Hashing & Salt

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        // Creating user in DB

        user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email
        });

        // Creating a JWT

        const payload = { userId: user.id };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("An Error Occured!");
    }
});



// 2# Route: Signin


router.post('/signin', [

    // Validation: Email & Password

    body('email', 'Please enter a valid email address.').isEmail(),
    body('password', 'Password Field can not be blank.').exists()

], async (req, res) => {

    // Throws Error if validation fails

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Validation: If user entered valid info

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "Please enter valid credentials" });
        }

        // Encryption: Comparing user-pass with DB-pass

        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return res.status(400).json({ errors: "Please enter valid credentials" });
        }

        // Creating a JWT

        const payload = { userId: user.id };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("An Error Occured!");
    }
});



// 3# Route: Userdata-Fetching


router.post('/getuserdetails', fetchuser, async (req, res) => {
    try {

        // Fetching everything except pass by user-ID

        const userId = req.userId;
        const userInfo = await User.findById(userId).select('-password');
        res.json({ userInfo });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("An Error Occured!");
    }
});

module.exports = router;