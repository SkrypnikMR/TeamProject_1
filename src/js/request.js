import {renderServerDeveloperData, renderServerQuestions} from './render'

export const URL = "http://localhost:3000/"; // constant нашего пути
var request = new XMLHttpRequest();

export function getRequest(url, folder) {
  return new Promise(function (responce, reject) {
    request.open("GET", url + folder, true);
    request.addEventListener("load", function () {
      if (request.status < 400) {
        responce(request.response);
      } else reject(new Error("Request failed: " + request.statusText));
    });
    request.addEventListener("error", function () {
      reject(new Error("Network error"));
    });
    request.send();
  });
}

export function postRequest(url, folder, requestBody) {
  return new Promise(function (responce, reject) {
    var request = new XMLHttpRequest();
    request.open("POST", url + folder, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      if (request.status < 400) responce(request.responseText);
      else fail(new Error("Request failed: " + request.statusText));
    });
    request.addEventListener("error", function () {
      reject(new Error("Network error"));
    });
    request.send(JSON.stringify(requestBody));
  });
}

export function deleteRequest(url, folder, requestBody) {
  return new Promise(function (responce, reject) {
    var request = new XMLHttpRequest();
    request.open("DELETE", url + folder, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      if (request.status < 400) responce(request.responseText);
      else fail(new Error("Request failed: " + request.statusText));
    });
    request.addEventListener("error", function () {
      reject(new Error("Network error"));
    });
    request.send(JSON.stringify(requestBody));
  });
}
export function getDevelopers(data) {
  return new Promise(function (resolve, reject) {
    renderServerDeveloperData(data);
    resolve(data);
  });
}
export function getQuestions(data) {
  return new Promise(function (resolve, reject) {
    renderServerQuestions(data);
    resolve(data);
  });
}
