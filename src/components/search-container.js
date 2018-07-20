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

        this.setStyle = this.setStyle.bind(this);
    }

    //Get summonerName from URL
    componentDidMount = () => {
        let urlSummonerName = "";
        if (this.props.location.pathname.length > 10) {
            urlSummonerName = this.props.location.pathname.substring(10);
        }
        this.setState({
            summonerName: urlSummonerName
        });
    }

    componentWillReceiveProps = (newProp) => {
        let urlSummonerName = "";
        if (newProp.location.pathname.length > 10) {
            urlSummonerName = newProp.location.pathname.substring(10);
        }
        this.setState({
            summonerName: urlSummonerName
        });
    }

    //If there is a summoner name to search, just show the Search bar
    //Otherwise, show the flashy background and styling
    setStyle = () => {
        if (this.state.summonerName !== "") {
            return ({
                "background": "none"
            });
        }
        return ({
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "paddingTop": "5%",
            "paddingBottom": "10%",
            "height": "375px"
        })
    }

    render() {
        return (
            <div className="SearchContainer"
                 style={this.setStyle()} >
                {this.state.summonerName ? <none/> : <div className="SearchContainerTitle">Summoners</div>}
                <Search />
                {this.state.summonerName ? <SummonerContainer summonerName={this.state.summonerName}/> : <none/>}
            </div>
        );
    }

}