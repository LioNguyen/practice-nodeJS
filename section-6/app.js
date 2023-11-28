const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./util/path");

const bodyParser = require("body-parser");
const express = require("express");
const expressHbs = require("express-handlebars");
const path = require("path");

const app = express();

/*
 * app.engine() allows us to define a new template engine
 * app.engine(ext, callback)
 * ext: The extension to use for the newly created engine
 * hbs cannot have any logic, it just use true/false
 */
app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "section-6/views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);

// app.set("view engine", "pug");
app.set("view engine", "hbs");
app.set("views", "section-6/views");

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

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).send("<h1>Page not found</h1>");
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  // res
  //   .status(404)
  //   .sendFile(path.join(rootDir, "section-5", "views", "404.html"));
  res.status(404).render("404", { docTitle: "Page Not Found" });
});

app.listen(3001);
