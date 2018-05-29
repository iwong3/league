import React, { Component} from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';
import * as champions from '../utilities/champions';


export default class ChampionWinRates extends Component {

    constructor(props) {
        super(props);

        this.state = {
            platPlusData: []
        }
    }

    componentDidMount = () => {
        let championWinRateUrl = "";
        let standardizedChampions = utility.standardizeChampions(champions.champions.data);
        let tempData = [];

        for (let i = 0; i < standardizedChampions.length; i++) {
            championWinRateUrl = utility.getChampionWinRateByEloUrl(standardizedChampions[i].id, "PLATINUM+");

            axios.get(championWinRateUrl).then(res => {
                tempData = this.state.platPlusData;
                tempData.push(res.data);
                this.setState({
                    platPlusData: tempData
                });
            });
        }
    }

    averageOutWinRates = (data) => {
        let averagedData = [];
        let champion = {};
        let numRoles = 0;

        for (let i = 0; i < data.length; i++) {
            champion.championId = data[i][0].championId;
            champion.banRate = data[i][0].banRate;
            if (data[i].length > 1) {
                numRoles = data[i].length;
                for (let j = 0; j < numRoles; j++) {
                    //math here (account for win rate and number of games together)
                    champion.winRate += data[i][j].winRate;
                }
                champion.winRate /= numRoles;
            }
        }
    }

    displayWinRatesByElo = (elo) => {
        let hello = [];
        // console.log(this.state.platPlusData);
        if (elo === "PLATINUM+") {
            for (let i = 0; i < this.state.platPlusData.length; i++) {
                if (this.state.platPlusData[i].length === 1) {

                }
            }
        }

        // console.log(hello);

        return (
            <div className="data">{hello}</div>   
        );
    }

    displayWinRatesByElo() {

    }

    render() {
        if (this.state.platPlusData) {
            return (
                <div className="ChampionWinRates">
                    {this.displayWinRatesByElo("PLATINUM+")}
                </div>
            );
        } else {
            return <none/>;
        }
    }

}