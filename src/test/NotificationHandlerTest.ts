// import { expect } from "chai";
// import { Connection } from "../Connection";
// import { ErrorHandler } from "../ErrorHandler";
// import { Errors } from "../Errors";
// import { NotificationHandler } from "../NotificationHandler";
// import { NumberFormatter } from "../Helper/NumberFormatter";

// const id = "1536bc14-9273-460e-9711-7e96733616fe";
// const secret = "f9fd95d5-2acb-4643-b3fb-b16999f37175";

// const getValidConnection = () => {
//     return Connection.createConnection(id, secret) as Connection;
// }

// describe("NotificationHandler test", () => {  

//     it(`Invalid 'token' parameter for NotificationHandler.createNotificationHandler() should \n
//     return CODE_16 error.`, () => {

//         const connection = getValidConnection();
//         const payment = NotificationHandler.createNotificationHandler(connection, "wrong") as ErrorHandler;

//         expect(payment).to.be.instanceOf(ErrorHandler);
//         expect(payment.getCode()).to.be.eql(Errors.CODE_16[0]);
//         expect(payment.getMessage()).to.be.eql(Errors.CODE_16[1]);

//     });
// })