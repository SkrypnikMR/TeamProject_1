var { getFromJSONFile, getFromXMLFile, getFromCSV, getFromYaml } = require('../server_modules/getFromFile')
describe("getFromJSONFile", function () {
    it("should be defined ", function () {
      expect(getFromJSONFile).toBeDefined();
    });
    it("should be function", function () {
      expect(typeof getFromJSONFile).toBe("function");
    });
    it("should be without arguments", function () {
      expect(getFromJSONFile()).toBe(false);
    });
    it("should be URL.get(type) === 'JSON' ", function () {
        expect(getFromJSONFile()).toBe(false);
      });
  });