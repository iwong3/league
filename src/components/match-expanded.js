import React, { Component } from 'react';

import * as utility from '../utilities/functions';

import '../styles/match-expanded.css';


export default class MatchExpanded extends Component {

    constructor(props) {
        super(props);

        this.getItems = this.getItems.bind(this);
        this.getItemsHelper = this.getItemsHelper.bind(this);
        this.getTrinket = this.getTrinket.bind(this);
        this.getSummonerSpells = this.getSummonerSpells.bind(this);
        this.getSummonerSpellsHelper = this.getSummonerSpellsHelper.bind(this);
    }

    setMatchBorder = (win) => {
        if (win) {
            return ({
                "borderColor": "#ccbe91"
            });
        }
        return ({
            "borderColor": "#cd2626"
        });
    }

    getItems = (stats) => {
        let itemIcons = [];
        let row = [];

        for (let i = 0; i < 6; i++) {
            if (row.length < 3) {
                row.push(this.getItemsHelper(stats["item" + i]));
            }
            if (row.length % 3 === 0) {
                itemIcons.push(<div>{row}</div>);
                row = [];
            }
        }

        return (
            <div>{itemIcons}</div>
        );
    }

    getItemsHelper = (item) => {
        if (item !== 0) {
            let itemUrl = utility.getItemUrl(item);
            return (
                <img src={itemUrl}
                     alt={"Item"}
                     key={item} />
            );
        }
        return <none/>
    }

    getTrinket = (stats) => {
        if (stats.item6 !== 0) {
            let trinketUrl = utility.getItemUrl(stats.item6);
            return (
                <img src={trinketUrl}
                     alt={"Trinket"} />
            );
        }
        return <none/>
    }

    getSummonerSpells = (details) => {
        let summonerSpellIcons = [];
        summonerSpellIcons.push(<div>{this.getSummonerSpellsHelper(utility.summonerSpellIdToName(details.spell1Id))}</div>);
        summonerSpellIcons.push(<div>{this.getSummonerSpellsHelper(utility.summonerSpellIdToName(details.spell2Id))}</div>);
        return (
            <div>{summonerSpellIcons}</div>
        );
    }

    getSummonerSpellsHelper = (summonerSpell) => {
        let summonerSpellUrl = utility.getSummonerSpellUrl(summonerSpell);
        return (
            <img src={summonerSpellUrl}
                 alt={summonerSpell} />
        );
    }

    render() {
        return (
            <div className={"MatchExpanded " + this.props.className}
                 style={this.setMatchBorder(this.props.matchStats.win)} >
                <div className="matchExpandedStats">
                    <div className="statGroup">
                        <div className="statRow">
                            <img src={utility.getScoreboardIcons("minion")} alt="cs" />
                            <div className="cs">
                                {this.props.matchStats.totalMinionsKilled}
                            </div>
                        </div>
                        <div className="statRow">
                            <img src={utility.getScoreboardIcons("gold")} alt="gold" />
                            <div className="gold">
                                {this.props.matchStats.goldEarned}
                            </div>
                        </div>
                    </div>
                    <div className="verticalLine"></div>
                    <div className="itemGroup">
                        {this.getItems(this.props.matchStats)}
                        {this.getTrinket(this.props.matchStats)}
                        {this.getSummonerSpells(this.props.matchDetails.participants[this.props.participantIndex])}
                    </div>
                </div>
            </div>
        );
    }

}