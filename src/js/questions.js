import {
  getRequest,
  postRequest,
  deleteRequest,
  URL,
  getQuestions,
} from "./request";
import { renderNoQuestions } from "./render";
if (window.location.pathname === "/questions.html") {
  // всё что происходит, когда мы запукаем страницу questions.html
  var $typeSelect = document.querySelector(".header__filter-type"); // нода фильтра типа;
  var $themeSelect = document.querySelector(".header__filter-theme"); 
  var $modalMessage = document.querySelector(".modalMessage"); // нода фильтра темы;
  $typeSelect.value = localStorage.getItem("type") || $typeSelect.value; // пулучаем value из локалстореджа, если его нет , то value = себе
  localStorage.setItem("type", $typeSelect.value); // cетим в локал сторедж, нужно для первого запуска приложения, пока нет ничего в localStorage.
  $themeSelect.value = localStorage.getItem("theme") || $themeSelect.value; // пулучаем value из локалстореджа, если его нет , то value = себе
  localStorage.setItem("theme", $themeSelect.value); // cетим в локал сторедж, нужно для первого запуска приложения, пока нет ничего в localStorage.
  listenTypeSelect($typeSelect, getAndRender); // Добавляем слушателя селекту типов
  listenThemeSelect($themeSelect, getAndRender); // Добавляем слушателя селекту тем
  getAndRender(); // сделали гет запрос и отрисовали

  var $modal = document.querySelector(".modal"); // нода модального окна
  var $modalDelete = document.querySelector(".modalDeleteConfirmation"); //нода модалки на удаление вопроса
  var $closeX = document.querySelector(".close"); // нода кнопки крестика в модальном окне
  var $questionCreateButton = document.querySelector(".questionCreateButton");
  $questionCreateButton.addEventListener("click", showModal); // прослушка клика кнопки Создания вопроса
  $closeX.addEventListener("click", function(event){
    hideModal($modal,clearModal)
  }); // слушатель у крестика модального окна
  window.onclick = function (event) {
    // модальное окно закрыть за пределеами модального окна
    if ($modal) {
      if (event.target === $modal) {
        hideModal($modal, clearModal);
      }
    }
  };
}
export function showModal() {
  var $modal = document.querySelector(".modal"); // нода модального окна
  $modal.classList.remove("hide");
  var $formCreateButton = document.querySelector(".questionCreate"); // нода кнопки ОТПРАВИТЬ ВОПРОС
  var $formCancelButton = document.querySelector(".questionCancel"); //нода кнопки cancel в модалке
  $formCancelButton.addEventListener("click", cancelQuestion);
  $formCreateButton.addEventListener("click", createQueston);
  function createQueston(event) {
    // функция клика кнопки ОТПРАВИТЬ ВОПРОС
    event.preventDefault();

    var $text = document.querySelector(".question");
    var $theme = document.querySelector(".theme");
    var flag = formTextValidation($text, errorText) && answerValidation(errorText); // в флаг запимсываем значение вернувшееся после выполнения валидации

    // создаем объект, который будет отправлять на сервер
    var objDate = new Date();
    var obj = {};
    obj["questionText"] = $text.value;
    obj["theme"] = $theme.value;
    obj["date"] = objDate.getTime();
    obj[
      "stringDate"
    ] = `${objDate.toLocaleDateString()} | ${objDate.toLocaleTimeString()}`;
    obj["type"] = checkType();
    obj["answer"] = checkAnswer();
    //если прошла валидаци - нас пустет в иф
    if (flag) {
      hideModal( $modal, clearModal);
      postRequest(URL, `?questions&type=${$typeSelect.value}`, obj).then(
        function () {
          getAndRender();
        }
      );
    }
  }
  function cancelQuestion(event) {
    event.preventDefault();
    hideModal($modal, clearModal);
  }
}

export function checkAnswer() {
  // проверяем какая из кнопок чекнута
  var $trueRadio = document.querySelector(".TRUERadio");

  if ($trueRadio.checked) {
    return true;
  } else return false;
}

export function checkType() {
  // проверяем какой из типов выбран и записываем его в массив типов, если не выбрано ничего - выбираем JSON
  var JSON = document.querySelector(".question__type-JSON");
  var XML = document.querySelector(".question__type-XML");
  var YAML = document.querySelector(".question__type-YAML");
  var CSV = document.querySelector(".question__type-CSV");

  var result = [];

  if (JSON.checked) {
    result.push("JSON");
  }
  if (XML.checked) {
    result.push("XML");
  }
  if (YAML.checked) {
    result.push("YAML");
  }
  if (CSV.checked) {
    result.push("CSV");
  }
  if (!JSON.checked && !XML.checked && !YAML.checked && !CSV.checked) {
    result.push("JSON");
  }
  return result;
}

export function answerValidation(errorText) {
  //валидация ответов, они должны быть выбраны!
  var $trueRadio = document.querySelector(".TRUERadio");
  var $falseRadio = document.querySelector(".FALSERadio");
  if ($trueRadio.checked || $falseRadio.checked) {
    return true;
  } else {
    errorText("Choose an answer!", $modalMessage);
    return false;
  }
}

export function formTextValidation($node, errorText) {
  // валидируем форму, не должен быть пустой
    if ($node.value === "") {
      errorText("Please write the text of the question", $modalMessage);
      return false;
    }
    if ($node.value.length > 250) {
      errorText("The question should not be more than 250 characters", $modalMessage);
      return false;
    }
  return true;
}

export function errorText(textError, $node) {
  // отрисовка текста ошибки в modalHead
  $node.textContent = textError
}
export function clearModal() {
  // функция очистки инпутов и анчекинга чекбоксов радиобатанов
  var $text = document.querySelector(".question");
  var $trueRadio = document.querySelector(".TRUERadio");
  var $falseRadio = document.querySelector(".FALSERadio");
  var $JSON = document.querySelector(".question__type-JSON");
  var $XML = document.querySelector(".question__type-XML");
  var $YAML = document.querySelector(".question__type-YAML");
  var $CSV = document.querySelector(".question__type-CSV");
  var $theme =  document.querySelector(".theme");
  var $modalMessage = document.querySelector(".modalMessage");
  $modalMessage.textContent = 'Your question';
  $theme.value = "HTML";
  $text.value = "";
  $trueRadio.checked = false;
  $falseRadio.checked = false;
  $JSON.checked = false;
  $XML.checked = false;
  $YAML.checked = false;
  $CSV.checked = false;
}
export function hideModal($modal, clearModal) {
  // функция скрытия модального окна
  $modal.classList.add("hide");
  clearModal();
}
// console.log($modal.classList)
var objDelete = {}; //инициализация объекта для удаления
export function listenDeleteButtons() {
  var $questionDeleteButtons = document.querySelectorAll(".questions__edit");
  /* добавить на все обработчики */
  for (var i = 0; i < $questionDeleteButtons.length; i++) {
    $questionDeleteButtons[i].addEventListener("click", function (event) {
      //добавляем в объект ключи date and type
      objDelete.date = Number(
        event.target.parentElement.parentElement.getAttribute("date")
      );
      objDelete.type = event.target.parentElement.parentElement
        .getAttribute("type")
        .split(",");
      //вызываем функцию показа модалки
      showDeleteModal();
    });
  }
}
export function showDeleteModal() {
    $modalDelete.classList.remove("hide");
    var $confirmButton = document.querySelector(".confirmButton"); // нода кнопки confirm
    var $cancelButton = document.querySelector(".cancelButton"); // нода кнопки cancel
    $confirmButton.addEventListener("click", deleteConfirm); // слушатель кнопки confirm
    $cancelButton.addEventListener("click",function(){
      hideDeleteModal($modalDelete)
    } ); // слушатель кнопки cancel
}
// console.log($modalDelete.classList)
 //в deleteConfirm в deleteRequest передаем objDelete и перерендериваем страницу и прячем модалку
  
export function deleteConfirm() {
  deleteRequest(URL, `?questions&type=${$typeSelect.value}`, objDelete).then(
    function () {
      getAndRender();
    }
  );
  hideDeleteModal($modalDelete);
}

export function hideDeleteModal($modalDelete) {
  $modalDelete.classList.add("hide");
}
export function listenTypeSelect($node, cb) {
  $node.addEventListener("change", function(){
    typeSelectGetRequest($node, cb)
  });
}
export function listenThemeSelect($node, cb) {
  $node.addEventListener("change", function (){
    themeSelectGetRequest($node, cb)
})
}
export function themeSelectGetRequest($node, cb) {
  localStorage.setItem("theme", `${$node.value}`);
  cb();
}
export function typeSelectGetRequest($node, cb) {
  localStorage.setItem("type", `${$node.value}`);
  cb();
}
export function getAndRender() {
  var $typeSelect = document.querySelector(".header__filter-type");
  var $themeSelect = document.querySelector(".header__filter-theme");
  getRequest(
    URL,
    `?questions&type=${$typeSelect.value}&theme=${$themeSelect.value}`
  ) // запрос на получение данных из нужного файла
    .then(function (responce) {
      return JSON.parse(responce);
    })
    .then(function (data) {
      if (data.length === 0) {
        // если файл пустой - отрисует страницу без вопросов
        renderNoQuestions($questionsItems);
      } else {
        getQuestions(data).then(function () {
          listenDeleteButtons();
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      // отлавливаем ошибки в промисе, если она будет - отрисует нет вопросов *____ в дальнейшем можно отрисовывать страницу ошибка сервера*
      renderNoQuestions($questionsItems);
    });
}