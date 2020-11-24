# PayU for NodeJS

![Build](https://github.com/ingameltd/payu/workflows/Build/badge.svg) ![](https://img.shields.io/npm/v/@ingameltd/payu) ![](https://img.shields.io/github/last-commit/ingameltd/payu)

A type safe PayU client for NodeJS written in Typescript

## Installation

```bash
npm install --save @ingameltd/payu
```

## Usage

### Importing

```typescript
import { PayU, Order, Buyer, Product, Currency } from "@ingameltd/payu";
```

### Initialization

- **clientId** : Client ID from PayU
- **clientSecret** : client secret from panel
- **merchantPosId** : pos id from panel
- **secondKey** : second key from panel

```typescript
const payU = new PayU(clientId, clientSecret, merchantPosId, secondKey, {
  sandbox: false,
});
```

### Create an order

```typescript
const result = await payU.createOrder({
  notifyUrl: "https://my.shop.notify.com/notify",
  customerIp: "127.0.0.1",
  continueUrl: "https://myshop.com/order?id=abc",
  description: "My order",
  currencyCode: Currency.PLN,
  totalAmount: 2000,
  buyer: {
    email: "buyer@email.com",
  },
  products: [
    { name: "mobile phone #1", quantity: 1, unitPrice: 1000 },
    { name: "mobile phone #2", quantity: 1, unitPrice: 1000 },
  ],
});
```

### Capture order

If your shop does not approve payments automatically, you need to capture them and confirm.

```typescript
const result = await payU.captureOrder("payU order Id from notification");
```

### Cancel order

To cancel an order before completed call this method.

```typescript
const result = await payU.cancelOrder("payU order Id from notification");
```

### Refund order

To refund an order after completed call this method.

```typescript
const result = await payU.refundOrder("payU order Id from notification", "reason");
```

### Verify notification

To verify notification are valid cryptogrpically this method can be used.

```typescript
const headers = req.headers;

const isValid = payU.verifyNotification(
  headers["OpenPayu-Signature"],
  JSON.stringify(req.body)
);

console.log(isValid);
```

### Validate IPs

To validate IPs are correct, use following method. It will automatically adjust to match
your environment(production or sandbox)

```typescript
const isIpValid = payU.isIpValid("127.0.0.1");
```
