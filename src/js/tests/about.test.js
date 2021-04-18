var {moveToPreviousSlide, moveToNextSlide, getSlides, startSlide} = require('../about');

jest.useFakeTimers();

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
    it("moveToNextSlide inside startSlide should be called", function () {
       var moveToNextSlide = jest.fn();
       var slide = {style:[{transition:""}, {transform: ""}]};
       startSlide(function () {
            moveToNextSlide(slide);
        });
       expect(setInterval).toHaveBeenCalledTimes(1);
       expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 5000);
       expect(setInterval()).toBe(4);
       setTimeout(() => {expect(moveToNextSlide).toHaveBeenCalled()}, 5000);
    });
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
    it("moveToNextSlide should be without arguments", function () {
        expect(moveToNextSlide()).toBe();
    });
    it("should return nothing with right argument", function () {
        var slide = {style:[{transform: ''}, {transition: ''}]}
        expect(moveToNextSlide(slide)).toBe();
    });
});

describe("moveToPreviousSlide", function () {
    it("moveToPreviousSlide should be defined ", function () {
        expect(moveToPreviousSlide).toBeDefined();
    });
    it("moveToPreviousSlide should be function", function () {
        expect(typeof moveToPreviousSlide).toBe("function");
    });
    it("moveToNextSlide should be without arguments", function () {
        var slide = {style:[{transition:""}, {transform: ""}]};
        expect(moveToPreviousSlide(slide)).toBe(undefined);
    });
});