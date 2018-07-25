const fs = require("fs");
const path = require("path");
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

  css: function(request, response) {
    fs.readFile(buildPath("css/style.css"), function(error, file) {
      if (error) {
        response.write(500, { "Content-Type": "text/plain" });
        response.end("server error");
        console.log(error);
        return;
      }
      response.writeHead(200, { "Content-Type": "text/css" });
      response.end(file);
    });
  },

  DOM: function(request, response) {
    fs.readFile(
      buildPath("js/DOM.js", function(error, file) {
        if (error) {
        }
      })
    );
  }
};
module.exports = handler;
