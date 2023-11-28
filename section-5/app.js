const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./util/path");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

/*
 * app.use allow to add middleware function
 * bodyParser parses incoming request bodies in a middleware before your handlers, available under the req.body property.
 * express.static() is a middleware function that serves static files such as images, CSS files, and JavaScript files
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("This always runs!");
  next(); // Allows the request to continue to the next middleware in line
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).send("<h1>Page not found</h1>");
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res
    .status(404)
    .sendFile(path.join(rootDir, "section-5", "views", "404.html"));
});

app.listen(3001);
