import React, { Component } from 'react';

import * as utility from '../utilities/functions';

import '../styles/item-card.css';


export default class ItemCard extends Component {

    render() {
        if (this.props.item && this.props.itemImageUrl) {
            return (
                <div className="ItemCard"
                     onClick={this.props.handleClick} >
                    <div className="ItemCard_icon"
                         style={{"background": "url(" + this.props.itemImageUrl + ") center"}}></div>
                    <div className="ItemCard_textGroup">
                        <div className="ItemCard_textRow" id="ItemCard_name" >{this.props.item.name}</div>
                        <div className="ItemCard_textRow" id="ItemCard_plaintext" >{this.props.item.plaintext}</div>
                    </div>
                </div>
            )
        } else {
            return (
                <none/>
            );
        }
    }

}