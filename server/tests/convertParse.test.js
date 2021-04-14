var { convertToXML } = require("../server_modules/convertParse");
describe("showModal", function () {
  it("should be defined ", function () {
    expect(convertToXML).toBeDefined();
  });
  it("should be function", function () {
    expect(typeof convertToXML).toBe("function");
  });
});
