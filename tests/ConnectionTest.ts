import { expect } from "chai";
import { Connection } from "../src/Connection";
import { ErrorHandler } from "../src/ErrorHandler";
import { Errors } from "../src/Errors";

describe("Connection test", () => {  

    it("Invalid 'terminalId' parameter for Connection.createConnection() should return CODE_1 error.", () => {

        const params = {
            terminalId: "aa",
            terminalSecret: "f9fd95d5-2acb-4643-b3fb-b16999f37175"
        }

        const connection = Connection
        .createConnection(params.terminalId, params.terminalSecret); 

        expect(connection).to.be.instanceOf(ErrorHandler);

        if (connection instanceof ErrorHandler) {
            expect(connection.getCode()).to.be.eql(Errors.CODE_1[0]);
            expect(connection.getMessage()).to.be.eql(Errors.CODE_1[1]); 
        }

    });

    it("Invalid 'terminalSecret' parameter for Connection.createConnection() should return CODE_2 error.", () => {

        const params = {
            id: "f9fd95d5-2acb-4643-b3fb-b16999f37175",
            secret: "aa"
        }

        const connection = Connection.createConnection(params.id, params.secret);

        expect(connection).to.be.instanceOf(ErrorHandler);

        if (connection instanceof ErrorHandler) {
            expect(connection.getCode()).to.be.eql(Errors.CODE_2[0]);
            expect(connection.getMessage()).to.be.eql(Errors.CODE_2[1]);
        }

    });

    it("Invalid parameters for Connection.createConnection() should return CODE_1 error.", () => {

        const params = {
            id: "aa",
            secret: "aa"
        }

        const connection = Connection.createConnection(params.id, params.secret);

        expect(connection).to.be.instanceOf(ErrorHandler);

        if (connection instanceof ErrorHandler) {
            expect(connection.getCode()).to.be.eql(Errors.CODE_1[0]);
            expect(connection.getMessage()).to.be.eql(Errors.CODE_1[1]); 
        }

    });

    it("Valid parameters for Connection.createConnection() should return new Connection.", () => {

        const params = {
            id: "1536bc14-9273-460e-9711-7e96733616fe",
            secret: "f9fd95d5-2acb-4643-b3fb-b16999f37175"
        }

        const connection = Connection.createConnection(params.id, params.secret);

        expect(connection).to.be.instanceOf(Connection);

        if (connection instanceof Connection) {
            expect(connection.getTerminalId()).to.be.eql(params.id);
            expect(connection.getTerminalSecret()).to.be.eql(params.secret);
        }

    });

})