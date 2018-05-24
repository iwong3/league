import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './header';
import Navigation from './navigation';
import SearchContainer from './search-container';
import Champions from './champions';
import FreeToPlay from './free-to-play';

import '../styles/App.css';


export default class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="App_body">
            <Route exact path={"/"}
                   component={FreeToPlay} />
            <Route path={"/summoner"}
                   component={SearchContainer} />
            <Route path={"/champions"}
                   component={Champions} />
          </div>
          <div className="App_footer"></div>
        </div>
      </Router>
    );
  }

}