const express = require("express");

const passport = require("passport");

require("./services/passportService");

const app = express();

app.use(express.json({extended:false}));

app.get("/",(req,res) => {
    res.json({msg:"Hello World. oAuth Sample"});
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));

// Define Routes
app.use("/api/auth", require("./routes/auth"));
