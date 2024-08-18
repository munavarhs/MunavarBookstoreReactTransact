
import HomeCategoryList from './HomeCategoryList';
import '../assets/css/global.css';
import '../assets/css/Home.css'
import {CatProp} from "../types";
import { Link } from 'react-router-dom';
import {useContext} from "react";
import {Category} from "../context/CategoryContext";


const name ='>>';
function Home(props:CatProp) {
    const {lastVisited} = useContext(Category)
    return (

        <section className="home-pages">
            <section className="main-content">
                <div id="wrapper2">
                    <img src={(require('../assets/images/Body_Images/Printer_Vintage.jpg'))}
                         id="bg-img"
                         alt="" srcSet=""/>
                </div>
                <section className="BookBuffet-hompepage">
                    <div className="BestSellersTextDiv">
                        <section className="BestSellers-Text">
                            <h3> What are you waiting for? Checkout our,</h3>
                        </section>
                        <section className="BestSellers-Text1">
                            <h3> BEST SELLERS !!</h3>
                        </section>
                    </div>
                </section>
                <section className="bestseller-images-container">
                    <div className="bestseller-image-items">
                        <a>
                            <img className="image-1" src={(require('../assets/images/Body_Images/Atomic_Habits.jpg'))}
                                 alt="Atomic Habits"
                                 width="150px"
                                 height="200px"/>
                        </a>
                        <a>
                            <img src={(require('../assets/images/Body_Images/PSyOfMoney.jpg'))}
                                 alt="Psychology of Money"
                                 width="200px"
                                 height="250px"/>
                        </a>
                        <a>
                            <img className="image-3" src={(require('../assets/images/Body_Images/Ryan.jpg'))}
                                 alt="The Daily Stoic"
                                 width="150px"
                                 height="200px"/>
                        </a>
                    </div>
                    <button className="shopnow-button" type="button">
                        <Link to={`/categories/${lastVisited || 'New Releases'}`} >
                            <span>SHOP NOW {name}</span>
                        </Link>
                    </button>
                </section>
            </section>

        </section>
    )
}

export default Home;
