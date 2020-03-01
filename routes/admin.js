const express = require("express");
const router = express.Router();
const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");

// /admin

// Get Current User
router.get("/adminHome",  requireLogin, (req, res) => {
    res.send("In Admin Home Page");
});

// Logout
router.get("/logout", (req, res) => {
    req.logout();
    res.send("Logged Out");
});


module.exports = router;
