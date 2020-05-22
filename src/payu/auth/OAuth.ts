import querystring from 'querystring';
import moment from 'moment';
import { AxiosInstance } from 'axios';
import { AuthenticationResponse } from './Authentication';
import { AuthorizeEndpoint } from '../endpoints';
import { AuthenticationErrorResponse } from './AuthenticationErrorResponse';
import { AuthenticationError } from '../errors/AuthenticationError';


export class OAuth {
    private client: AxiosInstance;
    private clientId: number;
    private clientSecret: string;

    private _accessToken: string;
    private _expiry: Date;

    /**
     *Creates an instance of OAuth.
     * @param {AxiosInstance} client - configured axios client for proper backend
     * @param {number} clientId - client id
     * @param {string} clientSecret - client secret
     * @memberof OAuth
     */
    constructor(client: AxiosInstance, clientId: number, clientSecret: string) {
        this.client = client;
        this.clientId = clientId;
        this.clientSecret = clientSecret;

        // initialize the authenticater to have invalidated expiry date
        // so it will fetch new one on first try
        this._expiry = moment().subtract(1, 'minute').toDate()
        this._accessToken = '';
    }

    private async _fetchAccessToken (): Promise<AuthenticationResponse> {
        const data = {
            grant_type: "client_credentials",
            client_id: this.clientId,
            client_secret: this.clientSecret,
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        try {
            const response = await this.client.post(AuthorizeEndpoint, querystring.stringify(data), config);
            const auth = <AuthenticationResponse>response.data;
            return auth;
        } catch (error) {
            const errResponse = <AuthenticationErrorResponse>error.response.data;
            throw new AuthenticationError(errResponse.error, errResponse.error_description);
        }
    }

    /**
     * Get access token from PayU service
     *
     * @returns {Promise<string>} - access token
     * @throws {AuthenticationError}
     * @memberof Auth
     */
    public async getAccessToken (): Promise<string> {
        // valid token(valid for 99%)
        if (moment().isBefore(this._expiry, "seconds") && this._accessToken !== '') {
            return this._accessToken;
        }

        const token = await this._fetchAccessToken()
        this._accessToken = token.access_token;
        this._expiry = moment().add(token.expires_in, "seconds").toDate();

        return this._accessToken;
    }
}