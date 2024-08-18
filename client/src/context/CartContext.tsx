import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { cartReducer } from '../reducers/CartReducer';
import { ShoppingCartItem } from '../types';

const CART_STORAGE_KEY = 'shoppingCart';

const initialCartState: ShoppingCartItem[] = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');

type CartContextType = {
    cart: ShoppingCartItem[];
    dispatch: React.Dispatch<any>;
};

export const CartStore = createContext<CartContextType>({
    cart: initialCartState,
    dispatch: () => undefined,
});

export const CartContext: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialCartState);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    return <CartStore.Provider value={{ cart, dispatch }}>{children}</CartStore.Provider>;
};