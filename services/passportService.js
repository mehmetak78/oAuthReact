const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const DB = require("../IN_MEMORY_DB");
let users = DB.USER_TABLE;

const keys = require("../config/keys");

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("deserializeUser" + id);
    const user =  users.find(usr => usr.id === id);
    if (user) {
        done(null, user);
    }
    else {
        done(null,null);
    }
});

passport.use(new GoogleStrategy({
                                    clientID: keys.googleClientID,
                                    clientSecret: keys.googleClientSecret,
                                    callbackURL: "/auth/google/callbacknow",
                                    proxy:true
                                },
                                (accesToken, refreshToken, profile, done) => {
                                    console.log("Here.....");
                                    let user =  users.find(usr => usr.googleId === profile.id);
                                    if (user !== undefined) {
                                        return done(null, user);
                                    }
                                    user = {
                                        id:profile.id,
                                        googleId:profile.id,
                                        name:profile.displayName
                                    };
                                    users = [...users, user];

                                    done(null, user);
                                }
                                ));

