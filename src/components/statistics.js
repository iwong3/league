import React, { Component } from 'react';

import GamesByElo from './games-by-elo';
import ChampionWinRates from './champion-win-rates';

import '../styles/statistics.css';


export default class Statistics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activePage: "championWinRates"
        }
    }

    setActivePage = (page) => {
        if (this.state.activePage !== page) {
            this.setState(prevState => ({
                activePage: page
            }));
        }
    }

    displayActivePage = () => {
        if (this.state.activePage === "championWinRates") {
            return (
                <ChampionWinRates />
            );
        }
        if (this.state.activePage === "gamesByElo") {
            return (
                <GamesByElo />
            );
        }
    }

    setMenuOptionStyle = (page) => {
        if (this.state.activePage === page) {
            return ({
                "color": "#ffffff"
            });
        }
    }

    render() {
        return (
            <div className="Statistics">
                <div className="statisticsMenu">
                    <div className="statisticsMenuOption"
                         onClick={() => this.setActivePage("championWinRates")}
                         style={this.setMenuOptionStyle("championWinRates")} >
                        Champion Win Rates
                    </div>
                    <div className="statisticsMenuOption"
                         onClick={() => this.setActivePage("gamesByElo")}
                         style={this.setMenuOptionStyle("gamesByElo")} >
                        Ranked Games Played
                    </div>
                </div>
                {this.displayActivePage()}
            </div>
        );
    }

}