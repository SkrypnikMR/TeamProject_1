var $modal = document.querySelector(".modal"); // нода модального окна
var $close = document.querySelector(".close"); // нода кнопки крестика в модальном окне
var $form = document.forms.questionForm; // нода формы
var $questionCreateButton = document.querySelector(".questionCreateButton");
var $formCreateButton = $form.elements[$form.length - 1]; // нода кнопки ОТПРАВИТЬ ВОПРОС
var $formCancelButton = $form.elements[$form.length - 2]; // нода кнопки ОТПРАВИТЬ ВОПРОС
var $message = document.querySelector(".modalMessage");

var $getFromJSONButton = document.querySelector("#getFromJSONFile"); // тестовая кнопка  показа из questions.json
var $textFROMJSONFile = document.querySelector(".header__Question_result_text"); // тестовая нода отображения questions.json

var url = "http://127.0.0.1:3000/";
var request = new XMLHttpRequest();

var arrayJSON = []; //массив объектов, который пойдут в файл .JSON
var arrayXML = []; //массив объектов, который пойдут в файл .XML
var arrayYAML = []; //массив объектов, который пойдут в файл .YAML
var arrayCSV = []; //массив объектов, который пойдут в файл .CSV

$questionCreateButton.addEventListener("click", showModal); // прослушка клика кнопки Создания вопроса
$close.addEventListener("click", hideModal);
$formCreateButton.addEventListener("click", createQueston); // - слушаем клик  кнопки ОТПРАВИТЬ ВОПРОС
$formCancelButton.addEventListener("click", hideModal);
$getFromJSONButton.addEventListener("click", getFromJSONfile);

var convertedJSONArray = [];
var idGenerator = 0; // generator id начинаем с 0;

function createQueston(event) {
  // функция клика кнопки ОТПРАВИТЬ ВОПРОС
  event.preventDefault();
  var obj = {};
  var checkboxCounter = 0;
  var flag = true;
  obj.id = idGenerator; // задаём уникальное айди объекту
  for (var i = 0; i < $form.length; i++) {
    // имитация валидации
    if (
      ($form.elements[i].type === "text" && $form.elements[i].value === "") ||
      $form.elements[i].value.length > 250
    ) {
      flag = false;
      renderQuestionCreateErrorMessage(
        "Текст должен быть не пустым и не более 250 символов"
      );
      break;
    } else {
      if ($form.elements[i].type === "text") {
        // взаимодействие с инпутом
        obj[$form.elements[i].name] = $form.elements[i].value;
      }
      if ($form.elements.type === "select-one") {
        // взаимодейтвие с пыдающим список
        obj["theme"] = $form.elements[1].value;
      }
      if ($form.elements[i].type === "radio" && $form.elements[i].checked) {
        // взаимодействие с ответом
        obj[$form.elements[i].name] = Boolean(Number($form.elements[i].value));
      }
      if (
        $form.elements[i].type === "checkbox" &&
        $form.elements[i].checked === false
      ) {
        checkboxCounter++;
      }
      if (checkboxCounter === 4) {
        arrayJSON.push(obj);
      }
      if ($form.elements[i].type === "checkbox" && $form.elements[i].checked) {
        // раскидываем по массивам, в зависимости от выбранного типа
        switch ($form.elements[i].id) {
          case "CSV":
            obj.type = "CSV";
            arrayCSV.push(obj);

            break;
          case "XML":
            obj.type = "XML";
            arrayXML.push(obj);
            break;
          case "YAML":
            obj.type = "YAML";
            arrayYAML.push(obj);
            break;
          case "JSON":
            obj.type = "JSON";
            arrayJSON.push(obj);
            convertedJSONArray = convertToJSON(arrayJSON);
            break;
        }
      }
      obj["stringDate"] = new Date().toDateString();
      obj["date"] = new Date().getTime(); /*  */
    }
  }
  if (flag) {
    idGenerator++;
    clear();
    hideModal();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function () {
      //Вызывает функцию при смене состояния.
      if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
        // Запрос завершён. Здесь можно обрабатывать результат.
      }
    };
    request.send(JSON.stringify(arrayJSON));
    console.log(arrayJSON);
  }
}

function clear() {
  // функция очистки инпутов и анчекинга чекбоксов радиобатанов
  for (var i = 0; i <= $form.length - 1; i++) {
    if ($form.elements[i].type === "text") {
      $form.elements[i].value = "";
    }
    if (
      $form.elements[i].checked &&
      $form.elements[i].id !== "JSON" &&
      $form.elements[i].id !== "TRUE" &&
      $form.elements[i].id !== "FALSE"
    ) {
      $form.elements[i].checked = false;
    }
  }
}

function convertToJSON(array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result.push(JSON.stringify(array[i]));
  }
  return result;
}

function showModal() {
  // функция показа модального окна
  $modal.classList.remove("hide");
}
function hideModal() {
  // функция скрытия модального окна
  $modal.classList.add("hide");
}
window.onclick = function (event) {
  // функция закрытия модального окна, методом нажатия за его пределы
  if (event.target === $modal) {
    $modal.classList.add("hide");
  }
};

function renderQuestionCreateErrorMessage(message) {
  $message.innerHTML = '<h2 class="modalMessage">' + message + "</h2>";
}

function findDublicate(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === array[i + 1]) {
      array.slice(i);
    }
  }
  return array;
}

function getFromJSONfile() {
  request.open("GET", url + "questions.json", false);
  request.send();
  if (request.status != 200) {
    console.log(request.status + ": " + request.statusText);
  } else {
    renderToQuestionResult();
  }
}

function renderToQuestionResult() {
  var commingJSONArray = JSON.parse(request.responseText);
  for (var i = 0; i < commingJSONArray.length; i++) {
    $textFROMJSONFile.innerHTML += `
    <h1> Текст вопроса: <span>${commingJSONArray[i].qeustionText}</span></h1>
    <p> Дата: ${commingJSONArray[i].stringDate}</p>
    <p> Ответ: ${commingJSONArray[i].answer}</p>
    <p> Тип файла: ${commingJSONArray[i].type}</p>
    `;
  }
}
