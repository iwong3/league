import React, { Component } from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';
import '../styles/summoner-header.css';


export default class SummonerHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profileIconUrl: "",
            bannerChampionId: "",
            mostPlayedChampionIds: []
        }

    }

    componentWillReceiveProps = (newProp) => {
        if (newProp.summonerData) {
            //get profileIconUrl
            this.setState({
                profileIconUrl: utility.getProfileIconUrl(this.props.version, newProp.summonerData.profileIconId)
            });

            //get banner and most played champions
            let masteryUrl = utility.getMasteryUrl(newProp.summonerData.id);
            axios.get(masteryUrl)
                .then(res => {
                    let ids = [];
                    if (res.data[0]) {
                        ids.push(res.data[0].championId);
                        this.setState({
                            bannerChampionId: res.data[0].championId
                        });
                    }
                    if (res.data[1]) {
                        ids.push(res.data[1].championId);
                    }
                    if (res.data[2]) {
                        ids.push(res.data[2].championId);
                    }
                    if (ids.length > 0) {
                        this.setState({
                            mostPlayedChampionIds: ids
                        });
                    }
                });
        }
    }

    //have to set custom styling for each champion's banner
    setBanner = (id) => {
        if (id) {
            let championName = utility.championIdToKey(id);
            let bannerUrl = utility.getChampionSplashUrl(championName);
            let style = {"backgroundImage": "url(" + bannerUrl + ")"};
            switch (championName) {
                case ("Talon"):
                case ("Vayne"):
                case ("Zyra"):
                    style["backgroundPosition"] = "0% 20%";
                    break;
                case ("Lucian"):
                    style["backgroundPosition"] = "0% 45%";
                    break;
                default:
                    style["backgroundPosition"] = "0% 0%";
            }
            return style;
        }
    }

    setMostPlayedChampions = (ids) => {
        if (ids.length > 0) {
            let icons = [];
            for (let i = 0; i < ids.length; i++) {
                icons.push(this.setMostPlayedChampionsHelper(ids[i]));
            }
            return icons;
        }
    }

    setMostPlayedChampionsHelper = (id) => {
        let iconUrl = utility.getChampionIconUrl(utility.championIdToKey(id));
        return (
            <img key={id}
                 src={iconUrl}
                 alt={utility.championIdToKey(id)}
                 style={{"width": "50px"}} />
        );
    }

    render() {
        if (this.props.summonerData) {
            return (
                // <div className="SummonerHeader" style={{"backgroundColor": "#222222"}} >
                <div className="SummonerHeader" style={this.setBanner(this.state.bannerChampionId)} >
                    <div className="summonerName">
                        <img id="profileIcon"
                             alt="Profile Icon"
                             src={this.state.profileIconUrl}
                        />
                        {
                            this.props.summonerData.name.length >= 8
                            ?
                            <h4 style={{"fontSize": "25px"}}>{this.props.summonerData.name}</h4>
                            :
                            <h4>{this.props.summonerData.name}</h4>
                        }
                    </div>
                    {
                        this.state.mostPlayedChampionIds.length > 0
                        ?
                        <div className="mostPlayedChampions">
                            {this.setMostPlayedChampions(this.state.mostPlayedChampionIds)}
                        </div>
                        :
                        <none/>
                    }
                </div>
            );
        }
        return (
            <none/>
        );
    }

}