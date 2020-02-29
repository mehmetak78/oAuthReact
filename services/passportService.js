const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const DB = require("../IN_MEMORY_DB");

const keys = require("../config/keys");


console.log(DB.USER_TABLE);

passport.use(new GoogleStrategy({
                                    clientID: keys.googleClientID,
                                    clientSecret: keys.googleClientSecret,
                                    callbackURL: "/auth/google/callbacknow",
                                    proxy:true
                                }));

