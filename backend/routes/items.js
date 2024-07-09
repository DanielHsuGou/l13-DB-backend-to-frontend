// endpoints in /items => /items/football, /items/tennis

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("home");
});

router.get("/about", (req, res) => {
  res.send("about");
});

router.get("/blog", (req, res) => {
  res.send("blog");
});

router.get("/contact", (req, res) => {
  res.send("contact");
});

module.exports = router;
