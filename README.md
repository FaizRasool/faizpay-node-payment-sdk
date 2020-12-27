FaizPay Javascript & Typescript Payment SDK
=======
SDK for working with FaizPay payment APIs.


Documentation
------------
Full documentation can be found at: 

- Javascript / Node: https://documentation.faizpay.com/typescript.html
- Typescript: https://documentation.faizpay.com/typescript.html


Requirements
------------
Node v12.0.0 and later.

Installation
------------

You can install the bindings via Yarn or NPM. Run the following command:

```bash
npm install faizpay-node-payment-sdk
```

or 

```bash
yarn adds faizpay-node-payment-sdk
```

Getting Started (Javascript)
------------
Simple new payment looks like:

```javascript
const faizpay = require("faizpay-node-payment-sdk");

const connection = faizpay.Connection.createConnection(
    terminalId = '8afa74ae-6ef9-48bb-93b2-9fe8be53db50',
    terminalSecret = '55d7d5ed-be22-4321-bb3f-aec8524d8be2'
);

const payment = faizpay.Payment.createPayment(
    connection,
    orderId = 'AA-11',
    amount = '10.00'
);
 
const url = payment.process();
```

__Webhook / Notification Handling__

```javascript
const faizpay = require("faizpay-node-payment-sdk");

const connection = faizpay.Connection.createConnection(terminalId, terminalSecret);

const notificationHandler = faizpay.NotificationHandler.createNotificationHandler(
    connection,
    request.body.token
);

// extract the order id
const orderId = notificationHandler.getOrderID();

// fetch the order from your database
const data = findFromDatabase(orderId);

// if order is not found in system
if (checkIfEntryFound(data)) {
     log("Invalid Token - token = " + request.body.token);
     return;
}

// validate if the requested payment matches with token
if (!notificationHandler.validateAmount(data['amount'])) {
    log("Invalid Amount - token = " + request.body.token);
    return;
}

// all checks are passed - update the database to mark payment complete
updateDatabase(orderId, {'completed': true});
```

__Optional: Set User or Pre Selected Provider For New Payment__

```javascript
const faizpay = require("faizpay-node-payment-sdk");
const connection = faizpay.Connection.createConnection(terminalId, terminalSecret);

const payment = faizpay.Payment.createPayment(
    connection,
    orderId = 'AA-11',
    amount = '10.00'
);

const user = faizpay.User.createUser(
    email = 'john.doe@test.com',
    firstName = 'John',
    lastName = 'Doe',
    contactNumber = '07000845953'
);


const provider = faizpay.Provider.createProvider(
    providerId = 'lloyds-bank',
    sortCode = '123456',
    accountNumber = '12345678'
);

payment.setProvider(provider);
```
