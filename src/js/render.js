

export function renderServerDeveloperData(serverData) {
  var $developers = document.querySelectorAll(".userCard__item"); // нода коллекции userCard item
  for (var i = 0; i < serverData.length; i++) {
    $developers[i].children[2].textContent = serverData[i].name;
    $developers[i].children[5].children[0].children[1].textContent =
      serverData[i].age;
    $developers[i].children[5].children[1].children[1].textContent =
      serverData[i].lovely_color;
    $developers[i].children[5].children[2].children[1].textContent =
      serverData[i].exp;
    $developers[i].children[7].children[0].children[0].textContent =
      serverData[i].hobby;
  }
}

export function renderServerQuestions(serverData) {
  var $qHTMLContent = document.querySelector(".questions__Content");
  if (serverData.length === 0) {
    renderNoQuestions();
  } else {
    for (var i = 0; i < serverData.length; i++) {
      if (i === 0) {
        $qHTMLContent.children[0].children[0].innerHTML = renderServerQuestionItem();
        $qHTMLContent.children[0].children[0].children[0].setAttribute(
          "date",
          serverData[0].date
        );
        $qHTMLContent.children[0].children[0].children[0].setAttribute(
          "type",
          [serverData[0].type]
        );
        $qHTMLContent.children[0].children[0].children[0].children[1].children[0].children[1].textContent =
          serverData[i].questionText;
        $qHTMLContent.children[0].children[0].children[0].children[1].children[1].children[1].textContent =
          serverData[i].theme;
        $qHTMLContent.children[0].children[0].children[0].children[1].children[2].children[1].textContent =
          serverData[i].answer;
        $qHTMLContent.children[0].children[0].children[0].children[1].children[3].children[1].textContent =
          serverData[i].stringDate;
      } else {
        $qHTMLContent.children[0].children[0].innerHTML += renderServerQuestionItem();
        $qHTMLContent.children[0].children[0].children[i].setAttribute(
          "date",
          serverData[i].date
        );
        $qHTMLContent.children[0].children[0].children[
          i
        ].children[1].children[0].children[1].textContent =
          serverData[i].questionText;
        $qHTMLContent.children[0].children[0].children[
          i
        ].children[1].children[1].children[1].textContent = serverData[i].theme;
        $qHTMLContent.children[0].children[0].children[
          i
        ].children[1].children[2].children[1].textContent =
          serverData[i].answer;
        $qHTMLContent.children[0].children[0].children[
          i
        ].children[1].children[3].children[1].textContent =
          serverData[i].stringDate;
      }
    }
  }
}

function renderServerQuestionItem() {
  return `<div class="questions__item">
  <div class="questions__edit">
  <img src="img/X.png" alt="edit">
</div>
  <div class="questions__answer">
    <div class="questions__info">
      <p><b>Текст вопроса:</b> </p><p class="questions__result"></p>
    </div>
    <div class="questions__info">
      <p><b>Тема вопроса:</b> </p><p class="questions__result"></p>
    </div>  
    <div class="questions__info">
      <p><b>Ответ на вопрос:</b> </p><p class="questions__result"></p>
    </div>
    <div class="questions__info">
      <p><b>Дата вопроса:</b> </p><p class="questions__result"></p>
  </div>
</div>`;
}

export function renderNoQuestions() {
  var $qHTMLContentWrapperItems = document.querySelector(".questions__items");
  return ($qHTMLContentWrapperItems.innerHTML = `<img src="./img/questions.png" alt="" srcset="">`);
}
