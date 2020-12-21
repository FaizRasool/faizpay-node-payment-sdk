import { Connection } from "./Connection";
import { Provider } from "./Provider";
import { User } from "./User";
import { ErrorHandler } from "./ErrorHandler";
import { Errors } from "./Errors";
import { NumberFormatter } from "./Helper/NumberFormatter";

class Payment {
    private alg: string = "HS512";
    private endpoint: string = 'https://faizpay-staging.netlify.app/pay?token=';
    private tokenExpiry: number = (60 * 120); 
    protected connection: Connection;
    protected orderId: string;
    protected amount: string;
    protected user: User | null;
    protected provider: Provider | null;

    public static createPayment(connection: Connection, orderId: string, amount: string) {
        orderId = orderId.trim();

        if (orderId === "") {
            return new ErrorHandler(Errors.CODE_3);
        }

        if (amount === "" || amount === "0.00" || (Number)(amount) < 0) {
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

    public setUser(user: User | null) {
        this.user = user;
        return this.user;
    }

    public setProvider(provider: Provider | null) {
        this.provider = provider;
        return this.provider;
    }

    public process(redirectBrowser: boolean = false) {
        let date = new Date();
        let currentUnixTimeStamp = date.getTime();


        
    }
}