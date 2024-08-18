import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import {CategoryItem, CatProp} from "../types";
import {Link, NavLink, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Category} from "../context/CategoryContext";

function CategoryNav(props:CatProp) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { categoryName } = useParams<{ categoryName: string }>();
  const location = useParams();
  const {categories, updateLastVisited } = useContext(Category);
  // console.log(categoryName"");
  return (
  <nav className="category-nav">
    <ul>

      {categories.map((category,index) => (

          <li key={category.name}>
            <div
                onClick={() => updateLastVisited(category.name)}
                className="button-wrapper"
            >
              <NavLink
                  to={`/categories/${category.name}`}
                  className={({isActive}) =>
                      isActive ? "selected-category-button" : "unselected-category-button"
                  }
              >
                {category.name}
              </NavLink>
            </div>
          </li>

      ))}

    </ul>
  </nav>
  )
}

export default CategoryNav;

