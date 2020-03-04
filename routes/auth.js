const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const {check, validationResult} = require("express-validator/check");

const {insertDB, findByColumn} = require("../IN_MEMORY_DB");


// /auth

// Google Login
router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));

router.get("/google/callbacknow", passport.authenticate("google"),
           (req,res) => {
               console.log("Inside the callbacknow");
               res.redirect("/privatehome");
           }
);

// Local Login
router.post('/local/login', passport.authenticate('local'),
    (req,res) => {
        res.send(req.user);
    }
);

// Local Register
router.post("/local/register",
    [
        check("username", "Please include a valid username")
            .not().isEmpty(),
        check("password", "Please enter a password with 3 or more characters")
            .isLength({min: 3})
    ],
    async (req,res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send(result.errors[0].msg);
        }
        const {name,username, password} = req.body;
        try {
            const user = findByColumn("USER_TABLE","username",username);
            if (user !== undefined) {
                return res.send("User Already Exists");
              }
            else {
                let user = {
                    name,
                    username,
                    password
                };
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                user = insertDB("USER_TABLE",user);
                req.login( user, function(err) {
                    if (err) {
                        res.send("Server Error");
                    }
                    return res.send(user);
                });
            }
        } catch (err) {
            res.send("Server Error");
        }
    });

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
