import React, { Component } from 'react';

import GamesByElo from './games-by-elo';

import '../styles/statistics.css';


export default class Statistics extends Component {

    render() {
        return (
            <div className="Statistics">
                <div className="statisticsMenu">
                    MENU
                </div>
                <GamesByElo />
            </div>
        );
    }

}