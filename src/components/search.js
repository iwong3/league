import React, { Component } from 'react';

import '../styles/search.css';


export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            summonerName: "",
            showAlert: false,
            alertMessage: ""
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    //Keeps track of input changes and updates state accordingly
    handleSearchChange = (event) => {
        this.setState({
            summonerName: event.target.value,
            showAlert: false,
            alertMessage: ""
        });
    }

    //If valid summoner name, update our window.location
    //Otherwise, set alert states
    handleSearch = (event) => {
        event.preventDefault();
        if (this.state.summonerName && this.state.summonerName.length > 3) {
            window.location = "/summoner/" + this.state.summonerName;
        } else if (this.state.summonerName) {
            this.setState({
                showAlert: true,
                alertMessage: "Please enter a valid summoner name."
            });
        } else {
            this.setState({
                showAlert: true,
                alertMessage: "Please enter a summoner name."
            });
        }
    }

    render() {
        return (
            <div className="Search">
                {
                    this.state.showAlert
                    ?
                    <div className="alert">{this.state.alertMessage}</div>
                    :
                    <div className="alert"></div>
                }
                <form onSubmit={this.handleSearch}>
                    <input id="searchBar"
                           type="text"
                           autoComplete="off"
                           value={this.state.summonerName}
                           placeholder="Find a Summoner"
                           onChange={this.handleSearchChange}
                    />
                    {/* <button id="searchButton"
                            type="submit">
                        Search
                    </button> */}
                </form>
            </div>
        )
    }

}