import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CategoryContext from "./context/CategoryContext";
import {CartContext} from "./context/CartContext";
import {OrderProvider} from "./context/OrderContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 // <React.StrictMode>
      <CategoryContext>
          <CartContext>
              <OrderProvider>
                  <App />
              </OrderProvider>
          </CartContext>
      </CategoryContext>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
