function convertToCSV(array) {
  if (!array || !Array.isArray(array)) {
    return false;
  }
  var result = "";
  result += `${Object.keys(array[0])} \n`;
  for (var i = 0; i < array.length; i++) {
    if (array[i].theme === undefined) {
      continue;
    }
    result += `${Object.values(array[i])} \n`;
  }
  return result;
}
function parseFromCSV(string) {
  if (typeof string !== "string") {
    return false;
  }
  string = string.split("\n");
  var result = [];
  for (var i = 1; i < string.length; i++) {
    var obj = {};
    obj[string[0].split(",")[0]] = string[i].split(",")[0];
    obj[string[0].split(",")[1]] = string[i].split(",")[1];
    obj[string[0].split(",")[2]] = Number(string[i].split(",")[2]);
    obj[string[0].split(",")[3]] = string[i].split(",")[3];
    obj[string[0].split(",")[4]] = string[i].split(",")[4];
    obj[string[0].split(",")[5].trim()] = string[i].split(",")[5];
    result.push(obj);
  }
  return result;
}
function convertToXML(array) {
  if(!array || !Array.isArray(array)){
    return false;
  }
  var result = "<questions>";
  for (var i = 0; i < array.length; i++) {
    var wrapper = "<question>";
    if (array[i] === null || array[i] === undefined) {
      continue;
    }
    for (var key in array[i]) {
      wrapper += `<${key}>${array[i][key]}</${key}>`;
    }
    result += wrapper + "</question>";
  }
  result += "</questions>";
  return result;
}
module.exports = {
  convertToCSV,
  convertToXML,
  parseFromCSV,
};
