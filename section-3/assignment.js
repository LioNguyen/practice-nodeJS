const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    // * Remember to set the Content-Type to text/html
    res.setHeader("Content-Type", "text/html");

    res.write("<html>");
    res.write("This is section 3");
    res.write(
      "<form action='/create-user' method='POST'><input type='text' name='user-name' /><button type='submit'>Submit</button></form>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    // * Remember to set the Content-Type to text/html
    res.setHeader("Content-Type", "text/html");

    res.write("<html>");
    res.write("<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];

    // ! req.on(), not res.on()
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      try {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split("=")[1];
        console.log("message", message);
      } catch (error) {
        console.log("error", error);
      }
    });

    // * Remember to set status code and Location header after post request
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
});

server.listen(3000);
