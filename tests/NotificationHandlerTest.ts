import { expect } from "chai";
import { Connection } from "../src/Connection";
import { ErrorHandler } from "../src/ErrorHandler";
import { Errors } from "../src/Errors";
import { NotificationHandler } from "../src/NotificationHandler";
import jwt from "jwt-simple";

const getValidConnection = () => {
    return Connection.createConnection("1536bc14-9273-460e-9711-7e96733616fe",
"f9fd95d5-2acb-4643-b3fb-b16999f37175");
}

describe("NotificationHandler test", () => {  

    it(`Invalid 'token' parameter for NotificationHandler.createNotificationHandler() should
    return CODE_16 error.`, () => {

        const connection = getValidConnection(); 

        if (connection instanceof Connection) {

            const payment = NotificationHandler.createNotificationHandler(connection, "wrong");

            expect(payment).to.be.instanceOf(ErrorHandler);

            if (payment instanceof ErrorHandler) {
                expect(payment.getCode()).to.be.eql(Errors.CODE_16[0]);
                expect(payment.getMessage()).to.be.eql(Errors.CODE_16[1]);
            }

        }
        
    });

    it("Invalid secret for NotificationHandler.createNotificationHandler() should return CODE_16 error.", () => {

        const connection = getValidConnection();

        const token = jwt.encode({
            id: "1",
            orderID: "abc",
            requestAmount: "10",
            netAmount: "10",
            terminal: "1536bc14-9273-460e-9711-7e96733616fe"
        }, 
        "asd", 
        "HS512")

        if (connection instanceof Connection) {

            const payment = NotificationHandler.createNotificationHandler(connection, token);

            expect(payment).to.be.instanceOf(ErrorHandler);

            if (payment instanceof ErrorHandler) {

                expect(payment.getCode()).to.be.eql(Errors.CODE_16[0]);
                expect(payment.getMessage()).to.be.eql(Errors.CODE_16[1]);

            }
        }
        
    });

    it("Expired token for NotificationHandler.createNotificationHandler() should return CODE_16 error.", () => {

        const connection = getValidConnection();

        const date = Date.now()/1000;
        const time = Math.round(date);

        const token = jwt.encode({
            exp: time - 1000,
            id: "1",
            orderID: "abc",
            requestAmount: "10",
            netAmount: "10",
            terminal: "1536bc14-9273-460e-9711-7e96733616fe"
        }, 
        "f9fd95d5-2acb-4643-b3fb-b16999f37175", 
        "HS512")

        if (connection instanceof Connection) {

            const payment = NotificationHandler.createNotificationHandler(connection, token);

            expect(payment).to.be.instanceOf(ErrorHandler);

            if (payment instanceof ErrorHandler) {

                expect(payment.getCode()).to.be.eql(Errors.CODE_16[0]);
                expect(payment.getMessage()).to.be.eql(Errors.CODE_16[1]);

            }
        }
        
    });

    it(`Invalid token content for NotificationHandler.createNotificationHandler() 
    should return CODE_17 error.`, () => {

        const connection = getValidConnection();

        const token = jwt.encode({
            id: "1",
            netAmount: "10",
            terminal: "1536bc14-9273-460e-9711-7e96733616fe"
        }, 
        "f9fd95d5-2acb-4643-b3fb-b16999f37175", 
        "HS512")

        if (connection instanceof Connection) {

            const payment = NotificationHandler.createNotificationHandler(connection, token);

            expect(payment).to.be.instanceOf(ErrorHandler);

            if (payment instanceof ErrorHandler) {

                expect(payment.getCode()).to.be.eql(Errors.CODE_17[0]);
                expect(payment.getMessage()).to.be.eql(Errors.CODE_17[1]);

            }
        }
        
    });

    it(`Secret passed in as terminal (mismatch) for NotificationHandler.createNotificationHandler() 
    should return CODE_18 error.`, () => {

        const connection = getValidConnection();

        const token = jwt.encode({
            id: "1",
            orderID: "abc",
            requestAmount: "10",
            netAmount: "10",
            terminal: "f9fd95d5-2acb-4643-b3fb-b16999f37175"
        }, 
        "f9fd95d5-2acb-4643-b3fb-b16999f37175", 
        "HS512")

        if (connection instanceof Connection) {

            const payment = NotificationHandler.createNotificationHandler(connection, token);

            expect(payment).to.be.instanceOf(ErrorHandler);

            if (payment instanceof ErrorHandler) {

                expect(payment.getCode()).to.be.eql(Errors.CODE_18[0]);
                expect(payment.getMessage()).to.be.eql(Errors.CODE_18[1]);

            }
        }
        
    });

    it(`Valid data for NotificationHandler.createNotificationHandler() should return 
    new NotificationHandler.`, () => {

        const connection = getValidConnection();

        const token = jwt.encode({
            id: "1",
            orderID: "abc",
            requestAmount: "10.00",
            netAmount: "10.00",
            terminal: "1536bc14-9273-460e-9711-7e96733616fe"
        }, 
        "f9fd95d5-2acb-4643-b3fb-b16999f37175", 
        "HS512")

        if (connection instanceof Connection) {

            const payment = NotificationHandler.createNotificationHandler(connection, token);

            expect(payment).to.be.instanceOf(NotificationHandler);

            if (payment instanceof NotificationHandler) {

                expect(payment.getId()).to.be.eql("1");
                expect(payment.getOrderID()).to.be.eql("abc");
                expect(payment.getRequestedAmount()).to.be.eql("10.00");
                expect(payment.getNetAmount()).to.be.eql("10.00");
                expect(payment.getTerminal()).to.be.eql("1536bc14-9273-460e-9711-7e96733616fe");

            }
        }
        
    });

    it("validateAmount() test for NotificationHandler.", () => {

        const connection = getValidConnection();

        const token = jwt.encode({
            id: "1",
            orderID: "abc",
            requestAmount: "10.00",
            netAmount: "10.00",
            terminal: "1536bc14-9273-460e-9711-7e96733616fe"
        }, 
        "f9fd95d5-2acb-4643-b3fb-b16999f37175", 
        "HS512")

        if (connection instanceof Connection) {

            const payment = NotificationHandler.createNotificationHandler(connection, token);

            expect(payment).to.be.instanceOf(NotificationHandler);

            if (payment instanceof NotificationHandler) {

                expect(payment.validateAmount("10.00")).to.equal(true); 
                expect(payment.validateAmount("10.00000000000000")).to.equal(true); 
                expect(payment.validateAmount("10")).to.equal(true); 
                expect(payment.validateAmount("11.00000001")).to.equal(false); 
                expect(payment.validateAmount("ABC")).to.equal(false); 
                expect(payment.validateAmount("A$$!@£!@£!@3BC")).to.equal(false); 

            }
        }
        
    });

    it("get() functions tests for NotificationHandler.", () => {

        const connection = getValidConnection();

        const token = jwt.encode({
            id: "1",
            orderID: "abc",
            requestAmount: "10.00",
            netAmount: "11.00",
            terminal: "1536bc14-9273-460e-9711-7e96733616fe"
        }, 
        "f9fd95d5-2acb-4643-b3fb-b16999f37175", 
        "HS512")

        if (connection instanceof Connection) {

            const payment = NotificationHandler.createNotificationHandler(connection, token);

            expect(payment).to.be.instanceOf(NotificationHandler);

            if (payment instanceof NotificationHandler) {

                expect(payment.getRequestedAmount()).to.be.eql("10.00"); 
                expect(payment.getTerminal()).to.be.eql("1536bc14-9273-460e-9711-7e96733616fe"); 
                expect(payment.getOrderID()).to.be.eql("abc"); 
                expect(payment.getNetAmount()).to.be.eql("11.00"); 
                expect(payment.getId()).to.be.eql("1"); 

            }
        }
        
    });

})