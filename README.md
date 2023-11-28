# practice-nodeJS

https://www.udemy.com/course/nodejs-the-complete-guide/

[HTTP Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

- [practice-nodeJS](#practice-nodejs)
  - [Section 3: Understanding the Basics](#section-3-understanding-the-basics)
    - [1. Routing request](#1-routing-request)
    - [2. Parsing request body](#2-parsing-request-body)
      - [Request \& Response](#request--response)
      - [How to handle request body](#how-to-handle-request-body)
    - [3. Blocking and none-blocking code](#3-blocking-and-none-blocking-code)
    - [4. Using node modules system](#4-using-node-modules-system)
  - [Section 4: Improved Development Workflow and Debugging](#section-4-improved-development-workflow-and-debugging)
  - [Section 5: Express.js](#section-5-expressjs)
    - [How to use](#how-to-use)
    - [How to create routes](#how-to-create-routes)
  - [Section 6: Dynamic Content and Templating Engines](#section-6-dynamic-content-and-templating-engines)

## Section 3: Understanding the Basics

### 1. Routing request

### 2. Parsing request body

#### Request & Response

```js
// Request
req.url;
req.method;

// Response
res.setHeader("Content-Type", "text/html");
res.setHeader("Location", "/");
res.statusCode = 302;
res.write("");
res.end();
```

#### How to handle request body

```js
const http = require("http");

server = http.createServer((req, res) => {
  /* How to get data from request payload
   *
   * Applied for http
   * If using expressJS, we can use req.body
   *
   * Keyword:
   *  req.on("data", callback)
   *  req.on("end", callback)
   *  chunk,
   *  Buffer.concat().toString(),
   */
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      try {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split("=")[1];
        console.log("message", message);
      } catch (error) {
        console.log("error", error);
      }
    });
  }
});
```

### 3. Blocking and none-blocking code

![Core Modules](assets/images/Section%203%20-%20Core%20Modules.png)

```js
const fs = require("fs");

/**
 * This is a blocking code, writeFileSync will block the execution of the code until the file is created
 */
fs.writeFileSync("message.txt", message);
res.statusCode = 302;
res.setHeader("Location", "/");
return res.end();

/**
 * This is a non-blocking code, writeFile will not block the execution of the code until the file is created
 */
fs.writeFile("message.txt", message, (err) => {
  res.statusCode = 302;
  res.setHeader("Location", "/");
  return res.end();
});
```

### 4. Using node modules system

```js
module.exports = requestHandler;

module.exports = {
  handler: requestHandler,
  someText: "Some hard coded text",
};

module.exports.handler = requestHandler;
module.exports.someText = "Some hard coded text";

// Shortcuts from Node.js
exports.handler = requestHandler;
exports.someText = "Some hard coded text";
```

## Section 4: Improved Development Workflow and Debugging

![Type of Errors](assets/images/Section%204%20-%20Type%20of%20Errors.png)
![Summary](assets/images/Section%204%20-%20Summary.png)

## Section 5: Express.js

[Express.js](https://expressjs.com/en/starter/installing.html)
![Summary](assets/images/Section%205%20-%20Summary.png)

<b>Parses incoming request bodies</b>

bodyParser parses incoming request bodies in a middleware before your handlers, available under the <b><i>req.body</i></b> property.

```js
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
```

<b>Serve static files</b>

express.static() is a middleware function that serves static files such as images, CSS files, and JavaScript files

```js
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
```

### How to use

```js
// app.js
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

/*
 * app.use allow to add middleware function
 */
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("This always runs!");
  next(); // Allows the request to continue to the next middleware in line
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
```

### How to create routes

```js
// routes/admin
const path = require("path");
const express = require("express");
const router = express.Router();
const rootDir = require("../util/path");

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "section-5", "views", "add-product.html"));
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
```

## Section 6: Dynamic Content and Templating Engines

[pug](https://pugjs.org/api/getting-started.html)
