var {
  watchMethodAndUrl,
  watchGetUrl,
  watchPostUrl,
  watchDeleteUrl,
  watchPutUrl,
} = require("../server_modules/watch");
jest.mock("fs");
jest.mock("json-to-pretty-yaml");

describe("watchMethodAndUrl", function () {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Max-Age": 12344345789,
  };
  var req = { method: "" };
  var res = { writeHead: jest.fn(), end: jest.fn() };
  it("should be defined ", function () {
    expect(watchMethodAndUrl).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof watchMethodAndUrl).toBe("function");
  });
  it("should be return nothing ", function () {
    expect(watchMethodAndUrl(req, res, headers)).toBe();
  });
  it("should be method === 'GET' ", function () {
    req.method = "GET";
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();

    watchMethodAndUrl(
      req,
      res,
      headers,
      watchGetUrl,
      watchPostUrl,
      watchDeleteUrl,
      watchPutUrl
    );
    watchMethodAndUrl(
      req,
      res,
      headers,
      watchGetUrl,
      watchPostUrl,
      watchDeleteUrl,
      watchPutUrl
    );
    watchMethodAndUrl(
      req,
      res,
      headers,
      watchGetUrl,
      watchPostUrl,
      watchDeleteUrl,
      watchPutUrl
    );
    expect(watchGetUrl).toHaveBeenCalledTimes(3);
  });
  it("should be method === 'POST' ", function () {
    req.method = "POST";
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();

    watchMethodAndUrl(
      req,
      res,
      headers,
      watchGetUrl,
      watchPostUrl,
      watchDeleteUrl,
      watchPutUrl
    );
    expect(watchPostUrl).toHaveBeenCalledTimes(1);
  });
  it("should be method === 'DELETE' ", function () {
    req.method = "DELETE";
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();

    watchMethodAndUrl(
      req,
      res,
      headers,
      watchGetUrl,
      watchPostUrl,
      watchDeleteUrl,
      watchPutUrl
    );
    watchMethodAndUrl(
      req,
      res,
      headers,
      watchGetUrl,
      watchPostUrl,
      watchDeleteUrl,
      watchPutUrl
    );
    expect(watchDeleteUrl).toHaveBeenCalledTimes(2);
  });
  it("should be method === 'PUT' ", function () {
    req.method = "PUT";
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();

    watchMethodAndUrl(
      req,
      res,
      headers,
      watchGetUrl,
      watchPostUrl,
      watchDeleteUrl,
      watchPutUrl
    );
    watchMethodAndUrl(
      req,
      res,
      headers,
      watchGetUrl,
      watchPostUrl,
      watchDeleteUrl,
      watchPutUrl
    );
    watchMethodAndUrl(
      req,
      res,
      headers,
      watchGetUrl,
      watchPostUrl,
      watchDeleteUrl,
      watchPutUrl
    );
    watchMethodAndUrl(
      req,
      res,
      headers,
      watchGetUrl,
      watchPostUrl,
      watchDeleteUrl,
      watchPutUrl
    );
    expect(watchPutUrl).toHaveBeenCalledTimes(4);
  });
  it("should be method === 'OPTIONS' ", function () {
    req.method = "OPTIONS";
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();
    expect(
      watchMethodAndUrl(
        req,
        res,
        headers,
        watchGetUrl,
        watchPostUrl,
        watchDeleteUrl,
        watchPutUrl
      )
    ).toBe();
  });
  it("should be method === 'OPTIONS' and we call method res.writeHead ", function () {
    req.method = "OPTIONS";
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();
    watchMethodAndUrl(
      req,
      res,
      headers,
      watchGetUrl,
      watchPostUrl,
      watchDeleteUrl,
      watchPutUrl
    );
    expect(res.writeHead).toHaveBeenCalled();
  });
  it("should be method === 'OPTIONS' and we call method res.end", function () {
    req.method = "OPTIONS";
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();
    watchMethodAndUrl(
      req,
      res,
      headers,
      watchGetUrl,
      watchPostUrl,
      watchDeleteUrl,
      watchPutUrl
    );
    expect(res.end).toHaveBeenCalled();
  });
});
describe("watchGetUrl", function () {
  var functionParams = {
    getFromJSONFile: jest.fn(),
    getFromXMLFile: jest.fn(),
    getFromCSV: jest.fn(),
    getFromYaml: jest.fn(),
  };
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Max-Age": 12344345789,
  };
  var req = { method: "", url: "/questions" };
  var res = { writeHead: jest.fn(), end: jest.fn() };
  it("should be defined ", function () {
    expect(watchGetUrl).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof watchGetUrl).toBe("function");
  });
  it("should be return nothing ", function () {
    expect(watchGetUrl(req, res, headers)).toBe();
  });
  it("should be url have '/developers' ", function () {
    req.url = "/developers";
    var fs = require("fs");
    fs.readFileSync = jest.fn();
    watchGetUrl(req, res, headers);
    expect(fs.readFileSync).toHaveBeenCalled();
    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
  it("should be url have '/questions' and type JSON ", function () {
    req.url = "/questions";
    URLSearchParams = function (str) {
      this.get = function (str) {
        if (str === "type") {
          return "JSON";
        }
      };
    };

    watchGetUrl(req, res, headers, functionParams);
    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
  it("should be url have '/questions' and type XML, from XML File === undefined", function () {
    req.url = "/questions";
    URLSearchParams = function (str) {
      this.get = function (str) {
        if (str === "type") {
          return "XML";
        }
      };
    };
    watchGetUrl(req, res, headers, functionParams);
    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
  it("should be url have '/questions' and type XML from XML File === obj", function () {
    req.url = "/questions";
    URLSearchParams = function (str) {
      this.get = function (str) {
        if (str === "type") {
          return "XML";
        }
      };
    };
    functionParams.getFromXMLFile = function (str) {
      return {};
    };
    watchGetUrl(req, res, headers, functionParams);
    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
  it("should be url have '/questions' and type XML from XML File === undefined", function () {
    req.url = "/questions";
    URLSearchParams = function (str) {
      this.get = function (str) {
        if (str === "type") {
          return "XML";
        }
      };
    };
    functionParams.getFromXMLFile = function (str) {
      return;
    };
    watchGetUrl(req, res, headers, functionParams);
    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
    expect(watchGetUrl(req, res, headers, functionParams)).toBe();
  });
  it("should be url have '/questions' and type XML , from XML File === []", function () {
    req.url = "/questions";
    URLSearchParams = function (str) {
      this.get = function (str) {
        if (str === "type") {
          return "XML";
        }
      };
    };
    functionParams.getFromXMLFile = function (str) {
      return [];
    };
    watchGetUrl(req, res, headers, functionParams);
    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
  it("should be url have '/questions' and type CSV, from CSV File === undefined", function () {
    req.url = "/questions";
    URLSearchParams = function (str) {
      this.get = function (str) {
        if (str === "type") {
          return "CSV";
        }
      };
    };
    watchGetUrl(req, res, headers, functionParams);
    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
  it("should be url have '/questions' and type YAML, from YAML File === undefined", function () {
    req.url = "/questions";
    URLSearchParams = function (str) {
      this.get = function (str) {
        if (str === "type") {
          return "YAML";
        }
      };
    };
    watchGetUrl(req, res, headers, functionParams);
    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
});
describe("watchPutUrl", function () {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Max-Age": 12344345789,
  };
  var req = {
    method: "",
    url: "/developers",
    body: {
      name: "name",
      age: "age",
      lovely_color: "lovely_color",
      exp: "exp",
      hobbie: "hobbie",
      avatar: "avatar",
    },
  };
  var res = { writeHead: jest.fn(), end: jest.fn() };
  it("should be defined ", function () {
    expect(watchPutUrl).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof watchPutUrl).toBe("function");
  });
  it("shoul be return nothing", function () {
    var fs = require("fs");
    fs.readFileSync = function (file, format) {
      if (file === "developers/developers.json" && format === "utf-8")
        return `[{"name": "da",
        "age": "age",
        "lovely_color": "lovely_color",
       "exp": "exp",
        "hobbie": "hobbie",
        "avatar": "avatar"}]`;
    };
    expect(watchPutUrl(req, res, headers)).toBe();
  });
  it("shoul be req.body === 1 of the developers", function () {
    var fs = require("fs");
    fs.readFileSync = function (file, format) {
      if (file === "developers/developers.json" && format === "utf-8")
        return `[{"name": "name",
        "age": "age",
        "lovely_color": "lovely_color",
       "exp": "exp",
        "hobbie": "hobbie",
        "avatar": "avatar"}]`;
    };
    expect(watchPutUrl(req, res, headers)).toBe();
  });
  it("shoul be methods been called", function () {
    var fs = require("fs");
    fs.readFileSync = function (file, format) {
      if (file === "developers/developers.json" && format === "utf-8")
        return `[{"name": "name",
        "age": "age",
        "lovely_color": "lovely_color",
       "exp": "exp",
        "hobbie": "hobbie",
        "avatar": "avatar"}]`;
    };
    fs.writeFileSync = jest.fn();
    watchPutUrl(req, res, headers);
    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
  it("shoul be not developers url", function () {
    req.url = "da";
    expect(watchPutUrl(req, res, headers)).toBe();
  });
});
describe("watchPostUrl", function () {
  var functionParams = {
    getFromJSONFile: function () {
      return [{ type: "" }];
    },
    getFromXMLFile: function () {
      return { type: "" };
    },
    getFromCSV: function () {
      return [];
    },
    getFromYaml: function () {
      return [];
    },
  };
  var functionsConverters = {
    convertToXML: jest.fn(),
    convertToCSV: jest.fn(),
  };
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Max-Age": 12344345789,
  };
  var req = {
    method: "",
    url: "/questions",
    body: {
      questionText: "12",
      theme: "HTML",
      date: 1618690402731,
      stringDate: "17.04.2021 | 23:13:22",
      type: ["JSON"],
      answer: true,
    },
  };
  var res = { writeHead: jest.fn(), end: jest.fn() };
  it("should be defined ", function () {
    expect(watchPostUrl).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof watchPostUrl).toBe("function");
  });
  it("should return nothing", function () {
    expect(
      watchPostUrl(req, res, headers, functionParams, functionsConverters)
    ).toBe();
  });
  it("should methods in end of function have been called", function () {
    watchPostUrl(req, res, headers, functionParams, functionsConverters);
    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
  it("should req.body.type === JSON && writeFileSync to have been called", function () {
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchPostUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  it("should req.body.type === XML and arrayFromXML === ''", function () {
    req.body.type = ["XML"];
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchPostUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  it("should req.body.type === XML and arrayFromXML === [{}]", function () {
    req.body.type = ["XML"];
    functionParams.getFromXMLFile = function () {
      return [{}];
    };
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchPostUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  it("should req.body.type === YAML and fs.writeFileSync to have been called ", function () {
    req.body.type = ["YAML"];
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchPostUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  it("should req.body.type === CSV and fs.writeFileSync to have been called ", function () {
    req.body.type = ["CSV"];
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchPostUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
describe("watchDeleteUrl", function () {
  var functionParams = {
    getFromJSONFile: function () {
      return [];
    },
    getFromXMLFile: function () {
      return [];
    },
    getFromCSV: function () {
      return [];
    },
    getFromYaml: function () {
      return [];
    },
  };
  var functionsConverters = {
    convertToXML: jest.fn(),
    convertToCSV: jest.fn(),
  };
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Max-Age": 12344345789,
  };
  var req = {
    method: "",
    url: "/questions",
    body: {
      date: 1618690402731,
    },
  };
  var res = { writeHead: jest.fn(), end: jest.fn() };
  it("should be defined ", function () {
    expect(watchDeleteUrl).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof watchDeleteUrl).toBe("function");
  });
  it("should return nothing", function () {
    watchDeleteUrl(req, res, headers, functionParams, functionsConverters);
  });
  it("should methods have been called", function () {
    watchDeleteUrl(req, res, headers, functionParams, functionsConverters);
    expect(res.writeHead).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
  it("should URL.get('type') === 'JSON' and fs.writeFileSync have been called", function () {
    URLSearchParams = function () {
      this.get = function (str) {
        if (str === "type") {
          return "JSON";
        }
      };
    };
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchDeleteUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  it("should URL.get('type') === 'JSON' and fs.writeFileSync have been called and req.body.date === arrayFromJson[i].date", function () {
    URLSearchParams = function () {
      this.get = function (str) {
        if (str === "type") {
          return "JSON";
        }
      };
    };
    functionParams.getFromJSONFile = function () {
      return [{ date: 1618690402731 }];
    };
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchDeleteUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  it("should URL.get('type') === 'XML' and fs.writeFileSync have been called", function () {
    URLSearchParams = function () {
      this.get = function (str) {
        if (str === "type") {
          return "XML";
        }
      };
    };
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchDeleteUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  it("should URL.get('type') === 'XML' and XML[i] === true and req.body.data === XML[i].data", function () {
    URLSearchParams = function () {
      this.get = function (str) {
        if (str === "type") {
          return "XML";
        }
      };
    };
    functionParams.getFromXMLFile = function () {
      return [{ date: 1618690402731 }];
    };
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchDeleteUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  it("should URL.get('type') === 'YAML' and fs.writeFileSync have been called", function () {
    URLSearchParams = function () {
      this.get = function (str) {
        if (str === "type") {
          return "YAML";
        }
      };
    };
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchDeleteUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  it("should URL.get('type') === 'YAML' and fs.writeFileSync have been called and req.body.data === arrayFromYAML[i].data", function () {
    functionParams.getFromYaml = function () {
      return [{ date: 1618690402731 }];
    };
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchDeleteUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  it("should URL.get('type') === 'CSV' and fs.writeFileSync have been called", function () {
    functionParams.getFromCSV = function () {
      return [{ date: 1618690402731 }];
    };
    URLSearchParams = function () {
      this.get = function (str) {
        if (str === "type") {
          return "CSV";
        }
      };
    };
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchDeleteUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  it("should URL.get('type') === 'CSV' and fs.writeFileSync have been called and req.body.data === arrayFromYAML[i].data", function () {
    var fs = require("fs");
    fs.writeFileSync = jest.fn();
    watchDeleteUrl(req, res, headers, functionParams, functionsConverters);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
