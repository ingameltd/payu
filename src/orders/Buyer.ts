/**
 * Buyer
 *
 * @export
 * @interface Buyer
 */
export interface Buyer {
    /**
     * Buyer's email address
     *
     * @type {string}
     * @memberof Buyer
     */
    email: string,

    /**
     * Buyer's first name
     *
     * @type {string}
     * @memberof Buyer
     */
    firstName?: string,

    /**
     * Buyer's last name
     *
     * @type {string}
     * @memberof Buyer
     */
    lastName?: string,

    /**
     * Buyer's telephone number
     *
     * @type {string}
     * @memberof Buyer
     */
    phone?: string
}