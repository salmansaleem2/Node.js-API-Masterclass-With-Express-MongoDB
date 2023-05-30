// this is core node module thats why we are not installing
const { error } = require("console");
const http = require("http");

const todos = [
  { id: 1, text: "Todo One" },
  { id: 2, text: "Todo Two" },
  { id: 3, text: "Todo Three" },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // res.statusCode = 404;
  // res.setHeader("Content-Type", "text/plain");
  // In express we dont send to header it will handle this it self
  // res.setHeader("Content-Type", "application/json");
  // res.setHeader("X-Powered-By", "Node.js");

  // make this dynamic instead of hardcode
  // res.writeHead(200, {
  //   "Content-Type": "application/json",
  //   "X-Powered-By": "Node.js",
  // });
  // res.write("<h1>Hello</h1>");
  // res.write("<h2>Hello Again</h2>");
  // res.end();\
  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      let status = 404;

      const response = {
        success: false,
        data: null,
        error: null,
      };

      if (method === "GET" && url === "/todos") {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === "POST" && url === "/todos") {
        const { id, text } = JSON.parse(body);

        if (!id || !text) {
          status = 400;
          response.error = "Plese add id and text";
        } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.data = todos;
        }
      }

      res.writeHead(status, {
        "Content-Type": "application/json",
        "X-Powered-By": "Node.js",
      });
      res.end(JSON.stringify(response));
    });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
