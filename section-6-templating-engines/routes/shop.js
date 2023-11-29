const path = require("path");
const express = require("express");
const router = express.Router();

const adminData = require("./admin");
const rootDir = require("../util/path");

router.get("/", (req, res, next) => {
  // res.send("<h1>Hello from Express!</h1>");
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  // res.sendFile(path.join(rootDir, "section-5", "views", "shop.html"));
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    docTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
