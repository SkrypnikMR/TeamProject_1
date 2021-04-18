var {
  getFromJSONFile,
  getFromXMLFile,
  getFromCSV,
  getFromYaml,
} = require("../server_modules/getFromFile");

var URL = {};
URL.get = function (stringType) {
  if (stringType === "theme") {
    return "ALLTHEMES";
  }
};
jest.mock("fs");
jest.mock("fast-xml-parser");
jest.mock("js-yaml");
describe("getFromJSONFile", function () {
  beforeEach(function () {
    var fs = require("fs");
    fs.readFileSync = function () {
      return `[{"a":1, "theme": "A"}, {"b":2, "theme": "B"}, {"c":3, "theme" : "rightTheme"}]`;
    };
  });
  it("should be defined ", function () {
    expect(getFromJSONFile).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof getFromJSONFile).toBe("function");
  });
  it("should be without arguments", function () {
    expect(getFromJSONFile()).toBe(false);
  });
  it("should be URL.get(theme) === 'ALLTHEMES' ", function () {
    expect(getFromJSONFile(URL, 1)).toEqual([
      { a: 1, theme: "A" },
      { b: 2, theme: "B" },
      { c: 3, theme: "rightTheme" },
    ]);
  });
  it("should be mode === 1", function () {
    var mode = 1;
    expect(getFromJSONFile(URL, mode)).toEqual([
      { a: 1, theme: "A" },
      { b: 2, theme: "B" },
      { c: 3, theme: "rightTheme" },
    ]);
  });
  it("should be URL.get(theme) === 'rightTheme' ", function () {
    var mode = undefined;
    URL.get = function (stringType) {
      if (stringType === "theme") {
        return "rightTheme";
      }
    };
    expect(getFromJSONFile(URL, mode)).toEqual([{ c: 3, theme: "rightTheme" }]);
  });
});
describe("getFromXMLFile", function () {
  it("should be defined ", function () {
    expect(getFromXMLFile).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof getFromXMLFile).toBe("function");
  });
  it("should be without arguments", function () {
    expect(getFromXMLFile()).toBe(false);
  });
  it("should be nothing in file", function () {
    var fs = require("fs");
    var XMLparser = require("fast-xml-parser");
    var file = "";
    XMLparser.parse = function () {
      return { questions: { question: "" } };
    };
    fs.readFileSync = function () {
      return file;
    };
    fs.writeFileSync = function () {
      return (
        (file = "questions/questions.xml"),
        "<questions><question></question></questions>"
      );
    };
    expect(getFromXMLFile(URL, 1)).toEqual([""]);
  });
  it(`should be URL.theme === "ALLTHEMES" `, function () {
    var XMLparser = require("fast-xml-parser");
    XMLparser.parse = function () {
      return {
        questions: {
          question: [
            { a: 1, theme: 1 },
            { b: 2, theme: 2 },
          ],
        },
      };
    };
    expect(getFromXMLFile(URL, 1)).toEqual([
      { a: 1, theme: 1 },
      { b: 2, theme: 2 },
    ]);
  });
  it("should be no array in arrayFromXML", function () {
    var XMLparser = require("fast-xml-parser");
    XMLparser.parse = function () {
      return {
        questions: {
          question: { a: 1 },
        },
      };
    };
    expect(getFromXMLFile(URL, 1)).toEqual([{ a: 1 }]);
  });
  it("should be with undefined mode", function () {
    mode = undefined;
    var XMLparser = require("fast-xml-parser");
    XMLparser.parse = function () {
      return {
        questions: {
          question: [
            { a: 1, theme: "heh" },
            { b: 2, theme: 2 },
          ],
        },
      };
    };
    URL.get("theme") === "heh";
    expect(getFromXMLFile(URL, 1)).toEqual([
      { a: 1, theme: "heh" },
      { b: 2, theme: 2 },
    ]);
  });
  it("should be with some theme", function () {
    mode = undefined;
    URL.get = function (str) {
      if (str === "theme") {
        return "heh";
      }
    };
    var XMLparser = require("fast-xml-parser");
    XMLparser.parse = function () {
      return {
        questions: {
          question: [
            { a: 1, theme: "heh" },
            { b: 2, theme: 2 },
          ],
        },
      };
    };

    expect(getFromXMLFile(URL, mode)).toEqual([{ a: 1, theme: "heh" }]);
  });
});
describe("getFromCSV", function () {
  beforeEach(function () {
    var fs = require("fs");
    fs.readFileSync = function () {
      return `questionText,theme,date,stringDate,type,answer \n 
      sad,HTML,1618500118437,15.04.2021 | 18:21:58,CSV,true \n`;
    };
  });
  it("should be defined ", function () {
    expect(getFromCSV).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof getFromCSV).toBe("function");
  });
  it("should be without arguments", function () {
    expect(getFromCSV()).toBe(false);
  });
  it("should be with right argument, URL.get('theme') === 'ALLTHEMES' ", function () {
    var result = [
      {
        answer: undefined,
        date: NaN,
        questionText: " ",
        stringDate: undefined,
        theme: undefined,
        type: undefined,
      },
      {
        answer: "true ",
        date: 1618500118437,
        questionText: "      sad",
        stringDate: "15.04.2021 | 18:21:58",
        theme: "HTML",
        type: "CSV",
      },
      {
        answer: undefined,
        date: NaN,
        questionText: "",
        stringDate: undefined,
        theme: undefined,
        type: undefined,
      },
    ];
    URL.get = function (stringType) {
      if (stringType === "theme") {
        return "ALLTHEMES";
      }
    };
    expect(getFromCSV(URL)).toEqual(result);
  });
  it("should be with mode === 1 ", function () {
    var result = [
      {
        answer: undefined,
        date: NaN,
        questionText: " ",
        stringDate: undefined,
        theme: undefined,
        type: undefined,
      },
      {
        answer: "true ",
        date: 1618500118437,
        questionText: "      sad",
        stringDate: "15.04.2021 | 18:21:58",
        theme: "HTML",
        type: "CSV",
      },
      {
        answer: undefined,
        date: NaN,
        questionText: "",
        stringDate: undefined,
        theme: undefined,
        type: undefined,
      },
    ];
    URL.get = function (stringType) {
      if (stringType === "theme") {
        return "ALLTHEMES";
      }
    };
    expect(getFromCSV(URL)).toEqual(result);
  });
  it("should be with right argument, URL.get('theme') === 'HTML' ", function () {
    var result = [
      {
        answer: "true ",
        date: 1618500118437,
        questionText: "      sad",
        stringDate: "15.04.2021 | 18:21:58",
        theme: "HTML",
        type: "CSV",
      },
    ];
    URL.get = function (stringType) {
      if (stringType === "theme") {
        return "HTML";
      }
    };
    expect(getFromCSV(URL)).toEqual(result);
  });
  it("should be URL.get('theme') === 'HTML', but in file we have obj with theme === 'CSS'", function () {
    var fs = require("fs");
    fs.readFileSync = function () {
      return `questionText,theme,date,stringDate,type,answer \n 
      sad,HTML,1618500118437,15.04.2021 | 18:21:58,CSV,true \n
      sad,CSS,1618500118437,15.04.2021 | 18:21:58,CSV,true \n`;
    };
    var result = [
      {
        answer: "true ",
        date: 1618500118437,
        questionText: "      sad",
        stringDate: "15.04.2021 | 18:21:58",
        theme: "HTML",
        type: "CSV",
      },
    ];
    URL.get = function (stringType) {
      if (stringType === "theme") {
        return "HTML";
      }
    };
    expect(getFromCSV(URL)).toEqual(result);
  });
});
describe("getFromYaml", function () {
  beforeEach(function () {
    var fs = require("fs");
    fs.readFileSync = function () {
      return `
      - questionText: "CSS1"
        theme: "HTML"
        date: 1618589572816
        stringDate: "16.04.2021 | 19:12:52"
        type:
          - "YAML"
        answer: true
      - questionText: "net"
        theme: "HTML"
        date: 1618589515905
        stringDate: "16.04.2021 | 19:11:55"
        type:
          - "YAML"
        answer: false
      - questionText: "da"
        theme: "HTML"
        date: 1618588992287
        stringDate: "16.04.2021 | 19:03:12"
        type:
          - "YAML"
        answer: true
    `;
    };
  });
  it("should be defined ", function () {
    expect(getFromYaml).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof getFromYaml).toBe("function");
  });
  it("should be without arguments", function () {
    expect(getFromYaml()).toBe(false);
  });
  it("should be URL.get(theme) === 'ALLTHEMES' ", function () {
    URL.get = function (str) {
      if (str === "theme") {
        return "ALLTHEMES";
      }
    };
    var yamlParser = require("js-yaml");
    var result = [
      {
        questionText: "CSS1",
        theme: "HTML",
        date: 1618589572816,
        stringDate: "16.04.2021 | 19:12:52",
        type: ["YAML"],
        answer: true,
      },
      {
        questionText: "CSS1",
        theme: "HTML",
        date: 1618589572816,
        stringDate: "16.04.2021 | 19:12:52",
        type: ["YAML"],
        answer: true,
      },
      {
        questionText: "CSS1",
        theme: "HTML",
        date: 1618589572816,
        stringDate: "16.04.2021 | 19:12:52",
        type: ["YAML"],
        answer: true,
      },
    ];
    yamlParser.load = function (str) {
      return result;
    };
    expect(getFromYaml(URL)).toEqual(result);
  });
  it("should be mode === 1", function () {
    var mode = 1;
    URL.get = function (str) {
      if (str === "theme") {
        return "head";
      }
    };
    var yamlParser = require("js-yaml");
    var result = [
      {
        questionText: "CSS1",
        theme: "HTML",
        date: 1618589572816,
        stringDate: "16.04.2021 | 19:12:52",
        type: ["YAML"],
        answer: true,
      },
      {
        questionText: "CSS1",
        theme: "HTML",
        date: 1618589572816,
        stringDate: "16.04.2021 | 19:12:52",
        type: ["YAML"],
        answer: true,
      },
      {
        questionText: "CSS1",
        theme: "HTML",
        date: 1618589572816,
        stringDate: "16.04.2021 | 19:12:52",
        type: ["YAML"],
        answer: true,
      },
    ];
    yamlParser.load = function (str) {
      return result;
    };
    expect(getFromYaml(URL, mode)).toEqual(result);
  });
  it("should be theme = CSS", function () {
    URL.get = function (str) {
      if (str === "theme") {
        return "CSS";
      }
    };
    var yamlParser = require("js-yaml");
    var result = [
      {
        questionText: "CSS1",
        theme: "CSS",
        date: 1618589572816,
        stringDate: "16.04.2021 | 19:12:52",
        type: ["YAML"],
        answer: true,
      },
      {
        questionText: "CSS1",
        theme: "HTML",
        date: 1618589572816,
        stringDate: "16.04.2021 | 19:12:52",
        type: ["YAML"],
        answer: true,
      },
      {
        questionText: "CSS1",
        theme: "HTML",
        date: 1618589572816,
        stringDate: "16.04.2021 | 19:12:52",
        type: ["YAML"],
        answer: true,
      },
    ];
    yamlParser.load = function (str) {
      return result;
    };
    expect(getFromYaml(URL)).toEqual([
      {
        questionText: "CSS1",
        theme: "CSS",
        date: 1618589572816,
        stringDate: "16.04.2021 | 19:12:52",
        type: ["YAML"],
        answer: true,
      },
    ]);
  });
});
