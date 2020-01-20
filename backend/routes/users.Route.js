const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// const User = require("../models/user.Model");

const User = require('../models').user;

// Load input validation
// const validateRegisterInput = require("../validation/register");
// const validateLoginInput = require("../validation/login");

router.post("/signup",(req, res) => {
    console.log("signup received");

    // Form validation
    // const { errors, isValid } = validateRegisterInput(req.body);
    // console.log("register input is valid");
    // const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    User.findOne({ where: {email: req.body.email } }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                payment_plan: 1,
                renewal_date: Date.now(),
                free_ids: 5,
                created_at: Date.now()
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser._password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/signin", (req, res) => {
    // Form validation
    // const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ where: {email: req.body.email } }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(req.body.password, user._password).then(isMatch => {
            if (isMatch) {
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.first_name,
                    lastname: user.last_name,
                    email: user.email,
                    confirmation: user.confirmation,
                    paid: user.paid
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 6000 // 31556926 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

// router.get("/", (req, res) => {
//     console.log("get received");
//     User.findAll()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json("Error: " + err));
// });

module.exports = router;