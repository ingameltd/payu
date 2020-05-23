export class PayUError extends Error {
    constructor(statusCode: string, code: string, codeLiteral: string = '', statusDesc: string = '') {
        super(`statusCode = ${statusCode}, code = ${code}, codeLiteral = ${codeLiteral}, statusDesc = ${statusDesc}`); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype);
    }
}