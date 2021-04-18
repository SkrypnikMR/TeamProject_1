var {
  rerenderElement,
  renderNoQuestions,
  renderServerDeveloperData,
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
  it("should return nothing with argument", function(){
    var $node = {innerHTML: ''}
    expect(renderNoQuestions($node)).toBe();
  })
  it("should return false, if called without arg", function(){
    expect(renderNoQuestions()).toBe(false);
  })
  it("should change innerHTML", function () {
    var $node = {innerHTML: ''}
    renderNoQuestions($node);
    expect($node.innerHTML).toBe(`<img src="./img/questions.png" alt="" srcset="">`)
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
    var serverData = [{somedata: 'data'}];
    expect(renderServerDeveloperData(serverData)).toBe(false);
  });
  it("should return true ", function () {
    var serverData = [{somedata: 'data'}];
    var $developers = {};
    var cb = jest.fn();
    expect(renderServerDeveloperData(serverData, $developers, cb)).toBe(true);
  });
  it("should сb is called ", function () {
    var serverData = [{somedata: 'data'}];
    var $developers = {};
    var cb = jest.fn();
    renderServerDeveloperData(serverData, $developers, cb);
    expect(cb).toHaveBeenCalled();
  });
  it("should сb is called twice", function () {
    var serverData = [{somedata: 'data'}, {someTwoData: 'data2'}];
    var $developers = {};
    var cb = jest.fn();
    renderServerDeveloperData(serverData, $developers, cb);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});
