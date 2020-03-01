const express = require("express");
const router = express.Router();
const passport = require("passport");

const DB = require("../IN_MEMORY_DB");
let users = DB.USER_TABLE;

// /auth

// Google Login
router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));

router.get("/google/callbacknow", passport.authenticate("google"),
           (req,res) => {
               console.log("Inside the route callbacknow");
               res.redirect("/privatehome");
           }
);

// Get Current User
router.get("/api/current_user", (req, res) => {
    if (req.user) {
        res.send(req.user);
    }
    else {
        res.send("Not Logged In");
    }
});

// Logout
router.get("/api/logout", (req, res) => {
    req.logout();
    res.send("Logged Out");
});


module.exports = router;
