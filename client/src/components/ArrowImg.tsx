import '../assets/css/global.css'
import '../assets/css/arrowImg.css'


function arrowImage() {
    return(
        <img src={require('../assets/images/Body_Images/Category-Images/Arrow 1.jpeg')}
             className="arrow-left"
             width="32px"
             height="32px"
        />

    )

}

export default arrowImage;