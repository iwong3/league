import React, { Component } from 'react';

import Search from './search';
import SummonerContainer from './summoner-container';
import '../styles/search-container.css';


export default class SearchContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            summonerName: ""
        }

        this.updateSummonerName = this.updateSummonerName.bind(this);
    }

    updateSummonerName = (name) => {
        this.setState({
            summonerName: name
        });
    }

    render() {
        return (
            <div className="SearchContainer">
                <Search updateSummonerName={this.updateSummonerName} />
                <SummonerContainer summonerName={this.state.summonerName}/>
            </div>
        );
    }

}