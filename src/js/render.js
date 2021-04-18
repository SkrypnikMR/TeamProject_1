export function renderServerDeveloperData(serverData, $developers, cb) {
  if (!serverData || !$developers || !cb | (serverData.length < 1)) {
    return false;
  }
  for (var i = 0; i <= serverData.length; i++) {
    cb($developers, serverData, i); // вызываем функцию отрисовки итема, столько раз, скольк нам приехало объектов
  }
  return true;
}
export function renderandFillDevItem($node, serverData, i) {
  if (!$node || !serverData || !i) {
    return false;
  }
  // фукнция отрисовки одного итема на странице index.html
  $node.innerHTML += `<div class="userCard__item">
        <div class="userCard__edit">
          <img src="img/edit.png" alt="edit">
        </div>
        <div class="userCard__photoDev">
          <img src=${serverData[i].avatar} alt="photoDev" class="userCard__avatar">
        </div>
        <h3 class="userCard__name">${serverData[i].name}</h3>
        <div class="userCard__line"></div>
        <h4 class="userCard__title">About me</h4>
        <div class="userCard__about">
          <div class="userCard__info">
            <p>Age:</p>
            <p class="userCard__age">${serverData[i].age}</p>
          </div>
          <div class="userCard__info">
            <p class=>Favorite color:</p>
            <p class="userCard__color">${serverData[i].lovely_color}</p>
          </div>
          <div class="userCard__info">
            <p>Experience in IT:</p>
            <p class="userCard__exp">${serverData[i].exp}</p>
          </div>
        </div>
        <h4 class="userCard__title">Hobbies</h4>
        <div class="userCard__about">
          <div class="userCard__info">
            <p class="userCard__hobbie">${serverData[i].hobbie} </p>
          </div>
        </div>
        <!-- Modal form  -->
  <div class="form-user">
      <form action="" class="form-user__form">
          <h4 class="userCard__title">${serverData[i].name}</h4>
          <p>Age:</p>
          <input type="text" class="form-user__ageform" placeholder = "${serverData[i].age}">
          <p>Lovely color:</p>
          <input type="text" class="form-user__likecolor" placeholder = "${serverData[i].lovely_color}">
          <p>Exp in IT:</p>
          <input type="text" class="form-user__it" placeholder = "${serverData[i].exp}">
          <h4 class="userCard__title">Hobbies</h4>
          <input type="text" class="form-user__hobbie" placeholder = "${serverData[i].hobbie}">
          <button class="form-user__btn">Change</button>
      </form>
  </div>
  <!-- END Modal form  -->
      </div>`;
  if (i === serverData.length - 1 || i === serverData.length - 2) {
    var $userCard = $node.querySelectorAll(".userCard__item");
    $userCard[i].classList.add("gone");
  }
}

export function renderServerQuestions(serverData, $questions__items, renderNoQuestions, createAndFillQuestionItem) {
  // функция, отрисовки вопросов, которые мы получаем с сервера
  if(serverData === undefined){
    return false;
  }
  if (
    serverData[0] === null ||
    !Array.isArray(serverData) ||
    serverData[0] === "" ||
    serverData[0].date === null ||
    serverData[0].theme === ""
  ) {
    renderNoQuestions($questions__items);
  } else {
    for (var i = 0; i < serverData.length; i++) {
      if (
        serverData[i] === "" ||
        serverData[i].theme === undefined ||
        serverData[i].theme === ""
      ) {
        continue;
      } else {
        createAndFillQuestionItem($questions__items, serverData, i);
      }
    }
  }
}
export function createAndFillQuestionItem($node, serverData, i) {
  if (i === 0) {
    $node.innerHTML = `<div class="questions__item" date = ${serverData[i].date} type = ${serverData[i].type}>
    <div class="questions__edit">
    <img src="img/X.png" alt="edit">
  </div>
    <div class = "question__text">
      <div class="questions__answer">
        <div class="questions__textInfo">
          <p><b>Question: </b> </p><p class="questions__resultText" title = "${serverData[i].questionText}">${serverData[i].questionText}</p>
        </div>
        </div>
      </div>
      <div class = "questions__themeDateAns">
        <div class="questions__info">
          <p><b>Question Theme:</b> </p><p class="questions__resultInfo">${serverData[i].theme}</p>
        </div>  
        <div class="questions__info">
          <p><b>Answer:</b> </p><p class="questions__resultInfo">${serverData[i].answer}</p>
        </div>
        <div class="questions__info">
          <p><b>Date: </b> </p><p class="questions__resultInfo">${serverData[i].stringDate}</p>
      </div>
    </div>
  </div>`;
  } else {
    $node.innerHTML += `<div class="questions__item" date = ${serverData[i].date} type = ${serverData[i].type}>
    <div class="questions__edit">
    <img src="img/X.png" alt="edit">
  </div>
    <div class = "question__text">
      <div class="questions__answer">
        <div class="questions__textInfo">
          <p><b>Question: </b> </p><p class="questions__resultText" title = "${serverData[i].questionText}">${serverData[i].questionText}</p>
        </div>
        </div>
      </div>
      <div class = "questions__themeDateAns">
        <div class="questions__info">
          <p><b>Question Theme:</b> </p><p class="questions__resultInfo">${serverData[i].theme}</p>
        </div>  
        <div class="questions__info">
          <p><b>Answer: </b> </p><p class="questions__resultInfo">${serverData[i].answer}</p>
        </div>
        <div class="questions__info">
          <p><b>Date: </b> </p><p class="questions__resultInfo">${serverData[i].stringDate}</p>
      </div>
    </div>
  </div>`;
  }
}

export function renderNoQuestions($node) {
  if (!$node) return false;
  $node.innerHTML = `<img src="./img/questions.png" alt="" srcset="">`;
}

export function rerenderElement(event, obj) {
  if (!event || !obj) {
    return false;
  }
  var $element = event.target.parentElement.parentElement.parentElement; // нода карточки
  var $age = $element.querySelector(".userCard__age");
  var $color = $element.querySelector(".userCard__color");
  var $exp = $element.querySelector(".userCard__exp");
  var $hobbie = $element.querySelector(".userCard__hobbie");

  var $elementModal = event.target.parentElement; // нода модалки карточки
  var $inputAge = $elementModal.querySelector(".form-user__ageform");
  var $inputColor = $elementModal.querySelector(".form-user__likecolor");
  var $inputExp = $elementModal.querySelector(".form-user__it");
  var $inputHobbie = $elementModal.querySelector(".form-user__hobbie");
  $inputAge.placeholder = obj.age;
  $age.textContent = obj.age;
  $color.textContent = obj.lovely_color;
  $inputColor.placeholder = obj.lovely_color;
  $exp.textContent = obj.exp;
  $inputExp.placeholder = obj.exp;
  $hobbie.textContent = obj.hobbie;
  $inputHobbie.placeholder = obj.hobbie;
}
