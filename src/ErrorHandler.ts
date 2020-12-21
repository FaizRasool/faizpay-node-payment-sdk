class ErrorHandler {
    private code;
    private message;

    constructor(code: (string | number)[]) {
        this.code = code[0];
        this.message = code[1];
    }

    public getCode() {
        return this.code;
    }

    public getMessage() {
        return this.message;
    }
}

export { ErrorHandler };