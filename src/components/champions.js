import React, { Component } from 'react';
import axios from 'axios';

import * as champions from '../utilities/champions';
import * as utility from '../utilities/functions';

export default class Champions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            champions: []
        };
    }

    componentDidMount = () => {
        let championsUrl = utility.getChampionsUrl();
        axios.get(championsUrl)
            .then(res => {
                this.setState({
                    champions: res.data.data
                });
            })
            .catch(error => {
                this.setState ({
                    champions: champions.champions.data
                })
            });
    }

    //Displays champions with a row size
    displayChampions = (champions) => {

        let rowSize = 10;

        var icons = Object.keys(champions).map((champion) => this.displayChampionsHelper(champions[champion]))
            //row stores icons with a size of rowSize
            .reduce(function(row, icon, index) {
                //if we hit rowSize, reset row
                if (index % rowSize === 0) {
                    row.push([]);
                }
                //push icon into row
                row[row.length - 1].push(icon);
                return row;
            }, []).map(function(row, index) {
                return <div>{row}</div>;
            });

        return icons;
    }

    displayChampionsHelper = (champion) => {
        let championIconUrl = utility.getChampionIconUrl(champion.key);
        return (
            <img src={championIconUrl} alt={champion.name} style={{"width": "100px"}} />
        );
    }

    render() {
        if (this.state.champions) {
            return (
                <div className="Champions">
                    {this.displayChampions(this.state.champions)}
                </div>
            ); 
        }
        return (
            <none/>
        );
    }

}