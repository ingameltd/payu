import { Currency } from "../enums/Currency";
import { Buyer } from './Buyer';
import { Product } from './Product';

export interface Order {
    /**
     * ID of an order used in merchant system. Order identifier assigned by the merchant. 
     * It enables merchants to find a specific order in their system. 
     * This value must be **unique** within a single POS.
     *
     * @type {string}
     * @memberof OrderData
     */
    extOrderId?: string,

    /**
     * The address for sending notifications
     *
     * @type {string}
     * @memberof OrderData
     */
    notifyUrl?: string,

    /**
     * Payer’s IP address, e.g. 123.123.123.123. Note: 0.0.0.0 is not accepted.
     *
     * @type {string}
     * @memberof OrderData
     */
    customerIp: string,

    /**
     * Duration for the validity of an order (in seconds), during which time payment must be made
     *
     * @type {number}
     * @memberof OrderData
     */
    validityTime?: number,

    /**
     * Description of the an orderDescription of the an order
     *
     * @type {string}
     * @memberof OrderData
     */
    description: string,

    /**
     * Currency code compliant with ISO 4217 (e.g EUR).
     *
     * @type {Currency}
     * @memberof OrderData
     */
    currencyCode: Currency,

    /**
     * Total price of the order in pennies (e.g. 1000 is 10.00 EUR). 
     * Applies also to currencies without subunits (e.g. 1000 is 10 HUF).
     *
     * @type {number}
     * @memberof OrderData
     */
    totalAmount: number,

    /**
     * Address for redirecting the customer after payment is commenced.
     *
     * @type {string}
     * @memberof OrderData
     */
    continueUrl: string,

    /**
     * Buyer information
     *
     * @type {Buyer}
     * @memberof OrderData
     */
    buyer?: Buyer,

    /**
     * Section containing data of the ordered products.
     *
     * @type {Product[]}
     * @memberof OrderData
     */
    products: Product[]
}