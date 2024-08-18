import type { OrderDetails } from '../types';

type ApplicationActions = {
    type: string;
    orderDetails: OrderDetails;
};

export const OrderTypes = {
    DETAILS: "SET_DETAILS",
    CLEAR_DETAILS: "CLEAR_DETAILS"
};

export const orderReducer = (state: OrderDetails, action: ApplicationActions): OrderDetails => {
    switch (action.type) {
        case OrderTypes.CLEAR_DETAILS:
            return {} as OrderDetails;
        case OrderTypes.DETAILS:
            return action.orderDetails ? action.orderDetails : state;
        default:
            return state;
    }
};