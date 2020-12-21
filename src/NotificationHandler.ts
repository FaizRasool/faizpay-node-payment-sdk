import { Connection } from "./Connection";
import { Errors } from "./Errors";
import jwt_decode from "jwt-decode";

class NotificationHandler {
    alg = "HS512";
    connection;
    token;

    constructor(connection: Connection, token: []) {
        this.connection = connection;
        this.token = token;
    }

}