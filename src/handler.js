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

  search: function(request, response) {
    console.log("Searching!");
    response.writeHead(200, { "Content-Type": "application/javascript" });
    response.end("['bulbasaur', 'ivysaur', 'venusaur']");
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

  // css: function(request, response) {
  //   fs.readFile(buildPath("css/style.css"), function(error, file) {
  //     if (error) {
  //       response.write(500, { "Content-Type": "text/plain" });
  //       response.end("server error");
  //       console.log(error);
  //       return;
  //     }
  //     response.writeHead(200, { "Content-Type": "text/css" });
  //     response.end(file);
  //   });
  // },

  // DOM: function(request, response) {
  //   fs.readFile(buildPath("js/DOM.js"), function(error, file) {
  //     if (error) {
  //       response.write(500, { "Content-Type": "text/plain" });
  //       response.end("server error");
  //       console.log(error);
  //       return;
  //     }
  //     response.writeHead(200, { "Content-Type": "application/javascript" });
  //     response.end(file);
  //   });
  // },

  // logic: function(request, response) {
  //   fs.readFile(buildPath("js/logic.js"), function(error, file) {
  //     if (error) {
  //       response.write(500, { "Content-Type": "text/plain" });
  //       response.end("server error");
  //       console.log(error);
  //       return;
  //     }
  //     response.writeHead(200, { "Content-Type": "application/javascript" });
  //     response.end(file);
  //   });
  // }
};
module.exports = handler;
