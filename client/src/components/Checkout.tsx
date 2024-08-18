import "../assets/css/Checkout.css";
import { isCreditCard, isMobilePhone, isvalidEmail } from "../utils";
import { CartStore } from "../context/CartContext";
import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartTypes } from "../reducers/CartReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import {BookItem, CustomerForm, months, OrderDetails, years} from "../types";
import CartItemCount from "../context/CartItemCount";
import axios from "axios";
import {OrderDetailsStore} from '../context/OrderContext';
import {OrderTypes} from "../reducers/OrderReducer";


export function Checkout() {
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

    const {dispatch: orderDispatch} = useContext(OrderDetailsStore);
    const placeOrder =  async (customerForm: CustomerForm) =>  {

        const order = { customerForm: customerForm, cart:{itemArray:cart} };

        const orders = JSON.stringify(order);
        console.log(orders);     //you can uncomment this to see the orders JSON on the console
        const url = 'http://webdev.cs.vt.edu:8080/MunavarBookstoreReactTransact/api/orders';
        const orderDetails: OrderDetails = await axios.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                dispatch({type: CartTypes.CLEAR});
                return response.data;
            })
            .catch((error)=>console.log(error));
        console.log(orderDetails);
        return orderDetails;

    }

    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }

    const { cart, dispatch } = useContext(CartStore);
    const navigate = useNavigate();
    const cartTotalPrice = cart.reduce(
        (total, item) => total + item.quantity * item.book.price,
        0
    );
    const totalItems = CartItemCount();
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const [emailError, setEmailError] = useState("");
    const [creditError, setCreditError] = useState("");
    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [mobileError, setMobileError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        ccNumber: "",
        ccExpiryMonth: new Date().getMonth() + 1,
        ccExpiryYear: new Date().getFullYear(),
    });
    const [checkoutStatus, setCheckoutStatus] = useState("");

    const handleContinueShopping = () => {
        navigate(-2);
    };

    function isValidForm() {
        let form_valid = true;


        if (formData.name === "") {
            setNameError("Name is a mandatory field!");
            form_valid = false;
        }

        if (formData.address === "") {
            setAddressError("Address is a mandatory field!");
            form_valid = false;
        }
        if (formData.email === "") {
            setEmailError("Email is a mandatory field!");
            form_valid = false;
        } else if (!isvalidEmail(formData.email)) {
            setEmailError("Invalid email format!");
            form_valid = false;
        }

        if (formData.phone === "") {
            setMobileError("Phone is a mandatory field!");
            form_valid = false;
        } else if (!isMobilePhone(formData.phone)) {
            setMobileError("Invalid phone number format!");
            form_valid = false;
        }
        if (formData.ccNumber === "") {
            setCreditError("Credit card is a mandatory field!");
            form_valid = false;
        } else if (!isCreditCard(formData.ccNumber)) {
            setCreditError("Invalid credit card number!");
            form_valid = false;
        }

        return form_valid;
    }


    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;

        switch (name) {
            case "name":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (value.trim() === "") {
                    setNameError("Name is a required field!");
                } else if (value.length < 4 || value.length > 45) {
                    setNameError("Name must be atleast 4 characters long!");
                } else {
                    setNameError("");
                }
                break;
            case "address":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (value.trim() === "") {
                    setAddressError("Address is a required field!");
                } else if (value.length < 4 || value.length > 45) {
                    setAddressError("Address must be atleast 4 characters long!");
                } else {
                    setAddressError("");
                }
                break;
            case "phone":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (value.trim() === "") {
                    setMobileError("Phone number is a required field!");
                } else if (!isMobilePhone(value)) {
                    setMobileError("Phone number is not valid!");
                } else {
                    setMobileError("");
                }
                break;
            case "email":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (value.trim() === "") {
                    setEmailError("Email is a required field!");
                } else if (!isvalidEmail(value)) {
                    setEmailError("Email is not valid!");
                } else {
                    setEmailError("");
                }
                break;
            case "ccNumber":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (value.trim() === "") {
                    setCreditError("Card number is a required field!");
                } else if (!isCreditCard(value)) {
                    setCreditError("Invalid credit card number!");
                } else {
                    setCreditError("");
                }
                break;
            case "ccExpiryMonth":
            case "ccExpiryYear":
                setFormData((prevFormData) => ({ ...prevFormData, [name]: parseInt(value, 10) }));
                break;
            default:
                break;
        }
    }

    async function submitOrder(event:FormEvent) {
        event.preventDefault();
        const correctForm =  isValidForm();
        console.log(correctForm);
        if (!correctForm) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if(orders) {
                setCheckoutStatus("OK");
                orderDispatch({ type: OrderTypes.DETAILS, orderDetails: orders });
                navigate('/Confirmation');}
            else{
                setCheckoutStatus("SERVER_ERROR");
                console.log("Order is not placed, please try again...");
            }
        }
    }

    const updateBookQuantity = (bookId: number, quantity: number) => {
        if (quantity <= 0) {
            removeBookFromCart(bookId);
        } else {
            dispatch({ type: 'UPDATE_QUANTITY', item: { bookId }, quantity });
        }
    };
    const removeBookFromCart = (bookId: number) => {
        dispatch({ type: 'REMOVE', item: { bookId } });
    };

    return (
        cart.length > 0 ? (
            <section className="checkout-table-view">

                <div
                    className={`checkout-page-body ${nameError || addressError || mobileError || emailError || creditError ? "show-errors" : ""}`}>
                    <div>
                        <form
                            className={`checkout-form ${nameError || addressError || mobileError || emailError || creditError ? "show-errors" : ""}`}
                            method="post">
                            <div>
                                <label htmlFor="fname">Name</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="name"
                                    id="fname"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {nameError && <div className="error">{nameError}</div>}
                            <div>
                                <label htmlFor="home-address">Address</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="address"
                                    id="home-address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {addressError && <div className="error">{addressError}</div>}
                            <div>
                                <label htmlFor="phone-number">Phone</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="phone"
                                    id="phone-number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {mobileError && <div className="error">{mobileError}</div>}
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {emailError && <div className="error">{emailError}</div>}
                            <div>
                                <label htmlFor="credit-card">Card</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="ccNumber"
                                    id="credit-card"
                                    value={formData.ccNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {creditError && <div className="error">{creditError}</div>}
                            <div className="expiry-date">
                                <label htmlFor="ccExpiryMonth">Exp Date</label>
                                <div className="expiry-date-selects">
                                    <select
                                        style={{color: "black", marginRight: "3px"}}
                                        name="ccExpiryMonth"
                                        value={formData.ccExpiryMonth}
                                        onChange={handleInputChange}
                                    >
                                        {months.map((month, i) => (
                                            <option key={i} value={i + 1}>
                                                {month}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        className="expiry-year-select"
                                        name="ccExpiryYear"
                                        value={formData.ccExpiryYear}
                                        onChange={handleInputChange}
                                    >
                                        {years.map((year, i) => (
                                            <option key={i} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>

                    <form className="checkout-details" method="post">
                        <div className="checkout-money">
                            <div>
                                <span>Books ({cartQuantity})</span>
                                <span>: ${cartTotalPrice.toFixed(2)}</span>
                            </div>
                            <div>
                                <span>Shipping </span>
                                <span>: $5</span>
                            </div>
                            <div className="horizontal-line"></div>
                            <div className="final-checkout-price">
                                <span>Total</span>
                                <span>: ${(cartTotalPrice + 5).toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="second-button" onClick={submitOrder}>
                            Complete Purchase
                        </button>
                    </form>
                    <div>
                        {checkoutStatus !== "" ? (
                            <section
                                className={`checkoutStatusBox ${checkoutStatus === "PENDING" || checkoutStatus === "OK" ? "done" : ""}`}>
                                {checkoutStatus === "ERROR" ? (
                                    <div className="done">Error: Please fix the problems above and try again.</div>
                                ) : checkoutStatus === "PENDING" ? (
                                    <div className="done">Hold on, placing your order...</div>
                                ) : checkoutStatus === "OK" ? (
                                    <div className="done">Order placed...</div>
                                ) : checkoutStatus === "SERVER_ERROR" ?(
                                    <div className="done">Uh oh an error occurred, Please try again....</div>
                                ):(<div> Sorry</div> )}
                            </section>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div>
                    <ul className="checkout-cart-info">
                        {cart?.map((item, i) => (
                            <div className="checkout-cart-book-item" key={i}>
                                <div className="checkout-cart-book-image">
                                    <img
                                        src={getBookImageUrl(item.book)}
                                        alt="title"
                                        className="checkout-cart-info-img"
                                        width="20%"
                                        height="20%"
                                    />
                                </div>
                                <div className="checkout-cart-book-info">
                                    <div className="checkout-cart-book-title">{item.book.title}</div>
                                    <div
                                        className="checkout-cart-book-subtotal">${(item.quantity * item.book.price).toFixed(2)}</div>
                                    <div className="checkout-cart-book-quantity">

                                        <button className="dec-button"
                                                onClick={() => updateBookQuantity(item.id, Math.max(0, item.quantity - 1))}>
                                            <FontAwesomeIcon icon={faMinusCircle}/>
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button className="inc-button"
                                                onClick={() => updateBookQuantity(item.id, item.quantity + 1)}>
                                            <FontAwesomeIcon icon={faPlusCircle}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </section>
        ) : (
            <div className="cart-buttons-checkout">
                <div className="cart-info-checkout">
                    Your shopping cart contains {totalItems} {'item' + (totalItems === 1 ? '' : 's')}
                </div>
                <div className="continue-shopping-checkout-container">
                    <button className="continue-shopping-checkout" onClick={handleContinueShopping}>Continue Shopping
                    </button>
                </div>

            </div>

        )
    );
}