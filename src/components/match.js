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
            case ("Bard"):
                style["backgroundPosition"] = "45% 20%";
                break;
            case ("Caitlyn"):
                style["backgroundPosition"] = "70% 15%";
                break;
            case ("Elise"):
                style["backgroundPosition"] = "66% 14%";
                break;
            case ("Jhin"):
                style["backgroundPosition"] = "38% 19%";
                break;
            case ("Jinx"):
                style["backgroundPosition"] = "52% 17%";
                break;
            case ("Kaisa"):
                style["backgroundPosition"] = "22% 11%";
                break;
            case ("KogMaw"):
                style["backgroundPosition"] = "135% 62%";
                style["backgroundSize"] = "auto 300%";
                break;
            case ("MissFortune"):
                style["backgroundPosition"] = "70% 30%";
                break; 
            case ("Mordekaiser"):
                style["backgroundPosition"] = "62% 20%";
                break;
            case ("Vayne"):
                style["backgroundPosition"] = "90% 20%";
                break;
            default:
                style["backgroundPosition"] = "0% 0%";
        }
        return style;
        return style;
    }

    render() {
        if (this.state.matchStats) {
            return (
                <div className="Match">
                {/* <div className="Match" style={this.setBanner(this.props.match.champion)} > */}
                    {
                        this.state.matchStats.win
                        ?
                        <div className="matchHover" style={{"backgroundColor": "#ffbf00"}}></div>
                        :
                        <div className="matchHover" style={{"backgroundColor": "#cd2626"}}></div>
                    }
                    <div className="matchStats">
                        {/* <img src={utility.getChampionIconUrl(utility.championIdToName(this.props.match.champion))} /> */}
                        {
                            this.state.matchStats.win
                            ?
                            <p className="matchResult" style={{"color": "#ffbf00"}}>VICTORY</p>
                            :
                            <p className="matchResult" style={{"color": "#cd2626"}}>DEFEAT</p>
                        }
                        <div className="kdaGroup">
                            <p className="kda">
                                {this.state.matchStats.kills} / {this.state.matchStats.deaths} / {this.state.matchStats.assists}
                            </p>
                            <p className="kda2">
                                KDA: {((this.state.matchStats.kills + this.state.matchStats.assists) / this.state.matchStats.deaths).toFixed(2)}
                            </p>
                        </div>
                        {/* <img src={utility.getChampionLoadingUrl(utility.championIdToName(this.props.match.champion))}
                            style={{"height": "200px"}} /> */}
                    </div>
                    <div className="matchBanner" style={this.setBanner(this.props.match.champion)} >
                        <div className="matchBannerBlackOverlay">
                        </div>
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