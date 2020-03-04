const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require("../config/keys");
const bcrypt = require("bcryptjs");

const {insertDB, findByColumn} = require("../IN_MEMORY_DB");

passport.serializeUser((user, done) => {
    if (user.googleId) {
        done(null, user.googleId);
    }
    else {
        done(null, user);
    }
});

passport.deserializeUser((id, done) => {
    const user = findByColumn("USER_TABLE","googleId",id);
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
                                    let user = findByColumn("USER_TABLE","googleId",profile.id);
                                    if (user !== undefined) {
                                        return done(null, user);
                                    }
                                    user = {
                                        googleId:profile.id,
                                        name:profile.displayName
                                    };

                                    insertDB("USER_TABLE",user);
                                    done(null, user);
                                }
                                ));

passport.use(new LocalStrategy(
    async (username, password, done)=> {
        const user = findByColumn("USER_TABLE","username",username);
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
