import React, { Component } from 'react';

import * as championsLore from '../utilities/champions-lore';
import * as championsSkins from '../utilities/champions-skins';
import * as utility from '../utilities/functions';

import '../styles/champion-card.css';


export default class ChampionCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lore: "",
            skins: null
        }
    }

    //Get lore and skins for champion
    componentDidMount = () => {
        let lores = utility.standardizeChampions(championsLore.championsLore.data);
        let skins = utility.standardizeChampions(championsSkins.championsSkins.data);

        for (let i = 0; i < lores.length; i++) {
            if (lores[i].key === this.props.champion.key) {
                this.setState({
                    lore: lores[i].lore
                });
            }
            if (skins[i].key === this.props.champion.key) {
                this.setState({
                    skins: skins[i].skins
                });
            }
        }
    }

    render() {
        return (
            <div className="ChampionCard">
                <div className="championArt"
                     style={{"background": "url(" + utility.getChampionSplashUrl(this.props.champion.key) + ")"}} >
                </div>
                <div className="championName">
                    {this.props.champion.name}
                </div>
            </div>
        );
    }

}