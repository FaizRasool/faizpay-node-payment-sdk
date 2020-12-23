import { expect } from "chai";
import { Connection } from "../src/Connection";
import { ErrorHandler } from "../src/ErrorHandler";
import { Errors } from "../src/Errors";
import { Provider } from "../src/Provider";
import { User } from "../src/User";
import { Payment } from "../src/Payment";
import jwt from "jwt-simple";

const getValidConnection = () => {

    return Connection.createConnection("1536bc14-9273-460e-9711-7e96733616fe", 
    "f9fd95d5-2acb-4643-b3fb-b16999f37175"); 

}

const getToken = (order: string = "abc", amount: string = "1.00", user: User | null = null, 
provider: Provider | null = null) => {
    
    const connection = getValidConnection();

    if (connection instanceof Connection) {
        const payment = Payment.createPayment(connection, order, amount);

        if (payment instanceof Payment) {
            
            payment.setProvider(provider);
            payment.setUser(user);
            
            const url = payment.process();

            const token = (url.split("="))[1];

            return jwt.decode(token, connection.getTerminalSecret(), false, "HS512");

        }

    }

}

describe("Payment test", () => { 

    it("Empty 'orderId' parameter for Payment.createPayment() should return CODE_3 error.", () => {

        const connection = getValidConnection();

        if (connection instanceof Connection) {

            const params = {
                connection: connection,
                orderId: "",
                amount: "10.00"
            }

            const payment = Payment.createPayment(params.connection, params.orderId, params.amount);

            expect(payment).to.be.instanceof(ErrorHandler);

            if (payment instanceof ErrorHandler) {

                expect(payment.getCode()).to.be.eql(Errors.CODE_3[0]);
                expect(payment.getMessage()).to.be.eql(Errors.CODE_3[1]);

            }

        }
        
    });

    it("Space tab 'orderId' parameter for Payment.createPayment() should return CODE_3 error.", () => {

        const connection = getValidConnection();

        if (connection instanceof Connection) {

            const params1 = {
                connection: connection,
                orderId: "   ",
                amount: "10.00"
            }

            const params2 = {
                connection: connection,
                orderId: "                     ",
                amount: "10.00"
            }


            const payment1 = Payment.createPayment(params1.connection, params1.orderId, params1.amount);
            const payment2 = Payment.createPayment(params2.connection, params2.orderId, params2.amount);

            expect(payment1).to.be.instanceof(ErrorHandler);
            expect(payment2).to.be.instanceof(ErrorHandler);

            if (payment1 instanceof ErrorHandler) {

                expect(payment1.getCode()).to.be.eql(Errors.CODE_3[0]);
                expect(payment1.getMessage()).to.be.eql(Errors.CODE_3[1]);

            }

            if (payment2 instanceof ErrorHandler) {

                expect(payment2.getCode()).to.be.eql(Errors.CODE_3[0]);
                expect(payment2.getMessage()).to.be.eql(Errors.CODE_3[1]);

            }

        }
        
    });

    it(`'orderId' parameter greater than 255 characters for Payment.createPayment() 
    should return CODE_6 error.`, () => {

        const connection = getValidConnection();

        if (connection instanceof Connection) {

            const params = {
                connection: connection,
                orderId: "a".repeat(256),
                amount: "10.00"
            }

            const payment = Payment.createPayment(params.connection, params.orderId, params.amount);

            expect(payment).to.be.instanceof(ErrorHandler);

            if (payment instanceof ErrorHandler) {

                expect(payment.getCode()).to.be.eql(Errors.CODE_6[0]);
                expect(payment.getMessage()).to.be.eql(Errors.CODE_6[1]);

            }

        }
        
    });

    it("Zero 'amount' parameter for Payment.createPayment() should return CODE_4 error.", () => {

        const connection = getValidConnection();

        if (connection instanceof Connection) {

            const params = {
                connection: connection,
                orderId: "abc",
                amount: "0.00"
            }

            const payment = Payment.createPayment(params.connection, params.orderId, params.amount);

            expect(payment).to.be.instanceof(ErrorHandler);

            if (payment instanceof ErrorHandler) {

                expect(payment.getCode()).to.be.eql(Errors.CODE_4[0]);
                expect(payment.getMessage()).to.be.eql(Errors.CODE_4[1]);

            }

        }
        
    });

    it("Empty 'amount' parameter for Payment.createPayment() should return CODE_4 error.", () => {

        const connection = getValidConnection();

        if (connection instanceof Connection) {

            const params = {
                connection: connection,
                orderId: "abc",
                amount: ""
            }

            const payment = Payment.createPayment(params.connection, params.orderId, params.amount);

            expect(payment).to.be.instanceof(ErrorHandler);

            if (payment instanceof ErrorHandler) {

                expect(payment.getCode()).to.be.eql(Errors.CODE_4[0]);
                expect(payment.getMessage()).to.be.eql(Errors.CODE_4[1]);

            }

        }
        
    });

    it("Negative 'amount' parameter for Payment.createPayment() should return CODE_4 error.", () => {

        const connection = getValidConnection();

        if (connection instanceof Connection) {

            const params = {
                connection: connection,
                orderId: "abc",
                amount: "-1.00"
            }

            const payment = Payment.createPayment(params.connection, params.orderId, params.amount);

            expect(payment).to.be.instanceof(ErrorHandler);

            if (payment instanceof ErrorHandler) {

                expect(payment.getCode()).to.be.eql(Errors.CODE_4[0]);
                expect(payment.getMessage()).to.be.eql(Errors.CODE_4[1]);

            }

        }
        
    });

    it("Non 2 decimal point 'amount' parameter for Payment.createPayment() should return CODE_5 error.", () => {

        const connection = getValidConnection();

        if (connection instanceof Connection) {

            const params1 = {
                connection: connection,
                orderId: "abc",
                amount: "0.000000001"
            }

            const params2 = {
                connection: connection,
                orderId: "abc",
                amount: "1"
            }

            const payment1 = Payment.createPayment(params1.connection, params1.orderId, params1.amount);
            const payment2 = Payment.createPayment(params2.connection, params2.orderId, params2.amount);

            expect(payment1).to.be.instanceof(ErrorHandler);
            expect(payment2).to.be.instanceof(ErrorHandler);

            if (payment1 instanceof ErrorHandler) {

                expect(payment1.getCode()).to.be.eql(Errors.CODE_5[0]);
                expect(payment1.getMessage()).to.be.eql(Errors.CODE_5[1]);

            }

            if (payment2 instanceof ErrorHandler) {

                expect(payment2.getCode()).to.be.eql(Errors.CODE_5[0]);
                expect(payment2.getMessage()).to.be.eql(Errors.CODE_5[1]);

            }

        }
        
    });

    it("Invalid 'amount' parameter for Payment.createPayment() should return CODE_5 error.", () => {

        const connection = getValidConnection();

        if (connection instanceof Connection) {

            const params = {
                connection: connection,
                orderId: "abc",
                amount: "A.BB"
            }

            const payment = Payment.createPayment(params.connection, params.orderId, params.amount);

            expect(payment).to.be.instanceof(ErrorHandler);

            if (payment instanceof ErrorHandler) {

                expect(payment.getCode()).to.be.eql(Errors.CODE_5[0]);
                expect(payment.getMessage()).to.be.eql(Errors.CODE_5[1]);

            }

        }
        
    });

    it("Valid parameters for Payment.createPayment() should create new Payment.", () => {

        const connection = getValidConnection();

        if (connection instanceof Connection) {

            const params = {
                connection: connection,
                orderId: "abc",
                amount: "1.00"
            }

            const payment = Payment.createPayment(params.connection, params.orderId, params.amount);

            expect(payment).to.be.instanceof(Payment);

        }
        
    });

    it("Token should have the required properties and should be encoded with correct key.", () => {

        const tokenData = getToken();

        expect(tokenData).to.haveOwnProperty("iat");
        expect(tokenData).to.haveOwnProperty("exp");
        expect(tokenData).to.haveOwnProperty("terminalID");
        expect(tokenData).to.haveOwnProperty("orderID");
        expect(tokenData).to.haveOwnProperty("amount");
        
    });
    
    it("Token should have correct values encoded.", () => {

        const params = {
            order: "abc",
            amount: "100.00"
        }

        const tokenData = getToken(params.order, params.amount);

        expect(tokenData.terminalID).to.be.eql("1536bc14-9273-460e-9711-7e96733616fe");
        expect(tokenData.orderID).to.be.eql(params.order);
        expect(tokenData.amount).to.be.eql(params.amount);
        
    });

    it("Token should have correct values for extended usage encoded.", () => {

        const params1 = {
            providerId: "ob-lloyds",
            sortCode: "123456",
            accountNumber: "12345678"
        }

        const params2 = {
            email: "test@test.com",
            firstName: "John",
            lastName: "Smith",
            contactNumber: "07000000"
        }

        const provider = Provider.createProvider(params1.providerId, params1.sortCode, params1.accountNumber);
        const user = User.createUser(params2.email, params2.firstName, params2.lastName, params2.contactNumber);

        if (provider instanceof Provider && user instanceof User) {

            const params3 = {
                order: "abc",
                amount: "100.00",
                user: user,
                provider: provider
            }
    
            const tokenData = getToken(params3.order, params3.amount, params3.user, params3.provider);

            expect(tokenData.terminalID).to.be.eql("1536bc14-9273-460e-9711-7e96733616fe");
            expect(tokenData.orderID).to.be.eql(params3.order); 
            expect(tokenData.amount).to.be.eql(params3.amount);
            
            expect(tokenData.email).to.be.eql(params2.email); 
            expect(tokenData.firstName).to.be.eql(params2.firstName); 
            expect(tokenData.lastName).to.be.eql(params2.lastName);
            expect(tokenData.contactNumber).to.be.eql(params2.contactNumber); 

            expect(tokenData.bankID).to.be.eql(params1.providerId); 
            expect(tokenData.sortCode).to.be.eql(params1.sortCode); 
            expect(tokenData.accountNumber).to.be.eql(params1.accountNumber);
 
        }
        
    });

})