const fs = require("fs");
const path = require("path");
const search = require("./autocomplete");
const buildPath = function(myPath) {
  return path.join(__dirname, "..", "public", myPath);
};

const handler = {
  home: function(request, response) {
    console.log("running handler.home");
    fs.readFile(buildPath("index.html"), function(error, file) {
      if (error) {
        response.write(500, { "Content-Type": "text/plain" });
        response.end("server error");
        console.log(error);
        return;
      }
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    });
  },

  search: function(request, response) {
    let searchTerm = request.url.split("/");
    console.log(searchTerm[2]);
    const searchResult = search(searchTerm[2]);
    response.writeHead(200, { "Content-Type": "application/json" });
    console.log(searchResult);
    response.write(JSON.stringify(searchResult));
    response.end();
  },

  public: function(request, response, contentType, ext) {
    fs.readFile(buildPath(request.url), function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.writeHead(200, {
        "Content-Type": contentType[ext]
      });
      response.end(file);
    });
  }
};
module.exports = handler;
