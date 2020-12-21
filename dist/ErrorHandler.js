"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler {
    constructor(code) {
        this.code = code[0];
        this.message = code[1];
    }
    getCode() {
        return this.code;
    }
    getMessage() {
        return this.message;
    }
}
exports.ErrorHandler = ErrorHandler;
