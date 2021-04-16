var {
  watchMethodAndUrl,
  watchGetUrl,
  watchPostUrl,
  watchDeleteUrl,
  watchPutUrl,
} = require("../server_modules/watch");

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

    watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl)
    watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl)
    watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl)
    expect(watchGetUrl).toHaveBeenCalledTimes(3);
  });
  it("should be method === 'POST' ", function () {
    req.method = "POST";
    console.log(req.method);
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();

    watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl)
    expect(watchPostUrl).toHaveBeenCalledTimes(1);
  });
  it("should be method === 'DELETE' ", function () {
    req.method = "DELETE";
    console.log(req.method);
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();

    watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl)
    watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl)
    expect(watchDeleteUrl).toHaveBeenCalledTimes(2);
  });
  it("should be method === 'PUT' ", function () {
    req.method = "PUT";
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();

    watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl)
    watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl)
    watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl)
    watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl)
    expect(watchPutUrl).toHaveBeenCalledTimes(4);
  });
  it("should be method === 'OPTIONS' ", function () {
    req.method = "OPTIONS"
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();
    expect(watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl)).toBe();
  });
  it("should be method === 'OPTIONS' and we call method res.writeHead ", function () {
    req.method = "OPTIONS"
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();
    watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl);
    expect(res.writeHead).toHaveBeenCalled();
  });
  it("should be method === 'OPTIONS' and we call method res.end", function () {
    req.method = "OPTIONS"
    var watchGetUrl = jest.fn();
    var watchPostUrl = jest.fn();
    var watchDeleteUrl = jest.fn();
    var watchPutUrl = jest.fn();
    watchMethodAndUrl(req, res, headers, watchGetUrl, watchPostUrl, watchDeleteUrl, watchPutUrl);
    expect(res.end).toHaveBeenCalled();
  });

});
