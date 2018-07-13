import React, { Component } from 'react';

import * as utility from '../utilities/functions';

import ItemCardExpandedMenu from './item-card-expanded-menu';
import ItemCardExpandedDetails from './item-card-expanded-details';

import '../styles/item-card-expanded.css';


export default class ItemCardExpanded extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: "stats"
        }
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.item !== this.props.item) {
            this.setState(prevState => ({
                activeTab: "stats"
            }));
        }
    }

    setActiveTab = (tab) => {
        this.setState(prevState => ({
            activeTab: tab
        }));
    }

    render() {
        return (
            <div className={"ItemCardExpanded " + this.props.className}>
                <ItemCardExpandedMenu activeTab={this.state.activeTab}
                                      setActiveTab={this.setActiveTab} />
                <ItemCardExpandedDetails item={this.props.item}
                                         activeTab={this.state.activeTab}
                                         items={this.props.items} />
            </div>
        );
    }

}