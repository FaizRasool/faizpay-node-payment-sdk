"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ErrorHandler_1 = require("../ErrorHandler");
const Errors_1 = require("../Errors");
const User_1 = require("../User");
describe("User test", () => {
    it("Invalid 'email' parameter for User.createUser() should return CODE_11 error.", () => {
        const params = {
            email: "test@test1com",
            firstName: "John",
            lastName: "Smith",
            contactNumber: "07000000"
        };
        const user = User_1.User.createUser(params.email, params.firstName, params.lastName, params.contactNumber);
        chai_1.expect(user).to.be.instanceOf(ErrorHandler_1.ErrorHandler);
        chai_1.expect(user.getCode()).to.be.eql(Errors_1.Errors.CODE_11[0]);
        chai_1.expect(user.getMessage()).to.be.eql(Errors_1.Errors.CODE_11[1]);
    });
    it("Parameters with more than 255 characters should return CODE_12 to CODE_14 errors.", () => {
        const params1 = {
            email: "test@test.com",
            firstName: "a".repeat(256),
            lastName: "Smith",
            contactNumber: "07000000"
        };
        const params2 = {
            email: "test@test.com",
            firstName: "John",
            lastName: "a".repeat(256),
            contactNumber: "07000000"
        };
        const params3 = {
            email: "test@test.com",
            firstName: "John",
            lastName: "Smith",
            contactNumber: "0".repeat(256)
        };
        const user1 = User_1.User.createUser(params1.email, params1.firstName, params1.lastName, params1.contactNumber);
        const user2 = User_1.User.createUser(params2.email, params2.firstName, params2.lastName, params2.contactNumber);
        const user3 = User_1.User.createUser(params3.email, params3.firstName, params3.lastName, params3.contactNumber);
        chai_1.expect(user1).to.be.instanceOf(ErrorHandler_1.ErrorHandler);
        chai_1.expect(user1.getCode()).to.be.eql(Errors_1.Errors.CODE_12[0]);
        chai_1.expect(user1.getMessage()).to.be.eql(Errors_1.Errors.CODE_12[1]);
        chai_1.expect(user2).to.be.instanceOf(ErrorHandler_1.ErrorHandler);
        chai_1.expect(user2.getCode()).to.be.eql(Errors_1.Errors.CODE_13[0]);
        chai_1.expect(user2.getMessage()).to.be.eql(Errors_1.Errors.CODE_13[1]);
        chai_1.expect(user3).to.be.instanceOf(ErrorHandler_1.ErrorHandler);
        chai_1.expect(user3.getCode()).to.be.eql(Errors_1.Errors.CODE_14[0]);
        chai_1.expect(user3.getMessage()).to.be.eql(Errors_1.Errors.CODE_14[1]);
    });
    it("Valid parameters for User.createUser() should return new User.", () => {
        const params = {
            email: "test@test.com",
            firstName: "John",
            lastName: "Smith",
            contactNumber: "07497123123"
        };
        const user = User_1.User.createUser(params.email, params.firstName, params.lastName, params.contactNumber);
        chai_1.expect(user).to.be.instanceOf(User_1.User);
        chai_1.expect(user.getEmail()).to.be.eql(params.email);
        chai_1.expect(user.getFirstName()).to.be.eql(params.firstName);
        chai_1.expect(user.getLastName()).to.be.eql(params.lastName);
        chai_1.expect(user.getContactNumber()).to.be.eql(params.contactNumber);
    });
});
