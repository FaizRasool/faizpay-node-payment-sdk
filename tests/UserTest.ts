import { expect } from "chai";
import { ErrorHandler } from "../src/ErrorHandler";
import { Errors } from "../src/Errors";
import { User } from "../src/User";

describe("User test", () => {

    it("Invalid 'email' parameter for User.createUser() should return CODE_11 error.", () => {

        const params = {
            email: "test@test1com",
            firstName: "John",
            lastName: "Smith",
            contactNumber: "07000000"
        }

        const user = User.createUser(params.email, params.firstName, params.lastName, 
            params.contactNumber);
        
        expect(user).to.be.instanceOf(ErrorHandler);

        if (user instanceof ErrorHandler) {
            expect(user.getCode()).to.be.eql(Errors.CODE_11[0]);
            expect(user.getMessage()).to.be.eql(Errors.CODE_11[1]);
        }

    });

    it("Parameters with more than 255 characters should return CODE_12 to CODE_14 errors.", () => {

        const params1 = {
            email: "test@test.com",
            firstName: "a".repeat(256),
            lastName: "Smith",
            contactNumber: "07000000"
        }

        const params2 = {
            email: "test@test.com",
            firstName: "John",
            lastName: "a".repeat(256),
            contactNumber: "07000000"
        }

        const params3 = {
            email: "test@test.com",
            firstName: "John",
            lastName: "Smith",
            contactNumber: "0".repeat(256)
        }

        const user1 = User.createUser(params1.email, params1.firstName, params1.lastName, 
            params1.contactNumber);

        const user2 = User.createUser(params2.email, params2.firstName, params2.lastName, 
            params2.contactNumber);

        const user3 = User.createUser(params3.email, params3.firstName, params3.lastName, 
            params3.contactNumber);
        
        expect(user1).to.be.instanceOf(ErrorHandler);

        if (user1 instanceof ErrorHandler) {
            expect(user1.getCode()).to.be.eql(Errors.CODE_12[0]);
            expect(user1.getMessage()).to.be.eql(Errors.CODE_12[1]);
        }

        expect(user2).to.be.instanceOf(ErrorHandler);

        if (user2 instanceof ErrorHandler) {
            expect(user2.getCode()).to.be.eql(Errors.CODE_13[0]);
            expect(user2.getMessage()).to.be.eql(Errors.CODE_13[1]);
        }

        expect(user3).to.be.instanceOf(ErrorHandler);

        if (user3 instanceof ErrorHandler) {
            expect(user3.getCode()).to.be.eql(Errors.CODE_14[0]);
            expect(user3.getMessage()).to.be.eql(Errors.CODE_14[1]);
        }

    });

    it("Valid parameters for User.createUser() should return new User.", () => {

        const params = {
            email: "test@test.com",
            firstName: "John",
            lastName: "Smith",
            contactNumber: "07497123123"
        }

        const user = User.createUser(params.email, params.firstName, params.lastName, 
            params.contactNumber);
        
        expect(user).to.be.instanceOf(User);

        if (user instanceof User) {
            expect(user.getEmail()).to.be.eql(params.email);
            expect(user.getFirstName()).to.be.eql(params.firstName);
            expect(user.getLastName()).to.be.eql(params.lastName);
            expect(user.getContactNumber()).to.be.eql(params.contactNumber); 
        }

    });
})