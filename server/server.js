var http = require("http");
var fs = require("fs");
var { json } = require("body-parser");
var XMLparser = require("fast-xml-parser");

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
  if (URL.get("type") === "JSON") {
    getFromXMLFile(URL);
    var serverAnswer = getFromJSONFile(URL);
    res.writeHead(200, headers);
    res.end(JSON.stringify(serverAnswer));
  }
  if (URL.get("type") === "XML") {
    var serverAnswer = getFromXMLFile(URL);
    if (serverAnswer === undefined) {
      res.writeHead(200, headers);
      res.end(JSON.stringify([]));
    } else if (!Array.isArray(serverAnswer)) {
      res.writeHead(200, headers);
      res.end(JSON.stringify([serverAnswer]));
    } else {
      res.writeHead(200, headers);
      res.end(JSON.stringify(serverAnswer));
    }
  }
}
function watchPostUrl(req, res, headers) {
  jsonParser(req, res, (err) => {
    if (err) console.log(err);
    var URL = new URLSearchParams(req.url);
    for (var i = 0; i < req.body.type.length; i++) {
      if (req.body.type[i] === "JSON") {
        var arrayFromJson = getFromJSONFile(URL, 1);
        arrayFromJson.unshift(req.body);
        fs.writeFileSync(
          `questions/questions.json`,
          JSON.stringify(arrayFromJson)
        );
      }
      if (req.body.type[i] === "XML") {
        var arrayFromXML = getFromXMLFile(URL, 1);
        if (Array.isArray(arrayFromXML)) {
          arrayFromXML.unshift(req.body);
          fs.writeFileSync(
            "questions/questions.xml",
            convertToXML(arrayFromXML)
          );
        } else {
          var newRecord = [];
          if (arrayFromXML !== undefined) {
            newRecord.push(arrayFromXML);
          }
          newRecord.unshift(req.body);
          fs.writeFileSync("questions/questions.xml", convertToXML(newRecord));
        }
      }
    }
  });
  res.writeHead(200, headers);
  res.end("done");
}
function watchDeleteUrl(req, res, headers) {
  jsonParser(req, res, (err) => {
    if (err) console.log(err);
    var URL = new URLSearchParams(req.url);
    if (URL.get("type") === "JSON") {
      var arrayFromJson = getFromJSONFile(URL, 1);
      for (var i = 0; i < arrayFromJson.length; i++) {
        if (arrayFromJson[i].date === req.body.date) {
          arrayFromJson.splice(i, 1);
        }
      }
      fs.writeFileSync(
        `questions/questions.json`,
        JSON.stringify(arrayFromJson)
      );
    }
    if (URL.get("type") === "XML") {
      var arrayFromXML = getFromXMLFile(URL, 1);
      if (!Array.isArray(arrayFromXML)) {
        if (arrayFromXML.date === req.body.date) {
          fs.writeFileSync(
            `questions/questions.xml`,
            "<questions></questions>"
          );
        }
      } else {
        for (var i = 0; i < arrayFromXML.length; i++) {
          if (arrayFromXML[i].date === req.body.date) {
            arrayFromXML.splice(i, 1);
          }
        }
        fs.writeFileSync(`questions/questions.xml`, convertToXML(arrayFromXML));
      }
    }
  });
  res.writeHead(200, headers);
  res.end("done");
}

function getFromJSONFile(URL, mode) {
  var bufferFromJsonFile = fs.readFileSync(`questions/questions.json`);
  var arrayFromJson = [];
  var parsedBuffer = JSON.parse(bufferFromJsonFile);
  if (URL.get("theme") === "ALLTHEMES" || mode === 1) {
    return parsedBuffer;
  } else {
    for (var i = 0; i < parsedBuffer.length; i++) {
      if (parsedBuffer[i].theme === URL.get("theme")) {
        arrayFromJson.push(parsedBuffer[i]);
      }
    }
  }
  return arrayFromJson;
}

function getFromXMLFile(URL, mode) {
  var bufferFromXMLFile = fs.readFileSync(`questions/questions.xml`, "utf-8");
  if (bufferFromXMLFile === "") {
    fs.writeFileSync(
      "questions/questions.xml",
      "<questions><question></question></questions>"
    );
    bufferFromXMLFile = fs.readFileSync(`questions/questions.xml`, "utf-8");
  }
  var allFromBuffer = XMLparser.parse(bufferFromXMLFile);
  var arrayFromXML = allFromBuffer.questions.question;
  var themesArrayFromXML = [];
  if (!Array.isArray(arrayFromXML)) {
    var newArray = [];
    newArray.push(arrayFromXML);
    arrayFromXML = newArray;
  }
  if (URL.get("theme") === "ALLTHEMES" || mode === 1) {
    return arrayFromXML;
  } else {
    for (var i = 0; i < arrayFromXML.length; i++) {
      if (arrayFromXML[i].theme === URL.get("theme")) {
        themesArrayFromXML.push(arrayFromXML[i]);
      }
    }
  }
  return themesArrayFromXML;
}
function convertToXML(array) {
  var result = "<questions>";

  for (var i = 0; i < array.length; i++) {
    var wrapper = "<question>";
    for (var key in array[i]) {
      if (array[i] === null) {
        continue;
      }
      wrapper += `<${key}>${array[i][key]}</${key}>`;
    }
    result += wrapper + "</question>";
  }

  result += "</questions>";
  return result;
}
