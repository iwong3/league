import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../styles/header.css';
import logo from '../images/logo.png';


export default class Header extends Component {

    render() {
        return (
            <div className="Header">
                {/* <div className="line"></div> */}
                <Link to="/game">
                    <div className="menuOption">Game</div>
                </Link>
                <Link to="/summoner">
                    <div className="menuOption">Summoners</div>
                </Link>
                <Link to="/">
                    {/* <div className="logo"></div> */}
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
                <Link to="/champions">
                    <div className="menuOption">Champions</div>
                </Link>
                <Link to="/items">
                    <div className="menuOption">Items</div>
                </Link>
                {/* <div className="line"></div> */}
            </div>
        )
    }

}