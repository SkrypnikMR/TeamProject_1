const URL = "http://localhost:3000/";

var $buttonGet = document.querySelector(".GET");
var $buttonPost = document.querySelector(".POST");

var request = new XMLHttpRequest();

$buttonGet.addEventListener("click", buttonGetClick);
$buttonPost.addEventListener("click", buttonPostClick);

function buttonGetClick() {
  getMethod(URL, "developers");
}
function buttonPostClick() {
  postMethod(URL, "questions", { d: 1 });
}

function getMethod(url, folder) {
  // гет запрос
  request.open("GET", url + folder, false);
  request.send();
  if (request.status != 200) {
    console.log(request.status + ": " + request.statusText);
  } else {
    console.log(JSON.parse(request.responseText));
  }
}
function postMethod(url, folder, body) {
  // пост запрос
  request.open("POST", url + folder, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(body));
}
