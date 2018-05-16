import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../styles/header.css';


export default class Header extends Component {

    render() {
        return (
            <div className="Header">
                <Link to="/">
                    <p>REEAGUE</p>
                </Link>
            </div>
        )
    }

}