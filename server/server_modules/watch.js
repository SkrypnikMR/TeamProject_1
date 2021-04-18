var fs = require("fs");
var YAML = require("json-to-pretty-yaml");
var {
  getFromJSONFile,
  getFromXMLFile,
  getFromCSV,
  getFromYaml,
} = require("./getFromFile");
var { convertToCSV, convertToXML } = require("./convertParse");
var functionParams = {
  getFromJSONFile,
  getFromXMLFile,
  getFromCSV,
  getFromYaml,
};
var functionsConverters = {
  convertToXML,
  convertToCSV,
};
function watchMethodAndUrl(
  req,
  res,
  headers,
  watchGetUrl,
  watchPostUrl,
  watchDeleteUrl,
  watchPutUrl
) {
  /* функция распределяющая распределяющая что делать, 
    при определенное варианте запроса */
  if (req.method === "GET") {
    watchGetUrl(req, res, headers, functionParams);
  } else if (req.method === "POST") {
    watchPostUrl(req, res, headers, functionParams, functionsConverters);
  } else if (req.method === "DELETE") {
    watchDeleteUrl(req, res, headers, functionParams, functionsConverters);
  } else if (req.method === "PUT") {
    watchPutUrl(req, res, headers);
  } else if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }
}
function watchGetUrl(req, res, headers, functionParams) {
  /* функция отвечающая за обработку get запросов, 
    смотря на query параметры, которые пришли в запросе */
  if (req.url === "/developers") {
    var serverAnswer = fs.readFileSync("developers/developers.json", "utf-8");
    res.writeHead(200, headers);
    res.end(serverAnswer);
    return;
  }
  var URL = new URLSearchParams(req.url);
  if (URL.get("type") === "JSON") {
    var serverAnswer = functionParams.getFromJSONFile(URL);
    res.writeHead(200, headers);
    res.end(JSON.stringify(serverAnswer));
    return;
  }
  if (URL.get("type") === "XML") {
    var serverAnswer = functionParams.getFromXMLFile(URL);
    if (serverAnswer === undefined) {
      res.writeHead(200, headers);
      res.end(JSON.stringify([]));
      return;
    } else if (!Array.isArray(serverAnswer)) {
      res.writeHead(200, headers);
      res.end(JSON.stringify([serverAnswer]));
      return;
    } else {
      res.writeHead(200, headers);
      res.end(JSON.stringify(serverAnswer));
      return;
    }
  }
  if (URL.get("type") === "CSV") {
    var serverAnswer = functionParams.getFromCSV(URL);
    res.writeHead(200, headers);
    res.end(JSON.stringify(serverAnswer));
    return;
  }
  if (URL.get("type") === "YAML") {
    var serverAnswer = functionParams.getFromYaml(URL);
    res.writeHead(200, headers);
    res.end(JSON.stringify(serverAnswer));
    return;
  }
}
function watchPostUrl(req, res, headers, functionParams, functionsConverters) {
  /*    функция, отвечающая за обработку get запросов, 
    логика которой повязана на количестве типов, приехавших в объекте, 
    если выбран не 1 тип вопроса - запишет во все, которые нужно */
  var URL = new URLSearchParams(req.url);
  for (var i = 0; i < req.body.type.length; i++) {
    if (req.body.type[i] === "JSON") {
      var arrayFromJson = functionParams.getFromJSONFile(URL, 1);
      arrayFromJson.unshift(req.body);
      fs.writeFileSync(
        `questions/questions.json`,
        JSON.stringify(arrayFromJson)
      );
      continue;
    }
    if (req.body.type[i] === "XML") {
      var arrayFromXML = functionParams.getFromXMLFile(URL, 1);
      if (arrayFromXML[0] === "" || arrayFromXML[0] === undefined) {
        var newArrayFromXML = [];
        newArrayFromXML.unshift(req.body);
        fs.writeFileSync(
          "questions/questions.xml",
          functionsConverters.convertToXML(newArrayFromXML)
        );
        continue;
      } else arrayFromXML.unshift(req.body);
      fs.writeFileSync(
        "questions/questions.xml",
        functionsConverters.convertToXML(arrayFromXML)
      );
      continue;
    }
    if (req.body.type[i] === "YAML") {
      var arrayFromYAML = functionParams.getFromYaml(URL, 1);
      arrayFromYAML.unshift(req.body);
      fs.writeFileSync(
        "questions/questions.yaml",
        YAML.stringify(arrayFromYAML)
      );
      continue;
    }
    if (req.body.type[i] === "CSV") {
      req.body.type = "CSV";
      var arrayFromCSV = functionParams.getFromCSV(URL, 1);
      arrayFromCSV.unshift(req.body);
      fs.writeFileSync(
        "questions/questions.csv",
        functionsConverters.convertToCSV(arrayFromCSV)
      );
      continue;
    }
  }
  res.writeHead(200, headers);
  res.end("done");
}
function watchDeleteUrl(
  req,
  res,
  headers,
  functionParams,
  functionsConverters
) {
  /* Функция логики обработки delete запросов, основная на сравнении questions.date
    При совпадении - объект будет удален из файла, файл перезапишется */
  var URL = new URLSearchParams(req.url);
  if (URL.get("type") === "JSON") {
    var arrayFromJson = functionParams.getFromJSONFile(URL, 1);
    for (var i = 0; i < arrayFromJson.length; i++) {
      if (arrayFromJson[i].date === req.body.date) {
        arrayFromJson.splice(i, 1);
      }
    }
    fs.writeFileSync(`questions/questions.json`, JSON.stringify(arrayFromJson));
  }
  if (URL.get("type") === "XML") {
    var XML = functionParams.getFromXMLFile(URL, 1);
    for (var i = 0; i < XML.length; i++) {
      if (XML[i]) {
        if (XML[i].date === req.body.date) {
          XML.splice(i, 1);
        }
      }
    }
    fs.writeFileSync(
      "questions/questions.xml",
      functionsConverters.convertToXML(XML)
    );
  }
  if (URL.get("type") === "YAML") {
    var arrayFromYAML = functionParams.getFromYaml(URL, 1);
    for (var i = 0; i < arrayFromYAML.length; i++) {
      if (arrayFromYAML[i].date === req.body.date) {
        arrayFromYAML.splice(i, 1);
      }
    }
    fs.writeFileSync(`questions/questions.yaml`, YAML.stringify(arrayFromYAML));
  }
  if (URL.get("type") === "CSV") {
    var arrayFromCSV = functionParams.getFromCSV(URL, 1);
    for (var i = 0; i < arrayFromCSV.length; i++) {
      if (arrayFromCSV[i].date === req.body.date) {
        arrayFromCSV.splice(i, 1);
      }
    }
    fs.writeFileSync(
      `questions/questions.csv`,
      functionsConverters.convertToCSV(arrayFromCSV)
    );
  }
  res.writeHead(200, headers);
  res.end("done");
}
function watchPutUrl(req, res, headers) {
  if (req.url === "/developers") {
    var devBuff = fs.readFileSync("developers/developers.json", "utf-8");
    var devArray = JSON.parse(devBuff);
    for (var i = 0; i < devArray.length; i++) {
      if (req.body.name === devArray[i].name) {
        devArray[i].name = req.body.name;
        devArray[i].age = req.body.age;
        devArray[i].lovely_color = req.body.lovely_color;
        devArray[i].exp = req.body.exp;
        devArray[i].hobbie = req.body.hobbie;
        devArray[i].avatar = req.body.avatar;
      }
    }
    fs.writeFileSync("developers/developers.json", JSON.stringify(devArray));
    res.writeHead(200, headers);
    res.end(JSON.stringify(devArray));
  } else {
    //можно допилить логику к изменениям вопросов
  }
}

module.exports = {
  watchMethodAndUrl,
  watchGetUrl,
  watchPostUrl,
  watchDeleteUrl,
  watchPutUrl,
};
