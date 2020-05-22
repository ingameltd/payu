export class AuthenticationError extends Error {
    constructor(error: string, description: string) {
        super(`error = ${error}, errorDescription = ${description}`); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype);
    }
}