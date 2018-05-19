import React, { Component } from 'react';
// import axios from 'axios';

import * as championsSort from '../utilities/champions-sort';
import * as constant from '../utilities/constants';
import * as utility from '../utilities/functions';

import '../styles/champions.css';


export default class Champions extends Component {

    constructor(props) {
        super(props);

        //- champions represents the array of champions to be displayed
        //  - will be modified by sort criteria
        //- originalChampions is the array of all champions - sorting is performed on this array
        //- sort provides criteria for sorting
        //  - roles: [assassin, fighter, mage, marksman, support, tank]
        this.state = {
            champions: [],
            originalChampions: [],
            sort: {
                alphabetReverse: false,
                roles: [false, false, false, false, false, false],
                abilityCost: "all",
                stats: "none"
            },
            search: ""
        };
    }

    //standardize format of champions for sorting, then run initial sort (alphabetical) for render
    componentDidMount = () => {
        this.setState ({
            originalChampions: this.standardizeChampions(championsSort.championsSort.data)
        }, function() {
            this.sortChampions(this.state.originalChampions, this.state.sort, this.state.search);
        });
    }

    //If we want to grab the data from the API
    // componentDidMount = () => {
    //     let championsUrl = utility.getChampionsUrl();
    //     axios.get(championsUrl)
    //         .then(res => {
    //             this.setState({
    //                 originalChampions: this.standardizeChampions(res.data.data)
    //             }, function() {
    //                 this.sortChampions(this.state.originalChampions, this.state.sort, this.state.search);
    //             });
    //         })
    //         .catch(error => {
    //             this.setState ({
    //                 originalChampions: this.standardizeChampions(champions.champions.data),
    //             }, function() {
    //                 this.sortChampions(this.state.originalChampions, this.state.sort, this.state.search);
    //             });
    //         });
    // }

    //updates this.state.sort properties
    setSearchCriteria = (criteria) => {
        let sortCopy = this.state.sort;
        switch (criteria) {
            //ALPHABET
            case ("alphabet"):
                sortCopy.alphabetReverse = false;
                sortCopy.stats = "none";
                break;
            case ("alphabetReverse"):
                sortCopy.alphabetReverse = true;
                sortCopy.stats = "none";
                break;
            //ROLE
            case ("assassin"):
                sortCopy.roles[0] = !sortCopy.roles[0];
                break;
            case ("fighter"):
                sortCopy.roles[1] = !sortCopy.roles[1];
                break;
            case ("mage"):
                sortCopy.roles[2] = !sortCopy.roles[2];
                break;
            case ("marksman"):
                sortCopy.roles[3] = !sortCopy.roles[3];
                break;
            case ("support"):
                sortCopy.roles[4] = !sortCopy.roles[4];
                break;
            case ("tank"):
                sortCopy.roles[5] = !sortCopy.roles[5];
                break;
            //ABILITY COST
            case ("mana"):
                if (sortCopy.abilityCost === "Mana") {
                    sortCopy.abilityCost = "all";
                    break;
                }
                sortCopy.abilityCost = "Mana";
                break;
            case ("energy"):
                if (sortCopy.abilityCost === "Energy") {
                    sortCopy.abilityCost = "all";
                    break;
                }
                sortCopy.abilityCost = "Energy";
                break;
            case ("noCost"):
                if (sortCopy.abilityCost === "None") {
                    sortCopy.abilityCost = "all";
                    break;
                }
                sortCopy.abilityCost = "None";
                break;
            case ("other"):
                if (sortCopy.abilityCost === "Other") {
                    sortCopy.abilityCost = "all";
                    break;
                }
                sortCopy.abilityCost = "Other";
                break;
            //STATS
            case ("armor"):
            case ("armorperlevel"):
            case ("attackdamage"):
            case ("attackdamageperlevel"):
            case ("attackrange"):
            case ("hp"):
            case ("hpperlevel"):
            case ("hpregen"):
            case ("hpregenperlevel"):
            case ("movespeed"):
            case ("mp"):
            case ("mpperlevel"):
            case ("mpregen"):
            case ("mpregenperlevel"):
            case ("spellblock"):
            case ("spellblockperlevel"):
                if (sortCopy.stats === criteria) {
                    sortCopy.stats = "none";
                    break;
                }
                sortCopy.stats = criteria;
                sortCopy.alphabetReverse = false;
                break;
            default:
                break;
        }

        this.setState({
            sort: sortCopy
        }, function() {
            this.sortChampions(this.state.originalChampions, this.state.sort, this.state.search);
        });
    }

    //returns gold/red depending on if criteria is active
    setCriteriaStyle = (criteria) => {
        let active = false;
        switch (criteria) {
            //ALPHABET
            case ("alphabet"):
                if (this.state.sort.stats === "none" && !this.state.sort.alphabetReverse) {
                    active = true;
                }
                break;
            case ("alphabetReverse"):
                if (this.state.sort.stats === "none" && this.state.sort.alphabetReverse) {
                    active = true;
                }
                break;
            //ROLE
            case ("assassin"):
                if (this.state.sort.roles[0]) {
                    active = true;
                }
                break;
            case ("fighter"):
                if (this.state.sort.roles[1]) {
                    active = true;
                }
                break;
            case ("mage"):
                if (this.state.sort.roles[2]) {
                    active = true;
                }
                break;
            case ("marksman"):
                if (this.state.sort.roles[3]) {
                    active = true;
                }
                break;
            case ("support"):
                if (this.state.sort.roles[4]) {
                    active = true;
                }
                break;
            case ("tank"):
                if (this.state.sort.roles[5]) {
                    active = true;
                }
                break;
            //ABILITY COST
            case ("mana"):
                if (this.state.sort.abilityCost === "Mana") {
                    active = true;
                }
                break;
            case ("energy"):
                if (this.state.sort.abilityCost === "Energy") {
                    active = true;
                }
                break;
            case ("noCost"):
                if (this.state.sort.abilityCost === "None") {
                    active = true;
                }
                break;
            case ("other"):
                if (this.state.sort.abilityCost === "Other") {
                    active = true;
                }
                break;
            //STATS
            case ("armor"):
            case ("armorperlevel"):
            case ("attackdamage"):
            case ("attackdamageperlevel"):
            case ("attackrange"):
            case ("hp"):
            case ("hpperlevel"):
            case ("hpregen"):
            case ("hpregenperlevel"):
            case ("movespeed"):
            case ("mp"):
            case ("mpperlevel"):
            case ("mpregen"):
            case ("mpregenperlevel"):
            case ("spellblock"):
            case ("spellblockperlevel"):
                if (this.state.sort.stats === criteria) {
                    active = true;
                }
                break;
            default:
                break;
        }
        if (active) {
            return ({
                "color": "#cd2626"
            });
        }
        return ({
            "color": "#f1e6d2"
        });
    }

    //sorts champions based on sort criteria + search
    sortChampions = (champions, sort, search) => {
        //will be the array of champions we return after all sorting/seraching
        let championsCopy = champions;

        //update championsCopy with selected roles
        if (sort.roles[0]) {
            championsCopy = this.sortChampionsTags(championsCopy, "Assassin");
        }
        if (sort.roles[1]) {
            championsCopy = this.sortChampionsTags(championsCopy, "Fighter");
        }
        if (sort.roles[2]) {
            championsCopy = this.sortChampionsTags(championsCopy, "Mage");
        }
        if (sort.roles[3]) {
            championsCopy = this.sortChampionsTags(championsCopy, "Marksman");
        }
        if (sort.roles[4]) {
            championsCopy = this.sortChampionsTags(championsCopy, "Support");
        }
        if (sort.roles[5]) {
            championsCopy = this.sortChampionsTags(championsCopy, "Tank");
        }

        //update championsCopy by abilityCost
        if (sort.abilityCost !== "all") {
            championsCopy = this.sortChampionsPartype(championsCopy, sort.abilityCost);
        }

        //update championsCopy by stat
        if (sort.stats !== "none") {
            championsCopy = this.sortChampionsStats(championsCopy, sort.stats);
        } else {
            //if no stat, sort alphabetically
            if (!sort.alphabetReverse) {
                championsCopy = this.sortChampionsAlphabetically(championsCopy);
            } else {
                championsCopy = this.sortChampionsReverseAlphabetically(championsCopy);
            } 
        }

        //finally, update championsCopy by search criteria
        if (search) {
            championsCopy = this.sortChampionsSearch(championsCopy, search);
        }

        this.setState({
            champions: championsCopy
        });
    }

    //Helper function to standardize format of champions
    //Allows sorting functions to recieve and output in same format
    standardizeChampions = (champions) => {
        let standardizedChampions = [];
        Object.keys(champions).map((champion) => standardizedChampions.push(champions[champion]));
        return standardizedChampions;
    }

    //Displays champions with a row size
    displayChampions = (champions) => {
        let rowSize = 12;

        var icons = Object.keys(champions).map((champion) => this.displayChampionsHelper(champions[champion]))
            //row stores icons with a size of rowSize
            .reduce(function(row, icon, index) {
                //if we hit rowSize, reset row
                if (index % rowSize === 0) {
                    row.push([]);
                }
                //push icon into row
                row[row.length - 1].push(icon);
                return row;
            }, []).map(function(row, index) {
                return <div className="championRow">{row}</div>;
            });

        return icons;
    }

    //to change: return a ChampionCard Component instead
    displayChampionsHelper = (champion) => {
        let championIconUrl = utility.getChampionIconUrl(champion.key);
        return (
            <img src={championIconUrl} alt={champion.name} style={{"width": "100px"}} />
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

    sortChampionsReverseAlphabetically = (champions) => {
        let championsSorted = champions;
        
        championsSorted.sort(function(champA, champB) {
            if (champA.name.toLowerCase() < champB.name.toLowerCase()) {
                return 1;
            }
            if (champA.name.toLowerCase() > champB.name.toLowerCase()) {
                return -1;
            }
            return 0;
        });

        return championsSorted;
    }

    sortChampionsPartype = (champions, partype) => {
        let other = false;
        if (partype === "Other") {
            other = true;
        }

        let championsSorted = [];

        if (other) {
            for (let i = 0; i < champions.length; i++) {
                if (champions[i].partype === "Heat" || 
                    champions[i].partype === "Flow" || 
                    champions[i].partype === "Fury" || 
                    champions[i].partype === "Rage" || 
                    champions[i].partype === "Shield" || 
                    champions[i].partype === "Blood Well" || 
                    champions[i].partype === "Crimson Rush" || 
                    champions[i].partype === "Courage" || 
                    champions[i].partype === "Ferocity") {
                        championsSorted.push(champions[i]);
                }
            }
        } else {
            for (let i = 0; i < champions.length; i++) {
                if (champions[i].partype === partype) {
                    championsSorted.push(champions[i]);
                }
            }
        }

        return championsSorted;
    }

    sortChampionsTags = (champions, tag) => {
        let championsSorted = [];

        for (let a = 0; a < champions.length; a++) {
            for (let b = 0; b < champions[a].tags.length; b++) {
                if (champions[a].tags[b] === tag) {
                    championsSorted.push(champions[a]);
                }
            }
        }

        return championsSorted;
    }

    sortChampionsStats = (champions, stat) => {
        let championsSorted = champions;

        championsSorted.sort(function(champA, champB) {
            if (champA.stats[stat] > champB.stats[stat]) {
                return -1;
            }
            if (champA.stats[stat] < champB.stats[stat]) {
                return 1;
            }
            //If stats are equal, sort by name
            if (champA.stats[stat] === champB.stats[stat]) {
                if (champA.name.toLowerCase() < champB.name.toLowerCase()) {
                    return -1;
                }
                if (champA.name.toLowerCase() > champB.name.toLowerCase()) {
                    return 1;
                }
            }
            return 0;
        });

        return championsSorted;
    }

    //todo: add nicknames, maybe sort by region?
    sortChampionsSearch = (champions, search) => {
        let championsSorted = [];

        for (let a = 0; a < champions.length; a++) {
            //Nicknames
            if (search.toLowerCase() === "cow" && champions[a].name === "Alistar") {
                championsSorted.push(champions[a]);
            }
            if ((search.toLowerCase() === "j4" || search.toLowerCase() === "jiv") && champions[a].name === "Jarvan IV") {
                championsSorted.push(champions[a]);
            }

            //If search is greater than champion name, continue
            if (search.length > champions[a].name.length) {
                continue;
            }
            if (champions[a].name.toLowerCase().includes(search.toLowerCase())) {
                championsSorted.push(champions[a]);
            }
            // if (search.toLowerCase() === champions[a].name.substring(0, search.length).toLowerCase()) {
            //     championsSorted.push(champions[a]);
            // }
        }

        return championsSorted;
    }

    //update search state as user types
    handleSearchChange = (event) => {
        this.setState({
            search: event.target.value
        }, function() {
            this.sortChampions(this.state.originalChampions, this.state.sort, this.state.search);
        });
    }

    //Displays Stats sorting criteria HTML components
    displayStatsCriteria = () => {
        let statsCriteria = constant.championSortStats.map((stat) => this.displayStatsCriteriaHelper(stat));
        return statsCriteria;
    }

    displayStatsCriteriaHelper = (stat) => {
        return (
            <div className="championsSortSecondaryText"
                 onClick={() => this.setSearchCriteria(stat)}
                 style={this.setCriteriaStyle(stat)} >
                {constant.championSortStatsText[stat]}
            </div>
        );
    }

    //- on menu click, set state for that property to be sorted on to be true
    //- write a function that sorts champions based on all the state properties
    //  this will be called once at render
    //- create one JSON object for champions with all the properties
    //- the function will sort this JSON for each property selected
    //- everything should only have 1 property besides ROLE, which could have multiple
    //- CSS can have flat pixel values because menu should not change
    render() {
        if (this.state.champions) {
            return (
                <div className="Champions">
                    <div className="championsSortMenu">
                        {/* PRIMARY SORTING CRITERIA */}
                        <div className="championsSortPrimaryOptions">
                            <div className="championsSortPrimaryText">Alphabetically</div>
                            <div className="championsSortPrimaryText">Role</div>
                            <div className="championsSortPrimaryText">Ability Cost</div>
                            <div className="championsSortPrimaryTextLarge">Stats</div>
                        </div>
                        {/* SECONDARY SORTING CRITERIA */}
                        <div className="championsSortSecondaryOptions">
                            <div className="championsSortSecondaryGroup">
                                {/* ALPHABETICAL */}
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("alphabet")}
                                     style={this.setCriteriaStyle("alphabet")} >
                                    A - Z
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("alphabetReverse")}
                                     style={this.setCriteriaStyle("alphabetReverse")} >
                                    Z - A
                                </div>
                            </div>
                            {/* ROLE */}
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("assassin")}
                                     style={this.setCriteriaStyle("assassin")} >
                                    Assassin
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("fighter")}
                                     style={this.setCriteriaStyle("fighter")} >
                                    Fighter
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("mage")}
                                     style={this.setCriteriaStyle("mage")} >
                                    Mage
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("marksman")}
                                     style={this.setCriteriaStyle("marksman")} >
                                    Marksman
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("support")}
                                     style={this.setCriteriaStyle("support")} >
                                    Support
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("tank")}
                                     style={this.setCriteriaStyle("tank")} >
                                    Tank
                                </div>
                            </div>
                            {/* ABILITY COST */}
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("mana")}
                                     style={this.setCriteriaStyle("mana")} >
                                    Mana
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("energy")}
                                     style={this.setCriteriaStyle("energy")} >
                                    Energy
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("noCost")}
                                     style={this.setCriteriaStyle("noCost")} >
                                    No Cost
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("other")}
                                     style={this.setCriteriaStyle("other")} >
                                    Other
                                </div>
                            </div>
                            {/* STATS */}
                            <div className="championsSortSecondaryGroupLarge">
                                {this.displayStatsCriteria()}
                            </div>
                        </div>
                    </div>
                    {/* SEARCH BAR */}
                    <div className="championSearch">
                        <input id="searchBar"
                            type="text"
                            autoComplete="off"
                            value={this.state.search}
                            placeholder="Champion Name..."
                            onChange={this.handleSearchChange}
                        />
                    </div>
                    {/* CHAMPIONS */}
                    <div className="championsGallery">
                        {this.displayChampions(this.state.champions)}
                    </div>
                </div>
            );
        } else {
            return (
                <none/>
            );
        }
    }

}