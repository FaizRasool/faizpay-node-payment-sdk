"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_1 = require("./ErrorHandler");
const Errors_1 = require("./Errors");
const NumberFormatter_1 = require("./Helper/NumberFormatter");
class Payment {
    constructor(connection, orderId, amount) {
        this.alg = "HS512";
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
}
