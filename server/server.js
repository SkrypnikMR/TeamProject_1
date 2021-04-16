var http = require("http");
var {watchMethodAndUrl, watchGetUrl, watchDeleteUrl, watchPostUrl,watchPutUrl} = require("./server_modules/watch");

var server = http.createServer(function (req, res) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Max-Age": 12344345789,
  };
  watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl);

});

server.listen(3000);




