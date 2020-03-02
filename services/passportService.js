const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require("../config/keys");
const bcrypt = require("bcryptjs");

const DB = require("../IN_MEMORY_DB");

passport.serializeUser((user, done) => {
    console.log("serializeUser-1");
    if (user.id) {
        done(null, user.id);
    }
    else {
        done(null, user);
    }
});

passport.deserializeUser((id, done) => {
    const users = DB.USER_TABLE;
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
                                    let users = DB.USER_TABLE;
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
                                    DB.USER_TABLE = users;

                                    done(null, user);
                                }
                                ));

passport.use(new LocalStrategy(
    async (username, password, done)=> {
        let users = DB.USER_TABLE;
        const user =  users.find(usr => usr.username === username);
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, 'Invalid Password' );
            }
            return done(null, user);
        }
        return done (null, 'Incorrect Username.');
    }
));
