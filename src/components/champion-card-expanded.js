import React, { Component } from 'react';

import ChampionCardExpandedMenu from './champion-card-expanded-menu';
import ChampionCardExpandedDetails from './champion-card-expanded-details';


export default class ChampionCardExpanded extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: "lore"
        }
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.champion !== this.props.champion) {
            this.setState(prevState => ({
                activeTab: "lore"
            }));
        }
    }

    setActiveTab = (tab) => {
        this.setState(prevState => ({
            activeTab: tab
        }));
    }

    render() {
        return (
            <div className={"ChampionCardExpanded " + this.props.className}>
                <ChampionCardExpandedMenu activeTab={this.state.activeTab}
                                          setActiveTab={this.setActiveTab} />
                <ChampionCardExpandedDetails champion={this.props.champion}
                                             activeTab={this.state.activeTab} />
            </div>
        );
    }

}