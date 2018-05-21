import React, { Component } from 'react';

import '../styles/champion-card-expanded-menu.css';


export default class ChampionCardExpandedMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: "lore"
        }
    }

    handleTabClick = (tab) => {
        this.setState(prevState => ({
            activeTab: tab
        }));
        this.props.setActiveTab(tab);
    }

    setTabStyle = (tab) => {
        if (tab === this.state.activeTab) {
            return "activeCardTab";
        }
    }

    render() {
        return (
            <div className="ChampionCardExpandedMenu">
                <div className={"cardMenuButton " + this.setTabStyle("lore")}
                     onClick={() => this.handleTabClick("lore")} >
                    Lore
                </div>
                <div className={"cardMenuButton " + this.setTabStyle("skins")}
                     onClick={() => this.handleTabClick("skins")} >
                    Skins
                </div>
            </div>
        );
    }

}