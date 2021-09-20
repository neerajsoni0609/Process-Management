const express = require("express");
const Process = require("../models/Process");

const router = express.Router();

router.get("/", (req, res) => {
  async function cat() {
    let cat = new Set();
    await Process.find({}).then((result) => {
      for (const element of result) {
        cat.add(element.category);
      }
    });
    return cat;
  }

  cat().then((cat) => {
    async function data() {
      let data = [];
      for (const element of cat) {
        await Process.find({ category: element })
          .select("topic")
          .then((result) => {
            let data1 = { category: element, topic: [] };
            for (const tpk of result) {
              data1.topic.push(tpk.topic);
            }
            data.push(data1);
          });
      }
      return data;
    }

    data().then((data) => {
      res.render("topic_index", { data });
    });
  });
});

module.exports = router;
