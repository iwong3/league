import React, { Component } from 'react';

import ChampionCard from './champion-card';
import ChampionCardExpanded from './champion-card-expanded';

import '../styles/champion-card-expanded.css';


export default class ChampionCardContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    showChampionCardExpanded = () => {
        if (this.state.isExpanded) {
            return "championCardExpanded";
        }
        return "championCardHidden";
    }

    render() {
        return (
            <div className="ChampionCardContainer">
                <ChampionCard champion={this.props.champion}
                              handleClick={this.handleClick} />
                <ChampionCardExpanded champion={this.props.champion}
                                      className={this.showChampionCardExpanded()}/>
            </div>
        );
    }

}