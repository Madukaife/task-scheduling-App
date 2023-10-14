const express = require("express");
const dotenv = require("dotenv");
const session = require('express-session');
const passport = require('passport');
const sequelize = require('sequelize');
const cors = require("cors");
require("./middlewares/googleoauth")
const database = require("./configs/database");
const user = require('./routes/user.js')



dotenv.config()
database.connectDB();

function isLoggedIn(req, res, next) {
req.user ? next() : res.sendStatus(401)
}

const app = express();
app.use(session({ secret: 'obiora' }));
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
    origin: 'http://localhost:4002',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/users', user);

const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});
app.get('/auth/google', 
    passport.authenticate('google',{scope: ['email', 'profile']})
);
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })  
);

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`hello ${req.user.displayName}`);
    console.log(req.user);
});
app.get('/auth/failure', (req, res) => {
    res.send("something went wrong");
});

  

app.get("/", (req, res) => {
    res.status(200).json({ message: "server is up and running" });
});


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
