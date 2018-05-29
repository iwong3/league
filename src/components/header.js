import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../styles/header.css';
import logo from '../images/logo.png';


export default class Header extends Component {

    setMenuOptionStyle = (menuOption) => {
        if (window.location.pathname === menuOption) {
            return ({
                "color": "#ffffff"
            });
        }
    }

    render() {
        return (
            <div className="Header">
                <Link to="/" className="leftMenuOption">
                        <img src={logo} alt="Logo" className="logo" />
                </Link>
                <Link to="/game">
                    <div className="menuOption"
                         style={this.setMenuOptionStyle("/game")} >
                        Game
                    </div>
                </Link>
                <Link to="/summoner">
                    <div className="menuOption"
                         style={this.setMenuOptionStyle("/summoner")} >
                        Summoners
                    </div>
                </Link>
                <Link to="/statistics">
                    <div className="menuOption"
                         style={this.setMenuOptionStyle("/statistics")} >
                        Statistics
                    </div>
                </Link>
                <Link to="/champions">
                    <div className="menuOption"
                         style={this.setMenuOptionStyle("/champions")} >
                        Champions
                    </div>
                </Link>
                <Link to="/items">
                    <div className="menuOption"
                         style={this.setMenuOptionStyle("/items")} >
                        Items
                    </div>
                </Link>
            </div>
        )
    }

}