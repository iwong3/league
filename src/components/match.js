import React, { Component } from 'react';

import * as utility from '../utilities/functions';

import '../styles/match.css';


export default class Match extends Component {

    constructor(props) {
        super(props);

        this.setBanner = this.setBanner.bind(this);
        this.setMatchBorder = this.setMatchBorder.bind(this);
        this.setVerticalLineColor = this.setVerticalLineColor.bind(this);
    }

    getTimeSinceMatch = (details) => {
        let date = new Date();
        let currentTime = date.getTime();
        let timeSinceMatch = currentTime - details.gameCreation;
        let hoursSinceMatch = parseInt(timeSinceMatch/(1000*60*60), 10);

        if (hoursSinceMatch === 1) {
            return "1 hour ago";
        }
        if (hoursSinceMatch < 24) {
            return hoursSinceMatch + " hours ago";
        }
        if (hoursSinceMatch >= 24 && hoursSinceMatch < 48) {
            return "1 day ago";
        }
        return parseInt(hoursSinceMatch / 24, 10) + " days ago";
    }

    getGameDuration = (details) => {
        let hours = parseInt(parseInt(details.gameDuration / 60, 10) / 60, 10);
        let minutes = parseInt(details.gameDuration / 60, 10) % 60;
        let seconds = parseInt(details.gameDuration % 60, 10);

        if (hours >= 1) {
            return hours + "h " + minutes + "m " + seconds + "s";
        }
        return minutes + "m " + seconds + "s";
    }

    setMatchBorder = (win) => {
        if (win) {
            return ({
                "border": "1px solid #ccbe91"
            });
        }
        return ({
            "border": "1px solid #cd2626"
        });
    }

    setVerticalLineColor = (win) => {
        if (win) {
            return ({
                "borderLeft": "1px solid #ccbe91"
            });
        }
        return ({
            "borderLeft": "1px solid #cd2626"
        });
    }

    setBanner = (id) => {
        let championName = utility.championIdToKey(id);
        let bannerUrl = utility.getChampionSplashUrl(championName);
        let style = {"backgroundImage": "url(" + bannerUrl + ")"};
        switch (championName) {
            case ("Aatrox"):
                style["backgroundPosition"] = "63% 22%";
                break;
            case ("Ahri"):
                style["backgroundPosition"] = "42% 18%";
                break;
            case ("Alistar"):
                style["backgroundPosition"] = "0% 42%";
                style["backgroundSize"] = "auto 462%";
                break;
            case ("Ashe"):
                style["backgroundPosition"] = "54% 20%";
                break;
            case ("Azir"):
                style["backgroundPosition"] = "71% 17%";
                break;
            case ("Bard"):
                style["backgroundPosition"] = "42% 20%";
                break;
            case ("Blitzcrank"):
                style["backgroundPosition"] = "62% 28%";
                break;
            case ("Brand"):
                style["backgroundPosition"] = "76% 20%";
                break;
            case ("Braum"):
                style["backgroundPosition"] = "76% 13%";
                break;
            case ("Caitlyn"):
                style["backgroundPosition"] = "70% 14%";
                break;
            case ("Camille"):
                style["backgroundPosition"] = "96% 16%";
                break;
            case ("Cassiopeia"):
                style["backgroundPosition"] = "43% 33%";
                break;
            case ("Darius"):
                style["backgroundPosition"] = "30% 12%";
                break;
            case ("Diana"):
                style["backgroundPosition"] = "58% 33%";
                break;
            case ("Draven"):
                style["backgroundPosition"] = "69% 27%";
                break;
            case ("DrMundo"):
                style["backgroundPosition"] = "70% 31%";
                break;
            case ("Ekko"):
                style["backgroundPosition"] = "67% 20%";
                break;
            case ("Elise"):
                style["backgroundPosition"] = "66% 14%";
                break;
            case ("Ezreal"):
                style["backgroundPosition"] = "48% 29%";
                break;
            case ("Fiddlesticks"):
                style["backgroundPosition"] = "0% 27%";
                style["backgroundSize"] = "auto 514%";
                break;
            case ("Fiora"):
                style["backgroundPosition"] = "17% 4%";
                style["backgroundSize"] = "auto 496%";
                break;
            case ("Fizz"):
                style["backgroundPosition"] = "100% 15%";
                style["backgroundSize"] = "auto 450%";
                break;
            case ("Galio"):
                style["backgroundPosition"] = "20% 3%";
                break;
            case ("Gangplank"):
                style["backgroundPosition"] = "0% 19%";
                style["backgroundSize"] = "auto 408%";
                break;
            case ("Garen"):
                style["backgroundPosition"] = "80% 34%";
                break;
            case ("Gnar"):
                style["backgroundPosition"] = "0% 61%";
                style["backgroundSize"] = "auto 375%";
                break;
            case ("Graves"):
                style["backgroundPosition"] = "70% 8%";
                break;
            case ("Hecarim"):
                style["backgroundPosition"] = "75% 9%";
                break;
            case ("Heimerdinger"):
                style["backgroundPosition"] = "0% 40%";
                style["backgroundSize"] = "111% auto";
                break;
            case ("Illaoi"):
                style["backgroundPosition"] = "41% 1%";
                break;
            case ("Irelia"):
                style["backgroundPosition"] = "23% 5%";
                break;
            case ("JarvanIV"):
                style["backgroundPosition"] = "66% 20%";
                break;
            case ("Jax"):
                style["backgroundPosition"] = "65% 17%";
                break;
            case ("Jayce"):
                style["backgroundPosition"] = "78% 26%";
                break;
            case ("Jhin"):
                style["backgroundPosition"] = "40% 19%";
                break;
            case ("Jinx"):
                style["backgroundPosition"] = "52% 16%";
                break;
            case ("Kaisa"):
                style["backgroundPosition"] = "23% 11%";
                break;
            case ("Kalista"):
                style["backgroundPosition"] = "48% 19%";
                break;
            case ("Karma"):
                style["backgroundPosition"] = "69% 15%";
                break;
            case ("Karthus"):
                style["backgroundPosition"] = "59% 10%";
                break;
            case ("Kassadin"):
                style["backgroundPosition"] = "54% 32%";
                break;
            case ("Kayn"):
                style["backgroundPosition"] = "22% 44%";
                break;
            case ("Kennen"):
                style["backgroundPosition"] = "0% 22%";
                style["backgroundSize"] = "auto 393%";
                break;
            case ("Khazix"):
                style["backgroundPosition"] = "70% 54%";
                break;
            case ("Kindred"):
                style["backgroundPosition"] = "43% 31%";
                break;
            case ("Kled"):
                style["backgroundPosition"] = "0% 10%";
                style["backgroundSize"] = "auto 364%";
                break;
            case ("KogMaw"):
                style["backgroundPosition"] = "0% 62%";
                style["backgroundSize"] = "120% auto";
                break;
            case ("Leblanc"):
                style["backgroundPosition"] = "55% 19%";
                break;
            case ("LeeSin"):
                style["backgroundPosition"] = "48% 17%";
                break;
            case ("Leona"):
                style["backgroundPosition"] = "70% 7%";
                break;
            case ("Lucian"):
                style["backgroundPosition"] = "67% 38%";
                break;
            case ("Lulu"):
                style["backgroundPosition"] = "59% 37%";
                break;
            case ("Lux"):
                style["backgroundPosition"] = "43% 23%";
                break;
            case ("Maokai"):
                style["backgroundPosition"] = "47% 43%";
                break;
            case ("MasterYi"):
                style["backgroundPosition"] = "80% 31%";
                break;
            case ("MissFortune"):
                style["backgroundPosition"] = "70% 30%";
                break; 
            case ("Mordekaiser"):
                style["backgroundPosition"] = "61% 20%";
                break;
            case ("Morgana"):
                style["backgroundPosition"] = "75% 31%";
                break;
            case ("Nasus"):
                style["backgroundPosition"] = "53% 19%";
                break;
            case ("Nidalee"):
                style["backgroundPosition"] = "74% 13%";
                break;
            case ("Nocturne"):
                style["backgroundPosition"] = "44% 49%";
                break;
            case ("Nunu"):
                style["backgroundPosition"] = "70% 12%";
                style["backgroundSize"] = "auto 415%";
                break;
            case ("Olaf"):
                style["backgroundPosition"] = "47% 28%";
                break;
            case ("Orianna"):
                style["backgroundPosition"] = "78% 7%";
                style["backgroundSize"] = "auto 500%";
                break;
            case ("Ornn"):
                style["backgroundPosition"] = "23% 33%";
                break;
            case ("Quinn"):
                style["backgroundPosition"] = "51% 29%";
                break;
            case ("Rammus"):
                style["backgroundPosition"] = "23% 43%";
                style["backgroundSize"] = "auto 475%";
                break;
            case ("Rakan"):
                style["backgroundPosition"] = "31% 12%";
                break;
            case ("Renekton"):
                style["backgroundPosition"] = "0% 18%";
                style["backgroundSize"] = "auto 482%";
                break;
            case ("Rengar"):
                style["backgroundPosition"] = "0% 35%";
                style["backgroundSize"] = "auto 411%";
                break;
            case ("Riven"):
                style["backgroundPosition"] = "75% 20%";
                break;
            case ("Singed"):
                style["backgroundPosition"] = "0% 15%";
                style["backgroundSize"] = "auto 387%";
                break;
            case ("Sion"):
                style["backgroundPosition"] = "58% 13%";
                break;
            case ("Sivir"):
                style["backgroundPosition"] = "38% 34%";
                break;
            case ("Skarner"):
                style["backgroundPosition"] = "0% 40%";
                style["backgroundSize"] = "auto 408%";
                break;
            case ("Sona"):
                style["backgroundPosition"] = "53% 14%";
                break;
            case ("Soraka"):
                style["backgroundPosition"] = "28% 10%";
                break;
            case ("Swain"):
                style["backgroundPosition"] = "58% 9%";
                break;
            case ("Taliyah"):
                style["backgroundPosition"] = "63% 15%";
                style["backgroundSize"] = "auto 425%";
                break;
            case ("Talon"):
                style["backgroundPosition"] = "52% 30%";
                break;
            case ("Taric"):
                style["backgroundPosition"] = "84% 6%";
                break;
            case ("Teemo"):
                style["backgroundPosition"] = "0% 46%";
                style["backgroundSize"] = "auto 413%";
                break;
            case ("Thresh"):
                style["backgroundPosition"] = "45% 24%";
                break;
            case ("Tristana"):
                style["backgroundPosition"] = "0% 20%";
                style["backgroundSize"] = "auto 429%";
                break;
            case ("Trundle"):
                style["backgroundPosition"] = "0% 27%";
                style["backgroundSize"] = "auto 502%";
                break;
            case ("Twitch"):
                style["backgroundPosition"] = "0% 35%";
                style["backgroundSize"] = "auto 456%";
                break;
            case ("Udyr"):
                style["backgroundPosition"] = "25% 52%";
                break;
            case ("Varus"):
                style["backgroundPosition"] = "31% 12%";
                break;
            case ("Vayne"):
                style["backgroundPosition"] = "89% 20%";
                break;
            case ("Veigar"):
                style["backgroundPosition"] = "0% 25%";
                style["backgroundSize"] = "auto 428%";
                break;
            case ("Velkoz"):
                style["backgroundPosition"] = "0% 41%";
                style["backgroundSize"] = "auto 471%";
                break;
            case ("Viktor"):
                style["backgroundPosition"] = "47% 19%";
                break;
            case ("Vladimir"):
                style["backgroundPosition"] = "73% 16%";
                break;
            case ("Volibear"):
                style["backgroundPosition"] = "59% 7%";
                break;
            case ("Warwick"):
                style["backgroundPosition"] = "0% 63%";
                style["backgroundSize"] = "auto 430%";
                break;
            case ("MonkeyKing"):
                style["backgroundPosition"] = "45% 26%";
                break;
            case ("Xayah"):
                style["backgroundPosition"] = "52% 28%";
                break;
            case ("Xerath"):
                style["backgroundPosition"] = "37% 9%";
                break;
            case ("XinZhao"):
                style["backgroundPosition"] = "24% 19%";
                break;
            case ("Yasuo"):
                style["backgroundPosition"] = "78% 30%";
                break;
            case ("Yorick"):
                style["backgroundPosition"] = "50% 8%";
                break;
            case ("Zac"):
                style["backgroundPosition"] = "0% 60%";
                style["backgroundSize"] = "auto 401%";
                break;
            case ("Zed"):
                style["backgroundPosition"] = "50% 12%";
                break;
            case ("Zoe"):
                style["backgroundPosition"] = "0% 20%";
                style["backgroundSize"] = "auto 527%";
                break;
            case ("Zyra"):
                style["backgroundPosition"] = "69% 21%";
                break;
            default:
                style["backgroundPosition"] = "0% 0%";
        }
        return style;
    }

    render() {
        return (
            <div className="Match"
                    style={this.setMatchBorder(this.props.matchStats.win)}
                    onClick={this.props.handleClick} >
                <div className="matchStats">
                    <div className="statGroup">
                        <div className="statRow">
                            {
                                this.props.matchStats.win
                                ?
                                <div className="matchResult" style={{"color": "#ccbe91"}}>VICTORY</div>
                                :
                                <div className="matchResult" style={{"color": "#cd2626"}}>DEFEAT</div>
                            }
                        </div>
                        <div className="statRow">
                            <div className="gameDuration">
                                {this.getGameDuration(this.props.matchDetails)}
                            </div>
                            -
                            <div className="timeSinceMatch">
                                {this.getTimeSinceMatch(this.props.matchDetails)}
                            </div>  
                        </div>
                    </div>
                    {/* <div className="verticalLine" style={this.setVerticalLineColor(this.props.matchStats.win)}></div> */}
                    <div className="statGroup">
                        <div className="statRow2">
                            <div className="kda">
                                {this.props.matchStats.kills} - {this.props.matchStats.deaths} - {this.props.matchStats.assists}
                            </div>
                            {/* <div className="kda2">
                                <img src={utility.getScoreboardIcons("score")} alt="kda2" />
                                {utility.getKDA(this.state.matchStats.kills, this.state.matchStats.deaths, this.state.matchStats.assists)}
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="matchBanner" style={this.setBanner(this.props.championId)} >
                    <div className="matchBannerBlackOverlay">
                        <div className="matchBannerBlackOverlayGradient"></div>
                    </div>
                </div>
            </div>
        );
    }

}