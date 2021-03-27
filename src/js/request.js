import { renderServerDeveloperData, renderServerQuestions, renderNoQuestions } from "./render";

export const URL = "http://localhost:3000/"; // constant нашего пути
var request = new XMLHttpRequest();
export function getRequest(url, folder) {
  // запрос гет
  // гет запрос
  request.open("GET", url + folder, false);
  request.send();
  if (request.status != 200) {
    console.log(request.status + ": " + request.statusText);
  } else {
    return JSON.parse(request.responseText);
  }
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
  var developers = getRequest(URL, "developers"); // результат из developers.json записываем в переменую
  renderServerDeveloperData(developers); // отрисовываем данные (смотри render.js какой функцией)
}
if(window.location.pathname === "/questions.html"){
  
  var questions = getRequest(URL, "questions");
  if(questions.length <= 0){
    renderNoQuestions(questions);
  }
  if(questions.length > 0){
    renderServerQuestions(questions);
  }
}


//  