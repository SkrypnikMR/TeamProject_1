import {
  renderServerDeveloperData,
  renderServerQuestions,
  renderNoQuestions,
} from "./render";

export const URL = "http://localhost:3000/"; // constant нашего пути
var request = new XMLHttpRequest();
export function getRequest(url, folder) {
  // запрос гет

  /* //синхронный запрос, так не делай
   request.open("GET", url + folder, false);
  request.send();
  if (request.status != 200) {
    console.log(request.status + ": " + request.statusText);
  } else {
    return JSON.parse(request.responseText);
  } */

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
export function postRequest(url, folder, body) {
  // запрос пост
  request.open("POST", url + folder, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(body));
}

if (
  window.location.pathname === "/" || // если открыта страница index
  window.location.pathname === "/index.html"
) {
  getRequest(URL, "developers")
    .then(function (responce) {
      return JSON.parse(responce);
    })
    .then(function (data) {
      renderServerDeveloperData(data);
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });

  // результат из developers.json записываем в переменую
  // отрисовываем данные (смотри render.js какой функцией)
}
if (window.location.pathname === "/questions.html") {
  renderNoQuestions();
  getRequest(URL, "questions")
    .then(function (responce) {
      return JSON.parse(responce);
    })
    .then(function (data) {
      renderServerQuestions(data);
    })
    .catch(function (error) {
      console.log(error);

    });

  /*  это старый синхронный запрос 
  var questions = getRequest(URL, "questions");
  if (questions.length <= 0) {
    renderNoQuestions(questions);
  }
  if (questions.length > 0) {
    renderServerQuestions(questions);
  }*/
}
