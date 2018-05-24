import React, { Component } from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';

import '../styles/free-to-play.css';


export default class FreeToPlay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            freeChampions: []
        }
    }

    componentDidMount = () => {
        let freeToPlayUrl = utility.getFreeChampionsUrl();
        axios.get(freeToPlayUrl)
             .then(res => {
                 this.setState({
                     freeChampions: res.data.champions
                 });
             });
    }

    displayFreeChampions = (champions) => {
        let freeChampions = [];
        let currentChampionKey = "";
        let currentChampionName = "";
        let championLoadingUrl = "";

        for (let i = 0; i < champions.length; i++) {
            currentChampionKey = utility.championIdToKey(champions[i].id);
            currentChampionName = utility.championIdToName(champions[i].id);
            championLoadingUrl = utility.getChampionLoadingUrl(currentChampionKey);
            freeChampions.push(
                <div className="freeChampionBanner"
                     onClick={() => this.searchChampion(utility.championIdToName(champions[i].id))} >
                    <img src={championLoadingUrl}
                         alt={currentChampionName} />
                    <div className="freeChampionName">
                        {currentChampionName}
                    </div>
                </div>
            );
        }

        return (
            <div className="freeChampions">{freeChampions}</div>
        );
    }

    searchChampion = (name) => {
        window.location = "/champions?search=" + name;
    }

    render() {
        if (this.state.freeChampions) {
            return (
                <div className="FreeToPlay">
                    <div className="freeToPlayTitle">Free Champion Rotation</div>
                    {this.displayFreeChampions(this.state.freeChampions)}
                </div>
            ); 
        }
        return (
            <none/>
        );
    }

}