const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const DB = require("../IN_MEMORY_DB");



console.log(DB.USER_TABLE);

passport.use(new GoogleStrategy("http://localhost:5000/auth/google/callback)"));

