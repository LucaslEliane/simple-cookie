const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log(`request file is ${req.url}`);
  if (req.url === '/') {
    const filePath = './index.html';
    const stream = fs.createReadStream(filePath, {
      flags: "r"
    });
    stream.on("error", function() {
      res.writeHead(404);
      res.end("<h1>404 Not Found</h1>");
    })
    stream.pipe(res);
  } else {
    const filePath = path.join('./', req.url);
    const stream = fs.createReadStream(filePath, {
      flags: "r"
    });
    stream.on("error", function() {
      res.writeHead(404);
      res.end("file not found");
    });
    stream.pipe(res);
  }
});

server.listen('9999', function() {
  console.log('nodeJS server is listening in port 9999');
});