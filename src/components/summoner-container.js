import React, { Component } from 'react';
import axios from 'axios';

import * as constant from '../utilities/constants';
import * as utility from '../utilities/functions';

import SummonerHeader from './summoner-header';
import MatchHistory from './match-history';

import '../styles/summoner-container.css';


export default class SummonerContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            summonerData: null,
            accountId: null,
            version: null,
            matchHistory: null
        }

        this.getSummonerData = this.getSummonerData.bind(this);
    }

    componentDidMount = () => {
        let versionUrl = utility.getVersionUrl();
        axios.get(versionUrl)
            .then(res => {
                this.setState({
                    version: res.data[0]
                });
            })
            //if GET fails due to too many requests, use a default version
            .catch(error => {
                this.setState({
                    version: constant.version
                });
            });
            
        this.getSummonerData(this.props.summonerName);
    }

    componentWillReceiveProps = (newProp) => {
        if (newProp.summonerName) {
            this.getSummonerData(newProp.summonerName);
        }
    }

    getSummonerData = (summonerName) => {
        let summonerUrl = utility.getSummonerUrl(summonerName);
        axios.get(summonerUrl)
            .then(res => {
                this.setState({
                    summonerData: res.data,
                    accountId: res.data.accountId
                });
                let matchHistoryUrl = utility.getMatchHistory10Url(res.data.accountId);
                return axios.get(matchHistoryUrl);
            })
            .then(res => {
                this.setState({
                    matchHistory: res.data
                });
            });
    }

    render() {
        return (
            <div className="SummonerContainer">
                <SummonerHeader summonerData={this.state.summonerData}
                                version={this.state.version} />
                <MatchHistory matchHistory={this.state.matchHistory}
                                accountId={this.state.accountId} />
            </div>
        )
    }

}