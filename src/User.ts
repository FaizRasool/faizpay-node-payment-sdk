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