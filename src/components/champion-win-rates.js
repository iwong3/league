import React, { Component} from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';
import * as champions from '../utilities/champions';


export default class ChampionWinRates extends Component {

    constructor(props) {
        super(props);

        this.state = {
            platPlusData: [],
            averagedPlatPlusData: [],
            platData: [],
            averagedPlatData: [],
            goldData: [],
            averagedGoldData: [],
            silverData: [],
            averagedSilverData: [],
            bronzeData: [],
            averagedBronzeData: []
        }
    }

    componentDidMount = () => {
        let championWinRateUrl = "";
        let standardizedChampions = utility.standardizeChampions(champions.champions.data);
        let tempData = [];

        //for each champion, get their win rate data for each rank, average it, and set it in our state
        for (let i = 0; i < standardizedChampions.length; i++) {
            championWinRateUrl = utility.getChampionWinRateByEloUrl(standardizedChampions[i].id, "PLATINUM+");

            axios.get(championWinRateUrl).then(res => {
                tempData = this.state.platPlusData;
                tempData.push(res.data);
                this.setState({
                    platPlusData: tempData
                }, function() {
                    this.setState({
                        averagedPlatPlusData: this.averageOutWinRates(this.state.platPlusData)
                    });
                });
                
                championWinRateUrl = utility.getChampionWinRateByEloUrl(standardizedChampions[i].id, "PLATINUM");
                return axios.get(championWinRateUrl);
            }).then(res => {
                tempData = this.state.platData;
                tempData.push(res.data);
                this.setState({
                    platData: tempData
                }, function() {
                    this.setState({
                        averagedPlatData: this.averageOutWinRates(this.state.platData)
                    });
                });

                championWinRateUrl = utility.getChampionWinRateByEloUrl(standardizedChampions[i].id, "GOLD");
                return axios.get(championWinRateUrl);
            }).then(res => {
                tempData = this.state.goldData;
                tempData.push(res.data);
                this.setState({
                    goldData: tempData
                }, function() {
                    this.setState({
                        averagedGoldData: this.averageOutWinRates(this.state.goldData)
                    });
                });

                championWinRateUrl = utility.getChampionWinRateByEloUrl(standardizedChampions[i].id, "SILVER");
                return axios.get(championWinRateUrl);
            }).then(res => {
                tempData = this.state.silverData;
                tempData.push(res.data);
                this.setState({
                    silverData: tempData
                }, function() {
                    this.setState({
                        averagedSilverData: this.averageOutWinRates(this.state.silverData)
                    });
                });

                championWinRateUrl = utility.getChampionWinRateByEloUrl(standardizedChampions[i].id, "BRONZE");
                return axios.get(championWinRateUrl);
            }).then(res => {
                tempData = this.state.bronzeData;
                tempData.push(res.data);
                this.setState({
                    bronzeData: tempData
                }, function() {
                    this.setState({
                        averagedBronzeData: this.averageOutWinRates(this.state.bronzeData)
                    });
                });
            });
        }
    }

    averageOutWinRates = (data) => {
        let averagedData = [];
        let champion = {};
        let numRoles = 0;
        let roles = [];

        //Helper variables for calculations
        let totalWins = 0;
        let totalGames = 0;
        let totalTrueDamage = 0;
        let totalMagicDamage = 0;
        let totalPhysicalDamage = 0;
        let totalDamage = 0;

        for (let i = 0; i < data.length; i++) {
            champion.championId = data[i][0].championId;
            champion.banRate = data[i][0].banRate;

            //multiple roles
            if (data[i].length > 1) {
                numRoles = data[i].length;
                for (let j = 0; j < numRoles; j++) {
                    roles.push(data[i][j]._id.role);

                    totalWins += data[i][j].winRate * data[i][j].gamesPlayed;
                    totalGames += data[i][j].gamesPlayed;

                    totalTrueDamage += data[i][j].damageComposition.totalTrue * data[i][j].gamesPlayed;
                    totalMagicDamage += data[i][j].damageComposition.totalMagical * data[i][j].gamesPlayed;
                    totalPhysicalDamage += data[i][j].damageComposition.totalPhysical * data[i][j].gamesPlayed;
                    totalDamage += data[i][j].damageComposition.total * data[i][j].gamesPlayed;
                }

                champion.winRate = totalWins / totalGames;
                champion.wins = totalWins;
                champion.losses = totalGames - totalWins;
                champion.games = totalGames;

                champion.trueDamage = totalTrueDamage / totalGames;
                champion.magicDamage = totalMagicDamage / totalGames;
                champion.physicalDamage = totalPhysicalDamage / totalGames;
                champion.totalDamage = totalDamage / totalGames;
                

            //one role
            } else {
                roles.push(data[i][0]._id.role);

                champion.winRate = data[i][0].winRate;
                totalWins = data[i][0].winRate * data[i][0].gamesPlayed;
                totalGames = data[i][0].gamesPlayed;
                champion.wins = totalWins;
                champion.losses = totalGames - totalWins;
                champion.games = totalGames;

                champion.trueDamage = data[i][0].damageComposition.totalTrue;
                champion.magicDamage = data[i][0].damageComposition.totalMagical;
                champion.physicalDamage = data[i][0].damageComposition.totalPhysical;
                champion.totalDamage = data[i][0].damageComposition.total;
            }

            averagedData.push(champion);

            //reset variables
            roles = [];
            totalWins = 0;
            totalGames = 0;
            champion = {};
        }

        return averagedData;
    }

    displayWinRates = (data) => {
        let championWinRates = [];

        for (let i = 0; i < data.length; i++) {
            championWinRates.push(this.displayWinRatesHelper(data[i]));
        }

        return (
            <div className="championWinRates">{championWinRates}</div>   
        );
    }

    displayWinRatesHelper = (champion) => {
        return (
            <div className="championWinRateRow">
                {utility.championIdToName(champion.championId)}
                {champion.winRate}
            </div>
        );
    }

    render() {
        if (this.state.platPlusData && this.state.averagedPlatPlusData) {
            return (
                <div className="ChampionWinRates">
                    {this.displayWinRates(this.state.averagedGoldData)}
                    {/* {this.averageOutWinRates(this.state.platPlusData)} */}
                    {/* {console.log(this.state.platPlusData)} */}
                </div>
            );
        } else {
            return <none/>;
        }
    }

}