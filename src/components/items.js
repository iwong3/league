import React, { Component } from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';

import "../styles/items.css";


export default class Items extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: null
        }
    }

    componentDidMount = () => {
        let itemsUrl = utility.getItemData();
        axios.get(itemsUrl)
             .then(res => {
                this.setState({
                    items: utility.standardizeItems(res.data.data)
                });
             });
    }

    displayItems = (items) => {
        let rowSize = 12;
        let itemImages = [];
        let itemImagesRow = [];
        let itemImageUrl = "";

        for (let i = 0; i < items.length; i++) {
            console.log(itemImageUrl);
            itemImageUrl = utility.getItemUrl(items[i].key);
            if (i % 12 === 0) {
                itemImages.push(
                    <div className="itemImagesRow">{itemImagesRow}</div>
                );
                itemImagesRow = [];
            }
            itemImagesRow.push(
                <div className="itemIconGroup">
                    <div className="itemIcon" style={{"background": "url(" + itemImageUrl + ") center"}}></div>
                </div>
            );
            if (i === items.length - 1 && i % rowSize !== rowSize - 1) {
                itemImages.push(
                    <div className="itemImagesRow">{itemImagesRow}</div>
                );
            }
        }

        return (
            <div className="itemImages">{itemImages}</div>
        );
    }

    render() {
        if (this.state.items) {
            return (
                <div className="Items">
                    {this.displayItems(this.state.items)}
                </div>
            );
        } else {
            return <none/>;
        }
    }

}