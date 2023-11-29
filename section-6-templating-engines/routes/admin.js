const rootDir = require("../util/path");

const express = require("express");
const path = require("path");

const router = express.Router();
const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  // res.send(
  //   "<form action='add-product' method='POST'><input name='title' type='text' /><button type='submit'>Add Product</button></form>"
  // );
  // res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  // res.sendFile(path.join(rootDir, "section-5", "views", "add-product.html"));
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCSS: true,
    formsCSS: true,
  });
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
