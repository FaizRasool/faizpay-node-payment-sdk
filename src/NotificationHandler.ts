import jwt from "jwt-simple";
import { Connection } from "./Connection";
import { NumberFormatter } from "../src/Helper/NumberFormatter";
import { Errors } from "./Errors";
import { ErrorHandler } from "./ErrorHandler";

class NotificationHandler {
  protected connection: Connection;
  protected token: any;

  public static createNotificationHandler(connection: Connection, token: any): ErrorHandler | NotificationHandler {
    try {
      token = jwt.decode(token, connection.getTerminalSecret(), false, "HS512");
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

  public validateAmount(requestedAmount: string): boolean {
    const numericStringRegex = /^-?[\d.]+(?:e-?\d+)?/;

    if (!numericStringRegex.test(requestedAmount)) {
      return false;
    }

    if (NumberFormatter.formatNumber(this.token.requestAmount) !== NumberFormatter.formatNumber(requestedAmount)) {
      return false;
    }

    return true;
  }

  public getOrderID(): any {
    return this.token.orderID;
  }

  public getRequestedAmount(): any {
    return this.token.requestAmount;
  }

  public getNetAmount(): any {
    return this.token.netAmount;
  }

  public getId(): any {
    return this.token.id;
  }

  public getTerminal(): any {
    return this.token.terminal;
  }
}

export { NotificationHandler };
