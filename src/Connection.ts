import { ErrorHandler } from "./ErrorHandler";
import { Errors } from "./Errors";

class Connection {
    protected terminalId: string;
    protected terminalSecret: string;
    
    public static createConnection(terminalId: string, terminalSecret: string) {

        if (!this.validate(terminalId)) {
            return new ErrorHandler(Errors.CODE_1);    

        } else if (!this.validate(terminalSecret)) {
            return new ErrorHandler(Errors.CODE_2);

        } else {
            return new Connection(terminalId, terminalSecret);
        }
    }

    private static validate(uuid: string) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

        if (typeof(uuid) !== "string" || !uuidRegex.test(uuid)) {
            return false;

        } else {
            return true;
        }
    }

    constructor(terminalId: string, terminalSecret: string) {
        this.terminalId = terminalId;
        this.terminalSecret = terminalSecret;
    }

    public getTerminalId() {
        return this.terminalId;
    }

    public getTerminalSecret() {
        return this.terminalSecret;
    }
}

export { Connection };