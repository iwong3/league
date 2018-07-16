import React, { Component } from 'react';

import * as utility from '../utilities/functions';
import * as constant from '../utilities/constants';
import * as object from '../utilities/objects';

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
                <div className="ItemCardExpanded_textRow">Cost: {this.props.item.gold.total}</div>
                <div className="ItemCardExpanded_textRow" dangerouslySetInnerHTML={{__html: this.props.item.description}} ></div>
            </div>
        )
    }

    displayBuilds = () => {
        let builds = [];
        if (this.props.item.into) {
            builds.push(
                <div className="ItemCardExpanded_textGroup">
                    <div className="ItemCardExpandedDetails_textRow">Builds Into</div>
                    {this.displayIntoItems(this.props.item.into)}
                </div>
            );
        } 
        if (this.props.item.from) {
            builds.push(
                <div className="ItemCardExpanded_textGroup">
                    <div className="ItemCardExpandedDetails_textRow">Builds From</div>
                    {this.displayItemTree(this.populateItemTree(this.props.item.key), 1, true)}
                </div>
            );
        }

        return (
            <div className="ItemCardExpandedDetails_builds">{builds}</div>
        );
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

    //display current item first, then from items (TREE)
    displayFromItems = (from) => {
        let fromItems = [];
        let itemImageUrl = "";

        for (let i = 0; i < from.length; i++) {
            itemImageUrl = utility.getItemUrl(from[i]);
            fromItems.push(
                <div className="ItemCard_intoItemsIcon"
                     style={{"background": "url(" + itemImageUrl + ") center"}}></div>
            );
        }

        return (
            <div className="Item_intoItems">{fromItems}</div>
        );
    }

    //creates array that represents item tree
    //format: [base item, children item, ..., children item]
    //chidren item has the same format as the item tree. ex: [base item, [base item, children item, children item], children item]
    populateItemTree = (item) => {
        let group = [];
        group.push(item);

        if (this.props.items[item].from) {
            for (let i = 0; i < this.props.items[item].from.length; i++) {
                group.push(this.populateItemTree(this.props.items[item].from[i]));
            }
        }

        return group;
    }
    
    //kind of recursively generates HTML code for item tree
    displayItemTree = (items, numSiblings, first) => {
        let itemTree = [];
        let itemImageUrl = utility.getItemUrl(items[0]);

        //"base" case
        if (items.length === 1) {
            return (
                <div className="itemTree" style={{"width": 100 / numSiblings + "%"}}>
                    <div className="itemTreeRowHead"
                        style={{"background": "url(" + itemImageUrl + ") center"}}></div>
                </div>
            );
        }
        if (items.length === 2) {
            itemTree.push(
                <div className="itemTree" style={{"width": 100 / numSiblings + "%"}}>
                    <div className="itemTreeRowHead"
                            style={{"background": "url(" + itemImageUrl + ") center"}}></div>
                    <div className="itemTreeRow">
                        {this.displayItemTree(items[1], 1, false)}
                    </div>
                </div>
            );
        }
        if (items.length === 3) {
            itemTree.push(
                <div className="itemTree" style={first ? {"width": "100%"} : {"width": 100 / numSiblings + "%"}}>
                    <div className="itemTreeRowHead"
                            style={{"background": "url(" + itemImageUrl + ") center"}}></div>
                    <div className="itemTreeRow">
                        {this.displayItemTree(items[1], 2, false)}
                        {this.displayItemTree(items[2], 2, false)}
                    </div>
                </div>
            );
        }
        if (items.length === 4) {
            itemTree.push(
                <div className="itemTree" style={first ? {"width": "100%"} : {"width": 100 / numSiblings + "%"}}>
                    <div className="itemTreeRowHead"
                            style={{"background": "url(" + itemImageUrl + ") center"}}></div>
                    <div className="itemTreeRow">
                        {this.displayItemTree(items[1], 3, false)}
                        {this.displayItemTree(items[2], 3, false)}
                        {this.displayItemTree(items[3], 3, false)}
                    </div>
                </div>
            );
        }
        if (items.length === 5) {
            itemTree.push(
                <div className="itemTree" style={first ? {"width": "100%"} : {"width": 100 / numSiblings + "%"}}>
                    <div className="itemTreeRowHead"
                            style={{"background": "url(" + itemImageUrl + ") center"}}></div>
                    <div className="itemTreeRow">
                        {this.displayItemTree(items[1], 4, false)}
                        {this.displayItemTree(items[2], 4, false)}
                        {this.displayItemTree(items[3], 4, false)}
                        {this.displayItemTree(items[4], 4, false)}
                    </div>
                </div>
            );
        }

        return (
            itemTree
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