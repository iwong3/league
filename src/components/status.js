import React, { Component } from 'react';
import axios from 'axios';

import * as utility from '../utilities/functions';
// import * as constants from '../utilities/constants';

import '../styles/status.css';


export default class Status extends Component {

    constructor(props) {
        super(props);

        this.state = {
            statusData: null,
            currentRegion: "na1",
            currentRegionName: "North America"
        }
    }

    componentDidMount = () => {
        let statusUrl = utility.getStatusUrl(this.state.currentRegion);
        axios.get(statusUrl)
             .then(res => {
                this.setState({
                    statusData: res.data,
                });
            });
    }

    setCurrentRegion = (region) => {
        if (region !== this.state.currentRegion) {
            let statusUrl = utility.getStatusUrl(region);
            axios.get(statusUrl)
                 .then(res => {
                    this.setState({
                        statusData: res.data,
                        currentRegion: region,
                        currentRegionName: utility.getRegionName(region)
                    }, function() {
                        console.log("current region: " + this.state.currentRegionName);
                    });
                });
        }
    }

    setRegionStyle = (region) => {
        if (region === this.state.currentRegion) {
            return ({
                "color": "#ffffff"
            });
        }
    }

    setServiceStatusColor = (status) => {
        if (status === "online") {
            return ({
                "background": "#004c00"
            });
        } else {
            return ({
                "background": "#cd2626"
            });
        }
    }

    render() {
        if (this.state.statusData) {
            return (
                <div className="Status">
                    <div className="statusTitle">Service Status</div>
                    <div className="statusBody">
                        <div className="statusHeaderRow">
                            <div className="statusRegionTitle">Region</div>
                            <div className="statusCurrentRegionTitle">{this.state.currentRegionName}</div>
                        </div>
                        <div className="statusContent">
                            <div className="statusRegionSelector">
                                <div className="statusRegion"
                                    onClick={() => this.setCurrentRegion("na1")}
                                    style={this.setRegionStyle("na1")} >
                                    North America
                                </div>
                                <div className="statusRegion"
                                    onClick={() => this.setCurrentRegion("euw1")}
                                    style={this.setRegionStyle("euw1")} >
                                    Europe West
                                </div>
                                <div className="statusRegion"
                                    onClick={() => this.setCurrentRegion("eun1")}
                                    style={this.setRegionStyle("eun1")} >
                                    Europe Nordic & East
                                </div>
                                <div className="statusRegion"
                                    onClick={() => this.setCurrentRegion("la1")}
                                    style={this.setRegionStyle("la1")} >
                                    Latin America North
                                </div>
                                <div className="statusRegion"
                                    onClick={() => this.setCurrentRegion("la2")}
                                    style={this.setRegionStyle("la2")} >
                                    Latin America South
                                </div>
                                <div className="statusRegion"
                                    onClick={() => this.setCurrentRegion("br1")}
                                    style={this.setRegionStyle("br1")} >
                                    Brazil
                                </div>
                                <div className="statusRegion"
                                    onClick={() => this.setCurrentRegion("tr1")}
                                    style={this.setRegionStyle("tr1")} >
                                    Turkey
                                </div>
                                <div className="statusRegion"
                                    onClick={() => this.setCurrentRegion("ru")}
                                    style={this.setRegionStyle("ru")} >
                                    Russia
                                </div>
                                <div className="statusRegion"
                                    onClick={() => this.setCurrentRegion("oc1")}
                                    style={this.setRegionStyle("oc1")} >
                                    Oceania
                                </div>
                                <div className="statusRegion"
                                    onClick={() => this.setCurrentRegion("jp1")}
                                    style={this.setRegionStyle("jp1")} >
                                    Japan
                                </div>
                                <div className="statusRegion"
                                    onClick={() => this.setCurrentRegion("kr")}
                                    style={this.setRegionStyle("kr")} >
                                    Korea
                                </div>
                                <div className="statusRegion"
                                    onClick={() => this.setCurrentRegion("pbe1")}
                                    style={this.setRegionStyle("pbe1")} >
                                    PBE
                                </div>
                            </div>
                            <div className="statuses">
                                <div className="serviceRow">
                                    <div className="serviceGroup">
                                        <div className="serviceStatus" style={this.setServiceStatusColor(this.state.statusData.services[0].status)}></div>
                                        <div className="serviceName">{this.state.statusData.services[0].name}</div>
                                        <div className="serviceStatusText">{this.state.statusData.services[0].status}</div>
                                    </div>
                                    <div className="serviceGroup">
                                        <div className="serviceStatus" style={this.setServiceStatusColor(this.state.statusData.services[1].status)}></div>
                                        <div className="serviceName">{this.state.statusData.services[1].name}</div>
                                        <div className="serviceStatusText">{this.state.statusData.services[0].status}</div>
                                    </div>
                                </div>
                                <div className="serviceRow">
                                    <div className="serviceGroup">
                                        <div className="serviceStatus" style={this.setServiceStatusColor(this.state.statusData.services[2].status)}></div>
                                        <div className="serviceName">{this.state.statusData.services[2].name}</div>
                                        <div className="serviceStatusText">{this.state.statusData.services[0].status}</div>
                                    </div>
                                    <div className="serviceGroup">
                                        <div className="serviceStatus" style={this.setServiceStatusColor(this.state.statusData.services[3].status)}></div>
                                        <div className="serviceName">{this.state.statusData.services[3].name}</div>
                                        <div className="serviceStatusText">{this.state.statusData.services[0].status}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <none/>
            );
        }
    }

}