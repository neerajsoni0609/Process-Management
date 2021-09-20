const express = require("express");
const router = express.Router();
const Process = require("../models/Process");
const url = require("url");

router.get("/", (req, res) => {
  res.render("create");
});

router.post("/", (req, res) => {
  const { topic, category } = req.body;
  const newProcess = new Process({
    topic,
    category,
    subtopic: [],
  });

  Process.findOne({ topic: topic }).then((result) => {
    if (result) {
      req.flash("error_msg", "Topic already exists, please update");
      // res.render("update", {
      //   topic: topic,
      //   length: 1,
      //   errors: [{ msg: "Topic already exists, please update" }],
      // });

      res.redirect(
        url.format({
          pathname: "/dashboard/update-topic",
          query: {
            topic: topic,
            // length: 1,
          },
        })
      );
    } else {
      //Some code to create topic in db
      newProcess.save((err, result) => {
        if (err) {
          req.flash("error_msg", "Something went wrong");
          res.redirect("/dashboard/index");
        } else {
          req.flash(
            "success_msg",
            "Topic created, please add more details to it"
          );
          // res.render("update", {
          //   topic: topic,
          //   length: 1,
          //   errors: [{ msg: "Topic created, please add more details to it" }],
          // });

          res.redirect(
            url.format({
              pathname: "/dashboard/update-topic",
              query: {
                topic: topic,
                // length: 1,
              },
            })
          );
        }
      });
    }
  });
});

module.exports = router;
