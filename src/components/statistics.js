import React, { Component } from 'react';
import { Link } from "react-router-dom";

import GamesByElo from './games-by-elo';
import ChampionMatchups from './champion-matchups';
import ChampionWinRates from './champion-win-rates';

import '../styles/statistics.css';


export default class Statistics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activePage: "championWinRates"
        }
    }

    componentDidMount = () => {
        this.setState({
            activePage: this.props.activePage
        })
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
        if (this.state.activePage === "championMatchups") {
            return (
                <ChampionMatchups />
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
                    <Link to="/statistics/champion-win-rates">
                        <div className="statisticsMenuOption"
                            onClick={() => this.setActivePage("championWinRates")}
                            style={this.setMenuOptionStyle("championWinRates")} >
                            Champion Win Rates
                        </div>
                    </Link>
                    <Link to="/statistics/champion-matchups">
                        <div className="statisticsMenuOption"
                            onClick={() => this.setActivePage("championMatchups")}
                            style={this.setMenuOptionStyle("championMatchups")} >
                            Champion Matchups
                        </div>
                    </Link>
                    <Link to="/statistics/ranked-games-played">
                        <div className="statisticsMenuOption"
                            onClick={() => this.setActivePage("gamesByElo")}
                            style={this.setMenuOptionStyle("gamesByElo")} >
                            Ranked Games Played
                        </div>
                    </Link>
                </div>
                {this.displayActivePage()}
            </div>
        );
    }

}