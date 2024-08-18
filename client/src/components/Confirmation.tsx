import React, {useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import ConfirmationTable from "./ConfirmationTable";
import {OrderDetailsStore} from "../context/OrderContext";
import '../assets/css/ConfirmationPage.css'
import {Link, useNavigate} from "react-router-dom";
import {Category} from "../context/CategoryContext";
import  "../assets/css/CartTable.css"

function lastFourDigits(ccNumber: string) {
    ccNumber = ccNumber.replace(/ /g, "").replace(/-/g, "");
    const fourDigits = ccNumber.slice(-4);
    return `**** **** **** ${fourDigits}`;
}

function monthFormatter(month: number) {
    return month < 10 ? `0${month+1}` : month.toString();
}

const  Confirmation =() =>
{
    const { orderDetails} = useContext(OrderDetailsStore);
    const {lastVisited} = useContext(Category)

    console.log(orderDetails);


    return(
        <div className="confirmationView">
            {!orderDetails || !orderDetails.order ? (
                <>
                    <div className="center-text">
                        <br/>
                        <br/>
                        <p><strong>We are sorry, the order you requested is not found. Spend some bucks man. Please continue your shopping....</strong></p>
                    </div>

                </>
            ) : (
                <div className="confirmationView">
                    <h4> YOUR ORDER CONFIRMATION</h4>
                    <ul>
                        <li><b>Confirmation no:</b> #{orderDetails.order.confirmationNumber}</li>
                        <br/>
                        <br/>
                        <li><strong>Date created:</strong> {new Date(orderDetails.order.dateCreated).toString()}</li>
                    </ul>
                    <ConfirmationTable/>
                    <p>-------------------------------------------------------------------------------------------------------------------</p>
                    <h4>CUSTOMER INFORMATION</h4>
                    <div className="customerInfo">

                        <ul>
                            <li><strong>Name: {orderDetails.customer.customerName}</strong></li>
                            <li><b>Email: {orderDetails.customer.email}</b></li>
                            <li><b>Address: {orderDetails.customer.address}</b></li>
                            <li><b>Phone: {orderDetails.customer.phone}</b></li>
                            <li><b>Credit Card: {lastFourDigits(orderDetails.customer.ccNumber)} (
                                {monthFormatter(new Date(orderDetails.customer.ccExpDate).getUTCMonth())}/{monthFormatter(new Date(orderDetails.customer.ccExpDate).getUTCFullYear())})</b>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            <br/>
            <div className="ctaButtons">
                <Link to={`/ `} className="no-underline">
                    <button className="first-button">Back to Home Page</button>
                </Link>

            </div>
            <div id="customerInfo"></div>
        </div>
    )

}
export default Confirmation;