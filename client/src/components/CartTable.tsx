
import  "../assets/css/CartTable.css"
import "../assets/css/Cart.css"
import { BookItem } from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import {CartStore} from "../context/CartContext";
import {useContext, useEffect} from "react";
import React from "react";
import {Link} from "react-router-dom";
import {getSubtotal, isEmpty} from "../reducers/CartReducer";
import {Category} from "../context/CategoryContext";




const getBookImageUrl = function (book: BookItem): string {
    let filename = book.title;
    filename = filename.replace(/ /g, " ");
    filename = filename.replace(/'/g, "");
    filename = filename + ".png";
    try {
        return require('../assets/images/books/' + filename);
    } catch (_) {
        return require('../assets/images/books/' + filename);
    }
};
const CartTable = () => {
    const { cart, dispatch } = useContext(CartStore);
    const {lastVisited} = useContext(Category)

    console.log(lastVisited);

    const updateBookQuantity = (bookId: number, quantity: number) => {
        if (quantity <= 0) {
            // If the quantity is 0 or less, remove the book from the cart
            removeBookFromCart(bookId);
        } else {
            // Otherwise, update the quantity of the book in the cart
            dispatch({ type: 'UPDATE_QUANTITY', item: { bookId }, quantity });
        }
    };

    const removeBookFromCart = (bookId: number) => {
        dispatch({ type: 'REMOVE', item: { bookId } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR' });
    };

    const asDollarsAndCents = (price: number) => {
        return `$${price.toFixed(2)}`;
    };

    return (
        <div>
            <div className="cart-heading">
                <strong>YOUR CART</strong>
            </div>
            <br />
            <div className="cart-text">
                <ul>
                    {
                        cart.length > 1 ? (
                            <li>Your shopping cart contains {cart.length} books.</li>
                        ) : cart.length === 1 ? (
                            <li>Your shopping cart contains 1 book.</li>
                        ) : (
                            <li>Your shopping cart is empty.</li>
                        )
                    }
                </ul>
            </div>
            <br />
            {cart.length > 0 && ( // Only display the table and its contents if cart has items
                <div className="cart-table">
                    <ul>
                        <li className="table-heading">
                            <div className="heading-book">Book</div>
                            <div className="heading-price">Price</div>
                            <div className="heading-quantity">Quantity</div>
                            <div className="heading-subtotal">Amount</div>
                        </li>
                        {cart.map((item) => (
                            <React.Fragment key={item.book.bookId}>
                                <li className="center-order">
                                    <div className="cart-book-image">
                                        <img src={getBookImageUrl(item.book)} alt={item.book.title} />
                                    </div>
                                    <div>
                                        <div className="cart-book-title">{item.book.title}</div>
                                        <button className="trash button pill-button blue-border-white-bg" onClick={() => removeBookFromCart(item.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                    <div className="cart-book-price">{asDollarsAndCents(item.book.price)}</div>
                                    <div className="cart-book-quantity">
                                        <button className="dec-button" onClick={() => updateBookQuantity(item.id, Math.max(0, item.quantity - 1))}>
                                            <FontAwesomeIcon icon={faMinusCircle} />
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button className="inc-button" onClick={() => updateBookQuantity(item.id, item.quantity + 1)}>
                                            <FontAwesomeIcon icon={faPlusCircle} />
                                        </button>
                                    </div>
                                    <div className="cart-book-subtotal">{asDollarsAndCents(item.book.price * item.quantity)}</div>
                                </li>
                                <li className="line-sep"></li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            )}
            <br />
            <div className="center-text">
                -----------------------------------------------------------------------------------------------------------------------------------------------------
            </div>
            <div className="sub-total">
                {!isEmpty(cart) && (
                    <ul>
                        <li>
                            <b>Cart Subtotal:</b> {asDollarsAndCents(getSubtotal(cart))}
                        </li>
                    </ul>
                )}
            </div>
            <br/>
            <div className="ctaButtons">
                <Link  to={`/categories/${lastVisited || 'New Releases'}`}   className="no-underline">
                    <button className = "first-button">Continue Shopping</button>
                </Link>


                {cart.length>0 && (<Link to="/checkout" className="no-underline">
                    <button className = "second-button">Proceed to Checkout</button>
                </Link>)}
            </div>
            <div className="center-text">
                {cart.length > 0 && (
                    <button className="button pill-button blue-border-white-bg" onClick={clearCart}>
                        Empty Cart
                    </button>
                )}
            </div>
            <br/>
        </div>
    );
};

export default CartTable;

