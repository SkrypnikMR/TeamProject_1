var {
  rerenderElement,
  renderNoQuestions,
  renderServerDeveloperData,
  renderandFillDevItem,
  renderServerQuestions,
  createAndFillQuestionItem,
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
          { classList: { add: jest.fn() } },
          { classList: { add: jest.fn() } },
          { classList: { add: jest.fn() } },
          { classList: { add: jest.fn() } },
        ];
      },
    };
    var serverData = [
      { avatar: "", name: "", age: "", lovely_color: "", exp: "", hobbie: "" },
      { avatar: "", name: "", age: "", lovely_color: "", exp: "", hobbie: "" },
      { avatar: "", name: "", age: "", lovely_color: "", exp: "", hobbie: "" },
      { avatar: "", name: "", age: "", lovely_color: "", exp: "", hobbie: "" },
      { avatar: "", name: "", age: "", lovely_color: "", exp: "", hobbie: "" },
      { avatar: "", name: "", age: "", lovely_color: "", exp: "", hobbie: "" },
    ];
    var i = 5;
    expect(renderandFillDevItem($node, serverData, i)).toBe(undefined);
  });
});
describe("renderServerQuestions", function () {
  it("should be defined ", function () {
    expect(renderServerQuestions).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof renderServerQuestions).toBe("function");
  });
  it("should return false", function () {
    expect(renderServerQuestions()).toBe(false);
  });
  it("should return 1 witn serverData[0] === null", function () {
    var serverData = [null, {}];
    var renderNoQuestions = jest.fn();
    var $questions__items = {};
    renderServerQuestions(serverData, $questions__items, renderNoQuestions);
    expect(renderNoQuestions).toHaveBeenCalled();
    expect(
      renderServerQuestions(serverData, $questions__items, renderNoQuestions)
    ).toBe(1);
  });
  it("should return 1 witn serverData === {}", function () {
    var serverData = {};
    var renderNoQuestions = jest.fn();
    var $questions__items = {};
    renderServerQuestions(serverData, $questions__items, renderNoQuestions);
    expect(renderNoQuestions).toHaveBeenCalled();
    expect(
      renderServerQuestions(serverData, $questions__items, renderNoQuestions)
    ).toBe(1);
  });
  it("should return 1 witn serverData[0] === '' ", function () {
    var serverData = ["", ""];
    var renderNoQuestions = jest.fn();
    var $questions__items = {};
    renderServerQuestions(serverData, $questions__items, renderNoQuestions);
    expect(renderNoQuestions).toHaveBeenCalled();
    expect(
      renderServerQuestions(serverData, $questions__items, renderNoQuestions)
    ).toBe(1);
  });
  it("should return 1 witn serverData[0].date === null ", function () {
    var serverData = [{ date: null }, ""];
    var renderNoQuestions = jest.fn();
    var $questions__items = {};
    renderServerQuestions(serverData, $questions__items, renderNoQuestions);
    expect(renderNoQuestions).toHaveBeenCalled();
    expect(
      renderServerQuestions(serverData, $questions__items, renderNoQuestions)
    ).toBe(1);
  });
  it("should return 1 witn serverData[0].theme === '' ", function () {
    var serverData = [{ theme: "" }, ""];
    var renderNoQuestions = jest.fn();
    var $questions__items = {};
    renderServerQuestions(serverData, $questions__items, renderNoQuestions);
    expect(renderNoQuestions).toHaveBeenCalled();
    expect(
      renderServerQuestions(serverData, $questions__items, renderNoQuestions)
    ).toBe(1);
  });
  it("should return 1 witn serverData[0].theme === '' ", function () {
    var serverData = [{ theme: "" }, ""];
    var renderNoQuestions = jest.fn();
    var $questions__items = {};
    renderServerQuestions(serverData, $questions__items, renderNoQuestions);
    expect(renderNoQuestions).toHaveBeenCalled();
    expect(
      renderServerQuestions(serverData, $questions__items, renderNoQuestions)
    ).toBe(1);
  });
  it("should continue in loop and 2 calls of createAndFillQuestionsItem item === '' ", function () {
    var serverData = [{ theme: "dad" }, "", { theme: "mad" }];
    var renderNoQuestions = jest.fn();
    var $questions__items = {};
    var createAndFillQuestionItem = jest.fn();
    expect(
      renderServerQuestions(
        serverData,
        $questions__items,
        renderNoQuestions,
        createAndFillQuestionItem
      )
    ).toBe();
    expect(createAndFillQuestionItem).toHaveBeenCalledTimes(2);
  });
  it("should continue in loop and 2 calls of createAndFillQuestionsItem and item === {theme: undefined}", function () {
    var serverData = [{ theme: "dad" }, { theme: undefined }, { theme: "mad" }];
    var renderNoQuestions = jest.fn();
    var $questions__items = {};
    var createAndFillQuestionItem = jest.fn();
    expect(
      renderServerQuestions(
        serverData,
        $questions__items,
        renderNoQuestions,
        createAndFillQuestionItem
      )
    ).toBe();
    expect(createAndFillQuestionItem).toHaveBeenCalledTimes(2);
  });
  it("should continue in loop and 2 calls of createAndFillQuestionsItem and item === {theme: ''}", function () {
    var serverData = [{ theme: "dad" }, { theme: "" }, { theme: "mad" }];
    var renderNoQuestions = jest.fn();
    var $questions__items = {};
    var createAndFillQuestionItem = jest.fn();
    expect(
      renderServerQuestions(
        serverData,
        $questions__items,
        renderNoQuestions,
        createAndFillQuestionItem
      )
    ).toBe();
    expect(createAndFillQuestionItem).toHaveBeenCalledTimes(2);
  });
});
describe("createAndFillQuestionItem", function () {
  it("should be defined ", function () {
    expect(createAndFillQuestionItem).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof createAndFillQuestionItem).toBe("function");
  });
  it("should return false if called without arguments", function () {
    expect(createAndFillQuestionItem()).toBe(false);
  });
  it("should return false if called only with one argument", function () {
    var $node = {};
    expect(createAndFillQuestionItem($node)).toBe(false);
  });
  it("should return false if called only with two arguments", function () {
    var $node = {};
    var serverData = [];
    expect(createAndFillQuestionItem($node, serverData)).toBe(false);
  });
  it("should innerHTML of $node is changed", function () {
    var $node = { innerHTML: "" };
    var serverData = [
      {
        date: "1",
        type: "1",
        questionText: "1",
        theme: "1",
        answer: "1",
        stringDate: "1",
      },
    ];
    var i = 0;
    var expectStr = `<div class="questions__item" date = ${serverData[i].date} type = ${serverData[i].type}>
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
    expect(createAndFillQuestionItem($node, serverData, i)).toBe();
    expect($node.innerHTML).toBe(expectStr);
  });
  it("should innerHTML of $node is changed", function () {
    var $node = { innerHTML: "heh" };
    var serverData = [
      {
        date: "1",
        type: "1",
        questionText: "1",
        theme: "1",
        answer: "1",
        stringDate: "1",
      },
      {
        date: "1",
        type: "1",
        questionText: "1",
        theme: "1",
        answer: "1",
        stringDate: "1",
      },
      {
        date: "1",
        type: "1",
        questionText: "1",
        theme: "1",
        answer: "1",
        stringDate: "1",
      },
    ];
    var i = 2;
    var expectStr = `heh<div class="questions__item" date = ${serverData[i].date} type = ${serverData[i].type}>
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
    expect(createAndFillQuestionItem($node, serverData, i)).toBe();
    expect($node.innerHTML).toBe(expectStr);
  });
});
