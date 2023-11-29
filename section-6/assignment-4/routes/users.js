const express = require("express");
const router = express.Router();

const nameList = [];

router.get("/", (req, res, next) => {
  res.render("users", { pageTitle: "users", path: "/users", nameList });
});

router.post("/", (req, res, next) => {
  nameList.push(req.body.name);
  res.redirect("/");
});

exports.routes = router;
exports.data = nameList;
