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
  if (req.method === "GET" && req.url === "/questions") {
    var answer = fs.readFileSync("questions/questions.json");
    res.writeHead(200, headers);
    res.end(answer);
  }
  if (req.method === "POST" && req.url === "/questions") {
    jsonParser(req, res, (err) => {
      if (err) console.log(err);
      var answer = JSON.parse(fs.readFileSync("questions/questions.json"));
      answer.unshift(req.body);
      fs.writeFileSync("questions/questions.json", JSON.stringify(answer));
    });
    res.writeHead(200, headers);
    res.end("done");
  }
  if (req.method === "DELETE" && req.url === "/questions") {
    jsonParser(req, res, (err) => {
      if (err) console.log(err);
      var answer = JSON.parse(fs.readFileSync("questions/questions.json"));
      for (var i = 0; i < answer.length; i++) {
        if (answer[i].date === req.body.date) {
          answer.splice(i, 1);
        }
      }
      console.log(answer);
      fs.writeFileSync("questions/questions.json", JSON.stringify(answer));
    });
    res.writeHead(200, headers);
    res.end("done");
  }
});

server.listen(3000);
