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

![Core Modules](assets/images/Section%203%20-%20Core%20Modules.png)

## Section 4: Improved Development Workflow and Debugging

![Type of Errors](assets/images/Section%204%20-%20Type%20of%20Errors.png)
![Summary](assets/images/Section%204%20-%20Summary.png)
