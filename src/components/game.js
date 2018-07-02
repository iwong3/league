import React, { Component } from 'react';

import Status from './status';
import FreeToPlay from './free-to-play';

import '../styles/game.css';


export default class Game extends Component {

    render() {
        return (
            <div className="Game">
                <Status />
                <FreeToPlay />
            </div>
        );
    }

}