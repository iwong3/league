import React, { Component } from 'react';

import * as utility from '../utilities/functions';

import '../styles/champion-card.css';


export default class ChampionCard extends Component {

    render() {
        return (
            <div className="ChampionCard"
                 onClick={this.props.handleClick}>
                <div className="championArt"
                     style={{"background": "url(" + utility.getChampionSplashUrl(this.props.champion.key) + ")"}} >
                </div>
                <div className="championNameGroup">
                    <div className="championName">
                        {this.props.champion.name}
                    </div>
                    <div className="championTitle">
                        {this.props.champion.title}
                    </div>
                </div>
            </div>
        );
    }

}