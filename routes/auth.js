const express = require("express");
const router = express.Router();
const passport = require("passport");

// /auth

// Google Login
router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));

router.get("/google/callbacknow", passport.authenticate("google"),
           (req,res) => {
               console.log("Inside the route callbacknow");
           }
);

module.exports = router;
