import React, { Component } from 'react';

import * as utility from '../utilities/functions';

import ChampionCardExpandedMenu from './champion-card-expanded-menu';
import ChampionCardExpandedDetails from './champion-card-expanded-details';

import BandleCity from '../images/champion_region_bg/Bandle-City.png';
import Bilgewater from '../images/champion_region_bg/Bilgewater.png';
import Demacia from '../images/champion_region_bg/Demacia.png';
import Freljord from '../images/champion_region_bg/Freljord.png';
import Ionia from '../images/champion_region_bg/Ionia.png';
import MountTargon from '../images/champion_region_bg/Mount-Targon.png';
import Noxus from '../images/champion_region_bg/Noxus.png';
import Piltover from '../images/champion_region_bg/Piltover.png';
import Runeterra from '../images/champion_region_bg/Runeterra.png';
import ShadowIsles from '../images/champion_region_bg/Shadow-Isles.png';
import Shurima from '../images/champion_region_bg/Shurima.png';
import Void from '../images/champion_region_bg/Void.png';
import Zaun from '../images/champion_region_bg/Zaun.png';


export default class ChampionCardExpanded extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: "about"
        }
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.champion !== this.props.champion) {
            this.setState(prevState => ({
                activeTab: "about"
            }));
        }
    }

    setActiveTab = (tab) => {
        this.setState(prevState => ({
            activeTab: tab
        }));
    }

    setRegionBackground = (champion) => {
        let region = utility.getChampionRegion(champion);
        let style = {};
        
        switch (region) {
            case ("Bandle City"):
                style["backgroundImage"] = `url(${BandleCity})`;
                style["backgroundPosition"] = "50% 0%";
                style["backgroundSize"] = "auto 100%";
                break;
            case ("Bilgewater"):
                style["backgroundImage"] = `url(${Bilgewater})`;
                style["backgroundPosition"] = "50% 0%";
                style["backgroundSize"] = "auto 100%";
                break;
            case ("Demacia"):
                style["backgroundImage"] = `url(${Demacia})`;
                style["backgroundPosition"] = "50% 0%";
                style["backgroundSize"] = "auto 100%";
                break;
            case ("Freljord"):
                style["backgroundImage"] = `url(${Freljord})`;
                style["backgroundPosition"] = "0% 10%";
                style["backgroundSize"] = "100% auto";
                break;
            case ("Ionia"):
                style["backgroundImage"] = `url(${Ionia})`;
                style["backgroundSize"] = "auto 100%";
                break;
            case ("Mount Targon"):
                style["backgroundImage"] = `url(${MountTargon})`;
                style["backgroundPosition"] = "10% 0%";
                style["backgroundSize"] = "auto 100%";
                break;
            case ("Noxus"):
                style["backgroundImage"] = `url(${Noxus})`;
                style["backgroundPosition"] = "64% 0%";
                style["backgroundSize"] = "auto 100%";
                break;
            case ("Piltover"):
                style["backgroundImage"] = `url(${Piltover})`;
                style["backgroundPosition"] = "75% 0%";
                style["backgroundSize"] = "auto 100%";
                break;
            case ("Runeterra"):
                style["backgroundImage"] = `url(${Runeterra})`;
                style["backgroundPosition"] = "85% 0%";
                style["backgroundSize"] = "auto 100%";
                break;
            case ("Shadow Isles"):
                style["backgroundImage"] = `url(${ShadowIsles})`;
                style["backgroundPosition"] = "45% 0%";
                style["backgroundSize"] = "auto 100%";
                break;
            case ("Shurima"):
                style["backgroundImage"] = `url(${Shurima})`;
                style["backgroundPosition"] = "48% 0%";
                style["backgroundSize"] = "auto 100%";
                break;
            case ("Void"):
                style["backgroundImage"] = `url(${Void})`;
                style["backgroundPosition"] = "35% 0%";
                style["backgroundSize"] = "auto 100%";
                break;
            case ("Zaun"):
                style["backgroundImage"] = `url(${Zaun})`;
                style["backgroundPosition"] = "60% 0%";
                style["backgroundSize"] = "auto 100%";
                break;
        }

        return style;
    }

    render() {
        return (
            <div className={"ChampionCardExpanded " + this.props.className}
                 style={this.setRegionBackground(this.props.champion)} >
                <ChampionCardExpandedMenu activeTab={this.state.activeTab}
                                          setActiveTab={this.setActiveTab} />
                <ChampionCardExpandedDetails champion={this.props.champion}
                                             activeTab={this.state.activeTab} />
            </div>
        );
    }

}