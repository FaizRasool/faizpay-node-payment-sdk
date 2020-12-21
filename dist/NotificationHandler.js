"use strict";
/*
import { Connection } from "./Connection";
import { NumberFormatter } from "../src/Helper/NumberFormatter";
import { Errors } from "./Errors";

class NotificationHandler {
    alg: [string] = ["HS512"];
    connection: Connection;
    token: [];

    public static createNotificationHandler(connection: Connection, token: string) {

        try {
            token = jwt(token, connection.getTerminalSecret(), this.alg);
        
        } catch {

        }
    }

    constructor(connection: Connection, token: []) {
        this.connection = connection;
        this.token = token;
    }

    public validateAmount(requestedAmount: string) {
        const numericStringRegex = /^-?[\d.]+(?:e-?\d+)?$/;
        
        if (!numericStringRegex.test(requestedAmount)) {
            return false;
        }

        if (NumberFormatter.formatNumber(this.token["requestAmount"]) != NumberFormatter.formatNumber(requestedAmount)) {
            return false;
        }

        return true;

    }

    public getOrderID() {
        return this.token["orderID"];
    }

    public getRequestedAmount() {
        return this.token["requestAmount"];
    }

    public getNetAmount() {
        return this.token["netAmount"];
    }

    public getId() {
        return this.token["id"];
    }

    public getTerminal() {
        return this.token["terminal"];
    }

}
*/ 
