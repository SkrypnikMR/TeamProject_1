import { set } from 'lodash';
import {getRequest, postRequest, deleteRequest, putRequest, getDevelopers, getQuestions} from '../request';

var open, send, onload, onerror, addEvenListener, setRequestHeader;
function createXHRmock(status) {
    open = jest.fn();
    onload = jest.fn();
    onerror = jest.fn();
    send = jest.fn().mockImplementation(function(){
        this.onload();
        if(status < 400){
            this.onerror();
        }
    });
    addEventListener = jest.fn();
    setRequestHeader = jest.fn();
    var xhrMockClass = function () {
        return {
            addEventListener,
            setRequestHeader,
            onload,
            onerror,
            open,
            send,
            status
        };
    };

    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
}


describe("getRequest", function(){
   
    it("should be defined", function(){
        expect(getRequest).toBeDefined();
    });

    it("should work succes and call open", function(){
        createXHRmock(200);
        getRequest('/developers',".json").catch(function(e){
            expect(open).toBeCalledWith('GET', '/developers.json', true);
        });
        
    });

    it("should work succes and call send", function(){
        createXHRmock(200);
        getRequest('/developers', '.json').then(function(e){
            expect(send).toBeCalledWith();
        });
    });


});

describe("postRequest", function(){
    it("should be defined", function(){
        expect(postRequest).toBeDefined();
    });

    it("should work succes and call open", function(){
        createXHRmock(400);
        postRequest('/questions', '.csv').catch(function(e){
            console.log(e);
        });
        expect(open).toBeCalledWith('POST', '/questions.csv', true);
    });

    it("should work succes and call open", function(){
        createXHRmock(200);
        postRequest('/developers', '.json').catch(function(e){
            console.log(e);
        });
        expect(open).toBeCalledWith('POST', '/developers.json', true);
    });

    it("should work succes and call setRequestHeader", function(){
        createXHRmock(200);
        postRequest('/questions', '.csv').catch(function(e){
           console.log(e);
        } );
        expect(setRequestHeader).toBeCalledWith("Content-Type", "application/json");
    });

    it("should work succes and call setRequestHeader", function(){
        createXHRmock(200);
        postRequest('/developers', '.json').catch(function(e){
            console.log(e);
        } );
        expect(setRequestHeader).toBeCalledWith("Content-Type", "application/json");
    });

    it("should succes and call send", function(){
        var reqBody = {guest:{text: "question"}};
        createXHRmock(200);
        postRequest('/questions', '.csv', reqBody).catch(function(e){
            console.log(e);
        });
        expect(send).toBeCalledWith(JSON.stringify(reqBody));
    });
});

describe("deleteRequest", function(){
    it("should be defined", function(){
        expect(deleteRequest).toBeDefined();
    });

    it("should work succes and call open", function(){
        createXHRmock(200);
        deleteRequest('/questions', '.csv').catch(function(e){
            console.log(e);
        });
        expect(open).toBeCalledWith('DELETE', '/questions.csv', true);
    });

    it("should succes and call send", function(){
        var reqBody = {guest:{text: "question"}};
        createXHRmock(200);
        deleteRequest('/questions', '.csv', reqBody).catch(function(e){
            console.log(e);
        });
        expect(send).toBeCalledWith(JSON.stringify(reqBody));
    });

    it("should work succes and call setRequestHeader", function(){
        createXHRmock(200);
        deleteRequest('/developers', '.json').catch(function(e){
            console.log(e);
        } );
        expect(setRequestHeader).toBeCalledWith("Content-Type", "application/json");
    });
});

describe("putRequest", function(){
    it("should be defined", function(){
        expect(putRequest).toBeDefined();
    });

    it("should work succes and call open", function(){
        createXHRmock(200);
        putRequest('/questions', '.csv').catch(function(e){
            console.log(e);
        });
        expect(open).toBeCalledWith('PUT', '/questions.csv', true);
    });

    it("should succes and call send", function(){
        var reqBody = {guest:{text: "question"}};
        createXHRmock(200);
        putRequest('/questions', '.csv', reqBody).catch(function(e){
            console.log(e);
        });
        expect(send).toBeCalledWith(JSON.stringify(reqBody));
    });

    it("should work succes and call setRequestHeader", function(){
        createXHRmock(200);
        putRequest('/developers', '.json').catch(function(e){
            console.log(e);
        } );
        expect(setRequestHeader).toBeCalledWith("Content-Type", "application/json");
    });
});

describe("getDevelopers", function(){
    it("should be defined", function(){
        expect(getDevelopers).toBeDefined();
    });
});

describe("getQuestions", function(){
    it("should be defined", function(){
        expect(getQuestions).toBeDefined();
    });
});
