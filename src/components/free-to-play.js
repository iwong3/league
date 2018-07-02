import React, { Component } from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';

import '../styles/free-to-play.css';


export default class FreeToPlay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            freeChampions: [],
            freeChampionsSplashUrls: [],
            activeChampionId: null,
            activeChampionIndex: 0
        }
    }

    componentDidMount = () => {
        let freeToPlayUrl = utility.getFreeChampionsUrl();
        axios.get(freeToPlayUrl)
             .then(res => {
                 this.setState({
                     freeChampions: res.data.champions,
                     activeChampionId: res.data.champions[0].id,
                     activeChampionIndex: 0
                 }, function() {
                     let splashUrls = [];
                     for (let i = 0; i < this.state.freeChampions.length; i++) {
                        splashUrls[i] = utility.getChampionSplashUrl(utility.championIdToKey(this.state.freeChampions[i].id));
                     }
                     this.setState({
                         freeChampionsSplashUrls: splashUrls
                     });
                 });
             });
    }

    displayActiveChampion = (id) => {
        return (
            <div className="freeChampion_activeChampion">
                <img className="freeChampion_activeChampionSplash"
                     src={this.state.freeChampionsSplashUrls[this.state.activeChampionIndex]}
                     onClick={() => this.searchChampion(utility.championIdToName(id))} />
                <div className="freeChampion_activeChampionName">{utility.championIdToName(id)}</div>
            </div>
        )
    }

    displayFreeChampions = (champions) => {
        let freeChampions = [];
        let currentChampionKey = "";
        let currentChampionName = "";
        let championLoadingUrl = "";

        for (let i = 0; i < champions.length; i++) {
            currentChampionKey = utility.championIdToKey(champions[i].id);
            currentChampionName = utility.championIdToName(champions[i].id);
            championLoadingUrl = utility.getChampionIconUrl(currentChampionKey);
            freeChampions.push(
                <div className="freeChampionBanner"
                     onMouseOver={() => this.setActiveChampion(champions[i].id, i)} >
                    <div className="freeChampionCardBorder">
                        <img src={championLoadingUrl}
                             alt={currentChampionName}
                             style={this.checkActiveChampionIconStyle(champions[i].id)} />
                    </div>
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

    setActiveChampion = (id, index) => {
        if (id !== this.state.activeChampionId) {
            this.setState(prevState => ({
                activeChampionId: id,
                activeChampionIndex: index
            }));
        }
    }

    checkActiveChampionIconStyle = (id) => {
        if (id === this.state.activeChampionId) {
            return (
                {
                    "filter": "grayscale(0%)"
                }
            );
        }
    }

    render() {
        if (this.state.freeChampions) {
            return (
                <div className="FreeToPlay">
                    <div className="freeToPlayTitle">Free Champion Rotation</div>
                    {this.displayActiveChampion(this.state.activeChampionId)}
                    {this.displayFreeChampions(this.state.freeChampions)}
                </div>
            ); 
        }
        return (
            <none/>
        );
    }

}