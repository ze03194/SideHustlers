import React from 'react';
import './NavigationHeaderStyles.css'
import {Link, useNavigate} from "react-router-dom";
import bannerImg from '../../images/new_banner.jpg'
import secureLocalStorage from "react-secure-storage";
import "./NavigationHeaderLoggedInStyles.css"
import useAuth from "../../hooks/useAuth";

const NavigationHeaderLoggedIn = () => {
    const navigate = useNavigate();
    const {setAuth} = useAuth();

    const handleLogout = () => {
        secureLocalStorage.setItem("isLoggedIn", "false")
        secureLocalStorage.clear();
    }

    return (
        <div className="navigation-container">
            <div className="banner-container">
                <img id="bannerImage" src={bannerImg} alt=""/>
            </div>
            <div className="navigation-links-container">
                <Link to="/" className="navigation-links">Home</Link>
                <Link to="/login" className="navigation-links">About Us</Link>
                <Link to="/createPost" className="navigation-links">Create New Post</Link>
                <Link onClick={handleLogout} className="navigation-links">Log Out</Link>

            </div>

        </div>
    );
}

export default NavigationHeaderLoggedIn;