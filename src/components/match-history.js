import React, { Component } from 'react';

import Match from './match';

import '../styles/match-history.css';


export default class MatchHistory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numMatches: 10
        }
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.matchHistory) {
            this.setState({
                numMatches: 10
            });
        }
    }

    displayMatchHistory = () => {
        let matches = [];
        for (let i = 0; i < this.state.numMatches; i++) {
            matches.push(this.displayMatchHistoryHelper(this.props.matchHistory.matches[i]));
        }
        return matches;
    }

    displayMatchHistoryHelper = (match) => {
        return (
            <Match match={match}
                   accountId={this.props.accountId} />
        );
    }

    render() {
        if (this.props.matchHistory) {
            return (
                <div className="MatchHistory">
                    {this.displayMatchHistory()}
                </div>
            )
        } else {
            return (
                <none/>
            );
        }
    }

}