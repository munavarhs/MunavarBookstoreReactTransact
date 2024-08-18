import React, {createContext} from "react";
import {CategoryItem} from "../types";
import {useEffect, useState} from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


interface CategoryContextType {
    categories: CategoryItem[];
    lastVisited: string;
    updateLastVisited: (categoryName: string) => void;
}

export const Category = createContext<CategoryContextType>({
    categories: [],
    lastVisited: "",
    updateLastVisited: () => {},
});
Category.displayName = 'CategoryContext';


function CategoryContext ({ children }:any)  {
    // cut/paste the categories code here from the App component
    const [categories, setCategories]  = useState([]);
    const [lastVisited, setLastVisited] = useState("");

    useEffect(() => {
        axios.get('http://webdev.cs.vt.edu:8080/MunavarBookstoreReactTransact/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);
    const updateLastVisited = (categoryName: string) => {
        setLastVisited(categoryName);
    };

    const values = { categories, lastVisited, updateLastVisited };

    return (
        <Category.Provider value ={values}>{children}</Category.Provider>
    );
}
export default CategoryContext;