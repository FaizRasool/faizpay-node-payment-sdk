"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const ErrorHandler_1 = require("./ErrorHandler");
const Errors_1 = require("./Errors");
class User {
    constructor(email, firstName, lastName, contactNumber) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
    }
    static createUser(email, firstName = null, lastName = null, contactNumber = null) {
        if (typeof (email) === "string") {
            email = email.trim();
        }
        if (typeof (firstName) === "string") {
            firstName = firstName.trim();
        }
        if (typeof (lastName) === "string") {
            lastName = lastName.trim();
        }
        if (typeof (contactNumber) === "string") {
            contactNumber = contactNumber.trim();
        }
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (typeof (email) === "string") {
            if (email != "" && !emailRegex.test(email)) {
                return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_11);
            }
            if (email.length > 255) {
                return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_15);
            }
        }
        if (typeof (firstName) === "string") {
            if (firstName.length > 255) {
                return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_12);
            }
        }
        if (typeof (lastName) === "string") {
            if (lastName.length > 255) {
                return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_13);
            }
        }
        if (typeof (contactNumber) === "string") {
            if (contactNumber.length > 255) {
                return new ErrorHandler_1.ErrorHandler(Errors_1.Errors.CODE_14);
            }
        }
        return new User(email, firstName, lastName, contactNumber);
    }
    getEmail() {
        return this.email;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getContactNumber() {
        return this.contactNumber;
    }
}
exports.User = User;
