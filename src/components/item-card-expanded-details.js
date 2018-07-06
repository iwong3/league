import React, { Component } from 'react';

import * as utility from '../utilities/functions';
import * as constant from '../utilities/constants';

import '../styles/item-card-expanded-details.css';


export default class ItemCardExpandedDetails extends Component {

    displayDetails = (tab) => {
        if (tab === "stats") {
            return this.displayStats();
        } else if (tab === "builds") {
            return this.displayBuilds();
        }
        return <none/>;
    }

    displayStats = () => {
        return (
            <div className="ItemCardExpanded_textGroup">
                <div className="ItemCardExpanded_textRow" dangerouslySetInnerHTML={{__html: this.props.item.description}} ></div>
            </div>
        )
    }

    displayBuilds = () => {
        if (this.props.item.into) {
            return (
                <div className="ItemCardExpanded_textGroup">
                    <div className="ItemCardExpandedDetails_textRow">Builds Into</div>
                    {this.displayIntoItems(this.props.item.into)}
                </div>
            );
        } else {
            return (<none/>);
        }
    }

    //to-do: sort into items by price
    displayIntoItems = (into) => {
        let intoItems = [];
        let itemImageUrl = "";

        for (let i = 0; i < into.length; i++) {
            itemImageUrl = utility.getItemUrl(into[i]);
            intoItems.push(
                <div className="ItemCard_intoItemsIcon"
                     style={{"background": "url(" + itemImageUrl + ") center"}}></div>
            );
        }

        return (
            <div className="Item_intoItems">{intoItems}</div>
        );
    }

    render() {
        return (
            <div className="ItemCardExpandedDetails">
                {this.displayDetails(this.props.activeTab)}
            </div>
        )
    }

}
