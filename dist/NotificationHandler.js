"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotificationHandler {
    constructor(connection, token) {
        this.alg = "HS512";
        this.connection = connection;
        this.token = token;
    }
}
