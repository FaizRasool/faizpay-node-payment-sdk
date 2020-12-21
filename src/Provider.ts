import { ErrorHandler } from "./ErrorHandler";
import { Errors } from "./Errors";

class Provider {
    private providerId: string | null;
    private sortCode: string | null;
    private accountNumber: string | null;

    public static createProvider(
        providerId: string, 
        sortCode: string | null = null, 
        accountNumber: string | null = null) {

        providerId = providerId.trim();

        if (typeof(sortCode) === "string") {
            sortCode = sortCode.trim();
        }

        if (typeof(accountNumber) === "string") {
            accountNumber = accountNumber.trim();
        }

        if (sortCode != "" && sortCode?.length != 6) {
            return new ErrorHandler(Errors.CODE_7);
        }

        if (accountNumber != "" && accountNumber?.length != 8) {
            return new ErrorHandler(Errors.CODE_8);
        }

        if (providerId == "" && (sortCode != "" || accountNumber != "")) {
            return new ErrorHandler(Errors.CODE_9);
        }

        if (sortCode != "" && accountNumber == "") {
            return new ErrorHandler(Errors.CODE_10);
        }

        if (accountNumber != "" && sortCode == "") {
            return new ErrorHandler(Errors.CODE_10);
        }

        return new Provider(providerId, sortCode, accountNumber);
    }
    
    constructor(providerId: string | null, sortCode: string | null, accountNumber: string | null) {
        this.providerId = providerId;
        this.sortCode = sortCode;
        this.accountNumber = accountNumber;
    }

    public getProviderId() {
        return this.providerId;
    }

    public getSortCode() {
        return this.sortCode;
    }

    public getAccountNumber() {
        return this.accountNumber;
    }

}

export { Provider };