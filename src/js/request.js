import {renderServerDeveloperData, renderServerQuestions, renderandFillDevItem} from './render'

export const URL = "http://localhost:3000/"; // constant нашего пути
var request = new XMLHttpRequest();

export function getRequest(url, folder) {
  return new Promise(function (resolve, reject) {
    request.open("GET", url + folder, true);
    request.addEventListener("load", function () {
      if (request.status < 400) {
        resolve(request.response);
      } else reject(new Error("Request failed: " + request.statusText));
    });
    request.addEventListener("error", function () {
      reject(new Error("Network error"));
    });
    request.send();
  });
}

export function postRequest(url, folder, requestBody) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("POST", url + folder, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      if (request.status < 400) resolve(request.responseText);
      else reject(new Error("Request failed: " + request.statusText));
    });
    request.addEventListener("error", function () {
      reject(new Error("Network error"));
    });
    request.send(JSON.stringify(requestBody));
  });
}

export function deleteRequest(url, folder, requestBody) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("DELETE", url + folder, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      if (request.status < 400) resolve(request.responseText);
      else reject(new Error("Request failed: " + request.statusText));
    });
    request.addEventListener("error", function () {
      reject(new Error("Network error"));
    });
    request.send(JSON.stringify(requestBody));
  });
}
export function putRequest(url, folder, requestBody) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("PUT", url + folder, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      if (request.status < 400) resolve(request.responseText);
      else reject(new Error("Request failed: " + request.statusText));
    });
    request.addEventListener("error", function () {
      reject(new Error("Network error"));
    });
    request.send(JSON.stringify(requestBody));
  });
}
export function getDevelopers(data, $developers) {
  return new Promise(function (resolve, reject) {
    renderServerDeveloperData(data, $developers, renderandFillDevItem);
    resolve(data);
  });
}
export function getQuestions(data) {
  return new Promise(function (resolve, reject) {
    renderServerQuestions(data);
    resolve(data);
  });
}
