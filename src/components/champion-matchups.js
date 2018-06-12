import React, { Component} from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';
import * as champions from '../utilities/champions.js';

import '../styles/champion-matchups.css';


export default class ChampionMatchups extends Component {

    constructor(props) {
        super(props);

        this.state = {
            champions: [],
            activeChampionId: null,
            activeChampionMatchupData: [],
            activeElo: "PLATINUM+",
            numMatchups: 5
        }
    }

    componentDidMount = () => {
        this.setState({
            champions: this.sortChampionsAlphabetically(utility.standardizeChampions(champions.champions.data))
        });
    }

    setActiveChampion = (id) => {
        if (this.state.activeChampion !== id) {
            let championMatchupUrl = utility.getChampionMatchupsByEloUrl(id, this.state.activeElo);

            axios.get(championMatchupUrl).then(res => {
                this.setState({
                    activeChampionId: id,
                    activeChampionMatchupData: this.sortMatchupsByCount(res.data)
                });
            });
        }
    }

    displayChampionMatchups = (id) => {
        if (id === null) {
            return (
                <none/>
            );
        }

        let matchupIcons = [];
        let championIconUrl = "";
        let matchupId = "";

        for (let i = 0; i < this.state.numMatchups; i++) {
            matchupId = this.state.activeChampionMatchupData[i].champ2_id;
            if (this.state.activeChampionMatchupData[i].champ2_id === id) {
                matchupId = this.state.activeChampionMatchupData[i].champ1_id;
            }

            championIconUrl = utility.getChampionIconUrl(utility.championIdToKey(matchupId));
            matchupIcons.push(
                <div className="championMatchupsIconGroup">
                    <img src={championIconUrl} className="championMatchupsIcon" />
                    <div className="championMatchupsIconName">
                        {utility.championIdToName(matchupId)}
                    </div>
                </div>
            );
        }

        return (
            <div className="matchups">{matchupIcons}</div>
        );
    }

    displayChampionIcons = (champions) => {
        let championIcons = [];
        let championIconsRow = [];
        let rowSize = 12;

        let championIconUrl = "";
        let fontSize = "";

        for (let i = 0; i < champions.length; i++) {
            championIconUrl = utility.getChampionIconUrl(champions[i].key);
            fontSize = "14px";
            if (champions[i].name.length >= 10) {
                fontSize = "10px";
            }

            //reset row if we hit our row size
            if (i !== 0 && i % rowSize === 0) {
                championIcons.push(
                    <div className="championMatchupsIconsRow">{championIconsRow}</div>
                );
                championIconsRow = [];
            }
            championIconsRow.push(
                <div className="championMatchupsIconGroup"
                     onClick={() => this.setActiveChampion(champions[i].id)} >
                    <img src={championIconUrl} className="championMatchupsIcon" />
                    <div className="championMatchupsIconName">
                        {champions[i].name}
                    </div>
                </div>
            );
            //push the last row
            if (i === champions.length - 1 && championIconsRow.length > 0) {
                championIcons.push(
                    <div className="championMatchupsIconsRow">{championIconsRow}</div>
                );
            }
        }

        return (
            <div className="championMatchupsIcons">{championIcons}</div>
        );
    }

    sortChampionsAlphabetically = (champions) => {
        let championsSorted = champions;

        championsSorted.sort(function(champA, champB) {
            if (champA.name.toLowerCase() < champB.name.toLowerCase()) {
                return -1;
            }
            if (champA.name.toLowerCase() > champB.name.toLowerCase()) {
                return 1;
            }
            return 0;
        });

        return championsSorted;
    }

    sortMatchupsByCount = (matchups) => {
        let matchupsSorted = matchups;

        matchupsSorted.sort(function(champA, champB) {
            if (champA.count > champB.count) {
                return -1;
            }
            if (champA.count < champB.count) {
                return 1;
            }
            return 0;
        });

        return matchupsSorted;
    }

    render() {
        if (this.state.champions) {
            return (
                <div className="ChampionMatchups">
                    {this.displayChampionMatchups(this.state.activeChampionId)}
                    {this.displayChampionIcons(this.state.champions)}
                </div>
            ); 
        } else {
            return (
                <none/>
            );
        }
    }

}