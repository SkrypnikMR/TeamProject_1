import { getRequest, postRequest, deleteRequest, URL } from "./request";
import { renderServerQuestions, renderNoQuestions } from "./render";

if (window.location.pathname === "/questions.html") {
  renderNoQuestions();
  getRequest(URL, "questions")
    .then(function (responce) {
      return JSON.parse(responce);
    })
    .then(function (data) {
      renderServerQuestions(data);
      listenDeleteButtons();
    })
    .catch(function (error) {
      console.log(error);
      renderNoQuestions();
    });
  var $modal = document.querySelector(".modal"); // нода модального окна
  var $closeX = document.querySelector(".close"); // нода кнопки крестика в модальном окне
  var $questionCreateButton = document.querySelector(".questionCreateButton");

  $questionCreateButton.addEventListener("click", showModal); // прослушка клика кнопки Создания вопроса
  $closeX.addEventListener("click", hideModal);

  function showModal() {
    $modal.classList.remove("hide");
    var $formCreateButton = document.querySelector(".questionCreate"); // нода кнопки ОТПРАВИТЬ ВОПРОС
    /*   $formCancelButton.addEventListener("click", hideModal); // нода кнопки вернуться */
    $formCreateButton.addEventListener("click", createQueston);
    function createQueston(event) {
      // функция клика кнопки ОТПРАВИТЬ ВОПРОС
      event.preventDefault();
      var $questionForm = document.querySelector(".questionForm");
      var $text = document.querySelector(".question");
      var $theme = document.querySelector(".theme");
      var $questionAnswer = document.querySelector(".questionAnswer");
      var $questionType = document.querySelector(".questionType");
      errorText("Напишите текст вопроса");
      var flag = formTextValidation($text) && answerValidation();
      var obj = {};
      obj["questionText"] = $text.value;
      obj["theme"] = $theme.value;
      obj["date"] = new Date().getTime();
      obj[
        "stringDate"
      ] = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
      obj["type"] = checkType();
      obj["answer"] = checkAnswer();

      if (flag) {
        clearModal();
        hideModal();
        postRequest(URL, "questions", obj).then(function () {
          getRequest(URL, "questions")
            .then(function (responce) {
              return JSON.parse(responce);
            })
            .then(function (data) {
              renderServerQuestions(data);
              listenDeleteButtons();
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      }
    }
  }

  function checkAnswer() {
    // проверяем какая из кнопок чекнута
    var $trueRadio = document.querySelector(".TRUERadio");
    var $falseRadio = document.querySelector(".FALSERadio");

    if ($trueRadio.checked) {
      return true;
    } else return false;
  }

  function checkType() {
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

  function answerValidation() {
    var $trueRadio = document.querySelector(".TRUERadio");
    var $falseRadio = document.querySelector(".FALSERadio");
    if ($trueRadio.checked || $falseRadio.checked) {
      return true;
    } else {
      errorText("Выберите вариант ответа!");
      return false;
    }
  }

  function formTextValidation($node) {
    // валидируем форму, не должен быть пустой
    var $text = document.querySelector(".question");
    if ($node.isEqualNode($text)) {
      if ($node.value === "") {
        errorText("Напишите текст вопроса");
        return false;
      }
    }
    return true;
  }

  function errorText(errorText) {
    // отрисовка текста ошибки в modalHead
    var $modalMessage = document.querySelector(".modalMessage");
    return ($modalMessage.textContent = errorText);
  }
  function clearModal() {
    // функция очистки инпутов и анчекинга чекбоксов радиобатанов
    var $text = document.querySelector(".question");
    var $trueRadio = document.querySelector(".TRUERadio");
    var $falseRadio = document.querySelector(".FALSERadio");
    var $JSON = document.querySelector(".question__type-JSON");
    var $XML = document.querySelector(".question__type-XML");
    var $YAML = document.querySelector(".question__type-YAML");
    var $CSV = document.querySelector(".question__type-CSV");
    $text.value = "";
    $trueRadio.checked = false;
    $falseRadio.checked = false;
    $JSON.checked = false;
    $XML.checked = false;
    $YAML.checked = false;
    $CSV.checked = false;
  }
  function hideModal() {
    // функция скрытия модального окна
    $modal.classList.add("hide");
  }
  window.onclick = function (event) {
    // модальное окно закрыть за пределеами модального окна
    if ($modal) {
      if (event.target === $modal) {
        $modal.classList.add("hide");
      }
    }
  };
  function listenDeleteButtons() {
    /*     var $questionDeleteButton = document.querySelector(".questions__edit"); */

    var $questionDeleteButtons = document.querySelectorAll(".questions__edit");
    /* добавить на все обработчики */
    console.log();
    for (var i = 0; i < $questionDeleteButtons.length; i++) {
      $questionDeleteButtons[i].addEventListener("click", (event) => {
        var obj = {};
        obj.date = Number(
          event.target.parentElement.parentElement.getAttribute("date")
        );
        deleteRequest(URL, "questions", obj).then(function () {
          getRequest(URL, "questions")
            .then(function (responce) {
              return JSON.parse(responce);
            })
            .then(function (data) {
              renderServerQuestions(data);
              listenDeleteButtons();
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      });
    }
  }
}
