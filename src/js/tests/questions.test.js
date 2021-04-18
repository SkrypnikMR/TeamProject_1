var {errorText} = require('../questions');
describe("showModal", function () {
    it("should be defined ", function () {
        expect(showModal).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof showModal).toBe("function");
    });
});
