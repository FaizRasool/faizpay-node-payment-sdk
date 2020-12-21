"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const ErrorHandler_1 = require("./ErrorHandler");
const Errors_1 = require("./Errors");
class Provider {
    constructor(providerId, sortCode, accountNumber) {
        this.providerId = providerId;
        this.sortCode = sortCode;
        this.accountNumber = accountNumber;
    }
    static createProvider(providerId, sortCode = null, accountNumber = null) {
        providerId = providerId.trim();
        if (typeof (sortCode) === "string") {
            sortCode = sortCode.trim();
        }
        if (typeof (accountNumber) === "string") {
            accountNumber = accountNumber.trim();
        }
        if (sortCode != "" && (sortCode === null || sortCode === void 0 ? void 0 : sortCode.length) != 6) {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_7);
        }
        if (accountNumber != "" && (accountNumber === null || accountNumber === void 0 ? void 0 : accountNumber.length) != 8) {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_8);
        }
        if (providerId == "" && (sortCode != "" || accountNumber != "")) {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_9);
        }
        if (sortCode != "" && accountNumber == "") {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_10);
        }
        if (accountNumber != "" && sortCode == "") {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_10);
        }
        return new Provider(providerId, sortCode, accountNumber);
    }
    getProviderId() {
        return this.providerId;
    }
    getSortCode() {
        return this.sortCode;
    }
    getAccountNumber() {
        return this.accountNumber;
    }
}
exports.Provider = Provider;
