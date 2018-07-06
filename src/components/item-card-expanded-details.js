import React, { Component } from 'react';

import * as utility from '../utilities/functions';
import * as constant from '../utilities/constants';

// import '../styles/item-card-expanded-details.css';


export default class ItemCardExpandedDetails extends Component {

    render() {
        return (
            <div className="ItemCardExpandedDetails">
                <div className="ItemCardExpanded_textGroup">
                    <div className="ItemCardExpanded_textRow" dangerouslySetInnerHTML={{__html: this.props.item.description}} ></div>
                </div>
            </div>
        )
    }

}
