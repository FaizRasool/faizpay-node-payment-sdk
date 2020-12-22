"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ErrorHandler_1 = require("../ErrorHandler");
const Errors_1 = require("../Errors");
describe("ErrorHandler test", () => {
    it("ErrorHandler.getCode() returns correct error code of the instantiated object.", () => {
        const errorObject = new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_1);
        chai_1.expect(Errors_1.Errors.CODE_1[0]).to.eql(errorObject.getCode());
    });
    it("ErrorHandler.getMessage() returns correct message of the instantiated object.", () => {
        const errorObject = new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_1);
        chai_1.expect(Errors_1.Errors.CODE_1[1]).to.eql(errorObject.getMessage());
    });
});
