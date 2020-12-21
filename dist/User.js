"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(email, firstName, lastName, contactNumber) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
    }
    static createUser(email, firstName = null, lastName = null, contactNumber = null) {
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
