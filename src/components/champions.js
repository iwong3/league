import React, { Component } from 'react';
// import axios from 'axios';

import * as championsSort from '../utilities/champions-sort';
import * as constant from '../utilities/constants';
import * as utility from '../utilities/functions';

import ChampionCardContainer from './champion-card-container';

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
                stats: "none",
                region: "none"
            },
            search: "",
            displayCards: true,
            displayReturnToTop: false,
            width: window.innerWidth,
            height: window.innerHeight
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillMount = () => {
        this.updateWindow();
    }

    //standardize format of champions for sorting, then run initial sort (alphabetical) for render
    componentDidMount = () => {
        this.setState ({
            originalChampions: utility.standardizeChampions(championsSort.championsSort.data)
        }, function() {
            this.sortChampions(this.state.originalChampions, this.state.sort, this.state.search);
        });

        window.addEventListener("resize", this.updateWindow);
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateWindow);
        window.removeEventListener("scroll", this.handleScroll);
    }

    updateWindow = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    handleScroll = () => {
        let displayReturnToTop = (window.pageYOffset > 200);
        if (this.state.displayReturnToTop !== displayReturnToTop) {
            this.setState(prevState => ({
                displayReturnToTop: displayReturnToTop
            }));
        }
    }

    //If we want to grab the data from the API
    // componentDidMount = () => {
    //     let championsUrl = utility.getChampionsUrl();
    //     axios.get(championsUrl)
    //         .then(res => {
    //             this.setState({
    //                 originalChampions: utility.standardizeChampions(res.data.data)
    //             }, function() {
    //                 this.sortChampions(this.state.originalChampions, this.state.sort, this.state.search);
    //             });
    //         })
    //         .catch(error => {
    //             this.setState ({
    //                 originalChampions: utility.standardizeChampions(champions.champions.data),
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
            //REGION
            case ("Bandle City"):
            case ("Bilgewater"):
            case ("Demacia"):
            case ("Freljord"):
            case ("Ionia"):
            case ("Mount Targon"):
            case ("Noxus"):
            case ("Piltover"):
            case ("Shurima"):
            case ("Shadow Isles"):
            case ("Runeterra"):
            case ("Void"):
            case ("Zaun"):
                if (sortCopy.region === criteria) {
                    sortCopy.region = "none";
                    break;
                }
                sortCopy.region = criteria;
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
            case ("Bandle City"):
            case ("Bilgewater"):
            case ("Demacia"):
            case ("Freljord"):
            case ("Ionia"):
            case ("Mount Targon"):
            case ("Noxus"):
            case ("Piltover"):
            case ("Shurima"):
            case ("Shadow Isles"):
            case ("Runeterra"):
            case ("Void"):
            case ("Zaun"):
                if (this.state.sort.region === criteria) {
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

        if (sort.region !== "none") {
            championsCopy = this.sortChampionsRegion(championsCopy, sort.region);
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

    //Displays champions with a row size
    displayChampionsIcons = (champions) => {
        let rowSize = 10;
        if (window.innerWidth >= 2400) {
            rowSize = 12;
        }

        var icons = Object.keys(champions).map((champion) => this.displayChampionsIconsHelper(champions[champion]))
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

    displayChampionsIconsHelper = (champion) => {
        let championIconUrl = utility.getChampionIconUrl(champion.key);
        let fontSize = "14px";
        if (champion.name.length >= 10) {
            fontSize = "10px";
        }
        return (
            <div className="championIcon"
                 style={{"background": "url(" + championIconUrl + ") center"}} >
                <div className="championIconName"
                     style={{"fontSize": fontSize}} >
                    {champion.name}
                </div>
            </div>
        );
    }

    displayChampionsCards = (champions) => {
        let rowSize = 2;
        if (window.innerWidth >= 2400) {
            rowSize = 3;
        }

        var cards = Object.keys(champions).map((champion) => this.displayChampionsCardsHelper(champions[champion]))
            //row stores cards with a size of rowSize
            .reduce(function(row, card, index) {
                //if we hit rowSize, reset row
                if (index % rowSize === 0) {
                    row.push([]);
                }
                //push card into row
                row[row.length - 1].push(card);
                return row;
            }, []).map(function(row, index) {
                return <div className="championRow">{row}</div>;
            });

        return cards;
    }

    displayChampionsCardsHelper = (champion) => {
        return (
            <ChampionCardContainer champion={champion} />
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

    sortChampionsRegion = (champions, region) => {
        let championsSorted = [];

        for (let a = 0; a < champions.length; a++) {
            if (region === "Bandle City") {
                if (champions[a].name === "Corki" ||
                    champions[a].name === "Lulu" ||
                    champions[a].name === "Rumble" ||
                    champions[a].name === "Teemo" ||
                    champions[a].name === "Tristana" ||
                    champions[a].name === "Veigar") {
                        championsSorted.push(champions[a]);
                }
            }

            if (region === "Bilgewater") {
                if (champions[a].name === "Gangplank" ||
                    champions[a].name === "Graves" ||
                    champions[a].name === "Illaoi" ||
                    champions[a].name === "Miss Fortune" ||
                    champions[a].name === "Nautilus" ||
                    champions[a].name === "Twisted Fate") {
                        championsSorted.push(champions[a]);
                }
            }

            if (region === "Demacia") {
                if (champions[a].name === "Fiora" ||
                    champions[a].name === "Galio" ||
                    champions[a].name === "Garen" ||
                    champions[a].name === "Jarvan IV" ||
                    champions[a].name === "Lucian" ||
                    champions[a].name === "Lux" ||
                    champions[a].name === "Poppy" ||
                    champions[a].name === "Quinn" ||
                    champions[a].name === "Shyvana" ||
                    champions[a].name === "Sona" ||
                    champions[a].name === "Vayne" ||
                    champions[a].name === "Xin Zhao") {
                        championsSorted.push(champions[a]);
                }
            }

            if (region === "Freljord") {
                if (champions[a].name === "Anivia" ||
                    champions[a].name === "Ashe" ||
                    champions[a].name === "Braum" ||
                    champions[a].name === "Lissandra" ||
                    champions[a].name === "Nunu" ||
                    champions[a].name === "Olaf" ||
                    champions[a].name === "Ornn" ||
                    champions[a].name === "Sejuani" ||
                    champions[a].name === "Trundle" ||
                    champions[a].name === "Tryndamere" ||
                    champions[a].name === "Udyr" ||
                    champions[a].name === "Volibear") {
                        championsSorted.push(champions[a]);
                }
            }

            if (region === "Ionia") {
                if (champions[a].name === "Ahri" ||
                    champions[a].name === "Akali" ||
                    champions[a].name === "Irelia" ||
                    champions[a].name === "Jhin" ||
                    champions[a].name === "Karma" ||
                    champions[a].name === "Kayn" ||
                    champions[a].name === "Kennen" ||
                    champions[a].name === "Lee Sin" ||
                    champions[a].name === "Master Yi" ||
                    champions[a].name === "Rakan" ||
                    champions[a].name === "Shen" ||
                    champions[a].name === "Soraka" ||
                    champions[a].name === "Syndra" ||
                    champions[a].name === "Varus" ||
                    champions[a].name === "Wukong" || 
                    champions[a].name === "Xayah" ||
                    champions[a].name === "Yasuo" ||
                    champions[a].name === "Zed") {
                        championsSorted.push(champions[a]);
                }
            }

            if (region === "Mount Targon") {
                if (champions[a].name === "Diana" ||
                    champions[a].name === "Leona" ||
                    champions[a].name === "Pantheon" ||
                    champions[a].name === "Taric" ||
                    champions[a].name === "Zoe") {
                        championsSorted.push(champions[a]);
                }
            }

            if (region === "Noxus") {
                if (champions[a].name === "Cassiopeia" ||
                    champions[a].name === "Darius" ||
                    champions[a].name === "Draven" ||
                    champions[a].name === "Katarina" ||
                    champions[a].name === "Kled" ||
                    champions[a].name === "LeBlanc" ||
                    champions[a].name === "Riven" ||
                    champions[a].name === "Sion" ||
                    champions[a].name === "Swain" ||
                    champions[a].name === "Talon" ||
                    champions[a].name === "Vladimir") {
                        championsSorted.push(champions[a]);
                }
            }

            if (region === "Piltover") {
                if (champions[a].name === "Caitlyn" ||
                    champions[a].name === "Camille" ||
                    champions[a].name === "Ezreal" ||
                    champions[a].name === "Heimerdinger" ||
                    champions[a].name === "Jayce" ||
                    champions[a].name === "Orianna" ||
                    champions[a].name === "Vi") {
                        championsSorted.push(champions[a]);
                }
            }

            if (region === "Shurima") {
                if (champions[a].name === "Amumu" ||
                    champions[a].name === "Azir" ||
                    champions[a].name === "Nasus" ||
                    champions[a].name === "Rammus" ||
                    champions[a].name === "Renekton" ||
                    champions[a].name === "Sivir" ||
                    champions[a].name === "Skarner" ||
                    champions[a].name === "Taliyah" ||
                    champions[a].name === "Xerath") {
                        championsSorted.push(champions[a]);
                }
            }

            if (region === "Shadow Isles") {
                if (champions[a].name === "Elise" ||
                    champions[a].name === "Hecarim" ||
                    champions[a].name === "Kalista" ||
                    champions[a].name === "Karthus" ||
                    champions[a].name === "Maokai" ||
                    champions[a].name === "Mordekaiser" ||
                    champions[a].name === "Thresh" ||
                    champions[a].name === "Yorick") {
                        championsSorted.push(champions[a]);
                }
            }

            if (region === "Runeterra") {
                if (champions[a].name === "Aatrox" ||
                    champions[a].name === "Alistar" ||
                    champions[a].name === "Annie" ||
                    champions[a].name === "Aurelion Sol" ||
                    champions[a].name === "Bard" ||
                    champions[a].name === "Brand" ||
                    champions[a].name === "Evelynn" ||
                    champions[a].name === "Fiddlesticks" ||
                    champions[a].name === "Fizz" |
                    champions[a].name === "Gnar" ||
                    champions[a].name === "Gragas" ||
                    champions[a].name === "Ivern" ||
                    champions[a].name === "Jax" ||
                    champions[a].name === "Kayle" ||
                    champions[a].name === "Kindred" ||
                    champions[a].name === "Malphite" ||
                    champions[a].name === "Morgana" ||
                    champions[a].name === "Nami" ||
                    champions[a].name === "Nidalee" ||
                    champions[a].name === "Nocturne" ||
                    champions[a].name === "Rengar" ||
                    champions[a].name === "Ryze" ||
                    champions[a].name === "Shaco" ||
                    champions[a].name === "Tahm Kench" ||
                    champions[a].name === "Zilean" ||
                    champions[a].name === "Zyra") {
                        championsSorted.push(champions[a]);
                }
            }

            if (region === "Void") {
                if (champions[a].name === "Cho'Gath" ||
                    champions[a].name === "Kai'Sa" ||
                    champions[a].name === "Kassadin" ||
                    champions[a].name === "Kha'Zix" ||
                    champions[a].name === "Kog'Maw" ||
                    champions[a].name === "Malzahar" ||
                    champions[a].name === "Rek'Sai" ||
                    champions[a].name === "Vel'Koz") {
                        championsSorted.push(champions[a]);
                }
            }

            if (region === "Zaun") {
                if (champions[a].name === "Blitzcrank" ||
                    champions[a].name === "Dr. Mundo" ||
                    champions[a].name === "Ekko" ||
                    champions[a].name === "Janna" ||
                    champions[a].name === "Jinx" ||
                    champions[a].name === "Singed" ||
                    champions[a].name === "Twitch" ||
                    champions[a].name === "Urgot" ||
                    champions[a].name === "Viktor" ||
                    champions[a].name === "Warwick" ||
                    champions[a].name === "Zac" ||
                    champions[a].name === "Ziggs") {
                        championsSorted.push(champions[a]);
                }
            }
        }

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

    setChampionDisplayCards = (display) => {
        if (display) {
            this.setState({
                displayCards: true
            });
        } else {
            this.setState({
                displayCards: false
            });
        }
    }

    setActiveStyle = (display) => {
        if (display === "cards" && this.state.displayCards) {
            return ({
                "color": "#cd2626"
            });
        }
        if (display === "icons" && !this.state.displayCards) {
            return ({
                "color": "#cd2626"
            });
        }
        return ({
            "color": "#f1e6d2"
        });
    }

    resetSearchCriteria = () => {
        this.setState({
            sort: {
                alphabetReverse: false,
                roles: [false, false, false, false, false, false],
                abilityCost: "all",
                stats: "none",
                region: "none"
            },
            search: ""
        }, function() {
            this.sortChampions(this.state.originalChampions, this.state.sort, this.state.search);
        });

    }

    returnToTop = () => {
        window.scrollTo(0, 0);
    }

    showReturnToTop = () => {
        if (this.state.displayReturnToTop) {
            return ({
                "display": "flex"
            });
        }
        return ({
            "display": "none"
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
                        {/* PRIMARY SORTING CRITERIA */}
                        <div className="championsSortPrimaryOptions">
                            <div className="championsSortPrimaryText">Name</div>
                            <div className="championsSortPrimaryText">Role</div>
                            <div className="championsSortPrimaryText">Spells</div>
                            <div className="championsSortPrimaryTextLarge">Stats</div>
                            <div className="championsSortPrimaryTextMedium">Region</div>
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
                            {/* REGION */}
                            <div className="championsSortSecondaryGroupMedium">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Bandle City")}
                                     style={this.setCriteriaStyle("Bandle City")} >
                                    Bandle City
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Bilgewater")}
                                     style={this.setCriteriaStyle("Bilgewater")} >
                                    Bilgewater
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Demacia")}
                                     style={this.setCriteriaStyle("Demacia")} >
                                    Demacia
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Freljord")}
                                     style={this.setCriteriaStyle("Freljord")} >
                                    Freljord
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Ionia")}
                                     style={this.setCriteriaStyle("Ionia")} >
                                    Ionia
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Mount Targon")}
                                     style={this.setCriteriaStyle("Mount Targon")} >
                                    Mount Targon
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Noxus")}
                                     style={this.setCriteriaStyle("Noxus")} >
                                    Noxus
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Piltover")}
                                     style={this.setCriteriaStyle("Piltover")} >
                                    Piltover
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Shurima")}
                                     style={this.setCriteriaStyle("Shurima")} >
                                    Shurima
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Shadow Isles")}
                                     style={this.setCriteriaStyle("Shadow Isles")} >
                                    Shadow Isles
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Runeterra")}
                                     style={this.setCriteriaStyle("Runeterra")} >
                                    Runeterra
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Void")}
                                     style={this.setCriteriaStyle("Void")} >
                                    Void
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Zaun")}
                                     style={this.setCriteriaStyle("Zaun")} >
                                    Zaun
                                </div>
                            </div>
                        </div>
                        {/* SEARCH BAR */}
                        <div className="championSortBottomRow">
                            <div className="championDisplayType">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setChampionDisplayCards(true)}
                                     style={this.setActiveStyle("cards")} >
                                    Cards
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setChampionDisplayCards(false)}
                                     style={this.setActiveStyle("icons")} >
                                    Icons
                                </div>
                            </div>
                            <div className="championSearchSpacing" style={{"width": "300px"}}></div>
                            <div className="championSearch">
                                <input id="searchBar"
                                    type="text"
                                    autoComplete="off"
                                    value={this.state.search}
                                    placeholder="Find A Champion..."
                                    onChange={this.handleSearchChange}
                                />
                            </div>
                            <div className="championSearchSpacing" style={{"width": "300px"}}></div>
                            <div className="championMenuReset">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.resetSearchCriteria()} >
                                    Reset
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="championsGroup">
                        <div className="championsLabel">
                            <h1>Champions</h1>
                        </div>
                        {/* CHAMPIONS */}
                        <div className="championsGallery">
                            {   this.state.displayCards
                                ?
                                this.displayChampionsCards(this.state.champions)
                                :
                                this.displayChampionsIcons(this.state.champions)
                            }
                            {   this.state.champions.length === 0
                                ?
                                <div className="noChamps">No Champions Found</div>
                                :
                                <none/>
                            }
                        </div>
                    </div>
                    <div className="returnToTopButton"
                         onClick={this.returnToTop}
                         style={this.showReturnToTop()} >
                        Top
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