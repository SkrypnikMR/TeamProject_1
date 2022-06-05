var {showModal, 
    checkAnswer, 
    checkType,
    answerValidation,
    formTextValidation,
    errorText,
    clearModal,
    hideModal,
    listenDeleteButtons,
    showDeleteModal,
    deleteConfirm,
    hideDeleteModal,
    listenTypeSelect,
    listenThemeSelect,
    themeSelectGetRequest,
    typeSelectGetRequest,
    getAndRender
} = require('../questions');

//showModal гребаный класс лист как работает
// ($node.isEqualNode($text))
// addEventListener("click", deleteConfirm)
// .then как тестировать
// функция в функции как передавать? listenTypeSelect and listenThemeSelect

describe("showModal", function () {
    it("should be defined ", function () {
        expect(showModal).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof showModal).toBe("function");
    });
});

describe("checkAnswer", function () {
    it("should be defined ", function () {
        expect(checkAnswer).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof checkAnswer).toBe("function");
    });
    it("should return true with true button checked", function () {
        window.document.querySelector = function(str) {
            if (str === ".TRUERadio"){
                return {checked: true}
            }
        }
        expect(checkAnswer()).toBe(true);
        expect(checkAnswer()).not.toBe(false);
    });
    it("should return false with true button unchecked", function () {
        window.document.querySelector = function(str) {
            if (str === ".TRUERadio"){
                return {checked: false}
            }
        }
        expect(checkAnswer()).toBe(false);
        expect(checkAnswer()).not.toBe(true);
    });
})

describe("checkType", function () {
    it("should be defined ", function () {
        expect(checkType).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof checkType).toBe("function");
    });
    it("should push JSON", function () {
        window.document.querySelector = function(str) {
            if (str === ".question__type-JSON"){
                return {checked: true }
            }
            if (str === ".question__type-XML"){
                return {checked: false }
            }
            if (str === ".question__type-YAML"){
                return {checked: false }
            }
            if (str === ".question__type-CSV"){
                return {checked: false }
            }
        }
        expect(checkType()).toStrictEqual(["JSON"]);
    });
    it("should push XML", function () {
        window.document.querySelector = function(str) {
            if (str === ".question__type-JSON"){
                return {checked: false }
            }
            if (str === ".question__type-XML"){
                return {checked: true }
            }
            if (str === ".question__type-YAML"){
                return {checked: false }
            }
            if (str === ".question__type-CSV"){
                return {checked: false }
            }
        }
        expect(checkType()).toStrictEqual(["XML"]);
    });
    it("should push YAML", function () {
        window.document.querySelector = function(str) {
            if (str === ".question__type-JSON"){
                return {checked: false }
            }
            if (str === ".question__type-XML"){
                return {checked: false }
            }
            if (str === ".question__type-YAML"){
                return {checked: true }
            }
            if (str === ".question__type-CSV"){
                return {checked: false }
            }
        }
        expect(checkType()).toStrictEqual(["YAML"]);
    });
    it("should push CSV", function () {
        window.document.querySelector = function(str) {
            if (str === ".question__type-JSON"){
                return {checked: false }
            }
            if (str === ".question__type-XML"){
                return {checked: false }
            }
            if (str === ".question__type-YAML"){
                return {checked: false }
            }
            if (str === ".question__type-CSV"){
                return {checked: true }
            }
        }
        expect(checkType()).toStrictEqual(["CSV"]);
    });
    it("should push all if all four checked", function () {
        window.document.querySelector = function(str) {
            if (str === ".question__type-JSON"){
                return {checked: true }
            }
            if (str === ".question__type-XML"){
                return {checked: true }
            }
            if (str === ".question__type-YAML"){
                return {checked: true }
            }
            if (str === ".question__type-CSV"){
                return {checked: true }
            }
        }
        expect(checkType()).toStrictEqual(['JSON', 'XML', 'YAML', 'CSV']);
    });
    it("should push JSON if none is checked", function () {
        window.document.querySelector = function(str) {
            if (str === ".question__type-JSON"){
                return {checked: false }
            }
            if (str === ".question__type-XML"){
                return {checked: false }
            }
            if (str === ".question__type-YAML"){
                return {checked: false }
            }
            if (str === ".question__type-CSV"){
                return {checked: false }
            }
        }
        expect(checkType()).toStrictEqual(['JSON']);
    });
    it("should maintain order of pushes", function () {
        window.document.querySelector = function(str) {
            if (str === ".question__type-JSON"){
                return {checked: true }
            }
            if (str === ".question__type-XML"){
                return {checked: false }
            }
            if (str === ".question__type-YAML"){
                return {checked: true }
            }
            if (str === ".question__type-CSV"){
                return {checked: false }
            }
        }
        expect(checkType()).toStrictEqual(['JSON', 'YAML']);
    });
})

describe("answerValidation", function () {
    it("should be defined ", function () {
        expect(answerValidation).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof answerValidation).toBe("function");
    });
    it("should return true if TRUE is checked", function () {
        window.document.querySelector = function(str) {
            if (str === ".TRUERadio"){
                return {checked: true}
            }
            if (str === ".FALSERadio"){
                return {checked: false}
            }
        }
        expect(answerValidation()).toBe(true);
    });
    it("should return true if FALSE is checked", function () {
        window.document.querySelector = function(str) {
            if (str === ".TRUERadio"){
                return {checked: false}
            }
            if (str === ".FALSERadio"){
                return {checked: true}
            }
        }
        expect(answerValidation()).toBe(true);
    });
    it("should call errorText if none of the buttons are checked", function () {
        window.document.querySelector = function(str) {
            if (str === ".TRUERadio"){
                return {checked: false}
            }
            if (str === ".FALSERadio"){
                return {checked: false}
            }
        }
        var errorText = jest.fn()
        answerValidation(errorText)
        expect(errorText).toHaveBeenCalled();
    });
})

describe("formTextValidation", function () {
    it("should be defined ", function () {
        expect(formTextValidation).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof formTextValidation).toBe("function");
    });
    it("should call error text and return false if text is empty", function () {
        errorText = jest.fn()
        var $node = {value: ''}

        expect(formTextValidation($node, errorText)).toBe(false);
        expect(errorText).toHaveBeenCalled();
    });
    it("should call error text and return false if text is more than 250 chars long", function () {
        errorText = jest.fn()
        var $node = {value: {length: 300}}

        expect(formTextValidation($node, errorText)).toBe(false);
        expect(errorText).toHaveBeenCalled();
    });
    it("should return true if text is OK", function () {
        errorText = jest.fn()
        var $node = {value: '{length: 300}'}

        expect(formTextValidation($node, errorText)).toBe(true);
        expect(errorText).not.toHaveBeenCalled();
    });
})

describe("errorText", function () {
    it("should be defined ", function () {
        expect(errorText).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof errorText).toBe("function");
    });
    it("should return error message", function () {
        var $node = {textContent: ''}
        var textError = ''
        // window.document.querySelector = function(str) {
        //     if (str === ".modalMessage"){
        //         return {textContent: textError}
        //     }
        // }
        errorText(textError, $node)
        expect($node).toHaveProperty('textContent', '');
    });
})

describe("clearModal", function () {
    it("should be defined ", function () {
        expect(clearModal).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof clearModal).toBe("function");
    });
    it("should clear all nodes", function () {
        var  $text, $trueRadio, $falseRadio, $JSON, $XML, $YAML, $CSV, $theme, $modalMessage
        window.document.querySelector = function(str) {
            if (str === ".question"){
                $text =  {value: ''}
                return $text
            }
            if (str === ".TRUERadio"){
                $trueRadio = {checked: false}
                return $trueRadio
            }
            if (str === ".FALSERadio"){
                 $falseRadio = {checked: false}
                return $falseRadio
            }
            if (str === ".question__type-JSON"){
                 $JSON = {checked: false}
                return $JSON 
            }
            if (str === ".question__type-XML"){
                 $XML = {checked: false}
                return $XML
            }
            if (str === ".question__type-YAML"){
                 $YAML =  {checked: false}
                return $YAML
            }
            if (str === ".question__type-CSV"){
                 $CSV = {checked: false}
                return $CSV 
            }
            if (str === ".theme"){
                $theme = {value: 'HTML'}
               return $theme 
            }
            if (str === ".modalMessage"){
                $modalMessage = {textContent: 'Your question'}
               return $modalMessage 
            }
        }
        clearModal();
        expect($text).toHaveProperty('value', '');
        expect($trueRadio).toHaveProperty('checked', false);
        expect($falseRadio).toHaveProperty('checked', false);
        expect($JSON).toHaveProperty('checked', false);
        expect($XML).toHaveProperty('checked', false);
        expect($YAML).toHaveProperty('checked', false);
        expect($CSV).toHaveProperty('checked', false);
        expect($theme).toHaveProperty('value', 'HTML');
        expect($modalMessage).toHaveProperty('textContent', 'Your question');
    });
})

describe("hideModal", function () {
    it("should be defined ", function () {
        expect(hideModal).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof hideModal).toBe("function");
    });
    it("should return nothing", function(){
        var $modal = {classList: {add: jest.fn()}};
        var clearModal = jest.fn();
        expect(hideModal($modal, clearModal)).toBe();
    });
    it("should call clearModal and change classList", function(){
        var $modal = {classList: {add: jest.fn()}};
        var clearModal = jest.fn();
        hideModal($modal, clearModal)
        expect($modal.classList.add).toHaveBeenCalled();
        expect(clearModal).toHaveBeenCalled();
    });
})

describe("listenDeleteButtons", function () {
    it("should be defined ", function () {
        expect(listenDeleteButtons).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof listenDeleteButtons).toBe("function");
    });
})

describe("showDeleteModal", function () {
    it("should be defined ", function () {
        expect(showDeleteModal).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof showDeleteModal).toBe("function");
    });
    it("should return nothing", function () {
        var $confirmButton, $cancelButton
        window.document.querySelector = function(str) {
            if (str === ".confirmButton"){
                return $confirmButton = {addEventListener: jest.fn()}
            }
            if (str === ".cancelButton"){
                return $cancelButton = {addEventListener: jest.fn()}
            }
        }
        var $modalDelete = {classList: {remove: jest.fn()}};
        hideDeleteModal = jest.fn()
        expect(showDeleteModal($modalDelete, hideDeleteModal, deleteConfirm)).toBe();
    });
})

describe("hideDeleteModal", function () {
    it("should be defined ", function () {
        expect(hideDeleteModal).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof hideDeleteModal).toBe("function");
    });
    it("should return nothing", function(){
        var $modalDelete = {classList: {add: jest.fn()}};
        expect(hideDeleteModal($modalDelete)).toBe();
    });
    // it("should add hide to classList", function(){
    //     var a = {classList: {add: jest.fn()}};
    //     hideDeleteModal(a)
    //     expect(a.classList.add).toHaveBeenCalled();
    // });
})

describe("listenTypeSelect", function () {
    it("should be defined ", function () {
        expect(listenTypeSelect).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof listenTypeSelect).toBe("function");
    });
    it("should add event listener", function () {
        var cb  = jest.fn()
        var a = {addEventListener: jest.fn()}
        listenTypeSelect(a, cb)
        expect(a.addEventListener).toHaveBeenCalled();
        // expect(cb).toHaveBeenCalled();
    });
})

describe("listenThemeSelect", function () {
    it("should be defined ", function () {
        expect(listenThemeSelect).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof listenThemeSelect).toBe("function");
    });
    it("should add event listener", function () {
        var cb  = jest.fn()
        var a = {addEventListener: jest.fn()}
        listenThemeSelect(a, cb)
        expect(a.addEventListener).toHaveBeenCalled();
        // expect(cb).toHaveBeenCalled();
    });
})

describe("deleteConfirm", function () {
    it("should be defined ", function () {
        expect(deleteConfirm).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof deleteConfirm).toBe("function");
    });
    it("should call hideDeleteModal", function () {
        expect(typeof deleteConfirm).toBe("function");
    });
})

describe("themeSelectGetRequest", function () {
    it("should be defined ", function () {
        expect(themeSelectGetRequest).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof themeSelectGetRequest).toBe("function");
    });
    it("should be function", function () {
        expect(typeof themeSelectGetRequest).toBe("function");
    });
    it("should call local storage and callback", function () {
        var a = {}
        // localStorage.setItem = 
        window.localStorage = {setItem: jest.fn()}
        var cb = jest.fn()
        themeSelectGetRequest(a, cb)
        expect(window.localStorage.setItem.mockReturnValue).toBe();
        expect(cb).toHaveBeenCalled();
        // console.log(window.localStorage.setItem = jest.fn());
    });
})

describe("typeSelectGetRequest", function () {
    it("should be defined ", function () {
        expect(typeSelectGetRequest).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof typeSelectGetRequest).toBe("function");
    });
    it("should call local storage and callback", function () {
        var a = {}
        window.localStorage = {setItem: jest.fn()}
        var cb = jest.fn()
        typeSelectGetRequest(a, cb)
        expect(window.localStorage.setItem.mockReturnValue).toBe();
        expect(cb).toHaveBeenCalled();
    });
})

describe("getAndRender", function () {
    it("should be defined ", function () {
        expect(getAndRender).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof getAndRender).toBe("function");
    });
})