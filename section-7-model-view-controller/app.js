const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "section-7-model-view-controller/views");

/*
 * app.use allow to add middleware function
 * bodyParser parses incoming request bodies in a middleware before your handlers, available under the req.body property.
 * express.static() is a middleware function that serves static files such as images, CSS files, and JavaScript files
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  next(); // Allows the request to continue to the next middleware in line
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3001);
