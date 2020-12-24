import jwt from "jwt-simple";
import { Connection } from "./Connection";
import { Provider } from "./Provider";
import { User } from "./User";
import { ErrorHandler } from "./ErrorHandler";
import { Errors } from "./Errors";
import { NumberFormatter } from "./Helper/NumberFormatter";

class Payment {
  private endpoint: string = "https://faizpay-staging.netlify.app/pay?token=";
  private tokenExpiry: number = 60 * 120;
  protected connection: Connection;
  protected orderId: string;
  protected amount: string;
  protected user: User | null;
  protected provider: Provider | null;

  public static createPayment(connection: Connection, orderId: string, amount: string): ErrorHandler | Payment {
    orderId = orderId.trim();

    if (orderId === "") {
      return new ErrorHandler(Errors.CODE_3);
    }

    if (amount === "" || amount === "0.00" || Number(amount) < 0) {
      return new ErrorHandler(Errors.CODE_4);
    }

    if (!NumberFormatter.validateTwoDecimals(amount)) {
      return new ErrorHandler(Errors.CODE_5);
    }

    if (orderId.length > 255) {
      return new ErrorHandler(Errors.CODE_6);
    }

    return new Payment(connection, orderId, amount);
  }

  private constructor(connection: Connection, orderId: string, amount: string) {
    this.connection = connection;
    this.orderId = orderId;
    this.amount = amount;
  }

  public setUser(user: User | null): User | null {
    this.user = user;
    return this.user;
  }

  public setProvider(provider: Provider | null): Provider | null {
    this.provider = provider;
    return this.provider;
  }

  public process(): string {
    const currentUnixTimeStamp = Date.now() / 1000;

    const payload: any = {
      iat: currentUnixTimeStamp,
      exp: this.tokenExpiry + currentUnixTimeStamp,
      terminalID: this.connection.getTerminalId(),
      orderID: this.orderId,
      amount: this.amount,
      email: null,
      firstName: null,
      lastName: null,
      contactNumber: null,
      bankID: null,
      sortCode: null,
      accountNumber: null
    };

    if (this.user instanceof User) {
      payload.email = this.user.getEmail();
      payload.firstName = this.user.getFirstName();
      payload.lastName = this.user.getLastName();
      payload.contactNumber = this.user.getContactNumber();
    }

    if (this.provider instanceof Provider) {
      payload.bankID = this.provider.getProviderId();
      payload.sortCode = this.provider.getSortCode();
      payload.accountNumber = this.provider.getAccountNumber();
    }

    const jwtToken = jwt.encode(payload, this.connection.getTerminalSecret(), "HS512");

    const url = this.endpoint + jwtToken;
    return url;
  }
}

export { Payment };
