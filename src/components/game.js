import React, { Component } from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';

import FreeToPlay from './free-to-play';

import '../styles/game.css';


export default class Game extends Component {

    render() {
        return (
            <div className="Game">
                <FreeToPlay />
            </div>
        );
    }

}