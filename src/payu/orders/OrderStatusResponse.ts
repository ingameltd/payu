import { Status } from "./Status";

export interface OrderStatusResponse {
    status: Status;
    orderId?: string;
    extOrderId?: string;
}
