"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationHandler = void 0;
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const NumberFormatter_1 = require("../src/Helper/NumberFormatter");
const Errors_1 = require("./Errors");
const ErrorHandler_1 = require("./ErrorHandler");
class NotificationHandler {
    constructor(connection, token) {
        this.connection = connection;
        this.token = token;
    }
    static createNotificationHandler(connection, token) {
        try {
            token = jwt_simple_1.default.decode(token, connection.getTerminalSecret(), false, "HS512");
            token = JSON.parse(JSON.stringify(token));
        }
        catch (_a) {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_16);
        }
        if (!token.hasOwnProperty("id") ||
            !token.hasOwnProperty("orderID") ||
            !token.hasOwnProperty("requestAmount") ||
            !token.hasOwnProperty("netAmount") ||
            !token.hasOwnProperty("terminal")) {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_17);
        }
        if (token.terminal !== connection.getTerminalId()) {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_18);
        }
        return new NotificationHandler(connection, token);
    }
    validateAmount(requestedAmount) {
        const numericStringRegex = /^-?[\d.]+(?:e-?\d+)?/;
        const requestAmountNumber = parseFloat(requestedAmount);
        if (!numericStringRegex.test(requestedAmount)) {
            return false;
        }
        if (NumberFormatter_1.NumberFormatter.formatNumber(this.token.requestAmount) !=
            NumberFormatter_1.NumberFormatter.formatNumber(requestAmountNumber)) {
            return false;
        }
        return true;
    }
    getOrderID() {
        return this.token.orderID;
    }
    getRequestedAmount() {
        return this.token.requestAmount;
    }
    getNetAmount() {
        return this.token.netAmount;
    }
    getId() {
        return this.token.id;
    }
    getTerminal() {
        return this.token.terminal;
    }
}
exports.NotificationHandler = NotificationHandler;
