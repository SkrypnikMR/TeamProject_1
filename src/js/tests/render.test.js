var {
  rerenderElement,
  renderNoQuestions,
  renderServerDeveloperData,
  renderandFillDevItem,
} = require("../render");
describe("rerenderElement", function () {
  var event = {
    target: {
      parentElement: {
        parentElement: {
          parentElement: {
            querySelector: function () {
              return { textContent: "" };
            },
          },
        },
        querySelector: function () {
          return { placeholder: "" };
        },
      },
    },
  };
  var obj = { age: "25", lovely_color: "red", exp: "nothing", hobbie: "" };
  it("should be defined ", function () {
    expect(rerenderElement).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof rerenderElement).toBe("function");
  });
  it("should without arguemnts", function () {
    expect(rerenderElement()).toBe(false);
  });
  it("should return nothing", function () {
    expect(rerenderElement(event, obj)).toBe();
  });
});
describe("renderNoQuestions", function () {
  it("should be defined ", function () {
    expect(renderNoQuestions).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof renderNoQuestions).toBe("function");
  });
  it("should return nothing with argument", function () {
    var $node = { innerHTML: "" };
    expect(renderNoQuestions($node)).toBe();
  });
  it("should return false, if called without arg", function () {
    expect(renderNoQuestions()).toBe(false);
  });
  it("should change innerHTML", function () {
    var $node = { innerHTML: "" };
    renderNoQuestions($node);
    expect($node.innerHTML).toBe(
      `<img src="./img/questions.png" alt="" srcset="">`
    );
  });
});
describe("renderServerDeveloperData", function () {
  it("should be defined ", function () {
    expect(renderServerDeveloperData).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof renderServerDeveloperData).toBe("function");
  });
  it("should return false", function () {
    expect(renderServerDeveloperData()).toBe(false);
  });
  it("should return false if serverData === [] ", function () {
    var serverData = [];
    var $developers = {};
    var cb = jest.fn();
    expect(renderServerDeveloperData(serverData, $developers, cb)).toBe(false);
  });
  it("should return false if $developers === undefined ", function () {
    var serverData = [{ somedata: "data" }];
    expect(renderServerDeveloperData(serverData)).toBe(false);
  });
  it("should return true ", function () {
    var serverData = [{ somedata: "data" }];
    var $developers = {};
    var cb = jest.fn();
    expect(renderServerDeveloperData(serverData, $developers, cb)).toBe(true);
  });
  it("should сb is called ", function () {
    var serverData = [{ somedata: "data" }];
    var $developers = {};
    var cb = jest.fn();
    renderServerDeveloperData(serverData, $developers, cb);
    expect(cb).toHaveBeenCalled();
  });
  it("should сb is called twice", function () {
    var serverData = [{ somedata: "data" }, { someTwoData: "data2" }];
    var $developers = {};
    var cb = jest.fn();
    renderServerDeveloperData(serverData, $developers, cb);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});
describe("renderandFillDevItem", function () {
  it("should be defined ", function () {
    expect(renderServerDeveloperData).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof renderandFillDevItem).toBe("function");
  });
  it("should return false if called without arguments", function () {
    expect(renderandFillDevItem()).toBe(false);
  });
  it("should return false if called only with $node", function () {
    var $node = {};
    expect(renderandFillDevItem($node)).toBe(false);
  });
  it("should return false if called only with $node and array ", function () {
    var $node = {};
    var serverData = [{}, {}];
    expect(renderandFillDevItem($node, serverData)).toBe(false);
  });
  it("should return nothing if all arguments normaly ", function () {
    var $node = {
      innerHTML: "",
      querySelectorAll: function () {
        return [
          { classList: { add: jest.fn() } },
          { classList: { add: jest.fn() } },
        ];
      },
    };
    var serverData = [
      { avatar: "", name: "", age: "", lovely_color: "", exp: "", hobbie: "" },
      { avatar: "", name: "", age: "", lovely_color: "", exp: "", hobbie: "" },
    ];
    var i = 1;
    expect(renderandFillDevItem($node, serverData, i)).toBe(undefined);
  });
  it("should new new innerHTML of $node", function () {
    var $node = {
      innerHTML: "",
      querySelectorAll: function () {
        return [
          { classList: { add: jest.fn() } },
          { classList: { add: jest.fn() } },
        ];
      },
    };
    var serverData = [
      { avatar: "", name: "", age: "", lovely_color: "", exp: "", hobbie: "" },
      { avatar: '25', name: "25", age: "25", lovely_color: "25", exp: "25", hobbie: "25" },
    ];
    var i = 1;
    var expectStr = `<div class="userCard__item">
        <div class="userCard__edit">
          <img src="img/edit.png" alt="edit">
        </div>
        <div class="userCard__photoDev">
          <img src=${serverData[i].age} alt="photoDev" class="userCard__avatar">
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
    renderandFillDevItem($node, serverData, i);
    expect($node.innerHTML).toBe(expectStr);
  });
});
describe("renderServerDeveloperData", function () {
  it("should be defined ", function () {
    expect(renderServerDeveloperData).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof renderServerDeveloperData).toBe("function");
  });
  it("should return false", function () {
    expect(renderServerDeveloperData()).toBe(false);
  });
});
