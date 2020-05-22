import { PayU } from './payu/PayU';

const client = new PayU(387171, "23f15afa2acc5c71ad0844d577fcb7be", 387171, "abc", { sandbox: true });
setInterval(async () => {
    try {
        const tok = await client.getAccessToken()
        console.log(tok)
    } catch (error) {
        console.error(error)
    }

}, 1000)