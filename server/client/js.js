

var $button1 = document.querySelector(".btn1");
var $button2 = document.querySelector(".btn2");
var $input = document.querySelector(".inp");
let url = "http://127.0.0.1:3000/";
var request = new XMLHttpRequest();

$button1.addEventListener("click", (event) => {
  event.preventDefault();
  request.open("GET", url + "questions.json", false);
  request.send();


  if (request.status != 200) {
    console.log(request.status + ": " + request.statusText);
  } else {
    console.log(JSON.parse(request.responseText));
  }
});
$button2.addEventListener("click", () => {
  var obj = {
    theme: "theme",
    date: new Date().toString(),
    text: "question post",
    answer: "true",
  };
  var array = [obj, obj, obj];
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json");
  request.onreadystatechange = function () {
    //Вызывает функцию при смене состояния.
    if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
      // Запрос завершён. Здесь можно обрабатывать результат.
    }
  };
  console.log(array);
  request.send(JSON.stringify(array));
});
