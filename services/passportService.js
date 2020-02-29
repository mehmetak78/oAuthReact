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
    const user =  users.find(usr => usr.id === id);
    done(null, user);
});

passport.use(new GoogleStrategy({
                                    clientID: keys.googleClientID,
                                    clientSecret: keys.googleClientSecret,
                                    callbackURL: "/auth/google/callbacknow",
                                    proxy:true
                                },
                                (accesToken, refreshToken, profile, done) => {
                                    let user =  users.find(usr => usr.googleId === profile.id);
                                    if (user !== undefined) {
                                        return done(null, user);
                                    }
                                    user = {
                                        id:profile.id,
                                        googleId:profile.id
                                    };
                                    users = [...users, user];

                                    done(null, user);
                                }
                                ));

