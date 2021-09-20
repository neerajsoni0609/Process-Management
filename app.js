const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const index = require("./routes/index");
const users = require("./routes/users");
const dashboard = require("./routes/dashboard");
const create_topic = require("./routes/create_topic");
const update_topic = require("./routes/update_topic");
const topic_index = require("./routes/topic_index");
const topic = require("./routes/topic");

const { ensureAuthenticated, forwardAuthenticated } = require("./config/auth");

const app = express();

// Passport config
require("./config/passport")(passport);

//DB Config
const db = require("./config/keys").MongoURI;

//Connect to Mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Middleware to fix back button login
app.use(function (req, res, next) {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

// Routes
app.use("/", index);
app.use("/users", users);
app.use("/dashboard", ensureAuthenticated, dashboard);
app.use("/dashboard/topic-index", topic_index);
app.use("/dashboard/topic", topic);
app.use("/dashboard/create-topic", create_topic);
app.use("/dashboard/update-topic", update_topic);

const PORT = process.env.PORT || 80;
app.listen(PORT, console.log(`Server started on Port ${PORT}`));
