const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "assignment-home.html"));
});

app.get("/users", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "assignment-users.html"));
});

app.listen(3000);
