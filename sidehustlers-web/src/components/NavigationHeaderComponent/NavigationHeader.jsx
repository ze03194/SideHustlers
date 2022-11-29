import React from 'react';
import './NavigationHeaderStyles.css'
import {Link} from "react-router-dom";
import bannerImg from '../../images/new_banner.jpg'

function NavigationHeader() {
    return (
        <div className="navigation-container">
            <div className="banner-container">
                <img id="bannerImage" src={bannerImg} alt=""/>
            </div>
            <div className="navigation-links-container">
                <Link to="/" className="navigation-links">Home</Link>
                <Link to="/login" className="navigation-links">About Us</Link>
                <Link to="/createPost" className="navigation-links">Create New Post</Link>
                <Link to="/login" className="navigation-links">Login/Register</Link>
            </div>
        </div>
    );
}

export default NavigationHeader;