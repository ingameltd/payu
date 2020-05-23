import { PayU } from './PayU';
import { Currency } from './enums/Currency';

const client = new PayU(387171, "23f15afa2acc5c71ad0844d577fcb7be", 387171, "b2819ca65d58837ed30f94273b75dbdf", { sandbox: true });
(async () => {
    try {
        // const result = await client.createOrder({
        //     notifyUrl: "https://45336e30.ngrok.io/api/status",
        //     customerIp: '127.0.0.1',
        //     continueUrl: 'https://quickmargo.pl/order?ok',
        //     description: 'my payment',
        //     currencyCode: Currency.PLN,
        //     totalAmount: -1000,
        //     products: [
        //         { name: 'margonem bot', quantity: 1, unitPrice: 1000, virtual: true, }
        //     ]
        // })

        //const result = await client.cancelOrder("D84NJL7MMX200523GUEST000P01")

        console.log(client.verifyNotification('sender=checkout;signature=2ce43000738866f51356a6ab25c3411a;algorithm=MD5;content=DOCUMENT', '{"order":{"orderId":"D84NJL7MMX200523GUEST000P01","orderCreateDate":"2020-05-23T13:03:45.188+02:00","notifyUrl":"https://45336e30.ngrok.io/api/status","customerIp":"127.0.0.1","merchantPosId":"387171","description":"my payment","currencyCode":"PLN","totalAmount":"1000","status":"CANCELED","products":[{"name":"margonem bot","unitPrice":"1000","quantity":"1"}]},"localReceiptDateTime":"2020-05-23T19:22:02.969+02:00","properties":[{"name":"PAYMENT_ID","value":"5000238364"}]}'));
    } catch (error) {
        console.error(error)
    }



})()