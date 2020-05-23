import Axios, { AxiosInstance } from 'axios';
import { OAuth } from './auth/OAuth';
import { OrderCreateResponse } from './orders/OrderCreateResponse';
import { Order } from './orders/Order';
import { OrderCreateEndpoint } from './endpoints';
import { PayUError } from './errors/PayUError';
import { OrderCreationErrorResponse } from './orders/OrderCreationErrorResponse';


const SandboxEndpoint = "https://secure.snd.payu.com";
const ProductionEdnpoint = "https://secure.payu.com";

export interface PayUOptions {
    sandbox?: boolean,
}

export class PayU {
    private clientId: number;
    private clientSecret: string;
    private merchantPosId: number;
    private secondKey: string;
    private baseEndpoint: string;
    private client: AxiosInstance;
    private options: PayUOptions;
    private oAuth: OAuth;

    /**
     * Creates an instance of PayU.
     * @param {number} clientId - client id for merchant
     * @param {string} clientSecret - client secret from panel
     * @param {number} merchantPosId - pos id from panel
     * @param {string} secondKey - second key from panel
     * @param {PayUOptions} [options={ sandbox: false }] - additional options
     * @memberof PayU
     */
    constructor(
        clientId: number,
        clientSecret: string,
        merchantPosId: number,
        secondKey: string,
        options: PayUOptions = { sandbox: false }
    ) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.merchantPosId = merchantPosId;
        this.secondKey = secondKey;
        this.options = options

        this.baseEndpoint = !this.options.sandbox ? ProductionEdnpoint : SandboxEndpoint;
        this.client = Axios.create({ baseURL: this.baseEndpoint })

        this.oAuth = new OAuth(this.client, this.clientId, this.clientSecret);
    }

    /**
     * Get access token
     *
     * @returns {Promise<string>}
     * @throws {AuthenticationError}
     * @memberof PayU
     */
    public async getAccessToken (): Promise<string> {
        return this.oAuth.getAccessToken()
    }

    /**
     * Create a new order
     *
     * @param {Order} order - order to be created
     * @returns {Promise<OrderCreateResponse>}
     * @memberof PayU
     */
    public async createOrder (order: Order): Promise<OrderCreateResponse> {
        const token = await this.oAuth.getAccessToken();
        const data = {
            ...order,
            merchantPosId: this.merchantPosId
        };
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        try {
            const response = await this.client.post(
                OrderCreateEndpoint,
                data,
                {
                    headers: headers,
                    maxRedirects: 0,
                    validateStatus: (status) => {
                        return status === 302
                    }
                }
            );

            return <OrderCreateResponse>response.data;
        } catch (error) {
            console.log(error.response.data)
            const resp = <OrderCreationErrorResponse>error.response.data;
            throw new PayUError(resp.status.statusCode, resp.status.code || '', resp.status.codeLiteral, resp.status.statusDesc);
        }
    }
}
