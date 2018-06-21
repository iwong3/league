import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './header';
import Navigation from './navigation';
import SearchContainer from './search-container';
import Champions from './champions';
import FreeToPlay from './free-to-play';
import Statistics from './statistics';

import '../styles/App.css';


export default class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="App_body">
            <Route exact path={"/"}
                   component={Navigation} />
            <Route exact path={"/game"}
                   component={FreeToPlay} />
            <Route path={"/summoner"}
                  //  component={() => <SearchContainer summonerName=""/>} />
                  component={SearchContainer} />
            <Route path={"/champions"}
                   component={Champions} />
            <Route path={"/items"}
                   />
            <Route path={"/statistics/champion-win-rates"}
                   component={() => <Statistics activePage="championWinRates"/>} />
            <Route path={"/statistics/champion-matchups"}
                   component={() => <Statistics activePage="championMatchups"/>} />
            <Route path={"/statistics/ranked-games-played"}
                   component={() => <Statistics activePage="gamesByElo"/>} />
          </div>
          <div className="App_footer"></div>
        </div>
      </Router>
    );
  }

}