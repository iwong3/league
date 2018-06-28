
import React, { Component} from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';
import * as champions from '../utilities/champions.js';

import '../styles/champion-matchups.css';


export default class ChampionMatchups extends Component {

    constructor(props) {
        super(props);

        this.state = {
            originalChampions: [],
            champions: [],
            activeChampionId: null,
            mostCommonMatchupsData: [],
            highestWinRateMatchupsData: [],
            lowestWinRateMatchupsData: [],
            activeElo: "PLATINUM+",
            numMatchups: 20,
            minCount: 500,
            search: ""
        }
    }

    componentDidMount = () => {
        this.setState({
            originalChampions: this.sortChampionsAlphabetically(utility.standardizeChampions(champions.champions.data))
        }, function() {
            this.sortChampions(this.state.originalChampions, this.state.search);
        });
    }

    //set active champion and get matchup data
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

    setActiveElo = (elo) => {
        if (elo !== this.state.activeElo) {
            this.setState(prevState => ({
                activeElo: elo
            }), function() {
              this.setActiveChampion(this.state.activeChampionId);
              let e = document.getElementById("bestMatchupsColumn");
              e.scrollTop = 0;
              e = document.getElementById("worstMatchupsColumn");
              e.scrollTop = 0;
              e = document.getElementById("mostCommonMatchupsColumn");
              e.scrollTop = 0;
            });
        }
    }

    setMinCount = (minCount) => {
        if (minCount !== this.state.minCount) {
            this.setState(prevState => ({
                minCount: minCount
            }), function() {
                this.setActiveChampion(this.state.activeChampionId);
                let e = document.getElementById("bestMatchupsColumn");
                e.scrollTop = 0;
                e = document.getElementById("worstMatchupsColumn");
                e.scrollTop = 0;
                e = document.getElementById("mostCommonMatchupsColumn");
                e.scrollTop = 0;
            });
        }
    }

    //handle logic to get data for matchup info (winrates, kda?) and assign to variables before rendering
    displayChampionMatchups = (id) => {
        if (id === null) {
            return (
                <div className="championMatchups_default">
                    <div className="championMatchups_defaultTitle">Champion Matchups</div>
                </div>
            );
        }

        let matchups = [];
        let matchupsGroup = [];
        let matchupIcons = [];
        let championIconUrl = "";
        let matchupId = "";
        let matchupWinRate = null;
        let matchupGames = null;
        let numMatchups = this.state.numMatchups;

        championIconUrl = utility.getChampionSplashUrl(utility.championIdToKey(id));

        //display active champion
        matchups.push(
            <div className="championMatchup_activeChampionGroup">
                <div className="championMatchup_activeChampionBanner" style={{"background": "url(" + championIconUrl + ") no-repeat center"}} >
                    <div className="championMatchup_activeChampionNameBG">
                        <div className="championMatchup_activeChampionName">{utility.championIdToName(id)}</div>
                    </div>
                </div>
            </div>
        );

        matchups.push(
            <div className="championMatchup_filters">
                <div className="championMatchup_filterGroup">
                    <div className="championMatchup_filterTitle">ELO</div>
                    <div className="championMatchup_filterValue">
                        {this.state.activeElo}
                        <div className="championMatchup_filterDropdown">
                            <div className="championMatchup_filterOption" onClick={() => this.setActiveElo("PLATINUM+")} >Platinum+</div>
                            <div className="championMatchup_filterOption" onClick={() => this.setActiveElo("PLATINUM")} >Platinum</div>
                            <div className="championMatchup_filterOption" onClick={() => this.setActiveElo("GOLD")} >Gold</div>
                            <div className="championMatchup_filterOption" onClick={() => this.setActiveElo("SILVER")} >Silver</div>
                            <div className="championMatchup_filterOption" onClick={() => this.setActiveElo("BRONZE")} >Bronze</div>
                        </div>
                    </div>
                </div>
                <div className="championMatchup_filterGroup">
                    <div className="championMatchup_filterTitle">Min Games</div>
                    <div className="championMatchup_filterValue">
                        {this.state.minCount}+
                        <div className="championMatchup_filterDropdown">
                            <div className="championMatchup_filterOption" onClick={() => this.setMinCount(100)} >100+</div>
                            <div className="championMatchup_filterOption" onClick={() => this.setMinCount(200)} >200+</div>
                            <div className="championMatchup_filterOption" onClick={() => this.setMinCount(300)} >300+</div>
                            <div className="championMatchup_filterOption" onClick={() => this.setMinCount(400)} >400+</div>
                            <div className="championMatchup_filterOption" onClick={() => this.setMinCount(500)} >500+</div>
                            <div className="championMatchup_filterOption" onClick={() => this.setMinCount(1000)} >1000+</div>
                        </div>
                    </div>
                </div>
            </div>
        )

        let matchupColumns = [];

        //highest win rate matchups
        if (this.state.highestWinRateMatchupsData.length < this.state.numMatchups) {
            numMatchups = this.state.highestWinRateMatchupsData.length;
        }
        for (let i = 0; i < numMatchups; i++) {
            matchupGames = this.state.highestWinRateMatchupsData[i].count;
            if (this.state.highestWinRateMatchupsData[i].champ2_id === id) {
                matchupId = this.state.highestWinRateMatchupsData[i].champ1_id;
                matchupWinRate = this.state.highestWinRateMatchupsData[i].champ1.winrate;
            } else {
                matchupId = this.state.highestWinRateMatchupsData[i].champ2_id;
                matchupWinRate = this.state.highestWinRateMatchupsData[i].champ2.winrate;
            }

            matchupIcons.push(
                this.displayChampionMatchupCard(matchupId, matchupWinRate, matchupGames)
            );
        }

        matchupsGroup.push(<div className="championMatchupsGroup" id="bestMatchupsColumn" >{matchupIcons}</div>);

        matchupColumns.push(
            <div className="championMatchupsColumn">
                <div className="championMatchupsColumnTitle">Best Matchups</div>
                {matchupsGroup}
            </div>
        );

        matchupsGroup = [];
        matchupIcons = [];

        matchupColumns.push(<div className="championMatchupsColumnDivider"></div>);

        //lowest win rate matchups
        if (this.state.lowestWinRateMatchupsData.length < this.state.numMatchups) {
            numMatchups = this.state.lowestWinRateMatchupsData.length;
        }
        for (let i = 0; i < numMatchups; i++) {
            matchupGames = this.state.lowestWinRateMatchupsData[i].count;
            if (this.state.lowestWinRateMatchupsData[i].champ2_id === id) {
                matchupId = this.state.lowestWinRateMatchupsData[i].champ1_id;
                matchupWinRate = this.state.lowestWinRateMatchupsData[i].champ1.winrate;
            } else {
                matchupId = this.state.lowestWinRateMatchupsData[i].champ2_id;
                matchupWinRate = this.state.lowestWinRateMatchupsData[i].champ2.winrate;
            }

            matchupIcons.push(
                this.displayChampionMatchupCard(matchupId, matchupWinRate, matchupGames)
            );
        }

        matchupsGroup.push(<div className="championMatchupsGroup" id="worstMatchupsColumn" >{matchupIcons}</div>);

        matchupColumns.push(
            <div className="championMatchupsColumn">
                <div className="championMatchupsColumnTitle">Worst Matchups</div>
                {matchupsGroup}
            </div>
        );

        matchupsGroup = [];
        matchupIcons = [];

        matchupColumns.push(<div className="championMatchupsColumnDivider"></div>);

        //most common matchups
        if (this.state.mostCommonMatchupsData.length < this.state.numMatchups) {
            numMatchups = this.state.mostCommonMatchupsData.length;
        }
        for (let i = 0; i < numMatchups; i++) {
            matchupGames = this.state.mostCommonMatchupsData[i].count;
            if (this.state.mostCommonMatchupsData[i].champ2_id === id) {
                matchupId = this.state.mostCommonMatchupsData[i].champ1_id;
                matchupWinRate = this.state.mostCommonMatchupsData[i].champ1.winrate;
            } else {
                matchupId = this.state.mostCommonMatchupsData[i].champ2_id;
                matchupWinRate = this.state.mostCommonMatchupsData[i].champ2.winrate;
            }

            matchupIcons.push(
                this.displayChampionMatchupCard(matchupId, matchupWinRate, matchupGames)
            );
        }

        matchupsGroup.push(<div className="championMatchupsGroup" id="mostCommonMatchupsColumn" >{matchupIcons}</div>);

        matchupColumns.push(
            <div className="championMatchupsColumn">
                <div className="championMatchupsColumnTitle">Most Common</div>
                {matchupsGroup}
            </div>
        );

        //group matchup columns together
        matchups.push(
            <div className="matchupColumns">{matchupColumns}</div>
        );

        return (
            <div className="matchups">{matchups}</div>
        );
    }

    displayChampionMatchupCard = (id, winRate, games) => {
        let championIconUrl = utility.getChampionIconUrl(utility.championIdToKey(id));
        return (
            <div className="championMatchupsCard">
                <img src={championIconUrl} className="championMatchupsIcon" alt={utility.championIdToName(id)} onClick={() => this.setActiveChampion(id)} />
                <div className="championMatchupsInfoGroup">
                    <div className="championMatchupsRow" style={{"fontSize": "16px", "marginTop": "10px"}} >
                        {utility.championIdToName(id)}
                    </div>
                    <div className="championMatchupsRow">
                        Win Rate Against: {(100 - (winRate * 100)).toFixed(2)}%
                    </div>
                    <div className="championMatchupsRow">
                        Games: {games}
                    </div>
                </div>
            </div>
        );
    }

    displayChampionIcons = (champions) => {
        let championIcons = [];
        let championIconsRow = [];
        let rowSize = 12;

        let championIconUrl = "";

        for (let i = 0; i < champions.length; i++) {
            championIconUrl = utility.getChampionIconUrl(champions[i].key);

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
                    <img src={championIconUrl} className="championMatchupsIcon" alt={utility.championIdToName(champions[i].id)}/>
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

    //sorts champions based on search
    sortChampions = (champions, search) => {
        //will be the array of champions we return after all sorting/seraching
        let championsCopy = champions;

        //update championsCopy by search criteria
        if (search) {
            championsCopy = this.sortChampionsSearch(championsCopy, search);
        }

        //update the champions we will display
        this.setState({
            champions: championsCopy
        });
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
        
        //only include matchups with a minimum game count of 100
        for (let i = 0; i < matchups.length; i++) {
            if (matchups[i].count >= this.state.minCount && matchups[i].role !== "SYNERGY" && matchups[i].role !== "ADCSUPPORT") {
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
        
        //only include matchups with a minimum game count of 100
        for (let i = 0; i < matchups.length; i++) {
            if (matchups[i].count >= this.state.minCount && matchups[i].role !== "SYNERGY" && matchups[i].role !== "ADCSUPPORT") {
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

    sortChampionsSearch = (champions, search) => {
        let championsSorted = [];

        for (let a = 0; a < champions.length; a++) {
            //Nicknames
            if (search.toLowerCase() === "cow" && champions[a].name === "Alistar") {
                championsSorted.push(champions[a]);
            }
            //ABBREVIATIONS
            if ((search.toLowerCase() === "j4" || search.toLowerCase() === "jiv") && champions[a].name === "Jarvan IV") {
                championsSorted.push(champions[a]);
            }
            if ((search.toLowerCase() === "mf") && champions[a].name === "Miss Fortune") {
                championsSorted.push(champions[a]);
            }
            if ((search.toLowerCase() === "tf") && champions[a].name === "Twisted Fate") {
                championsSorted.push(champions[a]);
            }

            //If search is greater than champion name, continue
            if (search.length > champions[a].name.length) {
                continue;
            }
            if (champions[a].name.toLowerCase().includes(search.toLowerCase())) {
                championsSorted.push(champions[a]);
            }
        }

        return championsSorted;
    }

    //update search state as user types
    handleSearchChange = (event) => {
        this.setState({
            search: event.target.value
        }, function() {
            this.sortChampions(this.state.originalChampions, this.state.search);
        });
    }

    render() {
        console.log(this.state.search);
        if (this.state.champions) {
            return (
                <div className="ChampionMatchups">
                    {this.displayChampionMatchups(this.state.activeChampionId)}
                    <div className="championMatchupsDescription">Matchup data by rank and number of games. Data is provided by <a href="https://www.champion.gg">&nbsp;champion.gg</a></div>
                    <div className="championSearch" id="championSearch_matchups" >
                            <input id="searchBar"
                                type="text"
                                autoComplete="off"
                                value={this.state.search}
                                placeholder="Find A Champion..."
                                onChange={this.handleSearchChange}
                            />
                    </div>
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