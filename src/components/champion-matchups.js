
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
            mostCommonMatchupsData: [],
            highestWinRateMatchupsData: [],
            lowestWinRateMatchupsData: [],
            activeElo: "PLATINUM+",
            numMatchups: 5
        }
    }

    //will have to standardize data (1000+ count only, combine similar roles (ADCSUPPORT, DUO_SUPPORT, SYNERGY))
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
                    mostCommonMatchupsData: this.sortMatchupsByCount(res.data),
                    highestWinRateMatchupsData: this.sortMatchupsByWinRate(res.data, id),
                    lowestWinRateMatchupsData: this.sortMatchupsByWinRateDesc(res.data, id)
                });
            });
        }
    }

    //handle logic to get data for matchup info (winrates, kda?) and assign to variables before rendering
    displayChampionMatchups = (id) => {
        if (id === null) {
            return (
                <div className="championMatchups_default">
                    <div className="championMatchups_defaultTitle">Select a Champion</div>
                </div>
            );
        }

        let matchups = [];
        let matchupIcons = [];
        let championIconUrl = "";
        let matchupId = "";
        let matchupWinRate = null;
        let matchupGames = null;

        championIconUrl = utility.getChampionIconUrl(utility.championIdToKey(id));

        matchups.push(
            <div className="championMatchup_activeChampionGroup">
                <div className="championMatchup_activeChampionBanner" style={{"background": "url(" + championIconUrl + ") center"}} ></div>
                <div className="championMatchup_activeChampionName">{utility.championIdToName(id)}</div>
            </div>
        );

        let matchupColumns = [];

        //highest win rate matchups
        for (let i = 0; i < this.state.numMatchups; i++) {

            matchupGames = this.state.highestWinRateMatchupsData[i].count;
            if (this.state.highestWinRateMatchupsData[i].champ2_id === id) {
                matchupId = this.state.highestWinRateMatchupsData[i].champ1_id;
                matchupWinRate = this.state.highestWinRateMatchupsData[i].champ1.winrate;
            } else {
                matchupId = this.state.highestWinRateMatchupsData[i].champ2_id;
                matchupWinRate = this.state.highestWinRateMatchupsData[i].champ2.winrate;
            }

            championIconUrl = utility.getChampionIconUrl(utility.championIdToKey(matchupId));
            matchupIcons.push(
                <div className="championMatchupsGroup">
                    <img src={championIconUrl} className="championMatchupsIcon" />
                    <div className="championMatchupsInfoGroup">
                        <div className="championMatchupsRow" style={{"fontSize": "16px", "marginTop": "10px"}} >
                            {utility.championIdToName(matchupId)}
                        </div>
                        <div className="championMatchupsRow">
                            Win Rate Against: {(100 - (matchupWinRate * 100)).toFixed(2)}%
                        </div>
                        <div className="championMatchupsRow">
                            Games: {matchupGames}
                        </div>
                    </div>
                </div>
            );
        }

        matchupColumns.push(
            <div className="championMatchupsColumn">
                <div className="championMatchupsColumnTitle">Best Matchups</div>
                {matchupIcons}
            </div>
        );

        matchupIcons = [];

        //lowest win rate matchups
        for (let i = 0; i < this.state.numMatchups; i++) {

            matchupGames = this.state.lowestWinRateMatchupsData[i].count;
            if (this.state.lowestWinRateMatchupsData[i].champ2_id === id) {
                matchupId = this.state.lowestWinRateMatchupsData[i].champ1_id;
                matchupWinRate = this.state.lowestWinRateMatchupsData[i].champ1.winrate;
            } else {
                matchupId = this.state.lowestWinRateMatchupsData[i].champ2_id;
                matchupWinRate = this.state.lowestWinRateMatchupsData[i].champ2.winrate;
            }

            championIconUrl = utility.getChampionIconUrl(utility.championIdToKey(matchupId));
            matchupIcons.push(
                <div className="championMatchupsGroup">
                    <img src={championIconUrl} className="championMatchupsIcon" />
                    <div className="championMatchupsInfoGroup">
                        <div className="championMatchupsRow" style={{"fontSize": "16px", "marginTop": "10px"}} >
                            {utility.championIdToName(matchupId)}
                        </div>
                        <div className="championMatchupsRow">
                            Win Rate Against: {(100 - (matchupWinRate * 100)).toFixed(2)}%
                        </div>
                        <div className="championMatchupsRow">
                            Games: {matchupGames}
                        </div>
                    </div>
                </div>
            );
        }

        matchupColumns.push(
            <div className="championMatchupsColumn">
                <div className="championMatchupsColumnTitle">Worst Matchups</div>
                {matchupIcons}
            </div>
        );

        matchupIcons = [];

        //most common matchups
        for (let i = 0; i < this.state.numMatchups; i++) {

            matchupGames = this.state.mostCommonMatchupsData[i].count;
            if (this.state.mostCommonMatchupsData[i].champ2_id === id) {
                matchupId = this.state.mostCommonMatchupsData[i].champ1_id;
                matchupWinRate = this.state.mostCommonMatchupsData[i].champ1.winrate;
            } else {
                matchupId = this.state.mostCommonMatchupsData[i].champ2_id;
                matchupWinRate = this.state.mostCommonMatchupsData[i].champ2.winrate;
            }

            championIconUrl = utility.getChampionIconUrl(utility.championIdToKey(matchupId));
            matchupIcons.push(
                <div className="championMatchupsGroup">
                    <img src={championIconUrl} className="championMatchupsIcon" />
                    <div className="championMatchupsInfoGroup">
                        <div className="championMatchupsRow" style={{"fontSize": "16px", "marginTop": "10px"}} >
                            {utility.championIdToName(matchupId)}
                        </div>
                        <div className="championMatchupsRow">
                            Win Rate Against: {(100 - (matchupWinRate * 100)).toFixed(2)}%
                        </div>
                        <div className="championMatchupsRow">
                            Games: {matchupGames}
                        </div>
                    </div>
                </div>
            );
        }

        matchupColumns.push(
            <div className="championMatchupsColumn">
                <div className="championMatchupsColumnTitle">Most Common</div>
                {matchupIcons}
            </div>
        );

        matchups.push(
            <div className="matchupColumns">{matchupColumns}</div>
        );

        return (
            <div className="matchups">{matchups}</div>
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
        let matchupsSorted = [];

        //don't include SYNERGY and ADCSUPPORT matchups
        for (let i = 0; i < matchups.length; i++) {
            if (matchups[i].role !== "SYNERGY" && matchups[i].role !== "ADCSUPPORT") {
                matchupsSorted.push(matchups[i]);
            }
        }

        matchupsSorted.sort(function(matchupA, matchupB) {
            if (matchupA.count > matchupB.count) {
                return -1;
            }
            if (matchupA.count < matchupB.count) {
                return 1;
            }
            return 0;
        });

        return matchupsSorted;
    }

    sortMatchupsByWinRate = (matchups, id) => {
        let matchupsSorted = [];
        let minCount = 100;
        
        //only include matchups with a minimum game count of 100
        for (let i = 0; i < matchups.length; i++) {
            if (matchups[i].count >= 100 && matchups[i].role !== "SYNERGY" && matchups[i].role !== "ADCSUPPORT") {
                matchupsSorted.push(matchups[i]);
            }
        }

        matchupsSorted.sort(function(champA, champB) {
            if (champA.champ1_id === id && champB.champ1_id === id) {
                if (champA.champ1.winrate > champB.champ1.winrate) {
                    return -1;
                }
                if (champA.champ1.winrate < champB.champ1.winrate) {
                    return 1;
                }
                return 0;
            }
            if (champA.champ2_id === id && champB.champ1_id === id) {
                if (champA.champ2.winrate > champB.champ1.winrate) {
                    return -1;
                }
                if (champA.champ2.winrate < champB.champ1.winrate) {
                    return 1;
                }
                return 0;
            }
            if (champA.champ2_id === id && champB.champ2_id === id) {
                if (champA.champ2.winrate > champB.champ2.winrate) {
                    return -1;
                }
                if (champA.champ2.winrate < champB.champ2.winrate) {
                    return 1;
                }
                return 0;
            }
            if (champA.champ1_id === id && champB.champ2_id === id) {
                if (champA.champ1.winrate > champB.champ2.winrate) {
                    return -1;
                }
                if (champA.champ1.winrate < champB.champ2.winrate) {
                    return 1;
                }
                return 0;
            }
            return 0;
        });

        return matchupsSorted;
    }

    sortMatchupsByWinRateDesc = (matchups, id) => {
        let matchupsSorted = [];
        let minCount = 100;
        
        //only include matchups with a minimum game count of 100
        for (let i = 0; i < matchups.length; i++) {
            if (matchups[i].count >= 100 && matchups[i].role !== "SYNERGY" && matchups[i].role !== "ADCSUPPORT") {
                matchupsSorted.push(matchups[i]);
            }
        }

        matchupsSorted.sort(function(champA, champB) {
            if (champA.champ1_id === id && champB.champ1_id === id) {
                if (champA.champ1.winrate < champB.champ1.winrate) {
                    return -1;
                }
                if (champA.champ1.winrate > champB.champ1.winrate) {
                    return 1;
                }
                return 0;
            }
            if (champA.champ2_id === id && champB.champ1_id === id) {
                if (champA.champ2.winrate < champB.champ1.winrate) {
                    return -1;
                }
                if (champA.champ2.winrate > champB.champ1.winrate) {
                    return 1;
                }
                return 0;
            }
            if (champA.champ2_id === id && champB.champ2_id === id) {
                if (champA.champ2.winrate < champB.champ2.winrate) {
                    return -1;
                }
                if (champA.champ2.winrate > champB.champ2.winrate) {
                    return 1;
                }
                return 0;
            }
            if (champA.champ1_id === id && champB.champ2_id === id) {
                if (champA.champ1.winrate < champB.champ2.winrate) {
                    return -1;
                }
                if (champA.champ1.winrate > champB.champ2.winrate) {
                    return 1;
                }
                return 0;
            }
            return 0;
        });

        console.log(matchupsSorted);
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