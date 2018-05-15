import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import '../styles/App.css';
import Header from './header';
import SearchContainer from './search-container';
import Champions from './champions';


export default class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="App_body">
            <Route exact path={"/"}
                   component={SearchContainer}
            />
            <Route path={"/champions"}
                   component={Champions}
            />
          </div>
        </div>
      </Router>
    );
  }

}