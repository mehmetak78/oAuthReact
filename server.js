const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./services/passportStrategies");
const keys = require("./config/keys");

const app = express();

app.use(express.json({extended:false}));

app.get("/",(req,res) => {
    res.json({msg:"Hello World. oAuth Sample"});
});

app.use(
    cookieSession({
                      maxAge: 30 * 24 * 60 * 60 * 1000,  //30 days
                      keys: [keys.cookieKey]
                  })
);
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
