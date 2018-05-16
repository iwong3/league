import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../styles/navigation.css';


export default class Navigation extends Component {

    render() {
        return (
            <div className="Navigation">
                <Link to="/items">
                    <div className="navItemBorder">
                        <div className="navItemContent">
                            <div className="navItemText">ITEMS</div>
                        </div>
                    </div>
                </Link>
                <Link to="/summoner">
                    <div className="navItemBorder">
                        <div className="navItemContent">
                            <div className="navItemText">SUMMONERS</div>
                        </div>
                    </div>
                </Link>
                <Link to="/champions">
                    <div className="navItemBorder">
                        <div className="navItemContent">
                            <div className="navItemText">CHAMPIONS</div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }

}