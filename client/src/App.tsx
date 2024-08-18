import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from "axios";
import {CatProp} from "./types";
import Cart from "./components/Cart";
import {Checkout} from "./components/Checkout";
import Confirmation from "./components/Confirmation";


function App() {
    const [categories, setCategories]  = useState([]);

    useEffect(() => {
        axios.get('http://webdev.cs.vt.edu:8080/MunavarBookstoreReactTransact/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);
  return (
      <Router basename={"MunavarBookstoreReactTransact"}>
        <AppHeader catList={categories}/>
        <Routes>
          <Route path="/" element={<Home catList={categories}/>} />
            <Route path="/categories" element={<CategoryBookList catList= {categories} />} >
                <Route path=":id" element={<CategoryBookList catList= {categories}  />} />
            </Route>
          <Route path="*" element={<div>Page Not Found</div>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation/>} />
        </Routes>

        <AppFooter />

      </Router>
  );
}

export default App;

