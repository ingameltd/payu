import { PayU } from './payu/PayU';
import { Currency } from './payu/enums/Currency';

const client = new PayU(387171, "23f15afa2acc5c71ad0844d577fcb7be", 387171, "abc", { sandbox: true });
(async () => {
    try {
        const result = await client.createOrder({
            notifyUrl: "https://45336e30.ngrok.io/api/status",
            customerIp: '127.0.0.1',
            continueUrl: 'https://quickmargo.pl/order?ok',
            description: 'my payment',
            currencyCode: Currency.PLN,
            totalAmount: -1000,
            products: [
                { name: 'margonem bot', quantity: 1, unitPrice: 1000, virtual: true, }
            ]
        })

        console.log(result)
    } catch (error) {
        console.error(error)
    }



})()