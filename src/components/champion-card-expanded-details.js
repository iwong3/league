import React, { Component } from 'react';

import * as championsLore from '../utilities/champions-lore';
import * as championsSkins from '../utilities/champions-skins';
import * as utility from '../utilities/functions';

import '../styles/champion-card-expanded-details.css';
import { getChampionLoadingUrl } from '../utilities/functions';


export default class ChampionCardExpandedDetails extends Component {

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
            <div className="ChampionCardExpandedDetails">
                {
                    this.props.activeTab === "lore"
                    ?
                    <div className="lore">{this.state.lore}</div>
                    :
                    <none/>
                }
            </div>
        );
    }

}