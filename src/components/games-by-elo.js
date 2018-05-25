import React, { Component } from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';

import '../styles/games-by-elo.css';


export default class GamesByElo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            platPlusData: null,
            platData: null,
            goldData: null,
            silverData: null,
            bronzeData: null,
            championCount: [null, null, null, null, null],
            totalChampionCount: null,
            championCountLabels: ["Platinum +", "Platinum", "Gold", "Silver", "Bronze"],
            elo: "PLATINUM+",
            activePatch: "8.10",
            patches: ["8.10", "8.9", "8.8", "8.7", "8.6", "8.5", "8.4", "8.3", "8.2", "8.1",
                      "7.24", "7.23", "7.22", "7.21", "7.20",
                      "7.19", "7.18", "7.17", "7.16", "7.15", "7.14", "7.13", "7.12", "7.11", "7.10",
                      "7.9", "7.8", "7.7", "7.6", "7.5", "7.4", "7.3", "7.2", "7.1"]
        }
    }

    componentDidMount = () => {
        let gamesUrl = utility.getNumGamesByElo("PLATINUM+");
        let platPlusData = [];
        let platPlusChampionCount = 0;
        let platData = [];
        let platChampionCount = 0;
        let goldData = [];
        let goldChampionCount = 0;
        let silverData = [];
        let silverChampionCount = 0;
        let bronzeData = [];
        let bronzeChampionCount = 0;

        axios.get(gamesUrl).then(res => {
            platPlusData = res.data;
            platPlusChampionCount = res.data[0].championCount;
            gamesUrl = utility.getNumGamesByElo("PLATINUM");
            return axios.get(gamesUrl);
        }).then(res => {
            platData = res.data;
            platChampionCount = res.data[0].championCount;
            gamesUrl = utility.getNumGamesByElo("GOLD");
            return axios.get(gamesUrl);
        }).then(res => {
            goldData = res.data;
            goldChampionCount = res.data[0].championCount;
            gamesUrl = utility.getNumGamesByElo("SILVER");
            return axios.get(gamesUrl);
        }).then(res => {
            silverData = res.data;
            silverChampionCount = res.data[0].championCount;
            gamesUrl = utility.getNumGamesByElo("BRONZE");
            return axios.get(gamesUrl);
        }).then(res => {
            bronzeData = res.data;
            bronzeChampionCount = res.data[0].championCount;
            let championCount = [platPlusChampionCount,
                             platChampionCount,
                             goldChampionCount,
                             silverChampionCount,
                             bronzeChampionCount];
            let totalChampionCount = platPlusChampionCount +
                                     platChampionCount + 
                                     goldChampionCount +
                                     silverChampionCount +
                                     bronzeChampionCount;

            this.setState({
                platPlusData: platPlusData,
                platData: platData,
                goldData: goldData,
                silverData: silverData,
                bronzeData: bronzeData,
                championCount: championCount,
                totalChampionCount: totalChampionCount
            });
        });
    }

    setGamesByPatch = (patch) => {
        let platPlusChampionCount = 0;
        let platChampionCount = 0;
        let goldChampionCount = 0;
        let silverChampionCount = 0;
        let bronzeChampionCount = 0;

        for (let i = 0; i < this.state.platPlusData.length; i++) {
            if (this.state.platPlusData[i].patch === patch) {
                platPlusChampionCount = this.state.platPlusData[i].championCount;
            }
        }
        for (let i = 0; i < this.state.platData.length; i++) {
            if (this.state.platData[i].patch === patch) {
                platChampionCount = this.state.platData[i].championCount;
            }
        }
        for (let i = 0; i < this.state.goldData.length; i++) {
            if (this.state.goldData[i].patch === patch) {
                goldChampionCount = this.state.goldData[i].championCount;
            }
        }
        for (let i = 0; i < this.state.silverData.length; i++) {
            if (this.state.silverData[i].patch === patch) {
                silverChampionCount = this.state.silverData[i].championCount;
            }
        }
        for (let i = 0; i < this.state.bronzeData.length; i++) {
            if (this.state.bronzeData[i].patch === patch) {
                bronzeChampionCount = this.state.bronzeData[i].championCount;
            }
        }

        let championCount = [platPlusChampionCount,
                             platChampionCount,
                             goldChampionCount,
                             silverChampionCount,
                             bronzeChampionCount];
        let totalChampionCount = platPlusChampionCount +
                                 platChampionCount + 
                                 goldChampionCount +
                                 silverChampionCount +
                                 bronzeChampionCount;

        this.setState({
            championCount: championCount,
            totalChampionCount: totalChampionCount,
            activePatch: patch
        });
    }

    displayGamesByPatch = () => {
        let gamesByPatch = [];

        gamesByPatch.push(
            <div className="gamesByPatchTitle">Games by Patch</div>
        );

        let gamesByPatchContent = [];

        let patchSelector = [];
        let patches = [];
        for (let i = 0; i < this.state.patches.length; i++) {
            patches.push(
                <div className="patchSelector_patch"
                        onClick={() => this.setGamesByPatch(this.state.patches[i])}
                        style={this.setPatchStyle(this.state.patches[i])} >
                    {this.state.patches[i]}
                </div>                    
            );
        }

        patchSelector.push(
            <div className="patchSelector_patches">{patches}</div>
        );

        patchSelector.push(
            <div className="patchSelectorTitle">Patch</div>
        );

        gamesByPatchContent.push(
            <div className="patchSelector">{patchSelector}</div>
        );

        let gamesByPatchGraph = [];

        gamesByPatchGraph.push(
            <div className="totalGamesPlayed">{this.state.totalChampionCount / 10} total games</div>
        );

        let gamesColumns = [];
        for (let i = 0; i < this.state.championCount.length; i++) {
            gamesColumns.push(
                <div className="gamesColumn">
                    <div className="gamesColumnChampionCount">
                        {(this.state.championCount[i] / 10).toLocaleString()}
                    </div>
                    <div className="gamesColumnFill"
                         style={{
                           "height": Math.round(this.state.championCount[i] / this.state.totalChampionCount * 200) + "%"
                         }}>
                        <div className="gamesPlayedPercent">
                            {Math.round(this.state.championCount[i] / this.state.totalChampionCount * 100)}%
                         </div>
                    </div>
                </div>
            );
        }

        gamesByPatchGraph.push(
            <div className="gamesColumns">{gamesColumns}</div>
        );

        let gamesLabels = [];
        for (let i = 0; i < this.state.championCountLabels.length; i++) {
            gamesLabels.push(
                <div className="gamesLabel">
                    {/* <div className="gamesColumnChampionCount">
                        {(this.state.championCount[i] / 10).toLocaleString()} Games
                    </div> */}
                    {this.state.championCountLabels[i]}
                </div>
            );
        }

        gamesByPatchGraph.push(
            <div className="gamesLabels">{gamesLabels}</div>
        );

        gamesByPatchContent.push(
            <div className="gamesByPatchGraph">{gamesByPatchGraph}</div>
        );

        gamesByPatch.push(
            <div className="gamesByPatchContent">{gamesByPatchContent}</div>
        );

        return (
            <div className="gamesByPatch">{gamesByPatch}</div>
        );
    }

    setPatchStyle = (patch) => {
        if (patch === this.state.activePatch) {
            return ({
                "background": "#ccbe91",
                "color": "#000000"
            });
        }
    }

    render() {
        if (this.state.platPlusData) {
            return (
                <div className="GamesByElo">
                    {this.displayGamesByPatch()}
                </div>
            );
        } else {
            return <none/>;
        }
    }

}