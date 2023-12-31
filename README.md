<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400&family=Poppins&family=Roboto&display=swap');
/* Your CSS styles here */
body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    /* Other styles */
}

a, li {
  text-decoration: none;
}

li {
  list-style-type: circle;
}
</style>

# practice-nodeJS

https://www.udemy.com/course/nodejs-the-complete-guide/

[HTTP Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

<b>Tree Folder Structure</b>

Model View Controller (MVC): Model + View -> Controller -> Routes

- Root folder
  - controllers
  - data
    - \*.json
  - models
  - public
    - css
      - \*.css
  - routes
    - home.js
  - util
    - path.js
  - views
    - includes
      - \*.ejs
    - layouts
      - \*.pug/hbs
    - \*.html/ejs/pug/hbs
  - app.js

---

<b>Table of Contents</b>

- [practice-nodeJS](#practice-nodejs)
  - [Section 3: Understanding the Basics](#section-3-understanding-the-basics)
    - [1. Routing request](#1-routing-request)
    - [2. Parsing request body](#2-parsing-request-body)
      - [Request \& Response](#request--response)
      - [How to parse request body using chunk and Buffer](#how-to-parse-request-body-using-chunk-and-buffer)
    - [3. Blocking and none-blocking code](#3-blocking-and-none-blocking-code)
    - [4. Using node modules system](#4-using-node-modules-system)
  - [Section 4: Improved Development Workflow and Debugging](#section-4-improved-development-workflow-and-debugging)
    - [Summary](#summary)
    - [Type of Errors](#type-of-errors)
  - [Section 5: Express.js](#section-5-expressjs)
    - [Summary](#summary-1)
    - [How to add middleware to parses incoming request body using bodyParser](#how-to-add-middleware-to-parses-incoming-request-body-using-bodyparser)
    - [How to add middleware to serve static files](#how-to-add-middleware-to-serve-static-files)
    - [How to add custom middleware](#how-to-add-custom-middleware)
    - [How to create routes](#how-to-create-routes)
  - [Section 6: Dynamic Content and Templating Engines](#section-6-dynamic-content-and-templating-engines)
    - [How to apply engine](#how-to-apply-engine)
    - [ejs syntax](#ejs-syntax)
  - [Section 7: The Modal View Controller (MVC)](#section-7-the-modal-view-controller-mvc)
    - [Summary](#summary-2)
  - [Section 9: Dynamics Routes and Advance Models](#section-9-dynamics-routes-and-advance-models)
    - [Summary](#summary-3)
  - [Section 10 : SQL - Structure Query Language](#section-10--sql---structure-query-language)
    - [SQL vs NoSQL](#sql-vs-nosql)
    - [What's SQL](#whats-sql)
    - [What's NoSQL](#whats-nosql)
    - [How to use](#how-to-use)
  - [Section 11: Sequelize](#section-11-sequelize)
  - [Section 12: Mongodb](#section-12-mongodb)
  - [Section 13: Mongoose](#section-13-mongoose)
    - [How to connect mongodb \& get data with mongoose](#how-to-connect-mongodb--get-data-with-mongoose)
    - [Example](#example)

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

#### How to parse request body using chunk and Buffer

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

### Summary

![Summary](assets/images/Section%204%20-%20Summary.png)

### Type of Errors

![Type of Errors](assets/images/Section%204%20-%20Type%20of%20Errors.png)

## Section 5: Express.js

[Express.js](https://expressjs.com/en/starter/installing.html)

### Summary

![Summary](assets/images/Section%205%20-%20Summary.png)

### How to add middleware to parses incoming request body using bodyParser

bodyParser parses incoming request bodies in a middleware before your handlers, available under the <b><i>req.body</i></b> property.

```js
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
```

### How to add middleware to serve static files

express.static() is a middleware function that serves static files such as images, CSS files, and JavaScript files

```js
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
```

### How to add custom middleware

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
[handlebars](https://handlebarsjs.com/)
[ejs](https://ejs.co/)

### How to apply engine

- app.engine() allows us to define a new template engine
- app.engine(ext, callback)
- ext: The extension to use for the newly created engine
- hbs cannot have any logic, it just use true/false
- ejs is `recommended`

```js
const express = require("express");
const expressHbs = require("express-handlebars");

const app = express();

// This method is only used for hbs
app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "section-6/views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);

app.set("view engine", "pug");
app.set("view engine", "hbs");
app.set("view engine", "ejs");

app.set("views", "section-6/views");
```

### ejs syntax

```ejs
<!-- includes/head.ejs -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title><%= docTitle %></title>
    <link rel="stylesheet" href="/css/main.css" />
  </head>

<!-- includes/nav.ejs -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/users">Users</a></li>
    </ul>
  </nav>
</header>

<!-- 404.ejs -->
<%- include("includes/head.ejs") %>
<body>
  <%- include('includes/nav.ejs') %>
  <% if(nameList.length > 0) { %>
    <ul>
      <% for(let i = 0; i < nameList.length; i++) { %>
        <li><%= nameList[i] %></li>
      <% } %>
    </ul>
  <% } else { %>
    <h1>No users found</h1>
  <% } %>
</body>
</html>
```

## Section 7: The Modal View Controller (MVC)

[Modal View Controller](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

### Summary

![Summary](assets/images/Section%207%20-%20Summary.png)

## Section 9: Dynamics Routes and Advance Models

### Summary

![Summary](assets/images/Section%209%20-%20Summary.png)

## Section 10 : SQL - Structure Query Language

### SQL vs NoSQL

![SQL vs NoSQL](assets/images/Section%2010%20-%20SQL%20vs%20NoSQL.png)

![SQL vs NoSQL-2](assets/images/Section%2010%20-%20SQL%20vs%20NoSQL-2.png)

![Horizontal vs Vertical Scaling](assets/images/Section%2010%20-%20Horizontal%20vs%20Vertical%20Scaling.png)

### What's SQL

![What's SQL](assets/images/Section%2010%20-%20What's%20SQL.png)

![Core SQL Database Characteristics](assets/images/Section%2010%20-%20Core%20SQL%20Database%20Characteristics.png)

![SQL Queries](assets/images/Section%2010%20-%20SQL%20Queries.png)

### What's NoSQL

![What's NoSQL](assets/images/Section%2010%20-%20What's%20NoSQL.png)

![NoSQL](assets/images/Section%2010%20-%20NoSQL.png)

![NoSQL Characteristics](assets/images/Section%2010%20-%20NoSQL%20Characteristics.png)

### How to use

```js
// util/database.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_complete",
  password: "Nghi@0934118566",
});

module.exports = pool.promise();
```

```js
// models/product.js
module.exports = class Product(
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static fetchAll(cb) {
    return db.execute("SELECT * FROM products");
  }

  static findById(id, cb) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
)
```

## Section 11: Sequelize

![What is Sequelize](assets/images/Section%2011%20-%20What%20is%20Sequelize?.png)

![Core Concept](assets/images/Section%2011%20-%20Core%20Concept.png)

## Section 12: Mongodb

[Playground](https://www.mycompiler.io/view/2YMzssHzxIk)

## Section 13: Mongoose

[Document](https://mongoosejs.com/docs/index.html)

[Document: MongoDB with Mongoose](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)

[Playground](https://playground.mongoosejs.io/#)

### How to connect mongodb & get data with mongoose

```js
// 1. Connect db
await mongoose.connect(DB_URL);

// 2. Create Schema
const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId, // Id type from Schema
          ref: "Product", // Link productId in testSchema with productSchema
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

// 3. Create Schema Methods
testSchema.methods.findItem = function (product) {
  const foundItem = this.cart.items.find(
    (item) => item.productId === product._id.toString()
  );
  return foundItem;
};

// 4. Create Model from Schema
const TestModel = mongoose.model("Test", testSchema);

// 5. Insert data
const doc = new TestModal({ name: "test" });
await doc.save();

// 6. Methods
await TestModal.find(); // -> get data => return Query
await TestModal.find().select("name"); // -> select field to show
await TestModal.find().populate("userId"); // -> get data from UserModel to integrate into TestModal
await TestModal.findById(testId); // -> search item by id
await TestModal.findByIdAndRemove(testId); // -> delete item
```

### Example

```js
// ./app.js
mongoose
  .connect(mongodbData.url)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Lio",
          email: "lio@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });
```

```js
// ./models/product.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
```

```js
// ./controllers/admin.js
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.find()
    .select("title price -_id")
    .populate("userId", "name")
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
```
