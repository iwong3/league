import React, { Component } from 'react';

import * as championsLore from '../utilities/champions-lore';
import * as championsInfo from '../utilities/champions-info';
import * as championsSkins from '../utilities/champions-skins';
import * as utility from '../utilities/functions';
import * as constant from '../utilities/constants';

import '../styles/champion-card-expanded-details.css';


export default class ChampionCardExpandedDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lore: "",
            skins: null,
            currentSkinNum: 0,
            currentSkinIndex: 0
        }
    }

    //Get lore and skins for champion
    componentDidMount = () => {
        this.getLore(this.props.champion);
        this.resetSkins(this.props.champion);
    }

    //Get lore and skins for new champion
    componentWillReceiveProps = (newProps) => {
        if (newProps.champion !== this.props.champion) {
            this.getLore(newProps.champion);
            this.resetSkins(newProps.champion);
        }
    }

    getLore = (champion) => {
        let lores = utility.standardizeChampions(championsLore.championsLore.data);

        for (let i = 0; i < lores.length; i++) {
            if (lores[i].key === champion.key) {
                this.setState({
                    lore: lores[i].lore
                });
            }
        }
    }

    resetSkins = (champion) => {
        let newSkins = utility.standardizeChampions(championsSkins.championsSkins.data);

        for (let i = 0; i < newSkins.length; i++) {
            if (newSkins[i].key === champion.key) {
                this.setState({
                    skins: newSkins[i].skins
                }, function() {
                    this.setState({
                        currentSkinNum: championsSkins.championsSkins.data[champion.key].skins[0].num,
                        currentSkinIndex: 0
                    });
                });
            }
        }
    }

    displayDetails = (tab) => {
        if (tab === "about") {
            return this.displayAbout();
        } else if (tab === "stats") {
            return this.displayStats(this.props.champion);
        } else if (tab === "skins") {
            return this.displaySkins(this.props.champion, this.state.currentSkinNum);
        }
        return <none/>;
    }

    displayAbout = () => {
        let about = [];

        about.push(
            <div className="regionLine">
                <div className="regionLabel">Region</div>
                <div className="championRegion">{utility.getChampionRegion(this.props.champion)}</div>
            </div>
        );

        //lore
        about.push(
            <div className="loreGroup">
                <div className="loreTitle">Lore</div>
                <div className="lore">{this.state.lore}</div>
            </div>
        )

        return (
            <div className="about">{about}</div>
        );
    }

    displayStats = (champion) => {
        let stats = [];
        let statsKeys = Object.keys(champion.stats);

        let attack = championsInfo.championsInfo.data[champion.key].info.attack;
        let defense = championsInfo.championsInfo.data[champion.key].info.defense;
        let magic = championsInfo.championsInfo.data[champion.key].info.magic;
        let difficulty = championsInfo.championsInfo.data[champion.key].info.difficulty;

        stats.push(
            <div className="beginnerInfo">
                <div className="beginnerInfoTitle">Overview</div>
                <div className="beginnerInfoRow">
                    <div className="beginnerInfoLabel">Attack</div>
                    <div className="beinngerInfoValue">{attack}</div>
                    <div className="beginnerInfoBar">
                        <div className="beginnerInfoBarFill"
                             style={{
                                 "background": "#7f0000",
                                 "width": attack + "0%"
                             }}>
                        </div>
                    </div>
                </div>
                <div className="beginnerInfoRow">
                    <div className="beginnerInfoLabel">Defense</div>
                    <div className="beinngerInfoValue">{defense}</div>
                    <div className="beginnerInfoBar">
                        <div className="beginnerInfoBarFill"
                             style={{
                                 "background": "#004c00",
                                 "width": defense + "0%"
                             }}>
                        </div>
                    </div>
                </div>
                <div className="beginnerInfoRow">
                    <div className="beginnerInfoLabel">Magic</div>
                    <div className="beinngerInfoValue">{magic}</div>
                    <div className="beginnerInfoBar">
                        <div className="beginnerInfoBarFill"
                             style={{
                                 "background": "#000099",
                                 "width": magic + "0%"
                             }}>
                        </div>
                    </div>
                </div>
                <div className="beginnerInfoRow">
                    <div className="beginnerInfoLabel">Difficulty</div>
                    <div className="beinngerInfoValue">{difficulty}</div>
                    <div className="beginnerInfoBar">
                        <div className="beginnerInfoBarFill"
                             style={{
                                 "background": "#660066",
                                 "width": difficulty + "0%"
                             }}>
                        </div>
                    </div>
                </div>
            </div>
        );

        let statsSection = [];

        statsSection.push(
            <div className="statsTitle">Stats</div>
        );

        let statsGroup = [];

        for (let i = 0; i < statsKeys.length; i++) {
            statsGroup.push(
                <div className="statLine">
                    <div className="statLabel">
                        {constant.championSortStatsText[statsKeys[i]]}
                    </div>
                    <div className="stat">
                        {champion.stats[statsKeys[i]]}
                    </div>
                </div>
            )
        }

        statsSection.push(
            <div className="statsGroup">{statsGroup}</div>
        );

        stats.push(
            <div className="statsSection">{statsSection}</div>
        );

        return (
            <div className="stats">{stats}</div>
        );
    }

    displaySkins = (champion, skin) => {
        return (
            <div className="skins">
                <div className="skin">
                    <img src={utility.getChampionSplashBySkinUrl(champion.key, skin)} />
                </div>
                <div className="skinMenuBar">
                    <div className="switchSkin"
                         onClick={() => this.switchSkin(-1)}
                         style={this.setSwitchSkinStyle("prev")} >
                        prev
                    </div>
                    <div className="skinName">
                        {
                            championsSkins.championsSkins.data[champion.key].skins[this.state.currentSkinIndex].name === "default"
                            ?
                            champion.name
                            :
                            championsSkins.championsSkins.data[champion.key].skins[this.state.currentSkinIndex].name
                        }
                    </div>
                    <div className="switchSkin"
                         onClick={() => this.switchSkin(1)}
                         style={this.setSwitchSkinStyle("next")} >
                        next
                    </div>
                </div>
            </div>
        );
    }

    switchSkin = (skin) => {
        if (this.state.currentSkinIndex + skin >= 0 && this.state.currentSkinIndex + skin < this.state.skins.length) {
            this.setState(prevState => ({
                currentSkinNum: championsSkins.championsSkins.data[this.props.champion.key].skins[this.state.currentSkinIndex + skin].num,
                currentSkinIndex: this.state.currentSkinIndex + skin
            }));
        }
    }

    setSwitchSkinStyle = (button) => {
        if (button === "prev" && this.state.currentSkinIndex === 0) {
            return ({
                "filter": "brightness(0.5)",
                "cursor": "default"
            });
        }
        if (button === "next" && this.state.currentSkinIndex === this.state.skins.length - 1) {
            return ({
                "filter": "brightness(0.5)",
                "cursor": "default"
            });
        }
    }

    render() {
        return (
            <div className="ChampionCardExpandedDetails">
                {this.displayDetails(this.props.activeTab)}
            </div>
        );
    }

}