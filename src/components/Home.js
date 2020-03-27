import React from "react"; 
import {Link} from "react-router-dom"; 
function HomePage() {
    return (
        <div>
            <img 
            className="home-img"
            src=""
            alt=""
            />
            <button><Link to="/pizza">Make Pizza</Link></button>
        </div>
    ); 
}; 

export default HomePage; 