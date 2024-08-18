import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
import {CatProp} from "../types";
import {CartStore} from "../context/CartContext";
import {useContext} from "react";
function AppHeader(props:CatProp) {
    const { cart } = useContext(CartStore);
    const CartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    return (
        <header className="BookBuffetContainer">
            <div className="logo-section">
                <Link to="/">
                    <img
                        src={require('../assets/images/Header_Imgs/Books_Logo.jpg')}
                        alt="Another Bookstore Logo"
                        width="65"
                        height="55"
                    />
                </Link>
                <div className="Logo-text">
                    <div>THE BOOK</div>
                    <div className="Logo-text1">BUFFET</div>
                </div>
            </div>
            <div className="search-bar">
                <form>
                    <div className="search">
                        <span className="search-icon material-symbols-outlined">search</span>
                        <input className="search-input" type="search" placeholder="Search here..." />
                    </div>
                </form>
            </div>
            <div className="icons-container">
                <img
                    src={require('../assets/images/Header_Imgs/Profile-icon.jpeg')}
                    className="profile-img"
                    alt="Profile"
                    width="26"
                    height="28"
                />
                <div className="homepage-name-div"><p className="Login-name-homepage">
                    <strong className="login">Munna</strong></p>
                </div>
                <Link to="/cart">
                <span className="cart-img material-symbols-outlined">shopping_cart</span>
                </Link>
            </div>
            <span className="cart-count">{CartQuantity}</span>
            <div className="header-dropdown">
                <HeaderDropdown catList={props.catList} />
            </div>
        </header>
    );
}

export default AppHeader;