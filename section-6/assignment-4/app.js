const homeRoutes = require("./routes/home");
const usersRoutes = require("./routes/users");

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "section-6/assignment-4/views");

// Router
app.use("/", homeRoutes.routes);
app.use("/users", usersRoutes.routes);

app.listen(3001);
