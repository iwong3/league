import React, { Component } from 'react';

import * as utility from '../utilities/functions';

import '../styles/champion-card.css';


export default class ChampionCard extends Component {

    getChampionArt = (champion) => {
        let splashUrl = utility.getChampionSplashUrl(champion.key);
        let style = {"backgroundImage": "url(" + splashUrl + ")"};
        switch (champion.key) {
            case ("Aatrox"):
                style["backgroundPosition"] = "100% 27%";
                style["backgroundSize"] = "auto 160%";
                break;
            case ("Ahri"):
                style["backgroundPosition"] = "100% 15%";
                style["backgroundSize"] = "auto 150%";
                break;
            case ("Akali"):
                style["backgroundPosition"] = "76% 19%";
                style["backgroundSize"] = "auto 165%";
                break;
            case ("Alistar"):
                style["backgroundPosition"] = "85% 17%";
                style["backgroundSize"] = "auto 150%";
                break;
            case ("Amumu"):
                style["backgroundPosition"] = "100% 16%";
                style["backgroundSize"] = "auto 150%";
                break;
            case ("Anivia"):
                style["backgroundPosition"] = "65% 16%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Annie"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 128%";
                break;
            case ("Ashe"):
                style["backgroundPosition"] = "100% 20%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("AurelionSol"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 108%";
                break;
            case ("Azir"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Bard"):
                style["backgroundPosition"] = "100% 15%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Blitzcrank"):
                style["backgroundPosition"] = "100% 30%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Brand"):
                style["backgroundPosition"] = "70% 30%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Braum"):
                style["backgroundPosition"] = "100% 10%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Caitlyn"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Camille"):
                style["backgroundPosition"] = "100% 15%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Cassiopeia"):
                style["backgroundPosition"] = "100% 20%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Chogath"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Corki"):
                style["backgroundPosition"] = "100% 66%";
                style["backgroundSize"] = "auto 111%";
                break;
            case ("Darius"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Diana"):
                style["backgroundPosition"] = "100% 70%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Draven"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("DrMundo"):
                style["backgroundPosition"] = "100% 60%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Ekko"):
                style["backgroundPosition"] = "100% 10%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Elise"):
                style["backgroundPosition"] = "60% 0%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Evelynn"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Ezreal"):
                style["backgroundPosition"] = "100% 50%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Fiddlesticks"):
                style["backgroundPosition"] = "60% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Fiora"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Fizz"):
                style["backgroundPosition"] = "100% 8%";
                style["backgroundSize"] = "auto 170%";
                break;
            case ("Galio"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Gangplank"):
                style["backgroundPosition"] = "100% 25%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Garen"):
                style["backgroundPosition"] = "50% 30%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Gnar"):
                style["backgroundPosition"] = "100% 10%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Gragas"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Graves"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Hecarim"):
                style["backgroundPosition"] = "75% 10%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Heimerdinger"):
                style["backgroundPosition"] = "100% 20%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Illaoi"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 135%";
                break;
            case ("Irelia"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Ivern"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Janna"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("JarvanIV"):
                style["backgroundPosition"] = "80% 10%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Jax"):
                style["backgroundPosition"] = "100% 30%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Jayce"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Jhin"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Jinx"):
                style["backgroundPosition"] = "50% 15%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Kaisa"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Kalista"):
                style["backgroundPosition"] = "100% 20%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Karma"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Karthus"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Kassadin"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Katarina"):
                style["backgroundPosition"] = "0% 10%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Kayle"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 130%";
                break;
            case ("Kayn"):
                style["backgroundPosition"] = "0% 50%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Kennen"):
                style["backgroundPosition"] = "0% 10%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Khazix"):
                style["backgroundPosition"] = "100% 30%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Kindred"):
                style["backgroundPosition"] = "100% 50%";
                style["backgroundSize"] = "auto 130%";
                break;
            case ("Kled"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("KogMaw"):
                style["backgroundPosition"] = "100% 50%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Leblanc"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 135%";
                break;
            case ("LeeSin"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Leona"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Lissandra"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Lucian"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Lulu"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Lux"):
                style["backgroundPosition"] = "100% 20%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Malphite"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Malzahar"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 120%";
            case ("Maokai"):
                style["backgroundPosition"] = "100% 30%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("MasterYi"):
                style["backgroundPosition"] = "70% 30%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("MissFortune"):
                style["backgroundPosition"] = "30% 40%";
                style["backgroundSize"] = "auto 115%";
                break; 
            case ("Mordekaiser"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Morgana"):
                style["backgroundPosition"] = "100% 40%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Nami"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Nasus"):
                style["backgroundPosition"] = "35% 0%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Nautilus"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Nidalee"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 140%";
                break;
            case ("Nocturne"):
                style["backgroundPosition"] = "50% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Nunu"):
                style["backgroundPosition"] = "30% 10%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Olaf"):
                style["backgroundPosition"] = "100% 30%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Orianna"):
                style["backgroundPosition"] = "15% 5%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Ornn"):
                style["backgroundPosition"] = "35% 30%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Pantheon"):
                style["backgroundPosition"] = "100% 20%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Poppy"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Pyke"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Quinn"):
                style["backgroundPosition"] = "70% 15%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Rakan"):
                style["backgroundPosition"] = "10% 10%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Rammus"):
                style["backgroundPosition"] = "50% 50%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("RekSai"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Renekton"):
                style["backgroundPosition"] = "0% 15%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Rengar"):
                style["backgroundPosition"] = "100% 10%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Riven"):
                style["backgroundPosition"] = "100% 20%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Rumble"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Ryze"):
                style["backgroundPosition"] = "0% 30%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Sejuani"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Shaco"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Shen"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Shyvana"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Singed"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Sion"):
                style["backgroundPosition"] = "60% 10%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Sivir"):
                style["backgroundPosition"] = "100% 30%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Skarner"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Sona"):
                style["backgroundPosition"] = "100% 10%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Soraka"):
                style["backgroundPosition"] = "30% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Swain"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Syndra"):
                style["backgroundPosition"] = "100% 40%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("TahmKench"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Taliyah"):
                style["backgroundPosition"] = "20% 10%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Talon"):
                style["backgroundPosition"] = "100% 80%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Taric"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Teemo"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Thresh"):
                style["backgroundPosition"] = "100% 20%";
                style["backgroundSize"] = "auto 140%";
                break;
            case ("Tristana"):
                style["backgroundPosition"] = "100% 35%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Trundle"):
                style["backgroundPosition"] = "100% 40%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Tryndamere"):
                style["backgroundPosition"] = "0% 70%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("TwistedFate"):
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Twitch"):
                style["backgroundPosition"] = "100% 20%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Udyr"):
                style["backgroundPosition"] = "100% 90%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Urgot"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Varus"):
                style["backgroundPosition"] = "0% 10%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Vayne"):
                style["backgroundPosition"] = "0% 10%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Veigar"):
                style["backgroundPosition"] = "100% 50%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Velkoz"):
                style["backgroundPosition"] = "100% 50%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Vi"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break; 
            case ("Viktor"):
                style["backgroundPosition"] = "100% 50%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Vladimir"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Volibear"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Warwick"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("MonkeyKing"):
                style["backgroundPosition"] = "100% 50%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Xayah"):
                style["backgroundPosition"] = "70% 10%";
                style["backgroundSize"] = "auto 120%";
                break;
            case ("Xerath"):
                style["backgroundPosition"] = "100% 40%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("XinZhao"):
                style["backgroundPosition"] = "0% 40%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Yasuo"):
                style["backgroundPosition"] = "100% 30%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Yorick"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Zac"):
                style["backgroundPosition"] = "100% 100%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Zed"):
                style["backgroundPosition"] = "100% 40%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Ziggs"):
                style["backgroundPosition"] = "100% 0%";
                style["backgroundSize"] = "auto 115%";
                break;
            case ("Zilean"):
                style["backgroundPosition"] = "50% 0%";
                style["backgroundSize"] = "auto 110%";
                break;
            case ("Zoe"):
                style["backgroundPosition"] = "20% 0%";
                style["backgroundSize"] = "auto 125%";
                break;
            case ("Zyra"):
                style["backgroundPosition"] = "75% 30%";
                style["backgroundSize"] = "auto 150%";
                break;
            default:
                style["backgroundPosition"] = "0% 0%";
                style["backgroundSize"] = "auto 110%";
        }
        return style;
    }

    render() {
        return (
            <div className="ChampionCard"
                 onClick={this.props.handleClick}>
                <div className="championArt"
                     style={this.getChampionArt(this.props.champion)} >
                </div>
                <div className="championNameGroup">
                    <div className="championName">
                        {this.props.champion.name}
                    </div>
                    <div className="championTitle">
                        {this.props.champion.title}
                    </div>
                </div>
            </div>
        );
    }

}