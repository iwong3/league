import React, { Component } from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';

import ItemCardContainer from './item-card-container';

import "../styles/items.css";


export default class Items extends Component {

    constructor(props) {
        super(props);

        //defenseStats: armor, health, healthregen, spellblock(magicresist)
        //attackStats: attackspeed, criticalstrike, damage(attackdamage), lifesteal, onhit, armorpenetration
        //magicStats: cooldownreduction, mana, manaregen, spelldamage(abilitypower), magicpenetration
        //movementStats: boots, nonbootsmovement(othermovement), tenacity
        //otherStats: jungle, lane, active,c onsumable, goldper, visiontrinket(vision & trinkets)
        //map: twistedtreeline, summonersrift, howlingabyss, inactive
        this.state = {
            items: null,
            originalItems: null,
            sort: {
                alphabetReverse: false,
                costReverse: false,
                order: "alphabet",
                defenseStats: [false, false, false, false],
                attackStats: [false, false, false, false, false, false],
                magicStats: [false, false, false, false, false],
                movementStats: [false, false, false],
                otherStats: [false, false, false, false, false, false],
                map: [false, false, false, false]
            },
            search: "",
            displayCards: true,
            unfilteredItems: null
        }
    }

    componentDidMount = () => {
        let itemsUrl = utility.getItemData();
        axios.get(itemsUrl)
             .then(res => {
                this.setState({
                    unfilteredItems: res.data.data,
                    originalItems: utility.standardizeItems(res.data.data)
                }, function() {
                    this.sortItems(this.state.originalItems, this.state.sort, this.state.search);
                });
             });
    }

    sortItems = (items, sort, search) => {
        let itemsCopy = items;

        //STATS
        if (sort.defenseStats[0]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "Armor");
        }
        if (sort.defenseStats[1]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "Health");
        }
        if (sort.defenseStats[2]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "HealthRegen");
        }
        if (sort.defenseStats[3]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "SpellBlock");
        }
        if (sort.attackStats[0]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "AttackSpeed");
        }
        if (sort.attackStats[1]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "CriticalStrike");
        }
        if (sort.attackStats[2]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "Damage");
        }
        if (sort.attackStats[3]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "LifeSteal");
        }
        if (sort.attackStats[4]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "OnHit");
        }
        if (sort.attackStats[5]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "ArmorPenetration");
        }
        if (sort.magicStats[0]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "CooldownReduction");
        }
        if (sort.magicStats[1]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "Mana");
        }
        if (sort.magicStats[2]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "ManaRegen");
        }
        if (sort.magicStats[3]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "SpellDamage");
        }
        if (sort.magicStats[4]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "MagicPenetration");
        }
        if (sort.movementStats[0]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "Boots");
        }
        if (sort.movementStats[1]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "NonbootsMovement");
        }
        if (sort.movementStats[2]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "Tenacity");
        }
        if (sort.otherStats[0]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "Jungle");
        }
        if (sort.otherStats[1]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "Lane");
        }
        if (sort.otherStats[2]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "Active");
        }
        if (sort.otherStats[3]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "Consumable");
        }
        if (sort.otherStats[4]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "GoldPer");
        }
        if (sort.otherStats[5]) {
            itemsCopy = this.sortItemsTags(itemsCopy, "VisionTrinket");
        }

        //MAP
        if (sort.map[0] || sort.map[1] || sort.map[2] || sort.map[3]) {
            itemsCopy = this.sortItemsMap(itemsCopy, sort.map);
        }

        //if no stats or map, sort alphabetically or by cost
        if (sort.order === "alphabet") {
            if (!sort.alphabetReverse) {
                itemsCopy = this.sortItemsAlphabetically(itemsCopy);
            } else {
                itemsCopy = this.sortItemsReverseAlphabetically(itemsCopy);
            }
        } else if (sort.order === "cost") {
            if (!sort.costReverse) {
                itemsCopy = this.sortItemsCost(itemsCopy);
            } else {
                itemsCopy = this.sortItemsReverseCost(itemsCopy);
            }
        }

        //finally, update itemsCopy by search criteria
        if (search) {
            itemsCopy = this.sortItemsSearch(itemsCopy, search);
        }

        this.setState({
            items: itemsCopy
        });
    }

    sortItemsAlphabetically = (items) => {
        let itemsSorted = items;

        itemsSorted.sort(function(itemA, itemB) {
            if (itemA.name.toLowerCase() < itemB.name.toLowerCase()) {
                return -1;
            }
            if (itemA.name.toLowerCase() > itemB.name.toLowerCase()) {
                return 1;
            }
            return 0;
        });

        return itemsSorted;
    }

    sortItemsReverseAlphabetically = (items) => {
        let itemsSorted = items;

        itemsSorted.sort(function(itemA, itemB) {
            if (itemA.name.toLowerCase() < itemB.name.toLowerCase()) {
                return 1;
            }
            if (itemA.name.toLowerCase() > itemB.name.toLowerCase()) {
                return -1;
            }
            return 0;
        });

        return itemsSorted;
    }

    sortItemsCost = (items) => {
        let itemsSorted = items;

        itemsSorted.sort(function(itemA, itemB) {
            if (itemA.gold.total < itemB.gold.total) {
                return -1;
            }
            if (itemA.gold.total > itemB.gold.total) {
                return 1;
            }
            return 0;
        });

        return itemsSorted;
    }

    sortItemsReverseCost = (items) => {
        let itemsSorted = items;

        itemsSorted.sort(function(itemA, itemB) {
            if (itemA.gold.total < itemB.gold.total) {
                return 1;
            }
            if (itemA.gold.total > itemB.gold.total) {
                return -1;
            }
            return 0;
        });

        return itemsSorted;
    }

    sortItemsTags = (items, tag) => {
        let itemsSorted = [];

        if (tag === "VisionTrinket") {
            for (let a = 0; a < items.length; a++) {
                for (let b = 0; b < items[a].tags.length; b++) {
                    if (items[a].tags[b] === "Vision" || items[a].tags[b] === "Trinket") {
                        itemsSorted.push(items[a]);
                    }
                }
            }
        } else {
            for (let a = 0; a < items.length; a++) {
                for (let b = 0; b < items[a].tags.length; b++) {
                    if (items[a].tags[b] === tag) {
                        itemsSorted.push(items[a]);
                    }
                }
            } 
        }

        return itemsSorted;
    }

    sortItemsMap = (items, map) => {
        let itemsSorted = [];

        for (let a = 0; a < items.length; a++) {
            if (map[3]) {
                if (!items[a].maps["10"] && !items[a].maps["11"] && !items[a].maps["12"]) {
                    itemsSorted.push(items[a]);
                }
            } else if (map[0] && map[1] && map[2]) {
                if (items[a].maps["10"] || items[a].maps["11"] || items[a].maps["12"]) {
                    itemsSorted.push(items[a]);
                }
            } else if (map[0] && map[1]) {
                if (items[a].maps["10"] || items[a].maps["11"]) {
                    itemsSorted.push(items[a]);
                }
            } else if (map[0] && map[2]) {
                if (items[a].maps["10"] || items[a].maps["12"]) {
                    itemsSorted.push(items[a]);
                }
            } else if (map[1] && map[2]) {
                if (items[a].maps["11"] || items[a].maps["12"]) {
                    itemsSorted.push(items[a]);
                }
            } else if (map[0]) {
                if (items[a].maps["10"]) {
                    itemsSorted.push(items[a]);
                }
            } else if (map[1]) {
                if (items[a].maps["11"]) {
                    itemsSorted.push(items[a]);
                }
            } else if (map[2]) {
                if (items[a].maps["12"]) {
                    itemsSorted.push(items[a]);
                }
            }
        }

        return itemsSorted;
    }

    //SORT BY SEARCH
    sortItemsSearch = (items, search) => {
        let itemsSorted = [];

        for (let a = 0; a < items.length; a++) {
            //If search is greater than item name, continue
            if (search.length > items[a].name.length) {
                continue;
            }
            if (items[a].name.toLowerCase().includes(search.toLowerCase())) {
                itemsSorted.push(items[a]);
            }
        }

        return itemsSorted;
    }

    setSearchCriteria = (criteria) => {
        let sortCopy = this.state.sort;
        switch (criteria) {
            case ("alphabet"):
                sortCopy.alphabetReverse = false;
                sortCopy.order = "alphabet";
                break;
            case ("alphabetReverse"):
                sortCopy.alphabetReverse = true;
                sortCopy.order = "alphabet";
                break;
            case ("cost"):
                sortCopy.costReverse = false;
                sortCopy.order = "cost";
                break;
            case ("costReverse"):
                sortCopy.costReverse = true;
                sortCopy.order = "cost";
                break;
            case ("Armor"):
                sortCopy.defenseStats[0] = !sortCopy.defenseStats[0];
                break;
            case ("Health"):
                sortCopy.defenseStats[1] = !sortCopy.defenseStats[1];
                break;
            case ("HealthRegen"):
                sortCopy.defenseStats[2] = !sortCopy.defenseStats[2];
                break;
            case ("SpellBlock"):
                sortCopy.defenseStats[3] = !sortCopy.defenseStats[3];
                break;
            case ("AttackSpeed"):
                sortCopy.attackStats[0] = !sortCopy.attackStats[0];
                break;
            case ("CriticalStrike"):
                sortCopy.attackStats[1] = !sortCopy.attackStats[1];
                break;
            case ("Damage"):
                sortCopy.attackStats[2] = !sortCopy.attackStats[2];
                break;
            case ("LifeSteal"):
                sortCopy.attackStats[3] = !sortCopy.attackStats[3];
                break;
            case ("OnHit"):
                sortCopy.attackStats[4] = !sortCopy.attackStats[4];
                break;
            case ("ArmorPenetration"):
                sortCopy.attackStats[5] = !sortCopy.attackStats[5];
                break;
            case ("CooldownReduction"):
                sortCopy.magicStats[0] = !sortCopy.magicStats[0];
                break;
            case ("Mana"):
                sortCopy.magicStats[1] = !sortCopy.magicStats[1];
                break;
            case ("ManaRegen"):
                sortCopy.magicStats[2] = !sortCopy.magicStats[2];
                break;
            case ("SpellDamage"):
                sortCopy.magicStats[3] = !sortCopy.magicStats[3];
                break;
            case ("MagicPenetration"):
                sortCopy.magicStats[4] = !sortCopy.magicStats[4];
                break;
            case ("Boots"):
                sortCopy.movementStats[0] = !sortCopy.movementStats[0];
                break;
            case ("NonbootsMovement"):
                sortCopy.movementStats[1] = !sortCopy.movementStats[1];
                break;
            case ("Tenacity"):
                sortCopy.movementStats[2] = !sortCopy.movementStats[2];
                break;
            case ("Jungle"):
                sortCopy.otherStats[0] = !sortCopy.otherStats[0];
                break;
            case ("Lane"):
                sortCopy.otherStats[1] = !sortCopy.otherStats[1];
                break;
            case ("Active"):
                sortCopy.otherStats[2] = !sortCopy.otherStats[2];
                break;
            case ("Consumable"):
                sortCopy.otherStats[3] = !sortCopy.otherStats[3];
                break;
            case ("GoldPer"):
                sortCopy.otherStats[4] = !sortCopy.otherStats[4];
                break;
            case ("VisionTrinket"):
                sortCopy.otherStats[5] = !sortCopy.otherStats[5];
                break;
            case ("10"):
                sortCopy.map[0] = !sortCopy.map[0];
                sortCopy.map[3] = false;
                break;
            case ("11"):
                sortCopy.map[1] = !sortCopy.map[1];
                sortCopy.map[3] = false;
                break;
            case ("12"):
                sortCopy.map[2] = !sortCopy.map[2];
                sortCopy.map[3] = false;
                break;
            case ("inactive"):
                sortCopy.map[3] = !sortCopy.map[3];
                sortCopy.map[0] = false;
                sortCopy.map[1] = false;
                sortCopy.map[2] = false;
                break;
            default:
                break;
        }

        this.setState(prevState => ({
            sort: sortCopy
        }), function() {
            this.sortItems(this.state.originalItems, this.state.sort, this.state.search);
        });
    }

    setCriteriaStyle = (criteria) => {
        let active = false;
        switch (criteria) {
            case ("alphabet"):
                if (this.state.sort.order === "alphabet" && !this.state.sort.alphabetReverse) {
                    active = true;
                }
                break;
            case ("alphabetReverse"):
                if (this.state.sort.order === "alphabet" && this.state.sort.alphabetReverse) {
                    active = true;
                }
                break;
            case ("cost"):
                if (this.state.sort.order === "cost" && !this.state.sort.costReverse) {
                    active = true;
                }
                break;
            case ("costReverse"):
                if (this.state.sort.order === "cost" && this.state.sort.costReverse) {
                    active = true;
                }
                break;
            case ("Armor"):
                if (this.state.sort.defenseStats[0]) {
                    active = true;
                }
                break;
            case ("Health"):
                if (this.state.sort.defenseStats[1]) {
                    active = true;
                }
                break;
            case ("HealthRegen"):
                if (this.state.sort.defenseStats[2]) {
                    active = true;
                }
                break;
            case ("SpellBlock"):
                if (this.state.sort.defenseStats[3]) {
                    active = true;
                }
                break;
            case ("AttackSpeed"):
                if (this.state.sort.attackStats[0]) {
                    active = true;
                }
                break;
            case ("CriticalStrike"):
                if (this.state.sort.attackStats[1]) {
                    active = true;
                }
                break;
            case ("Damage"):
                if (this.state.sort.attackStats[2]) {
                    active = true;
                }
                break;
            case ("LifeSteal"):
                if (this.state.sort.attackStats[3]) {
                    active = true;
                }
                break;
            case ("OnHit"):
                if (this.state.sort.attackStats[4]) {
                    active = true;
                }
                break;
            case ("ArmorPenetration"):
                if (this.state.sort.attackStats[5]) {
                    active = true;
                }
                break;
            case ("CooldownReduction"):
                if (this.state.sort.magicStats[0]) {
                    active = true;
                }
                break;
            case ("Mana"):
                if (this.state.sort.magicStats[1]) {
                    active = true;
                }
                break;
            case ("ManaRegen"):
                if (this.state.sort.magicStats[2]) {
                    active = true;
                }
                break;
            case ("SpellDamage"):
                if (this.state.sort.magicStats[3]) {
                    active = true;
                }
                break;
            case ("MagicPenetration"):
                if (this.state.sort.magicStats[4]) {
                    active = true;
                }
                break;
            case ("Boots"):
                if (this.state.sort.movementStats[0]) {
                    active = true;
                }
                break;
            case ("NonbootsMovement"):
                if (this.state.sort.movementStats[1]) {
                    active = true;
                }
                break;
            case ("Tenacity"):
                if (this.state.sort.movementStats[2]) {
                    active = true;
                }
                break;
            case ("Jungle"):
                if (this.state.sort.otherStats[0]) {
                    active = true;
                }
                break;
            case ("Lane"):
                if (this.state.sort.otherStats[1]) {
                    active = true;
                }
                break;
            case ("Active"):
                if (this.state.sort.otherStats[2]) {
                    active = true;
                }
                break;
            case ("Consumable"):
                if (this.state.sort.otherStats[3]) {
                    active = true;
                }
                break;
            case ("GoldPer"):
                if (this.state.sort.otherStats[4]) {
                    active = true;
                }
                break;
            case ("VisionTrinket"):
                if (this.state.sort.otherStats[5]) {
                    active = true;
                }
                break;
            case ("10"):
                if (this.state.sort.map[0]) {
                    active = true;
                }
                break;
            case ("11"):
                if (this.state.sort.map[1]) {
                    active = true;
                }
                break;
            case ("12"):
                if (this.state.sort.map[2]) {
                    active = true;
                }
                break;
            case ("inactive"):
                if (this.state.sort.map[3]) {
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

    resetSearchCriteria = () => {
        this.setState({
            sort: {
                alphabetReverse: false,
                costReverse: false,
                order: "alphabet",
                defenseStats: [false, false, false, false],
                attackStats: [false, false, false, false, false, false],
                magicStats: [false, false, false, false, false],
                movementStats: [false, false, false],
                otherStats: [false, false, false, false, false, false],
                map: [false, false, false, false]
            },
            search: ""
        }, function() {
            this.sortItems(this.state.originalItems, this.state.sort, this.state.search);
        });
    }

    //update search state as user types
    handleSearchChange = (event) => {
        this.setState({
            search: event.target.value
        }, function() {
            this.sortItems(this.state.originalItems, this.state.sort, this.state.search);
        });
    }

    displayItems = (items) => {
        let rowSize = 12;
        let itemImages = [];
        let itemImagesRow = [];
        let itemImageUrl = "";

        for (let i = 0; i < items.length; i++) {
            itemImageUrl = utility.getItemUrl(items[i].key);
            if (i !== 0 && i % rowSize === 0) {
                itemImages.push(
                    <div className="itemImagesRow">{itemImagesRow}</div>
                );
                itemImagesRow = [];
            }

            itemImagesRow.push(
                <div className="itemIconGroup">
                    <div className="itemIcon" style={{"background": "url(" + itemImageUrl + ") center"}}></div>
                </div>
            );

            //push the last row
            if (i === items.length - 1 && itemImagesRow.length > 0) {
                itemImages.push(
                    <div className="itemImagesRow">{itemImagesRow}</div>
                );
            }
        }

        return (
            <div className="itemImages">{itemImages}</div>
        );
    }

    displayItemCards = (items) => {
        let rowSize = 3;
        let itemImages = [];
        let itemImagesRow = [];
        let itemImageUrl = "";

        for (let i = 0; i < items.length; i++) {
            itemImageUrl = utility.getItemUrl(items[i].key);
            if (i !== 0 && i % rowSize === 0) {
                itemImages.push(
                    <div className="itemImagesRow">{itemImagesRow}</div>
                );
                itemImagesRow = [];
            }

            itemImagesRow.push(
                <ItemCardContainer item={items[i]}
                                   itemImageUrl={itemImageUrl}
                                   items={this.state.unfilteredItems} />
            );
            
            //push the last row
            if (i === items.length - 1 && itemImagesRow.length > 0) {
                itemImages.push(
                    <div className="itemImagesRow">{itemImagesRow}</div>
                );
            }
        }

        return (
            <div className="itemImages">{itemImages}</div>
        );
    }

    setItemDisplayCards = (display) => {
        if (display) {
            this.setState(prevState => ({
                displayCards: true
            }));
        } else {
            this.setState(prevState => ({
                displayCards: false
            }));
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

    render() {
        if (this.state.items) {
            return (
                <div className="Items">
                    <div className="itemsSortMenu">
                        {/* PRIMARY SORTING CRITERIA */}
                        <div className="championsSortPrimaryOptions">
                            <div className="championsSortPrimaryText">Name</div>
                            <div className="championsSortPrimaryText">Cost</div>
                            <div className="championsSortPrimaryText">Defense</div>
                            <div className="championsSortPrimaryText">Attack</div>
                            <div className="championsSortPrimaryText">Magic</div>
                            <div className="championsSortPrimaryText">Movement</div>
                            <div className="championsSortPrimaryText">Other</div>
                            <div className="championsSortPrimaryText">Map</div>
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
                            {/* COST */}
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("cost")}
                                     style={this.setCriteriaStyle("cost")} >
                                    Lowest Cost
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("costReverse")}
                                     style={this.setCriteriaStyle("costReverse")} >
                                    Highest Cost
                                </div>
                            </div>
                            {/* DEFENSE STATS */}
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Armor")}
                                     style={this.setCriteriaStyle("Armor")} >
                                    Armor
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Health")}
                                     style={this.setCriteriaStyle("Health")} >
                                    Health
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("HealthRegen")}
                                     style={this.setCriteriaStyle("HealthRegen")} >
                                    Health Regen
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("SpellBlock")}
                                     style={this.setCriteriaStyle("SpellBlock")} >
                                    Magic Resist
                                </div>
                            </div>
                            {/* ATTACK STATS */}
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("AttackSpeed")}
                                     style={this.setCriteriaStyle("AttackSpeed")} >
                                    Attack Speed
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("CriticalStrike")}
                                     style={this.setCriteriaStyle("CriticalStrike")} >
                                    Critical Strike
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Damage")}
                                     style={this.setCriteriaStyle("Damage")} >
                                    Attack Damage
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("LifeSteal")}
                                     style={this.setCriteriaStyle("LifeSteal")} >
                                    Life Steal
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("OnHit")}
                                     style={this.setCriteriaStyle("OnHit")} >
                                    On-Hit
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("ArmorPenetration")}
                                     style={this.setCriteriaStyle("ArmorPenetration")} >
                                    Armor Pen
                                </div>
                            </div>
                            {/* MAGIC STATS */}
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("CooldownReduction")}
                                     style={this.setCriteriaStyle("CooldownReduction")} >
                                    CDR
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Mana")}
                                     style={this.setCriteriaStyle("Mana")} >
                                    Mana
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("ManaRegen")}
                                     style={this.setCriteriaStyle("ManaRegen")} >
                                    Mana Regen
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("SpellDamage")}
                                     style={this.setCriteriaStyle("SpellDamage")} >
                                    Ability Power
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("MagicPenetration")}
                                     style={this.setCriteriaStyle("MagicPenetration")} >
                                    Magic Pen
                                </div>
                            </div>
                            {/* MOVEMENT STATS */}
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Boots")}
                                     style={this.setCriteriaStyle("Boots")} >
                                    Boots
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("NonbootsMovement")}
                                     style={this.setCriteriaStyle("NonbootsMovement")} >
                                    Other Movement
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Tenacity")}
                                     style={this.setCriteriaStyle("Tenacity")} >
                                    Tenacity
                                </div>
                            </div>
                            {/* OTHER STATS */}
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Jungle")}
                                     style={this.setCriteriaStyle("Jungle")} >
                                    Jungling
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Lane")}
                                     style={this.setCriteriaStyle("Lane")} >
                                    Laning
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Active")}
                                     style={this.setCriteriaStyle("Active")} >
                                    Active
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("Consumable")}
                                     style={this.setCriteriaStyle("Consumable")} >
                                    Consumable
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("GoldPer")}
                                     style={this.setCriteriaStyle("GoldPer")} >
                                    Gold Income
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("VisionTrinket")}
                                     style={this.setCriteriaStyle("VisionTrinket")} >
                                    Vision & Trinkets
                                </div>
                            </div>
                            {/* MAP */}
                            <div className="championsSortSecondaryGroup">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("11")}
                                     style={this.setCriteriaStyle("11")} >
                                    Summoners Rift
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("10")}
                                     style={this.setCriteriaStyle("10")} >
                                    Twisted Treeline
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("12")}
                                     style={this.setCriteriaStyle("12")} >
                                    Howling Abyss
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setSearchCriteria("inactive")}
                                     style={this.setCriteriaStyle("inactive")} >
                                    Not Active
                                </div>
                            </div>
                        </div>
                        {/* CARDS & ICONS * RESET */}
                        <div className="championSortBottomRow">
                            <div className="championDisplayType">
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setItemDisplayCards(true)}
                                     style={this.setActiveStyle("cards")} >
                                    Cards
                                </div>
                                <div className="championsSortSecondaryText"
                                     onClick={() => this.setItemDisplayCards(false)}
                                     style={this.setActiveStyle("icons")} >
                                    Icons
                                </div>
                            </div>
                            <div className="championSearchSpacing" style={{"width": "900px"}}></div>
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
                            <h1>Items</h1>
                        </div>
                        {/* SEARCH BAR */}
                        <div className="championSearch">
                            <input id="searchBar"
                                type="text"
                                autoComplete="off"
                                value={this.state.search}
                                placeholder="Find An Item..."
                                onChange={this.handleSearchChange}
                            />
                        </div>
                        <div className="championsGallery">
                            {   this.state.displayCards
                                ?
                                this.displayItemCards(this.state.items)
                                :
                                this.displayItems(this.state.items)
                            }
                            {   this.state.items.length === 0
                                ?
                                <div className="noChamps">No Items Found</div>
                                :
                                <none/>
                            }
                        </div>
                    </div>
                </div>
            );
        } else {
            return <none/>;
        }
    }

}