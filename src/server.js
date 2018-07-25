const http = require("http");
const router = require("./router");
const handler = require("./handler");

const server = http.createServer(router);
const port = 4000;
server.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});
