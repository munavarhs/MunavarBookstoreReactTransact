import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import {CategoryItem, CatProp} from '../types';
import { Link } from 'react-router-dom';
import {Category} from "../context/CategoryContext";
import {useContext} from "react";


function HeaderDropdown(props: CatProp) {
    const {categories, updateLastVisited } = useContext(Category);
  return (

      <div className="header-dropdown">
          <button className="categories-button">
              <i className="fa fa-bars hamburger-icon"></i>
              <i className="fa fa-times cross-icon"></i>
          </button>
       {/*<button className="button categories-button">CATEGORIES</button>*/}
          <ul>
              {categories.map((category) => (
                  <li key={category.name} onClick={() => updateLastVisited(category.name)}>
                      <Link to={`/categories/${category.name}`}>
                          {category.name}
                      </Link>
                  </li>
              ))}

          </ul>

      </div>

  )
}

export default HeaderDropdown

