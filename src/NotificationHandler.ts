import jwt from "jwt-simple";
import { Connection } from "./Connection";
import { NumberFormatter } from "../src/Helper/NumberFormatter";
import { Errors } from "./Errors";
import { ErrorHandler } from "./ErrorHandler";

class NotificationHandler {
    protected connection: Connection;
    protected token: any;

    public static createNotificationHandler(connection: Connection, token: any) {

        try {
            token = jwt.decode(token, connection.getTerminalSecret(), false, "HS512");  

            token = JSON.parse(JSON.stringify(token));
        
        } catch {
            return new ErrorHandler(Errors.CODE_16);
        }

        if (
            !token.hasOwnProperty("id") ||
            !token.hasOwnProperty("orderID") ||
            !token.hasOwnProperty("requestAmount") ||
            !token.hasOwnProperty("netAmount") ||
            !token.hasOwnProperty("terminal")
        ) {
            return new ErrorHandler(Errors.CODE_17);
        }

        if (token.terminal !== connection.getTerminalId()) {
            return new ErrorHandler(Errors.CODE_18);
        }

        return new NotificationHandler(connection, token);
    }

    constructor(connection: Connection, token: any) {
        this.connection = connection;
        this.token = token;
    }

    public validateAmount(requestedAmount: string) {
        const numericStringRegex = /^-?[\d.]+(?:e-?\d+)?/;
        const requestAmountNumber = parseFloat(requestedAmount);
        
        if (!numericStringRegex.test(requestedAmount)) {
            return false;
        }  

        if (NumberFormatter.formatNumber(this.token.requestAmount) != 
        NumberFormatter.formatNumber(requestAmountNumber)) {
            return false;
        }

        return true;

    }

    public getOrderID() {
        return this.token.orderID;
    }

    public getRequestedAmount() {
        return this.token.requestAmount;
    }

    public getNetAmount() {
        return this.token.netAmount;
    }

    public getId() {
        return this.token.id;
    }

    public getTerminal() {
        return this.token.terminal;
    }

}