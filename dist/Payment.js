"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const Provider_1 = require("./Provider");
const User_1 = require("./User");
const ErrorHandler_1 = require("./ErrorHandler");
const Errors_1 = require("./Errors");
const NumberFormatter_1 = require("./Helper/NumberFormatter");
class Payment {
    constructor(connection, orderId, amount) {
        this.endpoint = 'https://faizpay-staging.netlify.app/pay?token=';
        this.tokenExpiry = (60 * 120);
        this.connection = connection;
        this.orderId = orderId;
        this.amount = amount;
    }
    static createPayment(connection, orderId, amount) {
        orderId = orderId.trim();
        if (orderId === "") {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_3);
        }
        if (amount === "" || amount === "0.00" || (Number)(amount) < 0) {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_4);
        }
        if (!NumberFormatter_1.NumberFormatter.validateTwoDecimals(amount)) {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_5);
        }
        if (orderId.length > 255) {
            return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_6);
        }
        return new Payment(connection, orderId, amount);
    }
    setUser(user) {
        this.user = user;
        return this.user;
    }
    setProvider(provider) {
        this.provider = provider;
        return this.provider;
    }
    process(redirectBrowser = false) {
        let date = new Date();
        let currentUnixTimeStamp = date.getTime();
        let payload = {
            "iat": currentUnixTimeStamp,
            "exp": currentUnixTimeStamp + this.tokenExpiry,
            "terminalID": this.connection.getTerminalId(),
            "orderID": this.orderId,
            "amount": this.amount
        };
        if (this.user instanceof User_1.User) {
            payload.email = this.user.getEmail();
            payload.firstName = this.user.getFirstName();
            payload.lastName = this.user.getLastName();
            payload.contactNumber = this.user.getContactNumber();
        }
        if (this.provider instanceof Provider_1.Provider) {
            payload.bankID = this.provider.getProviderId();
            payload.sortCode = this.provider.getSortCode();
            payload.accountNumber = this.provider.getAccountNumber();
        }
        const jwtToken = jwt_simple_1.default.encode(payload, this.connection.getTerminalSecret(), "HS512");
        const url = this.endpoint + jwtToken;
        return url;
    }
}
