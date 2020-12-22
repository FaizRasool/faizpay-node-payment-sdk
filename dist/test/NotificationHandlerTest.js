"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Connection_1 = require("../Connection");
const ErrorHandler_1 = require("../ErrorHandler");
const NotificationHandler_1 = require("../NotificationHandler");
const id = "1536bc14-9273-460e-9711-7e96733616fe";
const secret = "f9fd95d5-2acb-4643-b3fb-b16999f37175";
const getValidConnection = () => {
    return Connection_1.Connection.createConnection(id, secret);
};
describe("NotificationHandler test", () => {
    it(`Invalid 'token' parameter for NotificationHandler.createNotificationHandler() should \n
    return CODE_16 error.`, () => {
        const connection = getValidConnection();
        const payment = NotificationHandler_1.NotificationHandler.createNotificationHandler(connection, "wrong");
        chai_1.expect(payment).to.be.instanceOf(ErrorHandler_1.ErrorHandler);
    });
});
