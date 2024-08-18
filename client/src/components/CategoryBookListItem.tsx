// CategoryBookListItem.jsx
import React, {useContext} from 'react';
import '../assets/css/CategoryBookListItem.css';
import { BookItem } from "../types";
import {CartTypes} from "../reducers/CartReducer";
import {CartStore} from "../context/CartContext";

const bookImageFileName = (book: BookItem) => {
    let name = book.title;
    name = name.replace(/ /g, " ");
    name = name.replace(/'/g, "");
    return `${name}.png`;
};

function CategoryBookListItem(book: BookItem) {
    const  {dispatch} = useContext(CartStore);
    const addBookToCart = () => {
        dispatch({ type: CartTypes.ADD, item:book, id: book.bookId });
    };
    return (
        <li className="book-box">
            <div className="book-image">
                <img src={require(`../assets/images/books/${bookImageFileName(book)}`)}
                     alt={book.title} />
            </div>
            {book.isPublic? <button className="read-now-button">Read Now</button>:<div className="read-now-div"></div> }
            <div className="descriptions">
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
            </div>
            <div className="add-to-cart-container">
                <button className="add-to-cart" onClick={addBookToCart}>Add to Cart</button>
                <div className="book-price">${book.price.toFixed(2)}</div>
            </div>
        </li>
    );
}

export default CategoryBookListItem;