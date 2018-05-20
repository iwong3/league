import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../styles/header.css';
import logo from '../images/logo.png';


export default class Header extends Component {

    render() {
        return (
            <div className="Header">
                {/* <div className="line"></div> */}
                <Link to="/">
                    {/* <div className="logo"></div> */}
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
                {/* <div className="line"></div> */}
            </div>
        )
    }

}