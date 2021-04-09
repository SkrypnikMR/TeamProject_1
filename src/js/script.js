var devJSON;

function GETreq(){
  if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    var req = new XMLHttpRequest();
    req.open("GET", "http://localhost:3000/developers", false);
    req.send();
    devJSON = JSON.parse(req.response);
    devRender(devJSON);
    console.log(devJSON);
}
}

GETreq();

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
          <p class="form-user__name">sss</p>
          <h4 class="form-user__title">ОБО МНЕ</h4>
          <p class="form-user__descr">Возраст:</p>
          <input type="text" class="form-user__ageform form-user_input">
          <p class="form-user__descr">Любимый цвет:</p>
          <input type="text" class="form-user__likecolor form-user_input">
          <p class="form-user__descr">Опыт в IT:</p>
          <input type="text" class="form-user__it form-user_input">
          <h4 class="form-user__title">ХОББИ</h4>
          <textarea class="form-user__hobie form-user_input"></textarea>
          <div class="form-user__btn">
            <button class="form-user__change">Изменить</button>
            <button class="form-user__cancel">Отмена</button>
          </div>
    
      </form>
    </div>
  <!-- END Modal form  -->
    `;
    userCardItems.append(userCardItem);
  }
}

//devRender(devJSON);

var editPen = document.querySelectorAll(".userCard__edit");
var formUser = document.querySelectorAll(".form-user");
var btnFormUser = document.querySelectorAll(".form-user__change"); 
var btnFormUserCancel = document.querySelectorAll(".form-user__cancel");
var inputAge = document.querySelectorAll(".form-user__ageform");
var inputLikecolor = document.querySelectorAll(".form-user__likecolor");
var inputIt = document.querySelectorAll(".form-user__it");
var inputHobby = document.querySelectorAll(".form-user__hobie");
var userName = document.querySelectorAll(".form-user__name");



function getEditPenUser(){
  editPen.forEach(function(item, i){
    item.addEventListener("click", function(){
      userName[i].innerHTML = devJSON[i].name;
      formUser[i].classList.add("blockOpacity");
      formUser[i].classList.toggle("form-user-active");
      inputAge[i].value = devJSON[i].age;
      inputLikecolor[i].value = devJSON[i].lovely_color;
      inputIt[i].value = devJSON[i].exp;
      inputHobby[i].value = devJSON[i].hobby;
      
    });
});
}


function setbtnFormUser(){
  btnFormUser.forEach(function(item,i){
    item.addEventListener("click", function(e){
        e.preventDefault();
        formUser[i].classList.toggle("form-user-active");
        devJSON[i].age = inputAge[i].value;
        devJSON[i].lovely_color =  inputLikecolor[i].value;
        devJSON[i].exp = inputIt[i].value;
        devJSON[i].hobby = inputHobby[i].value;
        var devJSON_POST = { devs : devJSON};
        POST_req(devJSON_POST).then(function(){
          /*console.log("!!!!!");
          GETreq();*/
          devRender(devJSON);
        });
    });
});
}




btnFormUserCancel.forEach(function(item, i){
  item.addEventListener("click", function(e){
    e.preventDefault();
    formUser[i].classList.toggle("form-user-active");
  });
});
 
/*function POST_req(arg){
  var req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/developers", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(arg));
  req.addEventListener("load", function(){
          if(req.status === 200){
           console.log(req.response);
          }
  });
}*/

function POST_req(arg){
  return new Promise(function(responce, reject){
    var req = new XMLHttpRequest();
    req.open("POST", "http://localhost:3000/developers", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(arg));
    req.addEventListener("load", function(){
        if(req.status === 200){
          responce(req.response);
        }
  });
  }); 
}


getEditPenUser();
setbtnFormUser();
