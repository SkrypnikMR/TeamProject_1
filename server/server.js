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
  if ((req.method === "GET" && req.url === "/developers") || req.url === "/") {
    var answer = fs.readFileSync("developers/developers.json");
    res.writeHead(200, headers);
    res.end(answer);
  }
  if (req.url !== "/developers") {
    watchMethodAndUrl(req, res, headers);
  }
});

server.listen(3000);

function watchMethodAndUrl(req, res, headers) {
  if (req.method === "GET") {
    watchGetUrl(req, res, headers);
  } else if (req.method === "POST") {
    watchPostUrl(req, res, headers);
  } else if (req.method === "DELETE") {
    watchDeleteUrl(req, res, headers);
  } else if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }
}
function watchGetUrl(req, res, headers) {
  var URL = new URLSearchParams(req.url);
  console.log(URL.get("theme"));
  var fileReadResult = fs.readFileSync(
    `questions/questions${URL.get("type")}.json`
  );
  var serveranswer = [];
  var fileReadResultArrayOfObjects = JSON.parse(fileReadResult);
  if (URL.get("theme") === "ALLTHEMES") {
    res.writeHead(200, headers);
    res.end(fileReadResult);
    return 1;
  } else {
    for (var i = 0; i < fileReadResultArrayOfObjects.length; i++) {
      if (fileReadResultArrayOfObjects[i].theme === URL.get("theme")) {
        serveranswer.push(fileReadResultArrayOfObjects[i]);
      }
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify(serveranswer));
  }
}
function watchPostUrl(req, res, headers) {
  jsonParser(req, res, (err) => {
    if (err) console.log(err);
    var URL = new URLSearchParams(req.url);
    for (var i = 0; i < req.body.type.length; i++) {
      var fileReadResult = JSON.parse(
        fs.readFileSync(`questions/questions${req.body.type[i]}.json`)
      );
      console.log(fileReadResult);
      fileReadResult.unshift(req.body);
      console.log(fileReadResult);
      fs.writeFileSync(
        `questions/questions${req.body.type[i]}.json`,
        JSON.stringify(fileReadResult)
      );
    }
  });
  res.writeHead(200, headers);
  res.end("done");
}
function watchDeleteUrl(req, res, headers) {
  jsonParser(req, res, (err) => {
    if (err) console.log(err);
    var URL = new URLSearchParams(req.url);
    var fileReadResult = JSON.parse(
      fs.readFileSync(`questions/questions${URL.get("type")}.json`)
    );

    for (var i = 0; i < fileReadResult.length; i++) {
      if (fileReadResult[i].date === req.body.date) {
        fileReadResult.splice(i, 1);
      }
    }
    fs.writeFileSync(
      `questions/questions${URL.get("type")}.json`,
      JSON.stringify(fileReadResult)
    );
  });
  res.writeHead(200, headers);
  res.end("done");
}
