import { expect } from "chai";
import { ErrorHandler } from "../src/ErrorHandler";
import { Errors } from "../src/Errors";

describe("ErrorHandler test", () => {  

    it("ErrorHandler.getCode() returns correct error code of the instantiated object.", () => {

        const errorObject = new ErrorHandler(Errors.CODE_1);

        expect(Errors.CODE_1[0]).to.eql(errorObject.getCode()); 

    });

    it("ErrorHandler.getMessage() returns correct message of the instantiated object.", () => {
        
        const errorObject = new ErrorHandler(Errors.CODE_1);

        expect(Errors.CODE_1[1]).to.eql(errorObject.getMessage()); 
  
    });

})