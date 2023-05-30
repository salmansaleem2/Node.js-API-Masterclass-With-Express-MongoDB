// this is core node module thats why we are not installing
const http = require("http");

const todos = [
  { id: 1, text: "Todo One" },
  { id: 2, text: "Todo Two" },
  { id: 3, text: "Todo Three" },
];

const server = http.createServer((req, res) => {
  // res.statusCode = 404;
  // res.setHeader("Content-Type", "text/plain");
  // In express we dont send to header it will handle this it self
  // res.setHeader("Content-Type", "application/json");
  // res.setHeader("X-Powered-By", "Node.js");

  res.writeHead(400, {
    "Content-Type": "application/json",
    "X-Powered-By": "Node.js",
  });
  // res.write("<h1>Hello</h1>");
  // res.write("<h2>Hello Again</h2>");
  // res.end();\
  // In express we don't send to Stringify it will handle this it self
  res.end(
    JSON.stringify({
      success: false,
      error: "Please add email",
      data: null,
    })
  );
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
