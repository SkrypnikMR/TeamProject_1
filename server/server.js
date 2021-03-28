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
  if(req.method === "GET" && req.url === "/?questions=XML"){
    var answer = fs.readFileSync("questions/questionsXML.json");
    res.writeHead(200, headers);
    res.end(answer);
  }
  if(req.method === "GET" && req.url === "/?questions=CSV"){
    var answer = fs.readFileSync("questions/questionsCSV.json");
    res.writeHead(200, headers);
    res.end(answer);
  }
  if(req.method === "GET" && req.url === "/?questions=YAML"){
    var answer = fs.readFileSync("questions/questionsYAML.json");
    res.writeHead(200, headers);
    res.end(answer);
  }
  if (req.method === "GET" && req.url === "/questions") {
    var answer = fs.readFileSync("questions/questionsJSON.json");
    res.writeHead(200, headers);
    res.end(answer);
  }
  if (req.method === "POST" && req.url === "/questions") {
    jsonParser(req, res, (err) => {
      if (err) console.log(err);
      // логика записи по разным файлам без конвертеров
      console.log(req.body);

      writeInFiles(req);
    });
    res.writeHead(200, headers);
    res.end("done");
  }
  if (req.method === "DELETE" && req.url === "/questions") {
    jsonParser(req, res, (err) => {
      if (err) console.log(err);
      console.log(req.body.type);
      deleteinFiles(req);
    });
    res.writeHead(200, headers);
    res.end("done");
  }
});

server.listen(3000);

function writeInFiles(req) {
  if (req.body.type.includes("JSON")) {
    // req.body.type = JSON
    var answer = JSON.parse(fs.readFileSync("questions/questionsJSON.json"));
    answer.unshift(req.body);
    fs.writeFileSync("questions/questionsJSON.json", JSON.stringify(answer));
  }

  if (req.body.type.includes("CSV")) {
    var answerCSV = JSON.parse(fs.readFileSync("questions/questionsCSV.json"));
    answerCSV.unshift(req.body);
    fs.writeFileSync("questions/questionsCSV.json", JSON.stringify(answerCSV));
  }
  if (req.body.type.includes("YAML")) {
    var answerYAML = JSON.parse(
      fs.readFileSync("questions/questionsYAML.json")
    );
    answerYAML.unshift(req.body);
    fs.writeFileSync(
      "questions/questionsYAML.json",
      JSON.stringify(answerYAML)
    );
  }
  if (req.body.type.includes("XML")) {
    var answerXML = JSON.parse(fs.readFileSync("questions/questionsXML.json"));
    answerXML.unshift(req.body);
    fs.writeFileSync("questions/questionsXML.json", JSON.stringify(answerXML));
  }
}

function deleteinFiles(req) {
  if (req.body.type.includes("JSON")) {
    var answerJSON = JSON.parse(
      fs.readFileSync("questions/questionsJSON.json")
    );
    for (var i = 0; i < answerJSON.length; i++) {
      if (answerJSON[i].date === req.body.date) {
        answerJSON.splice(i, 1);
      }
    }
    fs.writeFileSync(
      "questions/questionsJSON.json",
      JSON.stringify(answerJSON)
    );
  }
  if (req.body.type.includes("CSV")) {
    var answerCSV = JSON.parse(fs.readFileSync("questions/questionsCSV.json"));
    for (var i = 0; i < answerCSV.length; i++) {
      if (answerCSV[i].date === req.body.date) {
        answerCSV.splice(i, 1);
      }
    }
    fs.writeFileSync("questions/questionsCSV.json", JSON.stringify(answerCSV));
  }
  if (req.body.type.includes("YAML")) {
    var answerYAML = JSON.parse(
      fs.readFileSync("questions/questionsYAML.json")
    );
    for (var i = 0; i < answerYAML.length; i++) {
      if (answerYAML[i].date === req.body.date) {
        answerYAML.splice(i, 1);
      }
    }
    fs.writeFileSync(
      "questions/questionsYAML.json",
      JSON.stringify(answerYAML)
    );
  }
  if (req.body.type.includes("XML")) {
    var answerXML = JSON.parse(fs.readFileSync("questions/questionsXML.json"));
    for (var i = 0; i < answerXML.length; i++) {
      if (answerXML[i].date === req.body.date) {
        answerXML.splice(i, 1);
      }
    }
    fs.writeFileSync(
      "questions/questionsXML.json",
      JSON.stringify(answerXML)
    );
  }
}
