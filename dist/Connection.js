"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const ErrorHandler_1 = require("./ErrorHandler");
const Errors_1 = require("./Errors");
class Connection {
    constructor(terminalId, terminalSecret) {
        this.terminalId = terminalId;
        this.terminalSecret = terminalSecret;
    }
    static createConnection(terminalId, terminalSecret) {
        if (!this.validate(terminalId)) {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_1);
        }
        else if (!this.validate(terminalSecret)) {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_2);
        }
        else {
            return new Connection(terminalId, terminalSecret);
        }
    }
    static validate(uuid) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
        if (typeof (uuid) !== "string" || !uuidRegex.test(uuid)) {
            return false;
        }
        else {
            return true;
        }
    }
    getTerminalId() {
        return this.terminalId;
    }
    getTerminalSecret() {
        return this.terminalSecret;
    }
}
exports.Connection = Connection;
