var http = require("http");
var fs = require("fs");
var { json } = require("body-parser");

var jsonParser = json();

var server = http.createServer(function (req, res) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Max-Age": 12344345789,
  };
  if (req.method === "OPTIONS") {
    // забудешь это написать - будет зависнет запрос
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, headers);
    res.end("Server Work!");
  }
  if (req.method === "GET" && req.url === "/developers") {
    var answer = fs.readFileSync("developers/developers.json");
    res.writeHead(200, headers);
    res.end(answer);
  }
  if (req.method === "POST" && req.url === "/questions") {
    jsonParser(req, res, (err) => {
      if (err) console.log(error);
      var questions = JSON.parse(fs.readFileSync("questions/questions.json"));
      var data = Object.assign(questions, req.body);
      fs.writeFileSync("questions/questions.json", JSON.stringify(data));
    });
    res.writeHead(200, headers);
    res.end("done");
  }
});

server.listen(3000);
