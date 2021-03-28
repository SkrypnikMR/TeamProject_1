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
  var $close = document.querySelector(".close"); // нода кнопки крестика в модальном окне
  var $form = document.forms.questionForm; // нода формы
  var $questionCreateButton = document.querySelector(".questionCreateButton");
  var $formCreateButton = $form.elements[$form.length - 1]; // нода кнопки ОТПРАВИТЬ ВОПРОС
  var $formCancelButton = $form.elements[$form.length - 2]; // нода кнопки вернуться ВОПРОС

  $questionCreateButton.addEventListener("click", showModal); // прослушка клика кнопки Создания вопроса
  $close.addEventListener("click", hideModal);
  $formCreateButton.addEventListener("click", createQueston); // - слушаем клик  кнопки ОТПРАВИТЬ ВОПРОС
  $formCancelButton.addEventListener("click", hideModal);

  function createQueston(event) {
    // функция клика кнопки ОТПРАВИТЬ ВОПРОС
    event.preventDefault();
    var obj = {};
    var flag = true;
    obj[$form.elements[0].name] = $form.elements[0].value;
    obj["theme"] = $form.elements[1].value;
    obj[$form.elements[3].name] = Boolean(Number($form.elements[3].value));
    obj["stringDate"] = new Date().toDateString();
    obj["date"] = new Date().getTime();
    if (flag) {
      clear();
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

  function showModal() {
    // функция показа модального окна
    $modal.classList.remove("hide");
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
   /*  var $questionDeleteButtons = document.querySelectorAll('.questions__edit');
   добавить на все обработчики
   */
    var $questionDeleteButton = document.querySelector(".questions__edit");
    $questionDeleteButton.addEventListener("click", () => {
      var obj = {};
      obj.date = Number(
        $questionDeleteButton.parentElement.getAttribute("date")
      );
      obj.questionText =
        $questionDeleteButton.parentElement.children[1].children[0].children[1].innerHTML;
      obj.theme =
        $questionDeleteButton.parentElement.children[1].children[1].children[1].innerHTML;
      obj.answer =
        $questionDeleteButton.parentElement.children[1].children[2].children[1].innerHTML;
      obj.stringDate =
        $questionDeleteButton.parentElement.children[1].children[3].children[1].innerHTML;

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
