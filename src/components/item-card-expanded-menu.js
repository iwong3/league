import React, { Component } from 'react';

// import '../styles/item-card-expanded-menu.css';


export default class ItemCardExpandedMenu extends Component {

    handleTabClick = (tab) => {
        this.props.setActiveTab(tab);
    }

    setTabStyle = (tab) => {
        if (tab === "stats" && tab === this.props.activeTab) {
            return "leftMenuButton activeCardTab";
        } else if (tab === "stats") {
            return "leftMenuButton";
        } else if (tab === "builds" && tab === this.props.activeTab) {
            return "rightMenuButton activeCardTab";
        } else if (tab === "builds") {
            return "rightMenuButton";
        } else if (tab === this.props.activeTab) {
            return "activeCardTab";
        }
    }

    render() {
        return (
            <div className="ChampionCardExpandedMenu">
                <div className={"cardMenuButton " + this.setTabStyle("stats")}
                     onClick={() => this.handleTabClick("stats")} >
                    Stats
                </div>
                <div className={"cardMenuButton " + this.setTabStyle("builds")}
                     onClick={() => this.handleTabClick("builds")} >
                    Builds
                </div>
            </div>
        );
    }

}