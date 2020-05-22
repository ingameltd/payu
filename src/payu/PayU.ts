import Axios, { AxiosInstance } from 'axios';
import { OAuth } from './OAuth';

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
}
