const express = require("express");
const router = express.Router();
const Process = require("../models/Process");

router.get("/", (req, res) => {
  // console.log(req.query);
  let topic = [];
  // let length;
  if (Object.keys(req.query).length === 0) {
    Process.find({}).then((result) => {
      result.forEach(function (element) {
        topic.push(element.topic);
      });
      res.render("update", { topics: topic });
    });
  } else {
    topic.push(req.query.topic);
    res.render("update", { topics: topic });
  }
});

router.post("/", (req, res) => {
  const {
    topic,
    subtopic,
    activities,
    request,
    approval_pp8,
    approval_tp8,
    sod_pp8,
    sod_tp8,
    basis_critical_approval,
    comments,
  } = req.body;

  Process.findOneAndUpdate(
    { topic },
    {
      $push: {
        subtopic: {
          subtopic,
          activities,
          request,
          approval: {
            approval_pp8,
            approval_tp8,
          },
          sod: {
            sod_pp8,
            sod_tp8,
          },
          basis_critical_approval,
          comments,
        },
      },
    },
    (error, result) => {
      if (error) {
        req.flash("error_msg", "Something went wrong");
        res.redirect("/dashboard/index");
      } else {
        req.flash("success_msg", "Topic Updated Successfully");
        res.redirect("/dashboard/index");
      }
    }
  );
});

module.exports = router;
