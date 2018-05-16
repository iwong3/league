import React, { Component } from 'react';
import { Link } from "react-router-dom";

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

    setStyle = () => {
        if (this.state.summonerName) {
            return ({
                "background": "none"
            });
        }
        return ({
            "display": "flex",
            "justifyContent": "space-evenly",
            "alignItems": "center",
            "paddingTop": "10%",
            "paddingBottom": "10%",
            "height": "375px"
        })
    }

    render() {
        return (
            <div className="SearchContainer"
                 style={this.setStyle()} >
                <Search updateSummonerName={this.updateSummonerName} />
                <SummonerContainer summonerName={this.state.summonerName}/>
            </div>
        );
    }

}