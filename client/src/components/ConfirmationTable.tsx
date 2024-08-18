import { asDollarsAndCents } from "../utils";

import { BookItem, OrderDetails } from '../types'

import {OrderDetailsStore} from "../context/OrderContext";
import React, {useContext} from "react";
import '../assets/css/ConfirmationTable.css'
import  "../assets/css/CartTable.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {CartStore} from "../context/CartContext";
import cart from "./Cart";





const ConfirmationTable = () => {
    const { cart, dispatch } = useContext(CartStore);
    const { orderDetails} = useContext(OrderDetailsStore);
    const cartTotalPrice = cart.reduce(
        (total, item) => total + item.quantity * item.book.price,
        0
    );

    const asDollarsAndCents = (price: number) => {
        return `$${price.toFixed(2)}`;
    };

// A helper function - optional to use
    const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
        return orderDetails.books[index];
    };
    return (
        <table className="confirmation_table">
            <div className="cart-table2">
                <ul>
                    <li className="table-heading">
                        <div className="heading-book">Book</div>
                        <div className="heading-price">Quantity</div>
                        <div className="heading-quantity">Price</div>
                    </li>
                    {orderDetails.lineItems.map((book, i) => (

                        <li className="table-heading2" key={i}>
                            <div className="heading-book1">
                                {orderDetails.books[i].title}
                            </div>
                            <div
                                className="heading-price1">{book.quantity}
                            </div>
                            <div
                                className="heading-quantity1">{asDollarsAndCents(orderDetails.books[i].price * book.quantity)}</div>
                        </li>
                    ))}
                    <li className="line-sep"></li>

                    <li className="table-heading2">
                        <div className="heading-book1">
                            <b>---------Shipping---------</b>
                        </div>
                        <div className="heading-quantity1">
                            <b>$5</b>
                        </div>
                    </li>
                    <li className="line-sep"></li>
                    <li className="table-heading2">
                        <div className="heading-book1">
                            <b>Total:</b>
                        </div>
                        <div className="heading-quantity1">
                            <b>{asDollarsAndCents(orderDetails.order.amount)}</b>
                        </div>
                    </li>

                </ul>
            </div>
        </table>
    )
}

export default ConfirmationTable;