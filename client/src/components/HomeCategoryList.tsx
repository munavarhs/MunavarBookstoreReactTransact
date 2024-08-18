import '../assets/css/HomeCategoryList.css';
import {categoryImages, CategoryItem} from '../types';
import {CatProp} from '../types';
import {Category} from "../context/CategoryContext";
import {useContext} from "react";


/*const categoryImageFileName = (category) => {
  let name = category.name.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.jpg`;
};*/


function HomeCategoryList(Props: CatProp){
    const {categories, updateLastVisited } = useContext(Category);

    return(
        <ul className ="home-list"> 
       {categories.map((category) => (
          <li className="home-list-li">
        <img src={categoryImages[category.name]}
         alt="book.title"
        />
              <div className="home-list-div"> {category.name} </div>
          </li>
      ))}
        </ul>
    )
}
export default HomeCategoryList;
