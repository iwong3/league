import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../styles/header.css';


export default class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: "home"
        }
    }

    setActiveTab = (tab) => {
        this.setState({
            activeTab: tab
        });
    }

    //Returns styling for active tab
    checkActiveTabStyle = (tab) => {
        if (tab === this.state.activeTab) {
            return ({
                "borderBottom": "2px solid #ffbf00",
                "color": "#ffbf00"
            });
        }
    }

    render() {
        return (
            <div className="Header">
                <Link to="/">
                    <h1>LEAGUE APP</h1>
                </Link>
            </div>
        )
    }

    // render() {
    //     return (
    //         <div className="Header">
    //             <div className="headerBanner">
    //                 <h1> REEAGUE OF REGENDS </h1>
    //             </div>
    //             <div className="headerNav">
    //                     <Link to="/"
    //                         onClick={() => this.setActiveTab("home")}
    //                         style={this.checkActiveTabStyle("home")}>
    //                         Home
    //                     </Link>
    //                     <Link to="/champions"
    //                         onClick={() => this.setActiveTab("champions")}
    //                         style={this.checkActiveTabStyle("champions")}>
    //                         Champions
    //                     </Link>
    //             </div>
    //         </div>
    //     )
    // }

}