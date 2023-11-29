const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("home", { pageTitle: "home", path: "/" });
});

exports.routes = router;
