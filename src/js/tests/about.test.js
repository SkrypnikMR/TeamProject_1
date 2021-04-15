var {moveToPreviousSlide, moveToNextSlide, getSlides, startSlide} = require('../about');


describe("startSlide", function () {
    it("startSlide should be defined ", function () {
        expect(startSlide).toBeDefined();
    });
    it("startSlide should be function", function () {
        expect(typeof startSlide).toBe("function");
    });
    it("startSlide should be without arguments", function () {
        expect(startSlide()).toBe(undefined);
    });
    it("startSlide should be with argument", function () {
        expect(startSlide(1)).toBe(undefined);
    });
    // it("should be with argument", function () {
    //     var moveToNextSlide = jest.fn();
    //     // await startSlide();
    //     expect(moveToNextSlide).toBeCalledTimes(1);
    // });
});

describe("getSlides", function () {
    it("getSlides should be defined ", function () {
        expect(getSlides).toBeDefined();
    });
    it("getSlides should be function", function () {
        expect(typeof getSlides).toBe("function");
    });
});

describe("moveToNextSlide", function () {
    it("moveToNextSlide should be defined ", function () {
        expect(moveToNextSlide).toBeDefined();
    });
    it("moveToNextSlide should be function", function () {
        expect(typeof moveToNextSlide).toBe("function");
    });
});

describe("moveToPreviousSlide", function () {
    it("moveToPreviousSlide should be defined ", function () {
        expect(moveToPreviousSlide).toBeDefined();
    });
    it("moveToPreviousSlide should be function", function () {
        expect(typeof moveToPreviousSlide).toBe("function");
    });
});