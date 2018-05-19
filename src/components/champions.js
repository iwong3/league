import React, { Component } from 'react';
// import axios from 'axios';

import * as champions from '../utilities/champions';
import * as championsPartype from '../utilities/champions-partype';
import * as championsStats from '../utilities/champions-stats';
import * as championsTags from '../utilities/champions-tags';
import * as utility from '../utilities/functions';

import '../styles/champions.css';


export default class Champions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            champions: [],
            originalChampions: [],
            sort: {
                alphabetReverse: false,
                role: [],
                abilityCost: "all",
                stats: "none"
            }
        };
    }

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         champions: [],
    //         originalChampions: [],
    //         championsPartype: [],
    //         championsStats: [],
    //         championsTags: []
    //     };
    // }

    componentDidMount = () => {
        this.setState ({
            originalChampions: this.standardizeChampions(champions.champions.data),
            championsPartype: this.standardizeChampions(championsPartype.championsPartype.data),
            championsStats: this.standardizeChampions(championsStats.championsStats.data),
            championsTags: this.standardizeChampions(championsTags.championsTags.data)
        }, function() {
            this.sortChampionsAlphabetically(this.state.originalChampions);
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
    //                 this.sortChampionsAlphabetically(this.state.originalChampions);
    //             });
    //         })
    //         .catch(error => {
    //             this.setState ({
    //                 originalChampions: this.standardizeChampions(champions.champions.data),
    //                 championsPartype: this.standardizeChampions(championsPartype.championsPartype.data)
    //             }, function() {
    //                 this.sortChampionsAlphabetically(this.state.originalChampions);
    //             });
    //         });
    // }

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

        this.setState({
            champions: championsSorted
        });
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

        this.setState({
            champions: championsSorted
        });
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

        this.sortChampionsAlphabetically(championsSorted);
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

        this.sortChampionsAlphabetically(championsSorted);
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
            return 0;
        });

        this.setState({
            champions: championsSorted
        });
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
                        <div className="championsSortPrimaryOptions">
                            <div className="championsSortPrimaryText">Alphabetically</div>
                            <div className="championsSortPrimaryText">Role</div>
                            <div className="championsSortPrimaryText">Ability Cost</div>
                            <div className="championsSortPrimaryText">Stats</div>
                        </div>
                        <div className="championsSortSecondaryOptions">
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText">A - Z</div>
                                <div className="championsSortSecondaryText">Z - A</div>
                            </div>
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText">Assassin</div>
                            </div>
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText">Mana</div>
                                <div className="championsSortSecondaryText">Energy</div>
                            </div>
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText">Armor</div>
                            </div>
                        </div>
                    </div>
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
                        
                        /* <div className="championsSortDropdown">
                            <div className="championsSortDropdownText">Alphabetically</div>
                            <div className="championsSortDropdownOptions">
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsAlphabetically(this.state.originalChampions)}>
                                    A - Z
                                </div>
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsReverseAlphabetically(this.state.originalChampions)}>
                                    Z - A
                                </div>
                            </div>
                        </div>
                        
                        <div className="championsSortDropdown">
                            <div className="championsSortDropdownText">Role</div>
                            <div className="championsSortDropdownOptions">
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsTags(this.state.championsTags, "Assassin")}>
                                    Assassin
                                </div>
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsTags(this.state.championsTags, "Fighter")}>
                                    Fighter
                                </div>
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsTags(this.state.championsTags, "Mage")}>
                                    Mage
                                </div>
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsTags(this.state.championsTags, "Marksman")}>
                                    Marksman
                                </div>
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsTags(this.state.championsTags, "Support")}>
                                    Support
                                </div>
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsTags(this.state.championsTags, "Tank")}>
                                    Tank
                                </div>
                            </div>
                        </div>

                        <div className="championsSortDropdown">
                            <div className="championsSortDropdownText">Ability Cost</div>
                            <div className="championsSortDropdownOptions">
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsPartype(this.state.championsPartype, "Mana")}>
                                    Mana
                                </div>
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsPartype(this.state.championsPartype, "Energy")}>
                                    Energy
                                </div>
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsPartype(this.state.championsPartype, "None")}>
                                    No Cost
                                </div>
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsPartype(this.state.championsPartype, "Other")}>
                                    Other
                                </div>
                            </div>
                        </div>
                        
                        <div className="championsSortDropdown">
                            <div className="championsSortDropdownText">Stats</div>
                            <div className="championsSortDropdownOptions">
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsStats(this.state.championsStats, "armor")}>
                                    Armor
                                </div>
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsStats(this.state.championsStats, "attackdamage")}>
                                    Base AD
                                </div>
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsStats(this.state.championsStats, "attackdamageperlevel")}>
                                    Scaling AD
                                </div>
                                <div className="championsSortDropdownOption"
                                     onClick={() => this.sortChampionsStats(this.state.championsStats, "attackrange")}>
                                    Range
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="championsGallery">
                        {this.displayChampions(this.state.champions)}
                    </div>
                </div>
            ); 
        }
        return (
            <none/>
        );
    } */}

    //change height of champions.js to match other components, or try to fix logo shifting
    // render() {
    //     if (this.state.champions) {
    //         return (
    //             <div className="Champions">
    //                 <div className="championsSortOptions">
    //                     {/* BY ALPHABET */}
    //                     <div className="championsSortDropdown">
    //                         <div className="championsSortDropdownText">Alphabetically</div>
    //                         <div className="championsSortDropdownOptions">
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsAlphabetically(this.state.originalChampions)}>
    //                                 A - Z
    //                             </div>
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsReverseAlphabetically(this.state.originalChampions)}>
    //                                 Z - A
    //                             </div>
    //                         </div>
    //                     </div>
    //                     {/* BY ROLE */}
    //                     <div className="championsSortDropdown">
    //                         <div className="championsSortDropdownText">Role</div>
    //                         <div className="championsSortDropdownOptions">
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsTags(this.state.championsTags, "Assassin")}>
    //                                 Assassin
    //                             </div>
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsTags(this.state.championsTags, "Fighter")}>
    //                                 Fighter
    //                             </div>
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsTags(this.state.championsTags, "Mage")}>
    //                                 Mage
    //                             </div>
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsTags(this.state.championsTags, "Marksman")}>
    //                                 Marksman
    //                             </div>
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsTags(this.state.championsTags, "Support")}>
    //                                 Support
    //                             </div>
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsTags(this.state.championsTags, "Tank")}>
    //                                 Tank
    //                             </div>
    //                         </div>
    //                     </div>
    //                     {/* BY ABILITY COST */}
    //                     <div className="championsSortDropdown">
    //                         <div className="championsSortDropdownText">Ability Cost</div>
    //                         <div className="championsSortDropdownOptions">
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsPartype(this.state.championsPartype, "Mana")}>
    //                                 Mana
    //                             </div>
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsPartype(this.state.championsPartype, "Energy")}>
    //                                 Energy
    //                             </div>
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsPartype(this.state.championsPartype, "None")}>
    //                                 No Cost
    //                             </div>
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsPartype(this.state.championsPartype, "Other")}>
    //                                 Other
    //                             </div>
    //                         </div>
    //                     </div>
    //                     {/* BY STAT */}
    //                     <div className="championsSortDropdown">
    //                         <div className="championsSortDropdownText">Stats</div>
    //                         <div className="championsSortDropdownOptions">
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsStats(this.state.championsStats, "armor")}>
    //                                 Armor
    //                             </div>
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsStats(this.state.championsStats, "attackdamage")}>
    //                                 Base AD
    //                             </div>
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsStats(this.state.championsStats, "attackdamageperlevel")}>
    //                                 Scaling AD
    //                             </div>
    //                             <div className="championsSortDropdownOption"
    //                                  onClick={() => this.sortChampionsStats(this.state.championsStats, "attackrange")}>
    //                                 Range
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="championsGallery">
    //                     {this.displayChampions(this.state.champions)}
    //                 </div>
    //             </div>
    //         ); 
    //     }
    //     return (
    //         <none/>
    //     );
    // }