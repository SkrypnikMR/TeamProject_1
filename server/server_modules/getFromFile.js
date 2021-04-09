var fs = require("fs");
var { json } = require("body-parser");
var XMLparser = require("fast-xml-parser");
var yamlParser = require("js-yaml");
var {parseFromCSV} = require("./convertParse");

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
function getFromCSV(URL, mode) {
  var bufferFromCSVFile = fs.readFileSync("questions/questions.csv", "utf-8");
  var arrayFromCSV = parseFromCSV(bufferFromCSVFile);
  var themesCSVArray = [];
  if (URL.get("theme") === "ALLTHEMES" || mode === 1) {
    return arrayFromCSV;
  } else {
    for (var i = 0; i < arrayFromCSV.length; i++) {
      if (arrayFromCSV[i].theme === URL.get("theme")) {
        themesCSVArray.push(arrayFromCSV[i]);
      }
    }
  }
  return themesCSVArray;
}

function getFromYaml(URL, mode) {
  var bufferFromYaml = fs.readFileSync("questions/questions.yaml", "utf-8");
  var arrayFromYaml = yamlParser.load(bufferFromYaml);
  var themesYAMLArray = [];
  if (URL.get("theme") === "ALLTHEMES" || mode === 1) {
    return arrayFromYaml;
  } else {
    for (var i = 0; i < arrayFromYaml.length; i++) {
      if (arrayFromYaml[i].theme === URL.get("theme")) {
        themesYAMLArray.push(arrayFromYaml[i]);
      }
    }
    return themesYAMLArray;
  }
}
module.exports = {
  getFromJSONFile,
  getFromXMLFile,
  getFromCSV,
  getFromYaml,
};
