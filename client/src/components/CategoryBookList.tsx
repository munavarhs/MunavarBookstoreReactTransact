import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import ArrowImg from './ArrowImg';
import  "../types";
import {BookItem, CatProp} from "../types";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function CategoryBookList(props: CatProp) {
    const {id} = useParams ();

    const [categories, setCategories]  = useState([]);


    useEffect(() => {
        axios.get(`http://webdev.cs.vt.edu:8080/MunavarBookstoreReactTransact/api/categories/name/${id}/books/`)
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, [id]);
  return (
      <><CategoryNav catList={props.catList}/>
          <ul className="book-lists">
              {categories.map((book:BookItem) => (
                  <CategoryBookListItem  bookId={book.bookId} isPublic={book.isPublic} price={book.price} title={book.title} author={book.author} categoryId ={book.categoryId}/>))}
          </ul>
      </>


)
}

export default CategoryBookList;
