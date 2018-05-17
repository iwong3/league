import React, { Component } from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';

import '../styles/match.css';


export default class Match extends Component {

    constructor(props) {
        super(props);

        this.state = {
            matchDetails: null,
            participantIndex: null,
            matchStats: null
        }

        this.getParticipantId = this.getParticipantId.bind(this);
        this.getMatchStats = this.getMatchStats.bind(this);
        this.setBanner = this.setBanner.bind(this);
        this.getItems = this.getItems.bind(this);
        this.getItemsHelper = this.getItemsHelper.bind(this);
        this.getTrinket = this.getTrinket.bind(this);
        this.getSummonerSpells = this.getSummonerSpells.bind(this);
        this.getSummonerSpellsHelper = this.getSummonerSpellsHelper.bind(this);
    }
    
    componentWillReceiveProps = (newProps) => {
        let matchUrl = utility.getMatchUrl(newProps.match.gameId);
        axios.get(matchUrl).then(res => {
            this.setState({
                matchDetails: res.data
            }, function() {
                this.getParticipantId(this.state.matchDetails.participantIdentities);
            });
        });
    }

    componentDidMount = () => {
        let matchUrl = utility.getMatchUrl(this.props.match.gameId);
        axios.get(matchUrl).then(res => {
            this.setState({
                matchDetails: res.data
            }, function() {
                this.getParticipantId(this.state.matchDetails.participantIdentities);
            });
        });
    }

    getParticipantId = (participantIds) => {
        for (let i = 0; i < participantIds.length; i++) {
            if (this.props.accountId === participantIds[i].player.accountId) {
                this.setState({
                    participantIndex: (participantIds[i].participantId - 1)
                }, function() {
                    this.getMatchStats(this.state.participantIndex);
                });
            }
        }
    }

    getMatchStats = (participantIndex) => {
        this.setState({
            matchStats: this.state.matchDetails.participants[this.state.participantIndex].stats
        });
    }

    setBanner = (id) => {
        let championName = utility.championIdToName(id);
        let bannerUrl = utility.getChampionSplashUrl(championName);
        let style = {"backgroundImage": "url(" + bannerUrl + ")"};
        switch (championName) {
            case ("Aatrox"):
                style["backgroundPosition"] = "63% 22%";
                break;
            case ("Ahri"):
                style["backgroundPosition"] = "41% 18%";
                break;
            case ("Alistar"):
                style["backgroundPosition"] = "0% 42%";
                style["backgroundSize"] = "auto 462%";
                break;
            case ("Ashe"):
                style["backgroundPosition"] = "54% 20%";
                break;
            case ("Azir"):
                style["backgroundPosition"] = "71% 17%";
                break;
            case ("Bard"):
                style["backgroundPosition"] = "45% 20%";
                break;
            case ("Blitzcrank"):
                style["backgroundPosition"] = "62% 28%";
                break;
            case ("Brand"):
                style["backgroundPosition"] = "76% 20%";
                break;
            case ("Braum"):
                style["backgroundPosition"] = "76% 13%";
                break;
            case ("Caitlyn"):
                style["backgroundPosition"] = "70% 14%";
                break;
            case ("Camille"):
                style["backgroundPosition"] = "96% 16%";
                break;
            case ("Cassiopeia"):
                style["backgroundPosition"] = "43% 33%";
                break;
            case ("Draven"):
                style["backgroundPosition"] = "69% 27%";
                break;
            case ("DrMundo"):
                style["backgroundPosition"] = "70% 31%";
                break;
            case ("Ekko"):
                style["backgroundPosition"] = "67% 20%";
                break;
            case ("Elise"):
                style["backgroundPosition"] = "66% 14%";
                break;
            case ("Ezreal"):
                style["backgroundPosition"] = "48% 29%";
                break;
            case ("Fiddlesticks"):
                style["backgroundPosition"] = "0% 27%";
                style["backgroundSize"] = "auto 514%";
                break;
            case ("Fizz"):
                style["backgroundPosition"] = "100% 15%";
                style["backgroundSize"] = "auto 405%";
                break;
            case ("Galio"):
                style["backgroundPosition"] = "21% 3%";
                break;
            case ("Garen"):
                style["backgroundPosition"] = "80% 34%";
                break;
            case ("Gnar"):
                style["backgroundPosition"] = "0% 61%";
                style["backgroundSize"] = "auto 375%";
                break;
            case ("Graves"):
                style["backgroundPosition"] = "70% 8%";
                break;
            case ("Hecarim"):
                style["backgroundPosition"] = "75% 9%";
                break;
            case ("Heimerdinger"):
                style["backgroundPosition"] = "0% 40%";
                style["backgroundSize"] = "111% auto";
                break;
            case ("Illaoi"):
                style["backgroundPosition"] = "41% 1%";
                break;
            case ("Irelia"):
                style["backgroundPosition"] = "23% 5%";
                break;
            case ("Jax"):
                style["backgroundPosition"] = "67% 17%";
                break;
            case ("Jayce"):
                style["backgroundPosition"] = "78% 26%";
                break;
            case ("Jhin"):
                style["backgroundPosition"] = "41% 19%";
                break;
            case ("Jinx"):
                style["backgroundPosition"] = "52% 16%";
                break;
            case ("Kaisa"):
                style["backgroundPosition"] = "23% 11%";
                break;
            case ("Kalista"):
                style["backgroundPosition"] = "48% 19%";
                break;
            case ("Karma"):
                style["backgroundPosition"] = "69% 15%";
                break;
            case ("Kayn"):
                style["backgroundPosition"] = "22% 44%";
                break;
            case ("Kennen"):
                style["backgroundPosition"] = "0% 22%";
                style["backgroundSize"] = "auto 375%";
                break;
            case ("Khazix"):
                style["backgroundPosition"] = "70% 54%";
                break;
            case ("Kindred"):
                style["backgroundPosition"] = "43% 31%";
                break;
            case ("Kled"):
                style["backgroundPosition"] = "0% 10%";
                style["backgroundSize"] = "auto 364%";
                break;
            case ("KogMaw"):
                style["backgroundPosition"] = "0% 62%";
                style["backgroundSize"] = "120% auto";
                break;
            case ("LeeSin"):
                style["backgroundPosition"] = "48% 17%";
                break;
            case ("Leona"):
                style["backgroundPosition"] = "70% 7%";
                break;
            case ("Lucian"):
                style["backgroundPosition"] = "67% 38%";
                break;
            case ("Lulu"):
                style["backgroundPosition"] = "59% 37%";
                break;
            case ("Lux"):
                style["backgroundPosition"] = "43% 23%";
                break;
            case ("Maokai"):
                style["backgroundPosition"] = "47% 43%";
                break;
            case ("MasterYi"):
                style["backgroundPosition"] = "80% 31%";
                break;
            case ("MissFortune"):
                style["backgroundPosition"] = "70% 30%";
                break; 
            case ("Mordekaiser"):
                style["backgroundPosition"] = "62% 20%";
                break;
            case ("Morgana"):
                style["backgroundPosition"] = "75% 31%";
                break;
            case ("Nasus"):
                style["backgroundPosition"] = "53% 19%";
                break;
            case ("Nidalee"):
                style["backgroundPosition"] = "74% 13%";
                break;
            case ("Orianna"):
                style["backgroundPosition"] = "78% 7%";
                style["backgroundSize"] = "auto 500%";
                break;
            case ("Ornn"):
                style["backgroundPosition"] = "23% 33%";
                break;
            case ("Quinn"):
                style["backgroundPosition"] = "51% 29%";
                break;
            case ("Rammus"):
                style["backgroundPosition"] = "23% 43%";
                style["backgroundSize"] = "auto 475%";
                break;
            case ("Rakan"):
                style["backgroundPosition"] = "31% 12%";
                break;
            case ("Singed"):
                style["backgroundPosition"] = "0% 15%";
                style["backgroundSize"] = "auto 387%";
                break;
            case ("Sion"):
                style["backgroundPosition"] = "58% 13%";
                break;
            case ("Sivir"):
                style["backgroundPosition"] = "38% 34%";
                break;
            case ("Sona"):
                style["backgroundPosition"] = "53% 14%";
                break;
            case ("Soraka"):
                style["backgroundPosition"] = "28% 10%";
                break;
            case ("Swain"):
                style["backgroundPosition"] = "58% 9%";
                break;
            case ("Taric"):
                style["backgroundPosition"] = "84% 6%";
                break;
            case ("Teemo"):
                style["backgroundPosition"] = "0% 46%";
                style["backgroundSize"] = "auto 413%";
                break;
            case ("Thresh"):
                style["backgroundPosition"] = "45% 24%";
                break;
            case ("Tristana"):
                style["backgroundPosition"] = "0% 20%";
                style["backgroundSize"] = "auto 429%";
                break;
            case ("Trundle"):
                style["backgroundPosition"] = "0% 27%";
                style["backgroundSize"] = "auto 502%";
                break;
            case ("Twitch"):
                style["backgroundPosition"] = "0% 35%";
                style["backgroundSize"] = "auto 456%";
                break;
            case ("Udyr"):
                style["backgroundPosition"] = "25% 52%";
                break;
            case ("Varus"):
                style["backgroundPosition"] = "31% 12%";
                break;
            case ("Vayne"):
                style["backgroundPosition"] = "89% 20%";
                break;
            case ("Veigar"):
                style["backgroundPosition"] = "0% 25%";
                style["backgroundSize"] = "auto 428%";
                break;
            case ("Velkoz"):
                style["backgroundPosition"] = "0% 41%";
                style["backgroundSize"] = "auto 471%";
                break;
            case ("Viktor"):
                style["backgroundPosition"] = "47% 19%";
                break;
            case ("Volibear"):
                style["backgroundPosition"] = "59% 7%";
                break;
            case ("MonkeyKing"):
                style["backgroundPosition"] = "45% 26%";
                break;
            case ("Xayah"):
                style["backgroundPosition"] = "52% 28%";
                break;
            case ("XinZhao"):
                style["backgroundPosition"] = "24% 19%";
                break;
            case ("Yasuo"):
                style["backgroundPosition"] = "77% 30%";
                break;
            case ("Yorick"):
                style["backgroundPosition"] = "50% 8%";
                break;
            case ("Zac"):
                style["backgroundPosition"] = "0% 60%";
                style["backgroundSize"] = "auto 401%";
                break;
            case ("Zed"):
                style["backgroundPosition"] = "50% 12%";
                break;
            case ("Zoe"):
                style["backgroundPosition"] = "0% 20%";
                style["backgroundSize"] = "auto 502%";
                break;
            case ("Zyra"):
                style["backgroundPosition"] = "69% 21%";
                break;
            default:
                style["backgroundPosition"] = "0% 0%";
        }
        return style;
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
                     alt={"Item"} />
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
        if (this.state.matchStats) {
            return (
                <div className="Match">
                    {
                        this.state.matchStats.win
                        ?
                        <div className="matchHover" style={{"backgroundColor": "#ffbf00"}}></div>
                        :
                        <div className="matchHover" style={{"backgroundColor": "#cd2626"}}></div>
                    }
                    <div className="matchStats">
                        {
                            this.state.matchStats.win
                            ?
                            <p className="matchResult" style={{"color": "#ccbe91"}}>VICTORY</p>
                            :
                            <p className="matchResult" style={{"color": "#cd2626"}}>DEFEAT</p>
                        }
                        <div className="verticalLine"></div>
                        <div className="statGroup">
                            <p className="kda">
                                {this.state.matchStats.kills} | {this.state.matchStats.deaths} | {this.state.matchStats.assists}
                            </p>
                            <p className="kda2">
                                {utility.getKDA(this.state.matchStats.kills, this.state.matchStats.deaths, this.state.matchStats.assists)}
                            </p>
                        </div>
                        <div className="verticalLine"></div>
                        <div className="statGroup">
                            <p className="cs">
                                {this.state.matchStats.totalMinionsKilled}
                            </p>
                            <p className="gold">
                                {this.state.matchStats.goldEarned}
                            </p>
                        </div>
                        <div className="verticalLine"></div>
                        <div className="itemGroup">
                            {this.getItems(this.state.matchStats)}
                            {this.getTrinket(this.state.matchStats)}
                            {this.getSummonerSpells(this.state.matchDetails.participants[this.state.participantIndex])}
                        </div>
                    </div>
                    <div className="matchBanner" style={this.setBanner(this.props.match.champion)} >
                        <div className="matchBannerBlackOverlay"></div>
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