const path = require("path");
const express = require("express");
const router = express.Router();
const rootDir = require("../util/path");

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  // res.send(
  //   "<form action='add-product' method='POST'><input name='title' type='text' /><button type='submit'>Add Product</button></form>"
  // );
  // res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  res.sendFile(path.join(rootDir, "section-5", "views", "add-product.html"));
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
