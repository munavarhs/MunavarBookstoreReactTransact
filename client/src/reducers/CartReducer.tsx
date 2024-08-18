import { ShoppingCartItem, BookItem } from "../types";

export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
};

type AppActions = {
    type: string;
    item?: BookItem;
    quantity?: number;
};

const SURCHARGE = 500;
const calculateSubtotal = (items: ShoppingCartItem[]): number => {
    return items.reduce((sum, item) => sum + item.quantity * item.book.price, 0);
};

export const cartReducer = (state: ShoppingCartItem[], action: AppActions) => {
    switch (action.type) {
        case CartTypes.ADD:
            if (!action.item) return state;
            const existingItemIndex = state.findIndex(item => item.id === action.item?.bookId);
            if (existingItemIndex !== -1) {
                // If item exists, increment quantity
                const newState = [...state];
                newState[existingItemIndex].quantity += 1;
                return newState;
            } else {
                // If item doesn't exist, create a new ShoppingCartItem
                const newItem = new ShoppingCartItem(action.item);
                return [...state, newItem];
            }
        case CartTypes.REMOVE:
            return state.filter(item => item.id !== action.item?.bookId);
        case CartTypes.CLEAR:
            return [];
        case CartTypes.UPDATE_QUANTITY:
            return state.map(item => item.id === action.item?.bookId ? { ...item, quantity: action.quantity! } : item);
        default:
            return state;
    }
};

export const getNumberOfItems = (items: ShoppingCartItem[]): number => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const getSubtotal = (items: ShoppingCartItem[]): number => {
    return calculateSubtotal(items);
};

export const getTotal = (items: ShoppingCartItem[]): number => {
    return calculateSubtotal(items) + SURCHARGE;
};

export const isEmpty = (items: ShoppingCartItem[]): boolean => {
    return items.length === 0;
};
