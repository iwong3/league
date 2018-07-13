import React, { Component } from 'react';

import ItemCard from './item-card';
import ItemCardExpanded from './item-card-expanded';

import '../styles/item-card-container.css';


export default class ItemCardContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.item !== this.props.item) {
            this.setState(prevState => ({
                isExpanded: false
            }));
        }
    }

    handleClick = () => {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    showItemCardExpanded = () => {
        if (this.state.isExpanded) {
            return "itemCardExpanded";
        }
        return "itemCardHidden";
    }

    render() {
        return (
            <div className="ItemCardContainer">
                <ItemCard item={this.props.item}
                          itemImageUrl={this.props.itemImageUrl}
                          handleClick={this.handleClick} />
                <ItemCardExpanded item={this.props.item}
                                  className={this.showItemCardExpanded()}
                                  items={this.props.items} />
            </div>
        );
    }

}