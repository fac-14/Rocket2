const http = require("http");
const router = require("./router");

const server = http.createServer(router);
// MG - todo, update with ENV port variable so Heroku doesn't FREAK OUT
const port = 4000;
server.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});
