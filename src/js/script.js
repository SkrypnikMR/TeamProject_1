//import { URL, getRequest, postRequest } from "./request";
//import { renderServerDeveloperData } from "./render";


var req = new XMLHttpRequest();
req.open("GET", "http://localhost:3000/developers", false);
req.send();
var devJSON = JSON.parse(req.response);
console.log(devJSON);

function devRender(arg){
  var userCardItems = document.querySelector(".userCard__items");
  for(var i = 0; i < arg.length; i++){
    console.log(arg[i]);
    var userCardItem = document.createElement("div");
    userCardItem.classList.add("userCard__item");
    userCardItem.innerHTML = `
    <div class="userCard__edit">
    <img src="img/edit.png" alt="edit">
  </div>
  <div class="userCard__photoDev">
    <img src="img/1.jpg" alt="photoDev">
  </div>
  <h3 class="userCard__name">${arg[i].name}</h3>
  <div class="userCard__line"></div>
  <h4 class="userCard__title">ОБО МНЕ</h4>
  <div class="userCard__about">
    <div class="userCard__info">
      <p>Возраст:</p>
      <p>${arg[i].age}</p>
    </div>
    <div class="userCard__info">
      <p>Любимый цвет::</p>
      <p>${arg[i].lovely_color}</p>
    </div>
    <div class="userCard__info">
      <p>Опыт в IT:</p>
      <p>${arg[i].exp}</p>
    </div>
  </div>
  <h4 class="userCard__title">ХОББИ</h4>
  <div class="userCard__about">
    <div class="userCard__info">
      <p>${arg[i].hobby} </p>
    </div>
  </div>
  <!-- Modal form  -->
    <div class="form-user">
      <form action="" class="form-user__form">
          <h4 class="userCard__title">ОБО МНЕ</h4>
          <p>Возраст:</p>
          <input type="text" class="form-user__ageform">
          <p>Любимый цвет:</p>
          <input type="text" class="form-user__likecolor">
          <p>Опыт в IT:</p>
          <input type="text" class="form-user__it">
          <h4 class="userCard__title">ХОББИ</h4>
          <input type="text" class="form-user__hobie">
          <button class="form-user__btn" type="submit">Изменить</button>
      </form>
    </div>
  <!-- END Modal form  -->
    `;
    userCardItems.append(userCardItem);
  }
}

devRender(devJSON);

var editPen = document.querySelectorAll(".userCard__edit");
var formUser = document.querySelectorAll(".form-user");
var btnFormUser = document.querySelectorAll(".form-user__btn"); 
var inputAge = document.querySelectorAll(".form-user__ageform");


function getEditPenUser(){
  editPen.forEach(function(item, i){
    item.addEventListener("click", function(){
      formUser[i].classList.toggle("form-user-active");
      inputAge[i].value = devJSON[i].age;
      
    });
});
}


function setbtnFormUser(){
  btnFormUser.forEach(function(item,i){
    item.addEventListener("click", function(e){
       e.preventDefault();
        formUser[i].classList.toggle("form-user-active");
        devJSON[i].age = inputAge[i].value;

        var devJSON_POST = JSON.stringify({ devs : devJSON});
        POST_req(devJSON_POST);

        
        
    });
});
}
 
function POST_req(arg){
  var req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/developers", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(arg));
  req.addEventListener("load", function(){
          if(req.status === 200){
           console.log(req.response);
          }
  });
}
getEditPenUser();
setbtnFormUser();




/*if (
  window.location.pathname === "/" || // если открыта страница index
  window.location.pathname === "/index.html"
) {
  //старт страницы начинается с гет запроса по девелоперсам
  var res = false;
  getRequest(URL, "developers") //ф-ция GET
    .then(function (responce) {
      return JSON.parse(responce);
    })
    .then(function (data) {
      getDevelopers(data).then(function(){
        var editPen = document.querySelectorAll(".userCard__edit");
        var formUser = document.querySelectorAll(".form-user");
        var btnFormUser = document.querySelectorAll(".form-user__btn"); 
        editPenUser(editPen, formUser);
        
      });
      }).catch(function (error) {
      console.log(error);
    });

}

function getDevelopers(data){
  return new Promise(function(resolve, reject){
    renderServerDeveloperData(data); // Ф-ция рендера
    resolve(data);
  });
}*/
