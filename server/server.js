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
  /* функция распределяющая распределяющая что делать, 
  при определенное варианте запроса */
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
  /* функция отвечающая за обработку get запросов, 
  смотря на query параметры, которые пришли в запросе */
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
  /*    функция, отвечающая за обработку get запросов, 
  логика которой повязана на количестве типов, приехавших в объекте, 
  если выбран не 1 тип вопроса - запишет во все, которые нужно */
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
  /* Функция логики обработки delete запросов, основная на сравнении questions.date
  При совпадении - объект будет удален из файла, файл перезапишется */
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
  /* Фунция чтения из файла JSON и фильтрации его, 
  если нужно по темам, которые приходят в query параметрах */
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
  /* Фунция чтения из файла XML и фильтрации его, 
  если нужно по темам, которые приходят в query параметрах */
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
function convertToCSV(array) {
  var result = "";
  result += ${Object.keys(array[0])} \n;
  for (var i = 0; i < array.length; i++) {
    if (array[i].theme === undefined) {
      continue;
    }
    result += ${Object.values(array[i])} \n;
  }

  return result;
}
function parseFromCSV(string) {
  string = string.split("\n");
  var result = [];
  for (var i = 1; i < string.length; i++) {
    var obj = {};
    obj[string[0].split(",")[0]] = string[i].split(",")[0];
    obj[string[0].split(",")[1]] = string[i].split(",")[1];
    obj[string[0].split(",")[2]] = Number(string[i].split(",")[2]);
    obj[string[0].split(",")[3]] = string[i].split(",")[3];
    obj[string[0].split(",")[4]] = string[i].split(",")[4];
    obj[string[0].split(",")[5].trim()] = Boolean(string[i].split(",")[5]);
    result.push(obj);
  }
  return result;
}