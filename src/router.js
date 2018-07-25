const handler = require("./handler");

const router = (request, response) => {
  const URL = request.url;
  console.log(URL);
  console.log(request.method);

  const ext = URL.split(".")[1];

  contentType = {
    html: "text/html",
    css: "text/css",
    javascript: "application/javascript",
    ico: "icon/x-icon",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif"
  };

  //for each endpoint, run corresponding function in handler
  if (URL === "/") {
    handler.home(request, response);
  } else if (ext === "css") {
    handler.css(request, response);
  }
};

module.exports = router;
