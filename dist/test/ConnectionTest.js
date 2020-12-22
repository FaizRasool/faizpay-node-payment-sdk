"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Connection_1 = require("../Connection");
const ErrorHandler_1 = require("../ErrorHandler");
const Errors_1 = require("../Errors");
describe("Connection test", () => {
    it("Invalid 'terminalId' parameter for Connection.createConnection() should return CODE_1 error.", () => {
        const params = {
            terminalId: "aa",
            terminalSecret: "f9fd95d5-2acb-4643-b3fb-b16999f37175"
        };
        const connection = Connection_1.Connection
            .createConnection(params.terminalId, params.terminalSecret);
        chai_1.expect(connection).to.be.instanceOf(ErrorHandler_1.ErrorHandler);
        chai_1.expect(connection.getCode()).to.be.eql(Errors_1.Errors.CODE_1[0]);
        chai_1.expect(connection.getMessage()).to.be.eql(Errors_1.Errors.CODE_1[1]);
    });
    it("Invalid 'terminalSecret' parameter for Connection.createConnection() should return CODE_2 error.", () => {
        const params = {
            id: "f9fd95d5-2acb-4643-b3fb-b16999f37175",
            secret: "aa"
        };
        const connection = Connection_1.Connection.createConnection(params.id, params.secret);
        chai_1.expect(connection).to.be.instanceOf(ErrorHandler_1.ErrorHandler);
        chai_1.expect(connection.getCode()).to.be.eql(Errors_1.Errors.CODE_2[0]);
        chai_1.expect(connection.getMessage()).to.be.eql(Errors_1.Errors.CODE_2[1]);
    });
    it("Invalid parameters for Connection.createConnection() should return CODE_1 error.", () => {
        const params = {
            id: "aa",
            secret: "aa"
        };
        const connection = Connection_1.Connection.createConnection(params.id, params.secret);
        chai_1.expect(connection).to.be.instanceOf(ErrorHandler_1.ErrorHandler);
        chai_1.expect(connection.getCode()).to.be.eql(Errors_1.Errors.CODE_1[0]);
        chai_1.expect(connection.getMessage()).to.be.eql(Errors_1.Errors.CODE_1[1]);
    });
    it("Valid parameters for Connection.createConnection() should return new Connection.", () => {
        const params = {
            id: "1536bc14-9273-460e-9711-7e96733616fe",
            secret: "f9fd95d5-2acb-4643-b3fb-b16999f37175"
        };
        const connection = Connection_1.Connection.createConnection(params.id, params.secret);
        chai_1.expect(connection).to.be.instanceOf(Connection_1.Connection);
        chai_1.expect(connection.getTerminalId()).to.be.eql(params.id);
        chai_1.expect(connection.getTerminalSecret()).to.be.eql(params.secret);
    });
});
