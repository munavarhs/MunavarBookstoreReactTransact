import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";


function AppFooter(){
return(
    <footer className="BookBuffetFooter">
        <div className="FooterDiv">
            <h2 className="footerText1">Let's Stay</h2>
            <h2 className="footerText2">CONNECTED.....</h2>
            <img
                src={require('../assets/images/Footer_Images/SMI.jpg')}
                className="smImages"
            />
        </div>
        <h6 className="Directions">About|Contacts|Directions</h6>
        <div className="Copyright_div">
            <h6 className="cc">Copyright</h6>
            <img src={(require('../assets/images/Footer_Images/CopyRight1.jpg'))}
                 className="copyImage"
            />
            <h6 className="ftbb">| The Book </h6>
            <h6 className="ftbuffet">BUFFET |</h6>
            <h6 className="year">2024</h6>
        </div>
    </footer>
)
}

export default AppFooter;
