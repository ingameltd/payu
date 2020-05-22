export interface Product {
    /**
     * Name of the product
     *
     * @type {string}
     * @memberof Product
     */
    name: string,

    /**
     * Unit price
     *
     * @type {number}
     * @memberof Product
     */
    unitPrice: number,

    /**
     * Quantity
     *
     * @type {number}
     * @memberof Product
     */
    quantity: number,

    /**
     * Product type, which can be virtual or material;
     *
     * @type {boolean}
     * @memberof Product
     */
    virtual?: boolean
}