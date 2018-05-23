import React, { Component } from 'react';

import '../styles/champion-card-expanded-menu.css';


export default class ChampionCardExpandedMenu extends Component {

    handleTabClick = (tab) => {
        this.props.setActiveTab(tab);
    }

    setTabStyle = (tab) => {
        if (tab === "about" && tab === this.props.activeTab) {
            return "leftMenuButton activeCardTab";
        } else if (tab === "about") {
            return "leftMenuButton";
        } else if (tab === "skins" && tab === this.props.activeTab) {
            return "rightMenuButton activeCardTab";
        } else if (tab === "skins") {
            return "rightMenuButton";
        } else if (tab === this.props.activeTab) {
            return "activeCardTab";
        }
    }

    render() {
        return (
            <div className="ChampionCardExpandedMenu">
                <div className={"cardMenuButton " + this.setTabStyle("about")}
                     onClick={() => this.handleTabClick("about")} >
                    About
                </div>
                <div className={"cardMenuButton " + this.setTabStyle("stats")}
                     onClick={() => this.handleTabClick("stats")} >
                    Stats
                </div>
                <div className={"cardMenuButton " + this.setTabStyle("skins")}
                     onClick={() => this.handleTabClick("skins")} >
                    Skins
                </div>
            </div>
        );
    }

}