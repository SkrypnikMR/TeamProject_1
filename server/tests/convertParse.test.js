var {
  convertToCSV,
  convertToXML,
  parseFromCSV,
} = require("../server_modules/convertParse");
describe("convertToCSV", function () {
  it("should be defined ", function () {
    expect(convertToCSV).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof convertToCSV).toBe("function");
  });
  it("should be without arguments", function () {
    expect(convertToCSV()).toBe(false);
  });
  it("should be argument array of objects", function () {
    var heh = [{ a: 1, theme: "heh" }];
    expect(convertToCSV(heh)).toEqual("a,theme \n" + "1,heh \n" + "");
  });
  it("should be argument array of objects without them", function () {
    var hehWithoutTheme = [{ a: 1 }];
    expect(convertToCSV(hehWithoutTheme)).toEqual("a \n");
  });
});
describe("parseFromCSV", function () {
  it("should be defined ", function () {
    expect(parseFromCSV).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof parseFromCSV).toBe("function");
  });
  it("should be without arguments", function () {
    expect(parseFromCSV()).toBe(false);
  });
  it("should be argument not a string", function () {
    expect(parseFromCSV(1)).toBe(false);
  });
  it("should be a right argument", function () {
    var expectString = `questionText,theme,date,stringDate,type,answer \n 
    sad,HTML,1618500118437,15.04.2021 | 18:21:58,CSV,true \n`;
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
        questionText: "    sad",
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
    expect(parseFromCSV(expectString)).toEqual(result);
  });
});
describe("parseFromCSV", function () {
  it("should be defined ", function () {
    expect(parseFromCSV).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof parseFromCSV).toBe("function");
  });
  it("should be without arguments", function () {
    expect(parseFromCSV()).toBe(false);
  });
  it("should be argument not a string", function () {
    expect(parseFromCSV(1)).toBe(false);
  });
  it("should be a right argument", function () {
    var expectString = `questionText,theme,date,stringDate,type,answer \n 
    sad,HTML,1618500118437,15.04.2021 | 18:21:58,CSV,true \n`;
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
        questionText: "    sad",
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
    expect(parseFromCSV(expectString)).toEqual(result);
  });
});
describe("convertToXML", function () {
  it("should be defined ", function () {
    expect(convertToXML).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof convertToXML).toBe("function");
  });
  it("should be without arguments", function () {
    expect(convertToXML()).toBe(false);
  });
  it("should be with [] in argument", function () {
    expect(convertToXML([])).toBe("<questions></questions>");
  });
  it("should be with [undefined,undefined] in argument", function () {
    expect(convertToXML([undefined, undefined])).toBe("<questions></questions>");
  });
  it("should be with [null,null] in argument", function () {
    expect(convertToXML([null, null])).toBe("<questions></questions>");
  });
  it("should be with right argument", function () {
    expect(convertToXML([{a: 1}])).toBe("<questions><question><a>1</a></question></questions>");
  });
});