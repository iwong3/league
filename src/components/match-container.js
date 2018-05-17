import React, { Component } from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';

import Match from './match';
import MatchExpanded from './match-expanded';


export default class MatchContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            matchDetails: null,
            participantIndex: null,
            matchStats: null,
            isExpanded: false
        };

        this.getParticipantId = this.getParticipantId.bind(this);
        this.getMatchStats = this.getMatchStats.bind(this);
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

    handleClick = () => {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    showMatchExpanded = () => {
        if (this.state.isExpanded) {
            return "matchExpanded";
        }
        return "matchHidden";
    }

    render() {
        if (this.state.matchDetails && this.state.matchStats) {
            return (
                <div className="MatchContainer">
                    <Match championId={this.props.match.champion}
                           matchDetails={this.state.matchDetails}
                           matchStats={this.state.matchStats}
                           handleClick={this.handleClick}
                           className={this.showMatchExpanded()} />
                    <MatchExpanded matchDetails={this.state.matchDetails}
                                   participantIndex={this.state.participantIndex}
                                   matchStats={this.state.matchStats}
                                   className={this.showMatchExpanded()} />
                </div>
            );
        } else {
            return (
                <none/>
            );
        }
    }

}