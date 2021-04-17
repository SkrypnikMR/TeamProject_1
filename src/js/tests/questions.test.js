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

describe("showModal", function () {
    it("should be defined ", function () {
        expect(showModal).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof showModal).toBe("function");
    });
//     var createQuestion = jest.fn()
//     it("should call createQuestion", function () {
//         expect(createQuestion).toHaveBeenCalled();
//     });
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
''

describe("formTextValidation", function () {
    it("should be defined ", function () {
        expect(formTextValidation).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof formTextValidation).toBe("function");
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
        window.document.querySelector = function(str) {
            if (str === ".modalMessage"){
                return {textContent: textError}
            }
        }
        var textError = '1'
        expect(errorText('1')).toBe('1');
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
        var  $text, $trueRadio, $falseRadio, $JSON, $XML, $YAML, $CSV
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
        }
        clearModal();
        expect($text).toHaveProperty('value', '');
        expect($trueRadio).toHaveProperty('checked', false);
        expect($falseRadio).toHaveProperty('checked', false);
        expect($JSON).toHaveProperty('checked', false);
        expect($XML).toHaveProperty('checked', false);
        expect($YAML).toHaveProperty('checked', false);
        expect($CSV).toHaveProperty('checked', false);
    });
})
describe("hideModal", function () {
    it("should be defined ", function () {
        expect(hideModal).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof hideModal).toBe("function");
    });
    // it("should call clearModal and add class hide", function () {
    //     window.document.querySelector = function(str) {
    //         if (str === ".modal"){
    //             window.DOMTokenList.add = function(str) {
    //                 if (str === "hide"){
    //                     var $modal = {}
    //                     $modal[classList] =  {0: 'modalDeleteConfirmation', 1: 'hide', length: 2, value: 'modalDeleteConfirmation, hide'}
    //                     return $modal.classList
    //                 }
    //             }
    //         }
    //     }
    //     // window.DOMTokenList.add = function(str) {
    //     //     if (str === "hide"){
    //     //         var $modal = {}
    //     //         $modal[classList] =  {0: 'modalDeleteConfirmation', 1: 'hide', length: 2, value: 'modalDeleteConfirmation, hide'}
    //     //         return $modal.classList
    //     //     }
    //     // }
    //     var clearModal = jest.fn()
    //     hideModal(clearModal)
    //     expect(clearModal).toHaveBeenCalled();
    // });
})
describe("showDeleteModal", function () {
    it("should be defined ", function () {
        expect(showDeleteModal).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof showDeleteModal).toBe("function");
    });
})

describe("hideDeleteModal", function () {
    it("should be defined ", function () {
        expect(hideDeleteModal).toBeDefined();
    });
    it("should be function", function () {
        expect(typeof hideDeleteModal).toBe("function");
    });
})

describe("deleteConfirm", function () {
    it("should be defined ", function () {
        expect(deleteConfirm).toBeDefined();
    });
    it("should be function", function () {
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
    it("should set theme into local storage", function () {
        var $themeSelect = {value: '1'}
        window.document.querySelector = function(str) {
            if (str === ".header__filter-theme"){
                window.localStorage.setItem = function(str, obj){
                    var $themeSelect = {value: '1'}
                    if (str === "theme"){
                        return {"theme": $themeSelect.value}
                    }
                }
            }
        }       
        var LS = {"theme": $themeSelect.value}
        var getAndRender = jest.fn()
        expect(themeSelectGetRequest(getAndRender)).toBe(LS);
        expect(getAndRender).toHaveBeenCalled();
    });
})