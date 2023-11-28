const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("First middleware");
  next();
});

app.use((req, res, next) => {
  console.log("Second middleware");
  res.send("<h1>Hello from Express!</h1>");
  next();
});

app.use("/", (req, res, next) => {
  console.log("Third middleware");
  res.send("<h1>Hello from Express!</h1>");
});

app.use("/users", (req, res, next) => {
  console.log("Fourth middleware");
  res.send("<h1>Hello from Users!</h1>");
});

app.listen(3000);
