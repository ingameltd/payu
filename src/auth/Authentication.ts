export interface AuthenticationResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    grant_type: string;
}