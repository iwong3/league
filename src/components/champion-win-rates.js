import React, { Component} from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';

import '../styles/champion-win-rates.css';


export default class ChampionWinRates extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeData: [],
            platPlusData: [],
            groupedPlatPlusData: [],
            averagedPlatPlusData: [],
            platData: [],
            groupedPlatData: [],
            averagedPlatData: [],
            goldData: [],
            groupedGoldData: [],
            averagedGoldData: [],
            silverData: [],
            groupedSilverData: [],
            averagedSilverData: [],
            bronzeData: [],
            groupedBronzeData: [],
            averagedBronzeData: [],
            leagues: ["Platinum+", "Platinum", "Gold", "Silver", "Bronze"],
            activeLeague: "Platinum+",
            sort: "winRate",
            search: ""
        }
    }

    //get all champions + roles that fit their criteria
    //group them by id
    //average out the data
    //do this for each rank and set that data in our state
    componentDidMount = () => {
        let championWinRateUrl = utility.getAllChampionWinRatesByElo("PLATINUM+");
        axios.get(championWinRateUrl).then(res => {
            this.setState({
                platPlusData: res.data
            }, function() {
                this.setState({
                    groupedPlatPlusData: this.groupChampions(this.state.platPlusData)
                }, function() {
                    this.setState({
                        averagedPlatPlusData: this.averageOutWinRates(this.state.groupedPlatPlusData)
                    }, function() {
                        this.sortChampions(this.state.averagedPlatPlusData);
                    });
                });
            });
            
            championWinRateUrl = utility.getAllChampionWinRatesByElo("PLATINUM");
            return axios.get(championWinRateUrl);
        }).then(res => {
            this.setState({
                platData: res.data
            }, function() {
                this.setState({
                    groupedPlatData: this.groupChampions(this.state.platData)
                }, function() {
                    this.setState({
                        averagedPlatData: this.averageOutWinRates(this.state.groupedPlatData)
                    });
                });
            });

            championWinRateUrl = utility.getAllChampionWinRatesByElo("GOLD");
            return axios.get(championWinRateUrl);
        }).then(res => {
            this.setState({
                goldData: res.data
            }, function() {
                this.setState({
                    groupedGoldData: this.groupChampions(this.state.goldData)
                }, function() {
                    this.setState({
                        averagedGoldData: this.averageOutWinRates(this.state.groupedGoldData)
                    });
                });
            });

            championWinRateUrl = utility.getAllChampionWinRatesByElo("SILVER");
            return axios.get(championWinRateUrl);
        }).then(res => {
            this.setState({
                silverData: res.data
            }, function() {
                this.setState({
                    groupedSilverData: this.groupChampions(this.state.silverData)
                }, function() {
                    this.setState({
                        averagedSilverData: this.averageOutWinRates(this.state.groupedSilverData)
                    });
                });
            });

            championWinRateUrl = utility.getAllChampionWinRatesByElo("BRONZE");
            return axios.get(championWinRateUrl);
        }).then(res => {
            this.setState({
                bronzeData: res.data
            }, function() {
                this.setState({
                    groupedBronzeData: this.groupChampions(this.state.bronzeData)
                }, function() {
                    this.setState({
                        averagedBronzeData: this.averageOutWinRates(this.state.groupedBronzeData)
                    });
                });
            });
        });
    }

    //groups champions together in an array
    groupChampions = (data) => {
        let groupedData = [];
        let champion = [];
        let lastChampionId = data[0].championId;

        for (let i = 0; i < data.length; i++) {
            if (data[i].championId === lastChampionId) {
                champion.push(data[i]);
            } else {
                groupedData.push(champion);
                champion = [];
                lastChampionId = data[i].championId;
                champion.push(data[i]);
            }
        }

        return groupedData;
    }

    //if a champion has multiple roles, average the data for those roles
    averageOutWinRates = (data) => {
        let averagedData = [];
        let champion = {};
        let numRoles = 0;
        let roles = [];

        //Helper variables for calculations
        let totalWins = 0;
        let totalGames = 0;
        let playRate = 0;
        let totalGamesOnChamp = 0;

        let totalKills = 0;
        let totalDeaths = 0;
        let totalAssists = 0;
        let totalCS = 0;
        let totalGold = 0;

        let totalTrueDamage = 0;
        let totalMagicDamage = 0;
        let totalPhysicalDamage = 0;
        let totalDamage = 0;

        for (let i = 0; i < data.length; i++) {
            champion.championId = data[i][0].championId;
            champion.banRate = data[i][0].banRate;

            //get totals
            for (let j = 0; j < data[i].length; j++) {
                roles.push(data[i][j].role);

                totalWins += data[i][j].winRate * data[i][j].gamesPlayed;
                totalGames += data[i][j].gamesPlayed;
                playRate += data[i][j].playRate;

                //certain champions don't have an averageGames field yet
                if (data[i][j].averageGames) {
                    totalGamesOnChamp += data[i][j].averageGames * data[i][j].gamesPlayed;
                } else {
                    totalGamesOnChamp = 0;
                }

                totalKills += data[i][j].kills * data[i][j].gamesPlayed;
                totalDeaths += data[i][j].deaths * data[i][j].gamesPlayed;
                totalAssists += data[i][j].assists * data[i][j].gamesPlayed;
                totalCS += data[i][j].minionsKilled * data[i][j].gamesPlayed;
                totalGold += data[i][j].goldEarned * data[i][j].gamesPlayed;

                totalTrueDamage += data[i][j].damageComposition.totalTrue * data[i][j].gamesPlayed;
                totalMagicDamage += data[i][j].damageComposition.totalMagical * data[i][j].gamesPlayed;
                totalPhysicalDamage += data[i][j].damageComposition.totalPhysical * data[i][j].gamesPlayed;
                totalDamage += data[i][j].damageComposition.total * data[i][j].gamesPlayed;
            }

            //calculate average values
            champion.numRoles = data[i].length;
            champion.roles = roles;

            champion.winRate = totalWins / totalGames;
            champion.wins = totalWins;
            champion.losses = totalGames - totalWins;
            champion.games = totalGames;
            champion.playRate = playRate;
            champion.averageGames = totalGamesOnChamp / totalGames;

            champion.kills = totalKills / totalGames;
            champion.deaths = totalDeaths / totalGames;
            champion.assists = totalAssists / totalGames;
            champion.cs = totalCS / totalGames;
            champion.gold = totalGold / totalGames;

            champion.trueDamage = totalTrueDamage / totalGames;
            champion.magicDamage = totalMagicDamage / totalGames;
            champion.physicalDamage = totalPhysicalDamage / totalGames;
            champion.totalDamage = totalDamage / totalGames;

            //add averaged champion
            averagedData.push(champion);

            //reset variables
            champion = {};
            roles = [];

            totalWins = 0;
            totalGames = 0;
            playRate = 0;
            totalGamesOnChamp = 0;

            totalKills = 0;
            totalDeaths = 0;
            totalAssists = 0;
            totalCS = 0;
            totalGold = 0;

            totalTrueDamage = 0;
            totalMagicDamage = 0;
            totalPhysicalDamage = 0;
            totalDamage = 0;
        }

        return averagedData;
    }

    selectLeague = (league) => {
        if (league !== this.state.activeLeague) {
            let newLeague = [];
            if (league === "Platinum+") {
                newLeague = this.state.averagedPlatPlusData;
            } else if (league === "Platinum") {
                newLeague = this.state.averagedPlatData;
            } else if (league === "Gold") {
                newLeague = this.state.averagedGoldData;
            } else if (league === "Silver") {
                newLeague = this.state.averagedSilverData;
            } else if (league === "Bronze") {
                newLeague = this.state.averagedBronzeData;
            }

            //update/reset state when new league is selected, then sort
            this.setState(prevState => ({
                activeLeague: league,
                sort: "winRate"
            }), function() {
                this.sortChampions(newLeague, this.state.search);
            });
        }
    }

    setLeagueStyle = (league) => {
        if (league === this.state.activeLeague) {
            return ({
                "color": "#ffffff"
            });
        }
    }

    sortChampions = (champions, search) => {
        let championsCopy = champions;

        if (this.state.sort === "champion") {
            championsCopy = this.sortByChampion(championsCopy);
        }
        if (this.state.sort === "championDesc") {
            championsCopy = this.sortByChampionDesc(championsCopy);
        }
        if (this.state.sort === "winRate") {
            championsCopy = this.sortByWinRate(championsCopy);
        }
        if (this.state.sort === "winRateDesc") {
            championsCopy = this.sortByWinRateDesc(championsCopy);
        }
        if (this.state.sort === "playRate") {
            championsCopy = this.sortByPlayRate(championsCopy);
        }
        if (this.state.sort === "playRateDesc") {
            championsCopy = this.sortByPlayRateDesc(championsCopy);
        }
        if (this.state.sort === "banRate") {
            championsCopy = this.sortByBanRate(championsCopy);
        }
        if (this.state.sort === "banRateDesc") {
            championsCopy = this.sortByBanRateDesc(championsCopy);
        }
        if (this.state.sort === "games") {
            championsCopy = this.sortByGames(championsCopy);
        }
        if (this.state.sort === "gamesDesc") {
            championsCopy = this.sortByGamesDesc(championsCopy);
        }

        if (search) {
            championsCopy = this.sortBySearch(championsCopy, search);
        }

        this.setState(prevState => ({
            activeData: championsCopy
        }));
    }

    //todo: add nicknames, maybe sort by region?
    sortBySearch = (champions, search) => {
        let championsSorted = [];

        for (let a = 0; a < champions.length; a++) {
            let championName = utility.championIdToName(champions[a].championId);
            //Nicknames
            if (search.toLowerCase() === "cow" && championName === "Alistar") {
                championsSorted.push(champions[a]);
            }
            //ABBREVIATIONS
            if ((search.toLowerCase() === "j4" || search.toLowerCase() === "jiv") && championName === "Jarvan IV") {
                championsSorted.push(champions[a]);
            }
            if ((search.toLowerCase() === "mf") && championName === "Miss Fortune") {
                championsSorted.push(champions[a]);
            }
            if ((search.toLowerCase() === "tf") && championName === "Twisted Fate") {
                championsSorted.push(champions[a]);
            }

            //If search is greater than champion name, continue
            if (search.length > championName.length) {
                continue;
            }
            if (championName.toLowerCase().includes(search.toLowerCase())) {
                championsSorted.push(champions[a]);
            }
        }

        return championsSorted;
    }

    handleSearchChange = (event) => {
        this.setState({
            search: event.target.value
        }, function() {
            let data = [];
            if (this.state.activeLeague === "Platinum+") {
                data = this.state.averagedPlatPlusData;
            } else if (this.state.activeLeague === "Platinum") {
                data = this.state.averagedPlatData;
            } else if (this.state.activeLeague === "Gold") {
                data = this.state.averagedGoldData;
            } else if (this.state.activeLeague === "Silver") {
                data = this.state.averagedSilverData;
            } else if (this.state.activeLeague === "Bronze") {
                data = this.state.averagedBronzeData;
            }

            this.sortChampions(data, this.state.search);
        });
    }

    sortByChampion = (champions) => {
        let championsSorted = champions;

        championsSorted.sort(function(champA, champB) {
            let champAName = utility.championIdToName(champA.championId);
            let champBName = utility.championIdToName(champB.championId);

            if (champAName.toLowerCase() < champBName.toLowerCase()) {
                return -1;
            }
            if (champAName.toLowerCase() > champBName.toLowerCase()) {
                return 1;
            }
            return 0;
        });

        return championsSorted;
    }

    sortByChampionDesc = (champions) => {
        let championsSorted = champions;

        championsSorted.sort(function(champA, champB) {
            let champAName = utility.championIdToName(champA.championId);
            let champBName = utility.championIdToName(champB.championId);

            if (champAName.toLowerCase() < champBName.toLowerCase()) {
                return 1;
            }
            if (champAName.toLowerCase() > champBName.toLowerCase()) {
                return -1;
            }
            return 0;
        });

        return championsSorted;
    }

    sortByWinRate = (champions) => {
        let championsSorted = champions;

        championsSorted.sort(function(champA, champB) {
            if (champA.winRate > champB.winRate) {
                return -1;
            }
            if (champA.winRate < champB.winRate) {
                return 1;
            }
            return 0;
        });

        for (let i = 0; i < championsSorted.length; i++) {
            championsSorted[i].rank = i+1;
        }

        return championsSorted;
    }

    sortByWinRateDesc = (champions) => {
        let championsSorted = champions;

        championsSorted.sort(function(champA, champB) {
            if (champA.winRate > champB.winRate) {
                return 1;
            }
            if (champA.winRate < champB.winRate) {
                return -1;
            }
            return 0;
        });

        return championsSorted;
    }

    sortByPlayRate = (champions) => {
        let championsSorted = champions;

        championsSorted.sort(function(champA, champB) {
            if (champA.playRate > champB.playRate) {
                return -1;
            }
            if (champA.playRate < champB.playRate) {
                return 1;
            }
            return 0;
        });

        return championsSorted;
    }

    sortByPlayRateDesc = (champions) => {
        let championsSorted = champions;

        championsSorted.sort(function(champA, champB) {
            if (champA.playRate > champB.playRate) {
                return 1;
            }
            if (champA.playRate < champB.playRate) {
                return -1;
            }
            return 0;
        });

        return championsSorted;
    }

    sortByBanRate = (champions) => {
        let championsSorted = champions;

        championsSorted.sort(function(champA, champB) {
            if (champA.banRate > champB.banRate) {
                return -1;
            }
            if (champA.banRate < champB.banRate) {
                return 1;
            }
            return 0;
        });

        return championsSorted;
    }

    sortByBanRateDesc = (champions) => {
        let championsSorted = champions;

        championsSorted.sort(function(champA, champB) {
            if (champA.banRate > champB.banRate) {
                return 1;
            }
            if (champA.banRate < champB.banRate) {
                return -1;
            }
            return 0;
        });

        return championsSorted;
    }

    sortByGames = (champions) => {
        let championsSorted = champions;

        championsSorted.sort(function(champA, champB) {
            if (champA.averageGames > champB.averageGames) {
                return -1;
            }
            if (champA.averageGames < champB.averageGames) {
                return 1;
            }
            return 0;
        });

        return championsSorted;
    }

    sortByGamesDesc = (champions) => {
        let championsSorted = champions;

        championsSorted.sort(function(champA, champB) {
            if (champA.averageGames > champB.averageGames) {
                return 1;
            }
            if (champA.averageGames < champB.averageGames) {
                return -1;
            }
            return 0;
        });

        return championsSorted;
    }

    updateSort = (sort) => {
        let newSort = "";

        if (sort === "champion") {
            if (this.state.sort !== "champion" && this.state.sort !== "championDesc") {
                newSort = "champion";
            } else if (this.state.sort === "champion") {
                newSort = "championDesc";
            } else {
                newSort = "champion";
            }
        }

        if (sort === "winRate") {
            if (this.state.sort !== "winRate" && this.state.sort !== "winRateDesc") {
                newSort = "winRate";
            } else if (this.state.sort === "winRate") {
                newSort = "winRateDesc";
            } else {
                newSort = "winRate";
            }
        }

        if (sort === "playRate") {
            if (this.state.sort !== "playRate" && this.state.sort !== "playRateDesc") {
                newSort = "playRate";
            } else if (this.state.sort === "playRate") {
                newSort = "playRateDesc";
            } else {
                newSort = "playRate";
            }
        }

        if (sort === "banRate") {
            if (this.state.sort !== "banRate" && this.state.sort !== "banRateDesc") {
                newSort = "banRate";
            } else if (this.state.sort === "banRate") {
                newSort = "banRateDesc";
            } else {
                newSort = "banRate";
            }
        }

        if (sort === "games") {
            if (this.state.sort !== "games" && this.state.sort !== "gamesDesc") {
                newSort = "games";
            } else if (this.state.sort === "games") {
                newSort = "gamesDesc";
            } else {
                newSort = "games";
            }
        }
        
        this.setState(prevState => ({
            sort: newSort
        }), function() {
            this.sortChampions(this.state.activeData);
        });
    }

    setHeaderOptionStyle = (sort) => {
        let style = {
            "width": "100px"
        };

        if (sort.includes("champion")) {
            style["width"] = "200px";
        }
        if (sort.includes("champion") || sort.includes("winRate") || sort.includes("playRate") || sort.includes("banRate") || sort.includes("games")) {
            style["cursor"] = "pointer";
        }
        if (this.state.sort.includes(sort)) {
            style["color"] = "#ffffff";
        }

        return style;
    }

    displayWinRates = (data) => {
        let championWinRates = [];
        championWinRates.push(
            <div className="championWinRatesTitle">Champion Win Rates</div>
        );

        championWinRates.push(
            <div className="championWinRatesDescription">Champion must have at least 1000 games or 11% playrate in the role. Data is provided by <a href="https://www.champion.gg">&nbsp;champion.gg</a></div>
        );

        championWinRates.push(
            <div className="championSearch" id="championWinRatesSearch">
                <input id="searchBar"
                    type="text"
                    autoComplete="off"
                    value={this.state.search}
                    placeholder="Find A Champion..."
                    onChange={this.handleSearchChange}
                />
            </div>
        );

        let championWinRatesContent = [];

        let leagueSelector = [];
        leagueSelector.push(
            <div className="leagueSelector_title">League</div>
        );

        let leagues = [];
        for (let i = 0; i < this.state.leagues.length; i++) {
            leagues.push(
                <div className="leagueSelector_league"
                     onClick={() => this.selectLeague(this.state.leagues[i])}
                     style={this.setLeagueStyle(this.state.leagues[i])} >
                    {this.state.leagues[i]}
                </div>
            );
        }

        leagueSelector.push(
            <div className="leagueSelector_leagues">{leagues}</div>
        );

        championWinRatesContent.push(
            <div className="leagueSelector">{leagueSelector}</div>
        );

        let championWinRateRowsContent = [];
        championWinRateRowsContent.push(
            <div className="championWinRateRows_header">
                <div className="championWinRateRows_headerOption" id="rank" style={{"width": "75px"}}>Rank</div>
                <div className="championWinRateRows_headerOption"
                     onClick={() => this.updateSort("champion")}
                     style={this.setHeaderOptionStyle("champion")} >
                    {this.state.sort === "champion" ? "Champion ↓" : this.state.sort === "championDesc" ? "Champion ↑" : "Champion"}
                </div>
                <div className="championWinRateRows_headerOption"
                     onClick={() => this.updateSort("winRate")}
                     style={this.setHeaderOptionStyle("winRate")} >
                    {this.state.sort === "winRate" ? "Win % ↓" : this.state.sort === "winRateDesc" ? "Win % ↑" : "Win %"}
                </div>
                <div className="championWinRateRows_headerOption"
                     onClick={() => this.updateSort("playRate")}
                     style={this.setHeaderOptionStyle("playRate")} >
                    {this.state.sort === "playRate" ? "Play % ↓" : this.state.sort === "playRateDesc" ? "Play % ↑" : "Play %"}
                </div>
                <div className="championWinRateRows_headerOption"
                     onClick={() => this.updateSort("banRate")}
                     style={this.setHeaderOptionStyle("banRate")} >
                    {this.state.sort === "banRate" ? "Ban % ↓" : this.state.sort === "banRateDesc" ? "Ban % ↑" : "Ban %"}
                </div>
                <div className="championWinRateRows_headerOption"
                     onClick={() => this.updateSort("games")}
                     style={this.setHeaderOptionStyle("games")} >
                    {this.state.sort === "games" ? "Games ↓" : this.state.sort === "gamesDesc" ? "Games ↑" : "Games"}
                </div>
                <div className="championWinRateRows_headerOption" style={{"width": "100px"}}>Kills</div>
                <div className="championWinRateRows_headerOption" style={{"width": "100px"}}>Deaths</div>
                <div className="championWinRateRows_headerOption" style={{"width": "100px"}}>Assists</div>
                <div className="championWinRateRows_headerOption" style={{"width": "100px"}}>CS</div>
                <div className="championWinRateRows_headerOption" style={{"width": "100px"}}>Gold</div>
                <div className="championWinRateRows_headerOption" style={{"width": "100px"}}>Roles</div>
            </div>
        )

        let championWinRateRows = [];
        for (let i = 0; i < data.length; i++) {
            championWinRateRows.push(this.displayWinRatesHelper(data[i]));
        }

        championWinRateRowsContent.push(
            <div className="championWinRateRows">{championWinRateRows}</div>
        );

        championWinRatesContent.push(
            <div className="championWinRateRowsContent">{championWinRateRowsContent}</div>
        );

        championWinRates.push(
            <div className="championWinRatesContent">{championWinRatesContent}</div>
        );

        return (
            <div className="championWinRates">{championWinRates}</div>   
        );
    }

    displayRoles = (roles) => {
        let rolesText = "";

        for (let i = 0; i < roles.length; i++) {
            rolesText += this.displayRolesHelper(roles[i]);
            if (i === roles.length - 1) {
                break;
            }
            rolesText += ", ";
        }

        return rolesText;
    }

    displayRolesHelper = (role) => {
        if (role === "TOP") {
            return "TOP";
        }
        if (role === "JUNGLE") {
            return "JG";
        }
        if (role === "MIDDLE") {
            return "MID";
        }
        if (role === "DUO_CARRY") {
            return "ADC";
        }
        if (role === "DUO_SUPPORT") {
            return "SUP";
        }
    }

    displayWinRatesHelper = (champion) => {
        return (
            <div className="championWinRateRow">
                <div className="championWinRateRow_small">{champion.rank}</div>
                <div className="championWinRateRow_large">
                    <img className="championWinRateRow_icon" src={utility.getChampionIconUrl(utility.championIdToKey(champion.championId))} />
                    <div className="championWinRateRow_name">
                        {utility.championIdToName(champion.championId)}
                    </div>
                </div>
                <div className="championWinRateRow_med">
                    {(champion.winRate * 100).toFixed(2)}%
                </div>
                <div className="championWinRateRow_med">
                    {(champion.playRate * 100).toFixed(2)}%
                </div>
                <div className="championWinRateRow_med">
                    {(champion.banRate * 100).toFixed(2)}%
                </div>
                <div className="championWinRateRow_med">
                    {champion.averageGames ? champion.averageGames.toFixed(2) : "NaN"}
                </div>
                <div className="championWinRateRow_med">
                    {champion.kills.toFixed(2)}
                </div>
                <div className="championWinRateRow_med">
                    {champion.deaths.toFixed(2)}
                </div>
                <div className="championWinRateRow_med">
                    {champion.assists.toFixed(2)}
                </div>
                <div className="championWinRateRow_med">
                    {champion.cs.toFixed(2)}
                </div>
                <div className="championWinRateRow_med">
                    {Math.round(champion.gold)}
                </div>
                <div className="championWinRateRow_med">
                    {this.displayRoles(champion.roles)}
                </div>
            </div>
        );
    }

    render() {
        if (this.state.activeData) {
            return (
                <div className="ChampionWinRates">
                    {this.displayWinRates(this.state.activeData)}
                    {/* {this.averageOutWinRates(this.state.platPlusData)} */}
                    {/* {console.log(this.state.platPlusData)} */}
                </div>
            );
        } else {
            return <none/>;
        }
    }

}