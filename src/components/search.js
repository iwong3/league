import React, { Component } from 'react';

import '../styles/search.css';


export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            summonerName: ""
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange = (event) => {
        this.setState({
            summonerName: event.target.value
        });
    }

    handleSearch = (event) => {
        event.preventDefault();
        if (this.state.summonerName) {
            this.props.updateSummonerName(this.state.summonerName);
        } else {
            alert("hi");
        }
    }

    render() {
        return (
            <div className="Search">
                <form onSubmit={this.handleSearch}>
                    <input id="searchBar"
                           type="text"
                           value={this.state.summonerName}
                           placeholder="Summoner Name..."
                           onChange={this.handleSearchChange}
                    />
                    <button id="searchButton"
                            type="submit">
                        Search
                    </button>
                </form>
            </div>
        )
    }

}