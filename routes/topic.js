const express = require("express");
const Process = require("../models/Process");

const router = express.Router();

router.get("/", (req, res) => {
  const topic = req.query.topic;
  Process.find({ topic }).then((result) => {
    let result1 = result[0];
    res.render("topic", { result1 });
  });
});

module.exports = router;
