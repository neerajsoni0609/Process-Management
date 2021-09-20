const express = require("express");
const router = express.Router();

// Dashboard page after Login
router.get("/index", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
