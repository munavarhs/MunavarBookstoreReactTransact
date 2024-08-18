import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { orderReducer } from '../reducers/OrderReducer';
import type { OrderDetails } from '../types';

const ORDER_DETAILS_KEY = 'orderDetails';


//similar to cart context file. Replace Cart with Order.

const initialOrderState: OrderDetails = JSON.parse(localStorage.getItem(ORDER_DETAILS_KEY) || '{}');

export type OrderContextType = {
    orderDetails: OrderDetails;
    dispatch: React.Dispatch<any>;
};

export const OrderDetailsStore = createContext<OrderContextType>({
    orderDetails: initialOrderState,
    dispatch: () => undefined,
});

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orderDetails, dispatch] = useReducer(orderReducer, initialOrderState);

    useEffect(() => {
        localStorage.setItem(ORDER_DETAILS_KEY, JSON.stringify(orderDetails));
    }, [orderDetails]);

    return (
        <OrderDetailsStore.Provider value={{ orderDetails, dispatch }}>
            {children}
        </OrderDetailsStore.Provider>
    );
};
