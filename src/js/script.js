import {
  getRequest,
  putRequest,
  URL,
  getQuestions,
  getDevelopers,
} from "./request";
import { rerenderElement } from "./render";
var path = window.location.pathname;
if (path === "/index.html" || path === "/") {
  getRenderListen();
}

function getRenderListen() {
  getRequest(URL, "developers")
    .then(function (responce) {
      return JSON.parse(responce);
    })
    .then(function (data) {
      getDevelopers(data).then(function () {
        listenEditButtons();
      });
    });
}

function listenEditButtons() {
  var $userCards = document.querySelector(".userCard__items");
  var $modalCard = document.querySelectorAll(".form-user");
  var $editButtons = document.querySelectorAll(".userCard__edit"); // nodelist кнопок edit
  var $modalButtons = document.querySelectorAll(".form-user__btn");
  for (var i = 0; i < $editButtons.length; i++) {
    if(i === 4 || i === 5){
      continue;
    }
    $editButtons[i].addEventListener("click", cardEditPen);
  }
  for (var i = 0; i < $modalButtons.length; i++) {
    $modalButtons[i].addEventListener("click", changeInfo);
  }
  window.addEventListener("keydown", function (event) {
    if (event.code === "Escape") {
      for (var i = 0; i < $modalCard.length; i++) {
        $modalCard[i].classList.remove("form-user-active");
        $modalCard[i].classList.remove("blockOpacity");
        clearInputs($modalCard[i]);
      }
    }
  });
}

function cardEditPen(event) {
  event.preventDefault();
  var $modalCardWindow = event.target.parentElement.parentElement.children[8];
  $modalCardWindow.classList.add("form-user-active");
  $modalCardWindow.classList.add("blockOpacity");
}

function changeInfo(event) {
  event.preventDefault();
  var $modalCardWindow = event.target.parentElement.parentElement;
  var $devCard = $modalCardWindow.parentElement;
  var $name = $modalCardWindow.querySelector(".userCard__title").textContent;
  var $inputAge = $modalCardWindow.querySelector(".form-user__ageform");
  var $inputColor = $modalCardWindow.querySelector(".form-user__likecolor");
  var $inputExp = $modalCardWindow.querySelector(".form-user__it");
  var $inputHobbie = $modalCardWindow.querySelector(".form-user__hobbie");
  var $avatar = $devCard.querySelector(".userCard__avatar").getAttribute("src");
  var obj = {
    name: $name,
    age: $inputAge.value || $inputAge.placeholder,
    lovely_color: $inputColor.value || $inputColor.placeholder,
    exp: $inputExp.value || $inputExp.placeholder,
    hobbie: $inputHobbie.value || $inputHobbie.placeholder,
    avatar: $avatar,
  };
  putRequest(URL, "developers", obj)
    .then(function (data) {
      data = JSON.parse(data);
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === $name) {
          rerenderElement(event, data[i]);
        }
      }
    })
    .then(function () {
      clearInputs($modalCardWindow);
      $modalCardWindow.classList.remove("form-user-active");
      $modalCardWindow.classList.remove("blockOpacity");
    });
}

function clearInputs($node) {
  var $inputAge = $node.querySelector(".form-user__ageform");
  var $inputColor = $node.querySelector(".form-user__likecolor");
  var $inputExp = $node.querySelector(".form-user__it");
  var $inputHobbie = $node.querySelector(".form-user__hobbie");
  $inputAge.value = "";
  $inputColor.value = "";
  $inputExp.value = "";
  $inputHobbie.value = "";
}
