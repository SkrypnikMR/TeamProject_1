import { getRequest, postRequest, URL } from "./request";
import { renderServerQuestions } from "./render";

if (window.location.pathname === "/questions.html") {
  var $close = document.querySelector(".close"); // нода кнопки крестика в модальном окне
  var $form = document.forms.questionForm; // нода формы
  var $questionCreateButton = document.querySelector(".questionCreateButton");
  var $formCreateButton = $form.elements[$form.length - 1]; // нода кнопки ОТПРАВИТЬ ВОПРОС
  var $formCancelButton = $form.elements[$form.length - 2]; // нода кнопки ОТПРАВИТЬ ВОПРОС
  var $message = document.querySelector(".modalMessage");

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
    obj["date"] = new Date().getTime(); /*  */
    if (flag) {
      console.log(obj);
      idGenerator++;
      clear();
      hideModal();
      postRequest(URL, "questions", obj);
      var refresh = getRequest(URL, "questions");
      renderServerQuestions(refresh);
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

  function renderQuestionCreateErrorMessage(message) {
    $message.innerHTML = '<h2 class="modalMessage">' + message + "</h2>";
  }
} 
