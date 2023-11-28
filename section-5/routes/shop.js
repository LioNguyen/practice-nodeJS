const rootDir = require("../util/path");

const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res, next) => {
  // res.send("<h1>Hello from Express!</h1>");
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  res.sendFile(path.join(rootDir, "section-5", "views", "shop.html"));
});

module.exports = router;
