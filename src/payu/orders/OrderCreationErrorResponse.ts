export interface OrderCreationErrorResponse {
    status: Status;
    orderId?: string;
    extOrderId?: string;
}

export interface Status {
    statusCode: string;
    code?: string;
    codeLiteral?: string;
    statusDesc?: string;
}
