const express = require("express");
const router = express.Router();
const passport = require("passport");
const { forwardAuthenticated } = require("../config/auth");

//Login Page
router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
});

//Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard/index",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
