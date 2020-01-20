const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../config/keys");

// const User = require("../models/user.Model");
const Entries = require('../models').bird_entry;
const Species = require('../models').bird_species;

// Load input validation
// const validateRegisterInput = require("../validation/register");
// const validateLoginInput = require("../validation/login");

// Get Species dictionary:
router.get("/species", (req, res) => {
    console.log("*** getting species dict...");

    Species.findAll().then(species => {
        if (species) {
            // return res.status(400).json({ email: "Email already exists" });
            return res.json(species);
        } else {
            return res.status(400).json({data: "there was some error retrieving the species dictionary"});
        }
    });
});


// Get user's Bird Entries:
router.get("/", (req, res) => {
    console.log("*** entries request received...");

    // Request validation
    // console.log("register input is valid");
    // const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    Entries.findAll({ where: {user_id: req.query.userid } }).then(bird_entry => {
        if (bird_entry) {
            // return res.status(400).json({ email: "Email already exists" });
            return res.json(bird_entry);
        } else {
            return res.status(204).json({data: "no entries found"});
        }
    });
});



module.exports = router;