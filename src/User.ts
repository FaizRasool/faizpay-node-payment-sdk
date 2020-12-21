import { ErrorHandler } from "./ErrorHandler";
import { Errors } from "./Errors";

class User {
    private email: string | null;
    private firstName: string | null;
    private lastName: string | null;
    private contactNumber: string | null;

    public static createUser(
        email: string | null, 
        firstName: string | null = null,
        lastName: string | null = null,
        contactNumber: string | null = null) {

            if (typeof(email) === "string") {
                email = email.trim();
            }

            if (typeof(firstName) === "string") {
                firstName = firstName.trim();
            }

            if (typeof(lastName) === "string") {
                lastName = lastName.trim();
            }

            if (typeof(contactNumber) === "string") {
                contactNumber = contactNumber.trim();
            }

            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (typeof(email) === "string") {
                if (email != "" && !emailRegex.test(email)) {
                    return new ErrorHandler(Errors.CODE_11);
                }
                if (email.length > 255) {
                    return new ErrorHandler(Errors.CODE_15);
                }
            }

            if (typeof(firstName) === "string") {
                if (firstName.length > 255) {
                    return new ErrorHandler(Errors.CODE_12);
                }
            }

            if (typeof(lastName) === "string") {
                if (lastName.length > 255) {
                    return new ErrorHandler(Errors.CODE_13);
                }
            }

            if (typeof(contactNumber) === "string") {
                if (contactNumber.length > 255) {
                    return new ErrorHandler(Errors.CODE_14);
                }
            }
            
            return new User(email, firstName, lastName, contactNumber);
        }

    constructor(
        email: string | null, 
        firstName: string | null, 
        lastName: string | null, 
        contactNumber: string | null) {

        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
    }

    public getEmail() {
        return this.email;
    }

    public getFirstName() {
        return this.firstName;
    }

    public getLastName() {
        return this.lastName;
    }

    public getContactNumber() {
        return this.contactNumber;
    }
}

export { User };